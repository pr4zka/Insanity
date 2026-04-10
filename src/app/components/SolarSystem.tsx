'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

const PERSPECTIVE = 0.38  // orbit y-squish for 3D feel

interface PlanetDef {
  name: string
  r: number          // visual radius px
  orbit: number      // orbit semi-major axis px
  speed: number      // radians per second
  color: string
  glowColor: string
  angle0: number     // initial angle
  hasMoon?: boolean
  hasRings?: boolean
  brightness?: number
}

const PLANETS: PlanetDef[] = [
  { name: 'Mercury', r: 3,  orbit: 90,  speed: 0.80, color: '#a8a8a8', glowColor: '#888',      angle0: 0.8 },
  { name: 'Venus',   r: 6,  orbit: 145, speed: 0.50, color: '#e8c87a', glowColor: '#c09030',   angle0: 2.1 },
  { name: 'Earth',   r: 7,  orbit: 205, speed: 0.30, color: '#4488ee', glowColor: '#1155cc',   angle0: 4.5, hasMoon: true },
  { name: 'Mars',    r: 5,  orbit: 275, speed: 0.18, color: '#cc4422', glowColor: '#882200',   angle0: 1.2 },
  { name: 'Jupiter', r: 16, orbit: 390, speed: 0.06, color: '#c8903c', glowColor: '#a06020',   angle0: 3.8, brightness: 1.2 },
  { name: 'Saturn',  r: 12, orbit: 525, speed: 0.035,color: '#e8d898', glowColor: '#c0a050',   angle0: 5.5, hasRings: true },
]

interface Star {
  nx: number; ny: number; r: number; phase: number; speed: number; color: string
}

interface Asteroid {
  orbitR: number; angle: number; r: number; speed: number
}

function buildStars(count: number): Star[] {
  return Array.from({ length: count }, () => {
    const roll = Math.random()
    return {
      nx: Math.random(), ny: Math.random(),
      r: Math.random() * 1.6 + 0.2,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.015 + 0.003,
      color: roll > 0.82 ? '#c084fc' : roll > 0.68 ? '#818cf8' : '#e2e8f0',
    }
  })
}

function buildAsteroids(count: number): Asteroid[] {
  // Belt between Mars and Jupiter (~275–390)
  return Array.from({ length: count }, () => ({
    orbitR: 290 + Math.random() * 80,
    angle: Math.random() * Math.PI * 2,
    r: Math.random() * 1.5 + 0.3,
    speed: 0.06 + Math.random() * 0.04,
  }))
}

function drawStarField(
  ctx: CanvasRenderingContext2D,
  stars: Star[], w: number, h: number, t: number
) {
  for (const s of stars) {
    const alpha = 0.12 + 0.88 * Math.abs(Math.sin(t * s.speed * 40 + s.phase))
    ctx.globalAlpha = alpha * 0.55
    ctx.fillStyle = s.color
    ctx.beginPath()
    ctx.arc(s.nx * w, s.ny * h, s.r, 0, Math.PI * 2)
    ctx.fill()
    if (s.r > 1.2) {
      ctx.globalAlpha = alpha * 0.12
      ctx.beginPath()
      ctx.arc(s.nx * w, s.ny * h, s.r * 5, 0, Math.PI * 2)
      ctx.fill()
    }
  }
  ctx.globalAlpha = 1
}

function drawOrbitRing(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number, rx: number,
  alpha = 0.08
) {
  const ry = rx * PERSPECTIVE
  ctx.save()
  ctx.strokeStyle = `rgba(180, 180, 255, ${alpha})`
  ctx.lineWidth = 0.8
  ctx.setLineDash([3, 9])
  ctx.beginPath()
  ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2)
  ctx.stroke()
  ctx.setLineDash([])
  ctx.restore()
}

function drawSun(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number, r: number, t: number
) {
  // Far corona layers
  const coronaSteps = 7
  for (let i = coronaSteps - 1; i >= 0; i--) {
    const cr = r + (i + 1) * 22 + Math.sin(t * 1.5 + i) * 4
    const g = ctx.createRadialGradient(cx, cy, r, cx, cy, cr)
    const a = 0.06 - i * 0.007
    g.addColorStop(0, `rgba(255, 200, 60, ${a})`)
    g.addColorStop(1, 'transparent')
    ctx.fillStyle = g
    ctx.beginPath()
    ctx.arc(cx, cy, cr, 0, Math.PI * 2)
    ctx.fill()
  }

  // Pulsing halo
  const haloR = r * 2.4 + Math.sin(t * 2.2) * r * 0.25
  const halo = ctx.createRadialGradient(cx, cy, r, cx, cy, haloR)
  halo.addColorStop(0, `rgba(255, 180, 40, 0.18)`)
  halo.addColorStop(1, 'transparent')
  ctx.fillStyle = halo
  ctx.beginPath()
  ctx.arc(cx, cy, haloR, 0, Math.PI * 2)
  ctx.fill()

  // Purple outer glow (nebula feel)
  const nebula = ctx.createRadialGradient(cx, cy, r * 2, cx, cy, r * 6)
  nebula.addColorStop(0, 'rgba(139, 92, 246, 0.06)')
  nebula.addColorStop(1, 'transparent')
  ctx.fillStyle = nebula
  ctx.beginPath()
  ctx.arc(cx, cy, r * 6, 0, Math.PI * 2)
  ctx.fill()

  // Sun body gradient
  const body = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.35, 0, cx, cy, r)
  body.addColorStop(0, '#ffffff')
  body.addColorStop(0.2, '#fffbe8')
  body.addColorStop(0.6, '#ffd040')
  body.addColorStop(0.85, '#ff9010')
  body.addColorStop(1, '#e06000')
  ctx.fillStyle = body
  ctx.beginPath()
  ctx.arc(cx, cy, r, 0, Math.PI * 2)
  ctx.fill()
}

function drawPlanet(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, planet: PlanetDef, t: number
) {
  const { r, color, glowColor } = planet

  // Glow
  const gr = r * 3
  const gGrad = ctx.createRadialGradient(x, y, r * 0.5, x, y, gr)
  gGrad.addColorStop(0, glowColor + 'aa')
  gGrad.addColorStop(1, 'transparent')
  ctx.fillStyle = gGrad
  ctx.beginPath()
  ctx.arc(x, y, gr, 0, Math.PI * 2)
  ctx.fill()

  // Saturn rings (behind planet — drawn before body)
  if (planet.hasRings) {
    const ringRx = r * 2.4
    const ringRy = r * 0.6
    ctx.save()
    ctx.globalAlpha = 0.55
    // Back half of ring
    ctx.strokeStyle = 'rgba(220, 200, 140, 0.6)'
    ctx.lineWidth = r * 0.55
    ctx.beginPath()
    ctx.ellipse(x, y, ringRx, ringRy, 0, Math.PI, Math.PI * 2)
    ctx.stroke()
    ctx.restore()
  }

  // Planet body
  const bodyGrad = ctx.createRadialGradient(x - r * 0.3, y - r * 0.35, 0, x, y, r)
  bodyGrad.addColorStop(0, lighten(color, 0.4))
  bodyGrad.addColorStop(0.5, color)
  bodyGrad.addColorStop(1, darken(color, 0.5))
  ctx.fillStyle = bodyGrad
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI * 2)
  ctx.fill()

  // Jupiter bands
  if (planet.name === 'Jupiter') {
    const bandColors = ['rgba(200,140,60,0.3)', 'rgba(240,180,100,0.2)', 'rgba(160,100,40,0.25)']
    bandColors.forEach((bc, bi) => {
      const by = y + (bi - 1) * (r * 0.55)
      ctx.save()
      ctx.globalAlpha = 1
      ctx.fillStyle = bc
      ctx.beginPath()
      ctx.ellipse(x, by, r, r * 0.22, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    })
  }

  // Saturn rings (front half — over planet)
  if (planet.hasRings) {
    const ringRx = r * 2.4
    const ringRy = r * 0.6
    ctx.save()
    ctx.globalAlpha = 0.55
    ctx.strokeStyle = 'rgba(220, 200, 140, 0.75)'
    ctx.lineWidth = r * 0.55
    ctx.beginPath()
    ctx.ellipse(x, y, ringRx, ringRy, 0, 0, Math.PI)
    ctx.stroke()
    ctx.restore()
  }

  // Shine highlight
  ctx.fillStyle = 'rgba(255,255,255,0.18)'
  ctx.beginPath()
  ctx.arc(x - r * 0.28, y - r * 0.3, r * 0.38, 0, Math.PI * 2)
  ctx.fill()

  // Moon (Earth only)
  if (planet.hasMoon) {
    const moonAngle = t * 2.4
    const moonDist = r * 2.5
    const mx = x + Math.cos(moonAngle) * moonDist
    const my = y + Math.sin(moonAngle) * moonDist * 0.5
    ctx.fillStyle = '#c8c8cc'
    ctx.beginPath()
    ctx.arc(mx, my, 2, 0, Math.PI * 2)
    ctx.fill()
  }
}

// Simple color helpers
function lighten(hex: string, amt: number): string {
  const n = parseInt(hex.slice(1), 16)
  const r = Math.min(255, (n >> 16) + Math.round(255 * amt))
  const g = Math.min(255, ((n >> 8) & 0xff) + Math.round(255 * amt))
  const b = Math.min(255, (n & 0xff) + Math.round(255 * amt))
  return `rgb(${r},${g},${b})`
}
function darken(hex: string, amt: number): string {
  const n = parseInt(hex.slice(1), 16)
  const r = Math.max(0, (n >> 16) - Math.round(255 * amt))
  const g = Math.max(0, ((n >> 8) & 0xff) - Math.round(255 * amt))
  const b = Math.max(0, (n & 0xff) - Math.round(255 * amt))
  return `rgb(${r},${g},${b})`
}

// ─────────────────────────────────────────────────────────────

export function SolarSystem({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setSize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    setSize()
    const ro = new ResizeObserver(setSize)
    ro.observe(canvas)

    const stars = buildStars(320)
    const asteroids = buildAsteroids(140)

    // Planets get individual angle refs so they start spread out
    const angles = PLANETS.map((p) => p.angle0)

    let t = 0
    const SUN_R = 28

    const tick = () => {
      const W = canvas.width
      const H = canvas.height
      if (!W || !H) return

      t += 0.016

      // Solar system center (slightly right & down for visual balance)
      const cx = W * 0.5
      const cy = H * 0.52

      ctx.clearRect(0, 0, W, H)

      // ── Stars ─────────────────────────────────────────────
      drawStarField(ctx, stars, W, H, t)

      // ── Orbit rings (all, drawn first) ────────────────────
      PLANETS.forEach((p) => drawOrbitRing(ctx, cx, cy, p.orbit))
      drawOrbitRing(ctx, cx, cy, 322, 0.04) // asteroid belt inner
      drawOrbitRing(ctx, cx, cy, 360, 0.04) // asteroid belt outer

      // ── Compute planet positions ──────────────────────────
      const planetData = PLANETS.map((p, i) => {
        angles[i] += p.speed * 0.016
        const angle = angles[i]
        return {
          p,
          angle,
          x: cx + Math.cos(angle) * p.orbit,
          y: cy + Math.sin(angle) * p.orbit * PERSPECTIVE,
        }
      })

      // ── Sort: back planets first (y < cy), then front ────
      const sorted = [...planetData].sort((a, b) => a.y - b.y)

      // ── Draw far-side (y < cy) items ─────────────────────
      for (const { p, x, y } of sorted) {
        if (y < cy) drawPlanet(ctx, x, y, p, t)
      }

      // ── Asteroids (back half) ─────────────────────────────
      ctx.fillStyle = 'rgba(200,190,180,0.65)'
      for (const a of asteroids) {
        a.angle += a.speed * 0.016
        const ax = cx + Math.cos(a.angle) * a.orbitR
        const ay = cy + Math.sin(a.angle) * a.orbitR * PERSPECTIVE
        if (ay < cy) {
          ctx.globalAlpha = 0.35
          ctx.beginPath()
          ctx.arc(ax, ay, a.r, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      ctx.globalAlpha = 1

      // ── Sun ───────────────────────────────────────────────
      drawSun(ctx, cx, cy, SUN_R, t)

      // ── Asteroids (front half) ────────────────────────────
      ctx.fillStyle = 'rgba(200,190,180,0.65)'
      for (const a of asteroids) {
        const ax = cx + Math.cos(a.angle) * a.orbitR
        const ay = cy + Math.sin(a.angle) * a.orbitR * PERSPECTIVE
        if (ay >= cy) {
          ctx.globalAlpha = 0.55
          ctx.beginPath()
          ctx.arc(ax, ay, a.r, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      ctx.globalAlpha = 1

      // ── Draw near-side (y >= cy) planets ─────────────────
      for (const { p, x, y } of sorted) {
        if (y >= cy) drawPlanet(ctx, x, y, p, t)
      }
    }

    gsap.ticker.add(tick)

    return () => {
      gsap.ticker.remove(tick)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      aria-hidden="true"
    />
  )
}
