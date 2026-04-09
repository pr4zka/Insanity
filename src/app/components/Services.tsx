'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { MessageSquare, Users, Globe, Wrench, TrendingUp } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const services = [
  {
    icon: MessageSquare,
    title: 'Chatbots Inteligentes',
    description: 'Automatiza la atención al cliente con chatbots impulsados por IA que aprenden y se adaptan a tus necesidades.',
    image: 'https://images.unsplash.com/photo-1762328862557-e0a36587cd3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGF0Ym90JTIwdGVjaG5vbG9neSUyMGludGVyZmFjZXxlbnwxfHx8fDE3NzU1Njg1NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    gradient: 'from-gray-700 to-gray-900',
  },
  {
    icon: Users,
    title: 'CRM Personalizado',
    description: 'Gestiona tus relaciones con clientes de forma eficiente con nuestras soluciones CRM adaptadas a tu empresa.',
    image: 'https://images.unsplash.com/photo-1763718528755-4bca23f82ac3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDUk0lMjBidXNpbmVzcyUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NzU1Njg1NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    gradient: 'from-gray-600 to-gray-800',
  },
  {
    icon: Globe,
    title: 'Páginas Web',
    description: 'Diseñamos y desarrollamos sitios web modernos, rápidos y optimizados para convertir visitantes en clientes.',
    image: 'https://images.unsplash.com/photo-1637937459053-c788742455be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGluZyUyMHNjcmVlbnxlbnwxfHx8fDE3NzU1MDM2MzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    gradient: 'from-purple-900 to-gray-900',
  },
  {
    icon: Wrench,
    title: 'Soluciones a Medida',
    description: 'Desarrollamos software personalizado que se ajusta perfectamente a los procesos únicos de tu negocio.',
    image: 'https://images.unsplash.com/photo-1669023414162-8b0573b9c6b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b20lMjBzb2Z0d2FyZSUyMHNvbHV0aW9uc3xlbnwxfHx8fDE3NzU1Njg1NzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    gradient: 'from-gray-800 to-black',
  },
  {
    icon: TrendingUp,
    title: 'Marketing Digital',
    description: 'Próximamente: Estrategias de marketing digital para aumentar tu presencia online y hacer crecer tu negocio.',
    image: 'https://images.unsplash.com/photo-1576180525792-82cdc0e2b29e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYWxheHklMjBzcGFjZSUyMHB1cnBsZSUyMG5lYnVsYXxlbnwxfHx8fDE3NzU1Njg1NzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    gradient: 'from-gray-700 to-purple-900',
    comingSoon: true,
  },
]

export function Services() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    // Header fade-in on scroll
    gsap.from('.services-header', {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.services-header',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    // Cards: set initial state then batch-reveal on scroll
    gsap.set('.service-card', { opacity: 0, y: 20 })
    ScrollTrigger.batch('.service-card', {
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
    <section ref={sectionRef} className="py-24 px-4 bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black to-black" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl" />

      <div className="container mx-auto relative z-10">
        <div className="services-header text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Nuestros Servicios
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Soluciones tecnológicas completas para llevar tu negocio al siguiente nivel
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="service-card group relative hover:-translate-y-[10px] transition-transform duration-300"
            >
              <div className="relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-600 transition-colors duration-300">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${service.gradient} opacity-60`} />
                  {service.comingSoon && (
                    <div className="absolute top-4 right-4 bg-gray-700 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Próximamente
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${service.gradient} mb-4`}>
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{service.description}</p>
                </div>

                {/* Hover overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
