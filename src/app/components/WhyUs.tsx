'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { Shield, Headphones, Target, Zap } from 'lucide-react'
import { useSectionContext } from './SectionContext'

gsap.registerPlugin(useGSAP)

const SECTION_INDEX = 3

const features = [
  {
    icon: Target,
    title: 'Proceso Claro y Transparente',
    description: 'Seguimos una metodología probada: análisis, diseño, desarrollo, pruebas y entrega. Siempre sabrás en qué etapa está tu proyecto.',
    accent: 'from-purple-500 to-indigo-500',
  },
  {
    icon: Headphones,
    title: 'Soporte Continuo 24/7',
    description: 'Asistencia técnica 24/7 después del lanzamiento. No te dejamos solo, estamos contigo en cada paso del camino.',
    accent: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Zap,
    title: 'Entregas Rápidas',
    description: 'Metodología ágil que permite entregas incrementales. Verás resultados tangibles desde las primeras semanas.',
    accent: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Shield,
    title: 'Garantía de Calidad',
    description: 'Código limpio, escalable y bien documentado. Garantizamos 3 meses de correcciones sin costo adicional.',
    accent: 'from-green-500 to-emerald-500',
  },
]

export function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgTextRef  = useRef<HTMLDivElement>(null)
  const tlRef      = useRef<gsap.core.Timeline | null>(null)
  const hasPlayed  = useRef(false)
  const { activeIndex } = useSectionContext()

  useGSAP(() => {
    const tl = gsap.timeline({ paused: true })

    tl.from('.whyus-tag',   { opacity: 0, y: -20, scale: 0.75, duration: 0.5, ease: 'back.out(2)' })
      .from('.whyus-title', { opacity: 0, y: 50, duration: 0.75, ease: 'power3.out' }, '-=0.2')
      .from('.whyus-desc',  { opacity: 0, y: 25, duration: 0.6, ease: 'power2.out' }, '-=0.4')
      .from('.whyus-divider', { scaleX: 0, transformOrigin: 'left center', duration: 1.5, ease: 'power3.out' }, '-=0.3')

    features.forEach((_, i) => {
      const xFrom = i % 2 === 0 ? -50 : 50
      tl.from(`.whyus-card-${i}`, {
        opacity: 0, x: xFrom, y: 40, scale: 0.92,
        rotationY: i % 2 === 0 ? -8 : 8,
        transformPerspective: 1000,
        duration: 0.8, ease: 'power3.out',
      }, `-=0.${i === 0 ? 5 : 6}`)

      tl.from(`.whyus-icon-${i}`, {
        scale: 0, rotation: 360, duration: 0.7, ease: 'back.out(2)',
      }, '<0.3')
    })

    tlRef.current = tl

    // Ambient orb float
    gsap.to('.whyus-orb-l', { y: -30, duration: 8,  repeat: -1, yoyo: true, ease: 'sine.inOut' })
    gsap.to('.whyus-orb-r', { y:  30, duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2 })
  }, { scope: sectionRef })

  useEffect(() => {
    if (activeIndex === SECTION_INDEX && !hasPlayed.current) {
      hasPlayed.current = true
      setTimeout(() => tlRef.current?.play(), 400)
    }
  }, [activeIndex])

  // 3D hover
  useEffect(() => {
    if (typeof window === 'undefined') return
    const cards = document.querySelectorAll<HTMLElement>('.whyus-card-inner')
    const cleanup: (() => void)[] = []

    cards.forEach((card) => {
      const onMove = (e: MouseEvent) => {
        const r  = card.getBoundingClientRect()
        const rx = ((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * -8
        const ry = ((e.clientX - (r.left + r.width  / 2)) / (r.width  / 2)) * 8
        gsap.to(card, { rotationX: rx, rotationY: ry, transformPerspective: 1000, scale: 1.02, duration: 0.3, ease: 'power2.out' })
      }
      const onLeave = () => gsap.to(card, { rotationX: 0, rotationY: 0, scale: 1, duration: 0.65, ease: 'elastic.out(1, 0.5)' })
      card.addEventListener('mousemove', onMove)
      card.addEventListener('mouseleave', onLeave)
      cleanup.push(() => { card.removeEventListener('mousemove', onMove); card.removeEventListener('mouseleave', onLeave) })
    })
    return () => cleanup.forEach((fn) => fn())
  }, [])

  return (
    <section
      ref={sectionRef}
      id="nosotros"
      className="min-h-screen flex flex-col justify-center py-28 px-4 bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden"
    >
      <div ref={bgTextRef} className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0" aria-hidden="true">
        <span className="text-[22vw] font-black text-white/[0.025] leading-none tracking-tighter whitespace-nowrap">
          WHY US
        </span>
      </div>

      <div className="whyus-orb-l absolute top-1/4 left-0 w-96 h-96 bg-purple-900/12 rounded-full blur-[100px] pointer-events-none" />
      <div className="whyus-orb-r absolute bottom-1/4 right-0 w-96 h-96 bg-gray-800/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <div className="whyus-header text-center mb-20">
          <div className="whyus-tag inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border border-gray-700/50 bg-gray-900/40 text-gray-400 text-xs uppercase tracking-[0.25em]">
            Nuestra diferencia
          </div>
          <h2 className="whyus-title text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent leading-tight">
            ¿Por qué elegir INSANITY?
          </h2>
          <p className="whyus-desc text-xl text-gray-400 max-w-3xl mx-auto">
            Combinamos experiencia, tecnología de punta y un compromiso inquebrantable con la excelencia.
          </p>
        </div>

        <div className="whyus-divider w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-16" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <div key={feature.title} className={`whyus-card-${i}`}>
              <div
                className="whyus-card-inner h-full bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800/50 rounded-2xl p-7 hover:border-gray-700/70 transition-colors duration-300 group"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className={`whyus-icon-${i} inline-flex p-3.5 rounded-xl bg-gradient-to-br ${feature.accent} mb-5 shadow-lg`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 leading-snug">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{feature.description}</p>
                <div className={`mt-6 h-0.5 w-12 bg-gradient-to-r ${feature.accent} rounded-full transition-all duration-500 group-hover:w-full`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
