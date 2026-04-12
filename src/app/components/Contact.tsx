'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { Mail, Phone, MapPin, Send, ArrowRight } from 'lucide-react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { useSectionContext } from './SectionContext'

gsap.registerPlugin(useGSAP)

const SECTION_INDEX = 5

const contactItems = [
  { icon: Mail,   label: 'Email',     value: 'contacto@insanity.com', href: 'mailto:contacto@insanity.com' },
  { icon: Phone,  label: 'Teléfono',  value: '+1 (555) 123-4567',     href: 'tel:+15551234567' },
  { icon: MapPin, label: 'Ubicación', value: 'En todo el mundo',       href: null },
]

const FORM_FIELDS = ['contact-name', 'contact-email', 'contact-service', 'contact-message']

export function Contact() {
  const sectionRef   = useRef<HTMLElement>(null)
  const submitBtnRef = useRef<HTMLButtonElement>(null)
  const tlRef        = useRef<gsap.core.Timeline | null>(null)
  const hasPlayed    = useRef(false)
  const { activeIndex } = useSectionContext()

  useGSAP(() => {
    const tl = gsap.timeline({ paused: true })

    tl.from('.contact-tag',   { opacity: 0, y: -20, scale: 0.8, duration: 0.5, ease: 'back.out(2)' })
      .from('.contact-title', { opacity: 0, y: 50, duration: 0.75, ease: 'power3.out' }, '-=0.2')
      .from('.contact-desc',  { opacity: 0, y: 25, duration: 0.6, ease: 'power2.out' }, '-=0.4')
      .from('.contact-info',  { opacity: 0, x: -60, duration: 0.85, ease: 'power3.out' }, '-=0.3')
      .from('.contact-item',  { opacity: 0, x: -30, duration: 0.55, stagger: 0.12, ease: 'power2.out' }, '-=0.5')
      .from('.contact-quote', { opacity: 0, y: 25, scale: 0.96, duration: 0.7, ease: 'power2.out' }, '-=0.3')
      .from('.contact-form',  { opacity: 0, x: 60, duration: 0.85, ease: 'power3.out' }, '-=0.8')

    FORM_FIELDS.forEach((cls, i) => {
      tl.from(`.${cls}-wrapper`, {
        opacity: 0, y: 20, duration: 0.5, ease: 'power2.out',
      }, `-=0.${6 - i}`)
    })

    tl.from('.contact-submit', { opacity: 0, y: 20, scale: 0.9, duration: 0.6, ease: 'back.out(2)' }, '-=0.3')

    tlRef.current = tl
  }, { scope: sectionRef })

  const orbStarted = useRef(false)

  useEffect(() => {
    if (activeIndex === SECTION_INDEX) {
      if (!hasPlayed.current) {
        hasPlayed.current = true
        setTimeout(() => tlRef.current?.play(), 400)
      }
      if (!orbStarted.current) {
        orbStarted.current = true
        gsap.to('.contact-orb', { scale: 1.2, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      }
    }
  }, [activeIndex])

  // Contact item hover
  useEffect(() => {
    if (typeof window === 'undefined') return
    const items = document.querySelectorAll<HTMLElement>('.contact-item')
    const cleanup: (() => void)[] = []

    items.forEach((item) => {
      const onEnter = () => gsap.to(item, { x: 12, duration: 0.3, ease: 'power2.out' })
      const onLeave = () => gsap.to(item, { x: 0,  duration: 0.5, ease: 'elastic.out(1, 0.5)' })
      item.addEventListener('mouseenter', onEnter)
      item.addEventListener('mouseleave', onLeave)
      cleanup.push(() => { item.removeEventListener('mouseenter', onEnter); item.removeEventListener('mouseleave', onLeave) })
    })
    return () => cleanup.forEach((fn) => fn())
  }, [])

  const handleSubmitHover = () => {
    if (!submitBtnRef.current) return
    gsap.to(submitBtnRef.current, { scale: 1.03, duration: 0.2, ease: 'power2.out' })
    gsap.to(submitBtnRef.current.querySelector('.submit-arrow'), { x: 5, duration: 0.25, ease: 'power2.out' })
  }
  const handleSubmitLeave = () => {
    if (!submitBtnRef.current) return
    gsap.to(submitBtnRef.current, { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.5)' })
    gsap.to(submitBtnRef.current.querySelector('.submit-arrow'), { x: 0, duration: 0.3, ease: 'power2.out' })
  }

  return (
    <section
      ref={sectionRef}
      id="contacto"
      className="h-screen flex flex-col justify-center pt-20 pb-4 lg:pt-24 lg:pb-6 px-4 bg-black relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/15 via-black to-black" />
      <div className="contact-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/8 rounded-full blur-[80px] pointer-events-none" />

      <div className="container mx-auto relative z-10 max-w-6xl">
        <div className="contact-header text-center mb-2 lg:mb-5">
          <div className="contact-tag inline-flex items-center gap-2 mb-1.5 lg:mb-3 px-3 py-1 lg:px-4 lg:py-1.5 rounded-full border border-purple-500/30 bg-purple-950/25 text-purple-400 text-[10px] lg:text-xs uppercase tracking-[0.25em]">
            Hablemos
          </div>
          <h2 className="contact-title text-xl lg:text-3xl md:text-4xl font-black mb-1 lg:mb-2 bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent leading-tight">
            ¿Listo para comenzar?
          </h2>
          <p className="contact-desc text-[10px] lg:text-sm text-gray-400 max-w-xl mx-auto">
            Contáctanos y descubre cómo podemos transformar tu negocio
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-8">
          <div className="contact-info space-y-2 lg:space-y-4">
            <div className="hidden lg:block">
              <h3 className="text-xl font-bold text-white mb-2">Hablemos de tu proyecto</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Nuestro equipo está listo para ayudarte a hacer realidad tus ideas.
                No importa qué tan ambicioso sea tu proyecto, estamos preparados para el desafío.
              </p>
            </div>

            <div className="flex lg:flex-col gap-2 lg:gap-0 lg:space-y-3">
              {contactItems.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="contact-item flex items-center gap-2 lg:gap-3 cursor-pointer group flex-1 lg:flex-none">
                  <div className="p-1.5 lg:p-2.5 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700/50 group-hover:border-gray-600/70 transition-colors duration-300 shrink-0">
                    <Icon className="w-3 h-3 lg:w-4 lg:h-4 text-gray-300" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-white font-semibold text-[9px] lg:text-xs mb-0">{label}</h4>
                    {href ? (
                      <a href={href} className="text-gray-400 hover:text-gray-300 transition-colors text-[9px] lg:text-xs truncate block">{value}</a>
                    ) : (
                      <p className="text-gray-400 text-[9px] lg:text-xs">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="contact-quote hidden lg:block relative p-4 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/30 rounded-xl">
              <div className="absolute top-0 left-5 -translate-y-1/2 text-4xl text-purple-500/40 font-serif leading-none select-none">"</div>
              <p className="text-gray-300 italic text-xs leading-relaxed pt-1">
                La locura es hacer lo mismo una y otra vez esperando resultados diferentes.
                Nosotros traemos la INSANITY que tu negocio necesita para innovar.
              </p>
            </div>
          </div>

          <form className="contact-form space-y-2 lg:space-y-3 bg-gradient-to-br from-gray-900/60 to-gray-950/60 border border-gray-800/50 rounded-2xl p-3 lg:p-5 backdrop-blur-sm">
            <div className="contact-name-wrapper">
              <label htmlFor="name" className="block text-white text-[10px] lg:text-xs mb-1 font-medium">Nombre</label>
              <Input id="name" type="text" placeholder="Tu nombre completo" className="bg-black/50 border-gray-700/70 text-white text-xs placeholder:text-gray-600 focus:border-purple-500/70 focus:ring-0 transition-colors h-8 lg:h-10" />
            </div>
            <div className="contact-email-wrapper">
              <label htmlFor="email" className="block text-white text-[10px] lg:text-xs mb-1 font-medium">Email</label>
              <Input id="email" type="email" placeholder="tu@email.com" className="bg-black/50 border-gray-700/70 text-white text-xs placeholder:text-gray-600 focus:border-purple-500/70 focus:ring-0 transition-colors h-8 lg:h-10" />
            </div>
            <div className="contact-service-wrapper">
              <label htmlFor="service" className="block text-white text-[10px] lg:text-xs mb-1 font-medium">Servicio de interés</label>
              <select id="service" className="w-full bg-black/50 border border-gray-700/70 text-white rounded-lg px-3 py-1.5 lg:py-2 text-[10px] lg:text-xs focus:outline-none focus:border-purple-500/70 transition-colors">
                <option value="" className="bg-gray-900">Selecciona un servicio</option>
                <option value="chatbot" className="bg-gray-900">Chatbots Inteligentes</option>
                <option value="crm" className="bg-gray-900">CRM Personalizado</option>
                <option value="web" className="bg-gray-900">Páginas Web</option>
                <option value="custom" className="bg-gray-900">Soluciones a Medida</option>
                <option value="marketing" className="bg-gray-900">Marketing Digital</option>
              </select>
            </div>
            <div className="contact-message-wrapper">
              <label htmlFor="message" className="block text-white text-[10px] lg:text-xs mb-1 font-medium">Mensaje</label>
              <Textarea id="message" placeholder="Cuéntanos sobre tu proyecto..." rows={2} className="bg-black/50 border-gray-700/70 text-white text-xs placeholder:text-gray-600 focus:border-purple-500/70 focus:ring-0 transition-colors resize-none lg:rows-3" />
            </div>
            <button
              ref={submitBtnRef}
              type="submit"
              className="contact-submit w-full bg-white text-black py-2 lg:py-3 rounded-xl text-xs lg:text-sm font-bold flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
              onMouseEnter={handleSubmitHover}
              onMouseLeave={handleSubmitLeave}
            >
              Enviar mensaje
              <ArrowRight className="submit-arrow w-3.5 h-3.5 lg:w-4 lg:h-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
