'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useSectionContext } from './SectionContext'

gsap.registerPlugin(useGSAP)

const SECTION_INDEX = 1

const STATS = [
  { value: 50, suffix: '+', label: 'Proyectos completados', prefix: '' },
  { value: 30, suffix: '+', label: 'Clientes satisfechos', prefix: '' },
  { value: 3,  suffix: '+', label: 'Años de experiencia', prefix: '' },
  { value: 100, suffix: '%', label: 'Tasa de satisfacción', prefix: '' },
]

export function Stats() {
  const sectionRef = useRef<HTMLElement>(null)
  const tlRef      = useRef<gsap.core.Timeline | null>(null)
  const hasPlayed  = useRef(false)
  const { activeIndex } = useSectionContext()

  const ambientStarted = useRef(false)

  useGSAP(() => {
    const tl = gsap.timeline({ paused: true })

    tl.from('.stats-label-text', { opacity: 0, y: 30, duration: 0.7, ease: 'power3.out' })
      .from('.stats-line', { scaleX: 0, transformOrigin: 'left center', duration: 1.2, ease: 'power3.out' }, '-=0.5')

    tl.addLabel('cards')

    STATS.forEach((stat, i) => {
      const el  = sectionRef.current?.querySelector<HTMLElement>(`.stat-number-${i}`)
      const obj = { val: 0 }

      tl.from(`.stat-card-${i}`, {
        opacity: 0, y: 50, scale: 0.9, duration: 0.65, ease: 'back.out(1.5)',
      }, `cards+=${i * 0.12}`)

      if (el) {
        tl.to(obj, {
          val: stat.value, duration: 2, ease: 'power2.out',
          onUpdate() { el.textContent = `${stat.prefix}${Math.round(obj.val)}${stat.suffix}` },
        }, `cards+=${i * 0.15}`)
      }
    })

    tlRef.current = tl
  }, { scope: sectionRef })

  useEffect(() => {
    if (activeIndex === SECTION_INDEX) {
      if (!hasPlayed.current) {
        hasPlayed.current = true
        setTimeout(() => tlRef.current?.play(), 400)
      }
      // Start ambient nebula breathe only once, when section first becomes visible
      if (!ambientStarted.current) {
        ambientStarted.current = true
        gsap.to('.stats-orb',      { scale: 1.3,  duration: 6,  repeat: -1, yoyo: true, ease: 'sine.inOut' })
        gsap.to('.stats-nebula-l', { scale: 1.15, duration: 9,  repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2 })
        gsap.to('.stats-nebula-r', { scale: 1.2,  duration: 11, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 4 })
      }
    }
  }, [activeIndex])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col justify-center py-24 px-4 bg-black overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950/60 to-black" />

      {/* Nebula orbs */}
      <div className="stats-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[220px] bg-purple-800/12 rounded-full blur-[90px] pointer-events-none" />
      <div className="stats-nebula-l absolute top-0 left-[-10%] w-[40rem] h-[40rem] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="stats-nebula-r absolute bottom-0 right-[-10%] w-[35rem] h-[35rem] bg-violet-900/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="container mx-auto relative z-10">
        <p className="stats-label-text text-center text-gray-500 text-sm uppercase tracking-[0.3em] mb-14">
          Números que hablan por sí solos
        </p>

        <div className="stats-line w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-14" />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className={`stat-card-${i} group text-center px-4 py-6 rounded-2xl border border-gray-800/50 hover:border-gray-700 bg-gray-900/20 hover:bg-gray-900/40 transition-colors duration-300`}
            >
              <div
                className={`stat-number-${i} text-5xl md:text-6xl font-black bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent mb-3 tabular-nums`}
              >
                {stat.prefix}0{stat.suffix}
              </div>
              <p className="text-gray-400 text-sm font-medium leading-snug">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="stats-line w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mt-14" />
      </div>
    </section>
  )
}
