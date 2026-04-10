'use client'

import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { Sparkles } from 'lucide-react'

gsap.registerPlugin(useGSAP)

const NAV_LINKS = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Por qué nosotros', href: '#nosotros' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contacto', href: '#contacto' },
]

export function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useGSAP(() => {
    // ── Entrance animation ──────────────────────────────────
    const tl = gsap.timeline()
    tl.from(navRef.current, { y: -80, opacity: 0, duration: 0.8, ease: 'power3.out' })
    tl.from('.nav-logo', { opacity: 0, x: -20, duration: 0.5, ease: 'power2.out' }, '-=0.4')
    tl.from('.nav-link', { opacity: 0, y: -10, duration: 0.4, stagger: 0.08, ease: 'power2.out' }, '-=0.3')
    tl.from('.nav-cta', { opacity: 0, scale: 0.8, duration: 0.5, ease: 'back.out(2)' }, '-=0.3')

    // Initial state for mobile menu (hidden)
    gsap.set(mobileMenuRef.current, { opacity: 0, y: -20, clipPath: 'inset(0 0 100% 0)', pointerEvents: 'none' })
  }, { scope: navRef })

  const toggleMenu = () => {
    if (!menuOpen) {
      setMenuOpen(true)
      gsap.to(mobileMenuRef.current, {
        opacity: 1, y: 0,
        clipPath: 'inset(0 0 0% 0)',
        pointerEvents: 'all',
        duration: 0.45, ease: 'power3.out',
      })
      gsap.from('.mobile-nav-link', {
        opacity: 0, x: -20,
        duration: 0.35, stagger: 0.07,
        ease: 'power2.out', delay: 0.1,
      })
      // Hamburger → X
      gsap.to('.ham-top', { rotation: 45, y: 6, duration: 0.3, ease: 'power2.inOut' })
      gsap.to('.ham-mid', { opacity: 0, duration: 0.2 })
      gsap.to('.ham-bot', { rotation: -45, y: -6, duration: 0.3, ease: 'power2.inOut' })
    } else {
      setMenuOpen(false)
      gsap.to(mobileMenuRef.current, {
        opacity: 0, y: -10,
        clipPath: 'inset(0 0 100% 0)',
        pointerEvents: 'none',
        duration: 0.35, ease: 'power2.in',
      })
      // X → Hamburger
      gsap.to('.ham-top', { rotation: 0, y: 0, duration: 0.3, ease: 'power2.inOut' })
      gsap.to('.ham-mid', { opacity: 1, duration: 0.2, delay: 0.1 })
      gsap.to('.ham-bot', { rotation: 0, y: 0, duration: 0.3, ease: 'power2.inOut' })
    }
  }

  const handleLinkEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget.querySelector('.link-line'), { scaleX: 1, duration: 0.28, ease: 'power2.out' })
  }
  const handleLinkLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget.querySelector('.link-line'), { scaleX: 0, duration: 0.22, ease: 'power2.in' })
  }

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 border-b border-transparent backdrop-blur-[0px]"
      style={{ backgroundColor: 'rgba(0,0,0,0)' }}
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="nav-logo flex items-center gap-2 group">
          <Sparkles className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors" />
          <span className="text-xl font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent tracking-tight">
            INSANITY
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link relative text-gray-400 hover:text-white text-sm font-medium transition-colors py-1"
              onMouseEnter={handleLinkEnter}
              onMouseLeave={handleLinkLeave}
            >
              {link.label}
              <span className="link-line absolute bottom-0 left-0 right-0 h-px bg-purple-400 origin-left" style={{ transform: 'scaleX(0)' }} />
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#contacto"
          className="nav-cta hidden md:inline-flex items-center gap-2 bg-white text-black hover:bg-gray-100 px-5 py-2 rounded-lg text-sm font-bold transition-colors"
        >
          Comenzar
        </a>

        {/* Hamburger */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col gap-[5px] p-2 rounded-lg hover:bg-white/5 transition-colors"
          aria-label="Menú"
        >
          <span className="ham-top block w-5 h-0.5 bg-white rounded-full origin-center" />
          <span className="ham-mid block w-5 h-0.5 bg-white rounded-full" />
          <span className="ham-bot block w-5 h-0.5 bg-white rounded-full origin-center" />
        </button>
      </div>

      {/* Mobile Menu — always mounted, GSAP-controlled visibility */}
      <div
        ref={mobileMenuRef}
        className="md:hidden absolute top-16 left-0 right-0 bg-black/96 backdrop-blur-xl border-b border-gray-800 px-6 py-6 flex flex-col gap-3"
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={toggleMenu}
            className="mobile-nav-link text-gray-300 hover:text-white text-base font-medium transition-colors py-2.5 border-b border-gray-800/50"
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contacto"
          onClick={toggleMenu}
          className="mobile-nav-link mt-2 bg-white text-black px-5 py-3 rounded-xl font-bold text-center hover:bg-gray-100 transition-colors"
        >
          Comenzar
        </a>
      </div>
    </nav>
  )
}
