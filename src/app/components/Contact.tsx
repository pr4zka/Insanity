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

    // Ambient orb breathe
    gsap.to('.contact-orb', { scale: 1.2, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' })
  }, { scope: sectionRef })

  useEffect(() => {
    if (activeIndex === SECTION_INDEX && !hasPlayed.current) {
      hasPlayed.current = true
      setTimeout(() => tlRef.current?.play(), 400)
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
      className="min-h-screen flex flex-col justify-center py-28 px-4 bg-black relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/15 via-black to-black" />
      <div className="contact-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/8 rounded-full blur-[80px] pointer-events-none" />

      <div className="container mx-auto relative z-10 max-w-6xl">
        <div className="contact-header text-center mb-20">
          <div className="contact-tag inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-950/25 text-purple-400 text-xs uppercase tracking-[0.25em]">
            Hablemos
          </div>
          <h2 className="contact-title text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent leading-tight">
            ¿Listo para comenzar?
          </h2>
          <p className="contact-desc text-xl text-gray-400 max-w-2xl mx-auto">
            Contáctanos y descubre cómo podemos transformar tu negocio
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="contact-info space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-white mb-4">Hablemos de tu proyecto</h3>
              <p className="text-gray-400 text-base leading-relaxed">
                Nuestro equipo está listo para ayudarte a hacer realidad tus ideas.
                No importa qué tan ambicioso sea tu proyecto, estamos preparados para el desafío.
              </p>
            </div>

            <div className="space-y-5">
              {contactItems.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="contact-item flex items-start gap-4 cursor-pointer group">
                  <div className="p-3 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700/50 group-hover:border-gray-600/70 transition-colors duration-300 shrink-0">
                    <Icon className="w-5 h-5 text-gray-300" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm mb-0.5">{label}</h4>
                    {href ? (
                      <a href={href} className="text-gray-400 hover:text-gray-300 transition-colors text-sm">{value}</a>
                    ) : (
                      <p className="text-gray-400 text-sm">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="contact-quote relative mt-10 p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/30 rounded-2xl">
              <div className="absolute top-0 left-6 -translate-y-1/2 text-5xl text-purple-500/40 font-serif leading-none select-none">"</div>
              <p className="text-gray-300 italic text-sm leading-relaxed pt-2">
                La locura es hacer lo mismo una y otra vez esperando resultados diferentes.
                Nosotros traemos la INSANITY que tu negocio necesita para innovar.
              </p>
            </div>
          </div>

          <form className="contact-form space-y-5 bg-gradient-to-br from-gray-900/60 to-gray-950/60 border border-gray-800/50 rounded-2xl p-8 backdrop-blur-sm">
            <div className="contact-name-wrapper">
              <label htmlFor="name" className="block text-white text-sm mb-2 font-medium">Nombre</label>
              <Input id="name" type="text" placeholder="Tu nombre completo" className="bg-black/50 border-gray-700/70 text-white placeholder:text-gray-600 focus:border-purple-500/70 focus:ring-0 transition-colors" />
            </div>
            <div className="contact-email-wrapper">
              <label htmlFor="email" className="block text-white text-sm mb-2 font-medium">Email</label>
              <Input id="email" type="email" placeholder="tu@email.com" className="bg-black/50 border-gray-700/70 text-white placeholder:text-gray-600 focus:border-purple-500/70 focus:ring-0 transition-colors" />
            </div>
            <div className="contact-service-wrapper">
              <label htmlFor="service" className="block text-white text-sm mb-2 font-medium">Servicio de interés</label>
              <select id="service" className="w-full bg-black/50 border border-gray-700/70 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500/70 transition-colors">
                <option value="" className="bg-gray-900">Selecciona un servicio</option>
                <option value="chatbot" className="bg-gray-900">Chatbots Inteligentes</option>
                <option value="crm" className="bg-gray-900">CRM Personalizado</option>
                <option value="web" className="bg-gray-900">Páginas Web</option>
                <option value="custom" className="bg-gray-900">Soluciones a Medida</option>
                <option value="marketing" className="bg-gray-900">Marketing Digital</option>
              </select>
            </div>
            <div className="contact-message-wrapper">
              <label htmlFor="message" className="block text-white text-sm mb-2 font-medium">Mensaje</label>
              <Textarea id="message" placeholder="Cuéntanos sobre tu proyecto y tus objetivos..." rows={5} className="bg-black/50 border-gray-700/70 text-white placeholder:text-gray-600 focus:border-purple-500/70 focus:ring-0 transition-colors resize-none" />
            </div>
            <button
              ref={submitBtnRef}
              type="submit"
              className="contact-submit w-full bg-white text-black py-4 rounded-xl text-base font-bold flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
              onMouseEnter={handleSubmitHover}
              onMouseLeave={handleSubmitLeave}
            >
              Enviar mensaje
              <ArrowRight className="submit-arrow w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
