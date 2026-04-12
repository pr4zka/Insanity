'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * CursorEffect — glowing aura + particle trail that follows the mouse.
 * Inspired by the fluid-light feel of astrodither.robertborghesi.is
 */

interface Particle {
  x: number; y: number
  vx: number; vy: number
  r: number; alpha: number
  decay: number; color: string
  trail: { x: number; y: number }[]
}

const COLORS = [
  '#c084fc', '#a78bfa', '#818cf8',
  '#7dd3fc', '#e0e7ff', '#f0abfc',
  '#ffffff',
]

export function CursorEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { desynchronized: true })
    if (!ctx) return

    const setSize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    setSize()
    window.addEventListener('resize', setSize)

    // Smoothed cursor (lags slightly behind for fluid feel)
    const raw    = { x: -999, y: -999 }
    const smooth = { x: -999, y: -999 }
    const prev   = { x: -999, y: -999 }
    const vel    = { x: 0, y: 0 }

    const particles: Particle[] = []

    const spawnParticles = (count: number, speed: number) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2
        const s = (Math.random() * 0.8 + 0.2) * speed * 0.4
        particles.push({
          x: raw.x + (Math.random() - 0.5) * 8,
          y: raw.y + (Math.random() - 0.5) * 8,
          vx: Math.cos(angle) * s + vel.x * 0.12,
          vy: Math.sin(angle) * s + vel.y * 0.12 - 0.4,
          r: Math.random() * 2.5 + 0.5,
          alpha: Math.random() * 0.7 + 0.3,
          decay: Math.random() * 0.018 + 0.008,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          trail: [],
        })
      }
    }

    const onMove = (e: MouseEvent) => {
      prev.x = raw.x; prev.y = raw.y
      raw.x  = e.clientX; raw.y  = e.clientY
      vel.x  = raw.x - prev.x; vel.y = raw.y - prev.y
      const speed = Math.sqrt(vel.x ** 2 + vel.y ** 2)
      // Spawn more particles the faster you move
      const count = Math.min(Math.floor(speed * 0.7) + 1, 12)
      spawnParticles(count, speed)
    }
    window.addEventListener('mousemove', onMove)

    const tick = () => {
      const W = canvas.width
      const H = canvas.height
      ctx.clearRect(0, 0, W, H)

      // Lerp smooth cursor toward raw
      smooth.x += (raw.x - smooth.x) * 0.12
      smooth.y += (raw.y - smooth.y) * 0.12

      // ── Cursor glow aura ─────────────────────────────────────
      if (raw.x > -900) {
        const speed  = Math.sqrt(vel.x ** 2 + vel.y ** 2)
        const glowR  = 55 + speed * 2.5
        const alpha  = 0.18 + Math.min(speed * 0.005, 0.15)

        // Outer diffuse glow (follows smooth)
        const g1 = ctx.createRadialGradient(smooth.x, smooth.y, 0, smooth.x, smooth.y, glowR)
        g1.addColorStop(0,   `rgba(192, 132, 252, ${alpha})`)
        g1.addColorStop(0.4, `rgba(129, 140, 248, ${alpha * 0.5})`)
        g1.addColorStop(1,   'transparent')
        ctx.fillStyle = g1
        ctx.beginPath()
        ctx.arc(smooth.x, smooth.y, glowR, 0, Math.PI * 2)
        ctx.fill()

        // Inner tight glow (follows raw — snappy)
        const g2 = ctx.createRadialGradient(raw.x, raw.y, 0, raw.x, raw.y, 18)
        g2.addColorStop(0,   `rgba(255, 255, 255, 0.55)`)
        g2.addColorStop(0.4, `rgba(216, 180, 254, 0.25)`)
        g2.addColorStop(1,   'transparent')
        ctx.fillStyle = g2
        ctx.beginPath()
        ctx.arc(raw.x, raw.y, 18, 0, Math.PI * 2)
        ctx.fill()

        // Tiny bright core dot
        ctx.globalAlpha = 0.9
        ctx.fillStyle   = '#ffffff'
        ctx.beginPath()
        ctx.arc(raw.x, raw.y, 2, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1
      }

      // ── Particles ────────────────────────────────────────────
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.trail.push({ x: p.x, y: p.y })
        if (p.trail.length > 8) p.trail.shift()

        p.x  += p.vx
        p.y  += p.vy
        p.vx *= 0.96
        p.vy *= 0.96
        p.vy -= 0.04          // gentle upward drift
        p.alpha -= p.decay
        p.r   *= 0.98

        if (p.alpha <= 0.01 || p.r < 0.1) {
          particles.splice(i, 1)
          continue
        }

        // Trail lines
        for (let j = 1; j < p.trail.length; j++) {
          const frac = j / p.trail.length
          ctx.globalAlpha = frac * p.alpha * 0.5
          ctx.strokeStyle = p.color
          ctx.lineWidth   = p.r * frac * 1.2
          ctx.beginPath()
          ctx.moveTo(p.trail[j - 1].x, p.trail[j - 1].y)
          ctx.lineTo(p.trail[j].x,     p.trail[j].y)
          ctx.stroke()
        }

        // Glow halo
        ctx.globalAlpha = p.alpha * 0.2
        ctx.fillStyle   = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2)
        ctx.fill()

        // Core dot
        ctx.globalAlpha = p.alpha
        ctx.fillStyle   = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, Math.max(0.1, p.r), 0, Math.PI * 2)
        ctx.fill()

        ctx.globalAlpha = 1
      }
    }

    gsap.ticker.add(tick)

    return () => {
      gsap.ticker.remove(tick)
      window.removeEventListener('resize', setSize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9998, willChange: 'transform' }}
      aria-hidden="true"
    />
  )
}
