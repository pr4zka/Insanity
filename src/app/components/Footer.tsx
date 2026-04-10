'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { Sparkles, ArrowUp } from 'lucide-react'
import { useSectionContext } from './SectionContext'

gsap.registerPlugin(useGSAP)

const SECTION_INDEX = 6

const NAV_LINKS = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Contacto',  href: '#contacto' },
  { label: 'Privacidad', href: '#' },
  { label: 'Términos', href: '#' },
]

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const tlRef     = useRef<gsap.core.Timeline | null>(null)
  const hasPlayed = useRef(false)
  const { activeIndex, goto } = useSectionContext()

  useGSAP(() => {
    const tl = gsap.timeline({ paused: true })

    tl.from('.footer-divider',  { scaleX: 0, transformOrigin: 'left center', duration: 1.2, ease: 'power3.out' })
      .from('.footer-logo',     { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' }, '-=0.6')
      .from('.footer-link',     { opacity: 0, y: 15, duration: 0.4, stagger: 0.08, ease: 'power2.out' }, '-=0.4')
      .from('.footer-copy',     { opacity: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
      .from('.footer-tagline',  { opacity: 0, y: 10, duration: 0.5, ease: 'power2.out' }, '-=0.3')
      .from('.footer-back-btn', { opacity: 0, scale: 0.5, duration: 0.5, ease: 'back.out(2)' }, '-=0.4')

    tlRef.current = tl
  }, { scope: footerRef })

  useEffect(() => {
    if (activeIndex === SECTION_INDEX && !hasPlayed.current) {
      hasPlayed.current = true
      setTimeout(() => tlRef.current?.play(), 400)
    }
  }, [activeIndex])

  const handleLinkEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget.querySelector('.footer-link-line'), { scaleX: 1, duration: 0.25, ease: 'power2.out' })
    gsap.to(e.currentTarget, { color: '#c084fc', duration: 0.25 })
  }
  const handleLinkLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget.querySelector('.footer-link-line'), { scaleX: 0, duration: 0.2, ease: 'power2.in' })
    gsap.to(e.currentTarget, { color: '#6b7280', duration: 0.25 })
  }

  return (
    <footer ref={footerRef} className="bg-black min-h-screen flex items-center py-12 px-4 relative overflow-hidden">
      <div className="container mx-auto w-full">
        <div className="footer-divider w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <a href="#" className="footer-logo flex items-center gap-2 group">
            <Sparkles className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors" />
            <span className="text-xl font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent tracking-tight">
              INSANITY
            </span>
          </a>

          <div className="flex flex-wrap items-center justify-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href + link.label}
                href={link.href}
                className="footer-link relative text-gray-500 text-sm py-1"
                onMouseEnter={handleLinkEnter}
                onMouseLeave={handleLinkLeave}
              >
                {link.label}
                <span
                  className="footer-link-line absolute bottom-0 left-0 right-0 h-px bg-purple-400 origin-left"
                  style={{ transform: 'scaleX(0)' }}
                />
              </a>
            ))}
          </div>

          <div className="footer-copy text-gray-500 text-sm">
            © 2026 INSANITY. Todos los derechos reservados.
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-8">
          <p className="footer-tagline text-gray-600 text-xs uppercase tracking-[0.25em]">
            Transformando ideas en realidad digital
          </p>
          <button
            onClick={() => goto(0)}
            className="footer-back-btn flex items-center gap-2 text-gray-500 hover:text-white text-xs uppercase tracking-widest transition-colors group"
          >
            Volver arriba
            <div className="w-7 h-7 rounded-full border border-gray-700 group-hover:border-gray-500 flex items-center justify-center transition-colors">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  )
}
