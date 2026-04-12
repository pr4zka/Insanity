'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

/**
 * BigBang — full-screen cinematic opening sequence.
 * Singularity → tension → blinding flash → explosion → universe forms → site revealed.
 */

interface BBParticle {
  x: number; y: number
  vx: number; vy: number
  r: number; baseR: number
  alpha: number; decay: number
  color: string
  trail: { x: number; y: number }[]
  isStar: boolean
}

interface Shockwave {
  r: number; alpha: number; maxR: number; width: number; color: string
}

const EXPLOSION_COLORS = [
  '#ffffff', '#fffde7', '#ffd54f', '#ffab40', '#ff7043',
  '#f06292', '#ce93d8', '#b39ddb', '#90caf9', '#80cbc4',
  '#a5d6a7', '#c084fc', '#818cf8', '#7dd3fc',
]

export function BigBang() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { desynchronized: true })
    if (!ctx) return

    // Disable lag smoothing so 120Hz monitors get accurate delta times
    gsap.ticker.lagSmoothing(0)

    const W = (canvas.width  = window.innerWidth)
    const H = (canvas.height = window.innerHeight)
    const cx = W / 2
    const cy = H / 2
    const maxDist = Math.sqrt(cx * cx + cy * cy) * 1.1

    const particles: BBParticle[] = []
    const shockwaves: Shockwave[] = []
    const bgStars: { x: number; y: number; r: number; alpha: number; phase: number }[] = []

    // Pre-build background stars (they appear as universe "cools")
    for (let i = 0; i < 300; i++) {
      bgStars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.5 + 0.2,
        alpha: 0,
        phase: Math.random() * Math.PI * 2,
      })
    }

    const state = {
      // Singularity
      singAlpha: 0,
      singScale: 0,
      singPulse: 0,   // extra scale vibration before explosion
      flashAlpha: 0,  // white flash
      // Universe
      overlayAlpha: 1,
      starsAlpha: 0,
      done: false,
      t: 0,
    }

    // ── Spawn explosion ──────────────────────────────────────
    const explode = () => {
      const count = 900
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = Math.pow(Math.random(), 0.4) * 22 + 1.5
        const r     = Math.random() * 2.8 + 0.3
        particles.push({
          x: cx, y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          r, baseR: r,
          alpha: Math.random() * 0.85 + 0.15,
          decay: Math.random() * 0.004 + 0.001,
          color: EXPLOSION_COLORS[Math.floor(Math.random() * EXPLOSION_COLORS.length)],
          trail: [],
          isStar: Math.random() > 0.6,
        })
      }

      // Shockwave rings
      const swColors = ['rgba(255,255,255,0.9)', 'rgba(200,150,255,0.7)', 'rgba(100,150,255,0.5)', 'rgba(255,150,100,0.4)', 'rgba(150,255,200,0.3)']
      for (let i = 0; i < 5; i++) {
        shockwaves.push({
          r: 5 + i * 15,
          alpha: 0.9 - i * 0.15,
          maxR: maxDist,
          width: 3 - i * 0.4,
          color: swColors[i],
        })
      }
    }

    // ── Render loop ──────────────────────────────────────────
    const tick = (_time: number, deltaTime: number) => {
      if (state.done) return
      state.t += deltaTime * 0.001   // accurate delta — works at any fps
      const t = state.t
      ctx.clearRect(0, 0, W, H)

      // Black overlay
      if (state.overlayAlpha > 0) {
        ctx.fillStyle = `rgba(0,0,0,${state.overlayAlpha})`
        ctx.fillRect(0, 0, W, H)
      }

      // Background stars (fade in as universe forms)
      if (state.starsAlpha > 0) {
        for (const s of bgStars) {
          const twinkle = 0.3 + 0.7 * Math.abs(Math.sin(t * 1.5 + s.phase))
          ctx.globalAlpha = s.alpha * state.starsAlpha * twinkle
          ctx.fillStyle = '#e2e8f0'
          ctx.beginPath()
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
          ctx.fill()
        }
        // Slowly reveal stars
        bgStars.forEach((s) => { s.alpha = Math.min(1, s.alpha + 0.005) })
        ctx.globalAlpha = 1
      }

      // ── Singularity ─────────────────────────────────────────
      if (state.singAlpha > 0 && state.flashAlpha < 0.99) {
        const scale = state.singScale + Math.sin(t * 18) * state.singPulse
        const r = scale * 35

        // Deep space nebula aura
        const neb = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 12)
        neb.addColorStop(0,   `rgba(120, 60, 200, ${state.singAlpha * 0.22})`)
        neb.addColorStop(0.4, `rgba(60, 30, 150, ${state.singAlpha * 0.08})`)
        neb.addColorStop(1,   'transparent')
        ctx.fillStyle = neb
        ctx.beginPath()
        ctx.arc(cx, cy, r * 12, 0, Math.PI * 2)
        ctx.fill()

        // Heat corona
        const heat = ctx.createRadialGradient(cx, cy, r * 0.3, cx, cy, r * 4)
        heat.addColorStop(0,   `rgba(255, 200, 80,  ${state.singAlpha * 0.9})`)
        heat.addColorStop(0.3, `rgba(255, 100, 30,  ${state.singAlpha * 0.5})`)
        heat.addColorStop(0.7, `rgba(180, 60, 200,  ${state.singAlpha * 0.2})`)
        heat.addColorStop(1,   'transparent')
        ctx.fillStyle = heat
        ctx.beginPath()
        ctx.arc(cx, cy, r * 4, 0, Math.PI * 2)
        ctx.fill()

        // Rotating spikes
        const spikeAngles = 12
        for (let i = 0; i < spikeAngles; i++) {
          const angle    = (i / spikeAngles) * Math.PI * 2 + t * 0.8
          const spikeLen = r * (i % 3 === 0 ? 7 : i % 3 === 1 ? 4.5 : 2.5) * state.singAlpha
          const spikeW   = r * 0.12

          ctx.save()
          ctx.translate(cx, cy)
          ctx.rotate(angle)
          const sg = ctx.createLinearGradient(0, 0, spikeLen, 0)
          sg.addColorStop(0,   `rgba(255, 240, 180, ${state.singAlpha * 0.85})`)
          sg.addColorStop(0.4, `rgba(255, 150, 50,  ${state.singAlpha * 0.4})`)
          sg.addColorStop(1,   'transparent')
          ctx.fillStyle = sg
          ctx.beginPath()
          ctx.moveTo(0, -spikeW)
          ctx.lineTo(spikeLen, 0)
          ctx.lineTo(0,  spikeW)
          ctx.closePath()
          ctx.fill()
          ctx.restore()
        }

        // Bright core
        const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(0.5, r))
        core.addColorStop(0,   `rgba(255,255,255,${state.singAlpha})`)
        core.addColorStop(0.5, `rgba(255,240,180,${state.singAlpha * 0.8})`)
        core.addColorStop(1,   `rgba(255,150,30, ${state.singAlpha * 0.3})`)
        ctx.fillStyle = core
        ctx.beginPath()
        ctx.arc(cx, cy, Math.max(0.5, r), 0, Math.PI * 2)
        ctx.fill()
      }

      // ── White flash ─────────────────────────────────────────
      if (state.flashAlpha > 0) {
        ctx.fillStyle = `rgba(255,255,255,${state.flashAlpha})`
        ctx.fillRect(0, 0, W, H)
      }

      // ── Shockwaves ───────────────────────────────────────────
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i]
        sw.r     += 16
        sw.alpha *= 0.975

        if (sw.r > sw.maxR || sw.alpha < 0.008) { shockwaves.splice(i, 1); continue }

        ctx.save()
        ctx.globalAlpha  = sw.alpha
        ctx.strokeStyle  = sw.color
        ctx.lineWidth    = Math.max(0.5, sw.width)
        ctx.shadowColor  = '#a78bfa'
        ctx.shadowBlur   = 18
        ctx.beginPath()
        ctx.arc(cx, cy, sw.r, 0, Math.PI * 2)
        ctx.stroke()
        ctx.restore()
      }

      // ── Explosion particles ───────────────────────────────────
      ctx.lineCap = 'round'   // set once per frame, not per trail segment
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.trail.push({ x: p.x, y: p.y })
        if (p.trail.length > 10) p.trail.shift()

        p.x   += p.vx
        p.y   += p.vy
        p.vx  *= 0.982
        p.vy  *= 0.982
        p.alpha -= p.decay
        p.r     *= 0.997

        if (p.alpha <= 0.01 || p.r < 0.05) { particles.splice(i, 1); continue }

        // Trail
        for (let j = 1; j < p.trail.length; j++) {
          const frac = j / p.trail.length
          ctx.globalAlpha = frac * p.alpha * 0.45
          ctx.strokeStyle = p.color
          ctx.lineWidth   = p.r * frac
          ctx.beginPath()
          ctx.moveTo(p.trail[j - 1].x, p.trail[j - 1].y)
          ctx.lineTo(p.trail[j].x,     p.trail[j].y)
          ctx.stroke()
        }

        // Glow
        ctx.globalAlpha = p.alpha * 0.18
        ctx.fillStyle   = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2)
        ctx.fill()

        // Body
        ctx.globalAlpha = p.alpha
        ctx.fillStyle   = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, Math.max(0.1, p.r), 0, Math.PI * 2)
        ctx.fill()

        ctx.globalAlpha = 1
      }
    }

    gsap.ticker.add(tick)

    // ── Master timeline ──────────────────────────────────────
    const tl = gsap.timeline({
      onComplete: () => {
        state.done = true
        gsap.ticker.remove(tick)
        canvas.style.display = 'none'
      },
    })

    // 0.0 – 0.4s : hold dark
    tl.to(state, { duration: 0.4 })

    // 0.4 – 1.0s : singularity forms
    tl.to(state, { singAlpha: 1, duration: 0.35, ease: 'power2.out' }, 0.4)
    tl.to(state, { singScale: 1, duration: 0.65, ease: 'back.out(2)' }, 0.5)

    // 1.0 – 1.35s : pre-explosion tension — vibrate
    tl.to(state, { singPulse: 0.35, singScale: 1.15, duration: 0.35, ease: 'power2.inOut' }, 1.0)

    // 1.35s : FLASH
    tl.to(state, { flashAlpha: 1, singAlpha: 0, duration: 0.08, ease: 'none', onStart: explode }, 1.35)

    // 1.43 – 1.75s : flash fades
    tl.to(state, { flashAlpha: 0, duration: 0.32, ease: 'power2.out' }, 1.43)

    // 1.5 – 3.4s : overlay dissolves revealing site + stars form
    tl.to(state, { overlayAlpha: 0, duration: 1.9, ease: 'power2.inOut' }, 1.5)
    tl.to(state, { starsAlpha: 1, duration: 1.6, ease: 'power2.out' }, 1.7)

    // 3.8 – 4.4s : canvas fades entirely
    tl.to(canvas, { opacity: 0, duration: 0.6, ease: 'power2.out' }, 3.8)

    return () => {
      gsap.ticker.remove(tick)
      tl.kill()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 99999, willChange: 'transform' }}
      aria-hidden="true"
    />
  )
}
