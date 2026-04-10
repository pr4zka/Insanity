'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

// Each "comet lane" maintains its own recursive spawn loop
const COMET_LANES = 3
const COMET_COLORS = [
  'rgba(255,255,255,0.95)',
  'rgba(192,132,252,0.90)',  // purple
  'rgba(129,140,248,0.85)',  // indigo
  'rgba(103,232,249,0.85)',  // cyan
  'rgba(251,191,36,0.75)',   // amber
]

export function CosmicComets() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let active = true

    const spawnComet = (laneDelay = 0) => {
      const loop = () => {
        if (!active || !container) return

        const vw = window.innerWidth
        const vh = window.innerHeight

        // Random angle 20–55 degrees (diagonal down-right)
        const angle = gsap.utils.random(20, 55)
        const rad = (angle * Math.PI) / 180

        const length = gsap.utils.random(120, 320)
        const thickness = gsap.utils.random(1.2, 3)
        const duration = gsap.utils.random(0.7, 1.9)
        const color = COMET_COLORS[Math.floor(Math.random() * COMET_COLORS.length)]
        const glowOpacity = thickness > 2 ? 0.4 : 0.25

        // Start from top edge or left edge
        const fromTop = Math.random() > 0.35
        const startX = fromTop
          ? gsap.utils.random(-length, vw + length)
          : gsap.utils.random(-length, -10)
        const startY = fromTop
          ? gsap.utils.random(-length, -10)
          : gsap.utils.random(-20, vh * 0.45)

        const travelDist = Math.sqrt(vw * vw + vh * vh) * 1.3
        const endX = startX + Math.cos(rad) * travelDist
        const endY = startY + Math.sin(rad) * travelDist

        const comet = document.createElement('div')
        comet.setAttribute('aria-hidden', 'true')
        comet.style.cssText = `
          position: absolute;
          left: 0; top: 0;
          width: ${length}px;
          height: ${thickness}px;
          background: linear-gradient(90deg, transparent 0%, ${color} 85%, white 100%);
          border-radius: 100px;
          opacity: 0;
          will-change: transform, opacity;
          transform: translate(${startX}px, ${startY}px) rotate(${angle}deg);
          transform-origin: right center;
          box-shadow: 0 0 ${thickness * 3}px ${thickness}px ${color.replace(/[\d.]+\)$/, `${glowOpacity})`)};
          filter: blur(${thickness > 2.2 ? '0.4px' : '0px'});
        `
        container.appendChild(comet)

        const tl = gsap.timeline({
          onComplete: () => {
            try { container.removeChild(comet) } catch { /* already removed */ }
            if (active) gsap.delayedCall(gsap.utils.random(2, 6.5), loop)
          },
        })

        tl.to(comet, { opacity: 1, duration: 0.06, ease: 'none' })
        tl.to(
          comet,
          {
            x: endX - startX,
            y: endY - startY,
            duration,
            ease: 'power1.in',
          },
          0
        )
        // Fade tail out near end
        tl.to(comet, { opacity: 0, duration: duration * 0.3, ease: 'power2.in' }, `>-${duration * 0.32}`)
      }

      gsap.delayedCall(laneDelay, loop)
    }

    // Start each lane at staggered times so comets never bunch up
    for (let i = 0; i < COMET_LANES; i++) {
      spawnComet(i * 2.2)
    }

    return () => {
      active = false
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 9999 }}
      aria-hidden="true"
    />
  )
}
