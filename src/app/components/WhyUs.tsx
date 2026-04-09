'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Shield, Headphones, Target, Zap } from 'lucide-react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const features = [
  {
    icon: Target,
    title: 'Proceso Claro y Transparente',
    description: 'Seguimos una metodología probada: análisis, diseño, desarrollo, pruebas y entrega. Siempre sabrás en qué etapa está tu proyecto.',
  },
  {
    icon: Headphones,
    title: 'Soporte Continuo',
    description: 'Asistencia técnica 24/7 después del lanzamiento. No te dejamos solo, estamos contigo en cada paso del camino.',
  },
  {
    icon: Zap,
    title: 'Entregas Rápidas',
    description: 'Metodología ágil que permite entregas incrementales. Verás resultados tangibles desde las primeras semanas.',
  },
  {
    icon: Shield,
    title: 'Garantía de Calidad',
    description: 'Código limpio, escalable y bien documentado. Garantizamos 3 meses de correcciones sin costo adicional.',
  },
]

export function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    // Header
    gsap.from('.whyus-header', {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.whyus-header',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    // Feature cards batch
    gsap.set('.whyus-card', { opacity: 0, y: 20 })
    ScrollTrigger.batch('.whyus-card', {
      onEnter: (elements) => {
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
        })
      },
      start: 'top 85%',
      once: true,
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="py-24 px-4 bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gray-800/20 rounded-full blur-3xl" />

      <div className="container mx-auto relative z-10">
        <div className="whyus-header text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            ¿Por qué elegir INSANITY?
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Combinamos experiencia, tecnología de punta y un compromiso inquebrantable con la excelencia
            para transformar tu visión en realidad digital.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="whyus-card group relative hover:-translate-y-[5px] transition-transform duration-300"
            >
              <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6 h-full hover:border-gray-600 transition-colors duration-300">
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
