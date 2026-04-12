'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ExternalLink, Calendar, Tag } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { useSectionContext } from './SectionContext'

gsap.registerPlugin(useGSAP)

const SECTION_INDEX = 4

const projects = [
  {
    title: 'TechVision Store',
    category: 'E-commerce',
    description: 'Tienda online moderna con carrito de compras, pasarela de pagos y panel de administración completo.',
    image: 'https://images.unsplash.com/photo-1634084462412-b54873c0a56d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBlY29tbWVyY2UlMjB3ZWJzaXRlfGVufDF8fHx8MTc3NTcxMTAwNXww&ixlib=rb-4.1.0&q=80&w=1080',
    url: 'https://example.com/techvision',
    date: 'Marzo 2026',
    tags: ['React', 'Node.js', 'Stripe'],
    accent: 'from-blue-500 to-purple-600',
  },
  {
    title: 'Sabor Gourmet',
    category: 'Restaurante',
    description: 'Sitio web elegante con menú digital, reservas online y sistema de pedidos para delivery.',
    image: 'https://images.unsplash.com/photo-1682778418768-16081e4470a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwd2Vic2l0ZSUyMGRlc2lnbnxlbnwxfHx8fDE3NzU2NzMzMjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    url: 'https://example.com/saborgourmet',
    date: 'Febrero 2026',
    tags: ['Next.js', 'CMS', 'API'],
    accent: 'from-orange-500 to-red-500',
  },
  {
    title: 'GlobalTech Solutions',
    category: 'Corporativo',
    description: 'Portal corporativo con blog, área de clientes y sistema de cotizaciones automatizado.',
    image: 'https://images.unsplash.com/photo-1603201667493-4c2696de0b1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBidXNpbmVzcyUyMHdlYnNpdGV8ZW58MXx8fHwxNzc1NzMzNjc2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    url: 'https://example.com/globaltech',
    date: 'Enero 2026',
    tags: ['WordPress', 'PHP', 'MySQL'],
    accent: 'from-gray-400 to-gray-600',
  },
  {
    title: 'FitPower Gym',
    category: 'Fitness',
    description: 'Plataforma fitness con reserva de clases, planes de entrenamiento y seguimiento de progreso.',
    image: 'https://images.unsplash.com/photo-1591227174835-d3705c881c90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwZ3ltJTIwd2Vic2l0ZXxlbnwxfHx8fDE3NzU3MzM2NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    url: 'https://example.com/fitpower',
    date: 'Diciembre 2025',
    tags: ['Vue.js', 'Firebase', 'PWA'],
    accent: 'from-green-500 to-emerald-600',
  },
  {
    title: 'InnovateLab',
    category: 'Startup',
    description: 'Landing page interactiva con animaciones 3D, formularios de contacto y métricas en tiempo real.',
    image: 'https://images.unsplash.com/photo-1648134859175-78b41b4db186?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwc3RhcnR1cCUyMGxhbmRpbmclMjBwYWdlfGVufDF8fHx8MTc3NTczMzY3N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    url: 'https://example.com/innovatelab',
    date: 'Noviembre 2025',
    tags: ['React', 'Three.js', 'Tailwind'],
    accent: 'from-violet-500 to-purple-600',
  },
  {
    title: 'Urban Realty',
    category: 'Inmobiliaria',
    description: 'Portal inmobiliario con búsqueda avanzada, tours virtuales y CRM integrado para agentes.',
    image: 'https://images.unsplash.com/photo-1652878530627-cc6f063e3947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwcHJvcGVydHklMjB3ZWJzaXRlfGVufDF8fHx8MTc3NTYyNzgwM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    url: 'https://example.com/urbanrealty',
    date: 'Octubre 2025',
    tags: ['Angular', 'MongoDB', 'Maps API'],
    accent: 'from-cyan-500 to-blue-600',
  },
]

export function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null)
  const tlRef      = useRef<gsap.core.Timeline | null>(null)
  const hasPlayed  = useRef(false)
  const { activeIndex } = useSectionContext()

  useGSAP(() => {
    const tl = gsap.timeline({ paused: true })

    tl.from('.portfolio-tag',   { opacity: 0, y: -20, scale: 0.8, duration: 0.5, ease: 'back.out(2)' })
      .from('.portfolio-title', { opacity: 0, y: 50, duration: 0.75, ease: 'power3.out' }, '-=0.2')
      .from('.portfolio-desc',  { opacity: 0, y: 25, duration: 0.6, ease: 'power2.out' }, '-=0.4')

    tl.addLabel('cards')

    projects.forEach((_, i) => {
      const col     = i % 3
      const yOffset = 40 + col * 20
      const delay   = col * 0.12

      tl.from(`.portfolio-card-${i}`, {
        opacity: 0, y: yOffset, scale: 0.93,
        clipPath: 'inset(10% 0 10% 0 round 16px)',
        duration: 0.85, ease: 'power3.out',
      }, `cards+=${delay}`)

      tl.from(`.portfolio-tags-${i} span`, {
        opacity: 0, scale: 0.7, y: 10,
        duration: 0.4, stagger: 0.08, ease: 'back.out(1.5)',
      }, `cards+=${delay + 0.4}`)
    })

    tl.from('.portfolio-cta-block', {
      opacity: 0, y: 40, scale: 0.95,
      duration: 0.7, ease: 'back.out(1.5)',
    }, '+=0.1')

    tlRef.current = tl
  }, { scope: sectionRef })

  useEffect(() => {
    if (activeIndex === SECTION_INDEX && !hasPlayed.current) {
      hasPlayed.current = true
      setTimeout(() => tlRef.current?.play(), 400)
    }
  }, [activeIndex])

  // Image parallax hover
  useEffect(() => {
    if (typeof window === 'undefined') return
    const cards = document.querySelectorAll<HTMLElement>('.portfolio-card-hover')
    const cleanup: (() => void)[] = []

    cards.forEach((card) => {
      const img     = card.querySelector<HTMLElement>('.portfolio-img')
      const overlay = card.querySelector<HTMLElement>('.portfolio-overlay')

      const onMove  = (e: MouseEvent) => {
        const r  = card.getBoundingClientRect()
        const dx = ((e.clientX - (r.left + r.width  / 2)) / r.width)  * 12
        const dy = ((e.clientY - (r.top  + r.height / 2)) / r.height) * 12
        if (img) gsap.to(img, { x: dx, y: dy, scale: 1.08, duration: 0.4, ease: 'power2.out' })
      }
      const onEnter = () => { if (overlay) gsap.to(overlay, { opacity: 1, duration: 0.3, ease: 'power2.out' }) }
      const onLeave = () => {
        if (img)     gsap.to(img,     { x: 0, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' })
        if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.3, ease: 'power2.in' })
      }

      card.addEventListener('mousemove',  onMove)
      card.addEventListener('mouseenter', onEnter)
      card.addEventListener('mouseleave', onLeave)
      cleanup.push(() => {
        card.removeEventListener('mousemove',  onMove)
        card.removeEventListener('mouseenter', onEnter)
        card.removeEventListener('mouseleave', onLeave)
      })
    })
    return () => cleanup.forEach((fn) => fn())
  }, [])

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="h-screen flex flex-col justify-center pt-20 pb-6 lg:pt-24 lg:pb-8 px-4 bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden"
    >
      <div className="portfolio-orb-tr absolute top-0 right-1/3 w-[28rem] h-[28rem] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="portfolio-orb-bl absolute bottom-0 left-1/3 w-[28rem] h-[28rem] bg-gray-800/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto relative z-10">
        {/* Header — CTA oculto en mobile para ahorrar espacio */}
        <div className="portfolio-header flex items-end justify-between gap-3 mb-3 lg:mb-6">
          <div>
            <div className="portfolio-tag inline-flex items-center gap-1.5 mb-1.5 lg:mb-2 px-3 py-1 lg:px-4 lg:py-1.5 rounded-full border border-gray-700/50 bg-gray-900/40 text-gray-400 text-[10px] lg:text-xs uppercase tracking-[0.25em]">
              Nuestro trabajo
            </div>
            <h2 className="portfolio-title text-xl lg:text-3xl xl:text-4xl font-black bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent leading-tight">
              Proyectos Destacados
            </h2>
            <p className="portfolio-desc text-[10px] lg:text-sm text-gray-400 mt-0.5">
              Trabajos recientes y exitosos
            </p>
          </div>
          <a
            href="#contacto"
            className="portfolio-cta-block hidden lg:inline-flex shrink-0 items-center gap-2 bg-white text-black hover:bg-gray-100 px-5 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-[0_0_20px_rgba(255,255,255,0.08)]"
          >
            Comenzar mi proyecto
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile: 2 cols — Desktop: 3 cols */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4">
          {projects.map((project, i) => (
            <a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`portfolio-card-${i} portfolio-card-hover relative block rounded-lg lg:rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800/50 hover:border-gray-700/70 transition-colors duration-300 group`}
            >
              <div className="relative h-16 lg:h-32 overflow-hidden">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="portfolio-img w-full h-full object-cover"
                />
                <div className="portfolio-overlay absolute inset-0 bg-black/65 opacity-0 flex items-center justify-center">
                  <div className="text-center">
                    <ExternalLink className="w-5 lg:w-7 h-5 lg:h-7 text-white mx-auto mb-1" />
                    <span className="text-white text-[10px] lg:text-xs font-semibold">Ver proyecto</span>
                  </div>
                </div>
                <div className="absolute top-2 left-2 bg-gray-900/85 backdrop-blur-sm text-white text-[9px] lg:text-[10px] font-semibold px-2 py-0.5 rounded-full border border-gray-700/70">
                  {project.category}
                </div>
              </div>

              <div className="p-2 lg:p-4">
                {/* Fecha: solo desktop */}
                <div className="hidden lg:flex items-center gap-1.5 mb-1.5 text-gray-500 text-[10px]">
                  <Calendar className="w-3 h-3" />
                  <span>{project.date}</span>
                </div>
                <h3 className="text-[11px] lg:text-sm font-bold text-white mb-0.5 lg:mb-1 leading-tight">{project.title}</h3>
                {/* Descripción: solo desktop */}
                <p className="hidden lg:block text-gray-400 leading-relaxed text-[11px] mb-2 line-clamp-2">{project.description}</p>
                <div className={`portfolio-tags-${i} flex flex-wrap gap-1`}>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 text-[10px] bg-gray-800/70 text-gray-300 px-2 py-0.5 rounded-full border border-gray-700/60"
                    >
                      <Tag className="w-2 h-2" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${project.accent} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
