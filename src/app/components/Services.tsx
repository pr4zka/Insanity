'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { MessageSquare, Users, Globe, Wrench, TrendingUp } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { useSectionContext } from './SectionContext'

gsap.registerPlugin(useGSAP)

const SECTION_INDEX = 2

const services = [
  {
    icon: MessageSquare,
    title: 'Chatbots Inteligentes',
    description: 'Automatiza la atención al cliente con chatbots impulsados por IA que aprenden y se adaptan a tus necesidades.',
    image: 'https://images.unsplash.com/photo-1762328862557-e0a36587cd3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGF0Ym90JTIwdGVjaG5vbG9neSUyMGludGVyZmFjZXxlbnwxfHx8fDE3NzU1Njg1NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    gradient: 'from-gray-700 to-gray-900',
    accent: 'from-purple-500 to-indigo-600',
  },
  {
    icon: Users,
    title: 'CRM Personalizado',
    description: 'Gestiona tus relaciones con clientes de forma eficiente con nuestras soluciones CRM adaptadas a tu empresa.',
    image: 'https://images.unsplash.com/photo-1763718528755-4bca23f82ac3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDUk0lMjBidXNpbmVzcyUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NzU1Njg1NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    gradient: 'from-gray-600 to-gray-800',
    accent: 'from-blue-500 to-cyan-600',
  },
  {
    icon: Globe,
    title: 'Páginas Web',
    description: 'Diseñamos y desarrollamos sitios web modernos, rápidos y optimizados para convertir visitantes en clientes.',
    image: 'https://images.unsplash.com/photo-1637937459053-c788742455be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGluZyUyMHNjcmVlbnxlbnwxfHx8fDE3NzU1MDM2MzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    gradient: 'from-purple-900 to-gray-900',
    accent: 'from-violet-500 to-purple-600',
  },
  {
    icon: Wrench,
    title: 'Soluciones a Medida',
    description: 'Desarrollamos software personalizado que se ajusta perfectamente a los procesos únicos de tu negocio.',
    image: 'https://images.unsplash.com/photo-1669023414162-8b0573b9c6b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b20lMjBzb2Z0d2FyZSUyMHNvbHV0aW9uc3xlbnwxfHx8fDE3NzU1Njg1NzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    gradient: 'from-gray-800 to-black',
    accent: 'from-gray-400 to-gray-600',
  },
  {
    icon: TrendingUp,
    title: 'Marketing Digital',
    description: 'Próximamente: Estrategias de marketing digital para aumentar tu presencia online y hacer crecer tu negocio.',
    image: 'https://images.unsplash.com/photo-1576180525792-82cdc0e2b29e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYWxheHklMjBzcGFjZSUyMHB1cnBsZSUyMG5lYnVsYXxlbnwxfHx8fDE3NzU1Njg1NzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    gradient: 'from-gray-700 to-purple-900',
    accent: 'from-pink-500 to-rose-600',
    comingSoon: true,
  },
]

export function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const tlRef      = useRef<gsap.core.Timeline | null>(null)
  const hasPlayed  = useRef(false)
  const { activeIndex } = useSectionContext()

  useGSAP(() => {
    // Initial state
    gsap.set('.service-card', { opacity: 0, y: 50, clipPath: 'inset(0 0 100% 0 round 12px)' })

    const tl = gsap.timeline({ paused: true })

    tl.from('.services-tag',   { opacity: 0, y: -20, scale: 0.8, duration: 0.5, ease: 'back.out(2)' })
      .from('.services-title', { opacity: 0, y: 50, duration: 0.75, ease: 'power3.out' }, '-=0.2')
      .from('.services-desc',  { opacity: 0, y: 25, duration: 0.6, ease: 'power2.out' }, '-=0.4')

    tl.to('.service-card', {
      opacity: 1, y: 0,
      clipPath: 'inset(0 0 0% 0 round 12px)',
      duration: 0.85, stagger: 0.13, ease: 'power3.out',
    }, '-=0.2')

    tl.from('.service-icon', {
      scale: 0, rotation: -180,
      duration: 0.65, stagger: 0.13,
      ease: 'back.out(2)',
    }, '-=0.8')

    tl.to('.service-accent-line', {
      scaleX: 1, duration: 0.8, stagger: 0.13, ease: 'power3.out',
    }, '-=0.6')

    tlRef.current = tl
  }, { scope: sectionRef })

  useEffect(() => {
    if (activeIndex === SECTION_INDEX && !hasPlayed.current) {
      hasPlayed.current = true
      setTimeout(() => tlRef.current?.play(), 400)
    }
  }, [activeIndex])

  // 3D tilt on hover
  useEffect(() => {
    if (typeof window === 'undefined') return
    const cards = document.querySelectorAll<HTMLElement>('.service-card-inner')
    const cleanup: (() => void)[] = []

    cards.forEach((card) => {
      const onMove = (e: MouseEvent) => {
        const r  = card.getBoundingClientRect()
        const rx = ((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * -10
        const ry = ((e.clientX - (r.left + r.width  / 2)) / (r.width  / 2)) * 10
        gsap.to(card, { rotationX: rx, rotationY: ry, transformPerspective: 1200, duration: 0.35, ease: 'power2.out' })
      }
      const onLeave = () => gsap.to(card, { rotationX: 0, rotationY: 0, duration: 0.7, ease: 'elastic.out(1, 0.5)' })
      card.addEventListener('mousemove', onMove)
      card.addEventListener('mouseleave', onLeave)
      cleanup.push(() => { card.removeEventListener('mousemove', onMove); card.removeEventListener('mouseleave', onLeave) })
    })
    return () => cleanup.forEach((fn) => fn())
  }, [])

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className="h-screen flex flex-col justify-center pt-20 pb-4 lg:pt-24 lg:pb-8 px-4 bg-black relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/12 via-black to-black" />
      <div className="sv-orb-left absolute top-0 left-1/4 w-[28rem] h-[28rem] bg-purple-600/12 rounded-full blur-[100px] pointer-events-none" />
      <div className="sv-orb-right absolute bottom-0 right-1/4 w-[28rem] h-[28rem] bg-pink-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="services-header text-center mb-3 lg:mb-6">
          <div className="services-tag inline-flex items-center gap-2 mb-2 px-4 py-1 rounded-full border border-purple-500/30 bg-purple-950/25 text-purple-400 text-xs uppercase tracking-[0.25em]">
            Lo que ofrecemos
          </div>
          <h2 className="services-title text-2xl md:text-3xl lg:text-4xl font-black mb-1 bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent leading-tight">
            Nuestros Servicios
          </h2>
          <p className="services-desc text-xs lg:text-sm text-gray-400 max-w-xl mx-auto">
            Soluciones tecnológicas completas para llevar tu negocio al siguiente nivel
          </p>
        </div>

        {/*
          Grid responsive:
          Mobile  (grid-cols-6): col-span-3 → 2 por fila  → filas: [0,1] [2,3] [4 full-width]
          Desktop (lg):          col-span-2 → 3 por fila  → fila 1: [0,1,2]  fila 2: centrados [3,4]
          La 5ª card usa col-span-6 en mobile (ancho completo) y col-start-4 en lg (centrada).
        */}
        <div className="grid grid-cols-6 gap-3 lg:gap-4">
          {services.map((service, idx) => (
            <div
              key={service.title}
              className={[
                'service-card',
                // Mobile: 2 per row (col-span-3). Last card: full-width (col-span-6).
                // Desktop: 3 per row (col-span-2), last two centered.
                idx === 4
                  ? 'col-span-6 lg:col-span-2 lg:col-start-4'
                  : 'col-span-3 lg:col-span-2',
                idx === 3 ? 'lg:col-start-2' : '',
              ].join(' ')}
            >
              <div
                className="service-card-inner relative bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800/50 rounded-xl overflow-hidden hover:border-gray-700/70 transition-colors duration-300 group h-full"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Image — smaller on mobile to save vertical space */}
                <div className="relative h-20 lg:h-28 overflow-hidden">
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${service.gradient} opacity-55`} />
                  {service.comingSoon && (
                    <div className="absolute top-2 right-2 bg-gray-900/85 backdrop-blur-sm text-gray-300 text-[10px] font-medium px-2 py-0.5 rounded-full border border-gray-700/70">
                      Próximamente
                    </div>
                  )}
                </div>

                <div className="p-3 lg:p-4">
                  <div className={`service-icon inline-flex p-2 lg:p-2.5 rounded-lg bg-gradient-to-br ${service.accent} mb-2 lg:mb-3 shadow-lg`}>
                    <service.icon className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                  </div>
                  <h3 className="text-xs lg:text-base font-bold text-white mb-1">{service.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-[10px] lg:text-xs line-clamp-2 lg:line-clamp-none">{service.description}</p>
                </div>

                <div
                  className={`service-accent-line absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${service.accent} origin-left`}
                  style={{ transform: 'scaleX(0)' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
