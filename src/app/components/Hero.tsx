'use client'

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import { useGSAP } from '@gsap/react'
import { Sparkles, ChevronDown } from 'lucide-react'
import { SolarSystem } from './SolarSystem'

gsap.registerPlugin(useGSAP, TextPlugin)

const TITLE = 'INSANITY'
const SUBTITLE =
  'Transformamos ideas en soluciones digitales extraordinarias. Tecnología de vanguardia para impulsar tu negocio al futuro.'

export function Hero() {
  // iframe mounts immediately (hidden) so model preloads during BigBang
  const [iframeReady] = useState(true)
  const [astronautReady, setAstronautReady] = useState(false)

  const sectionRef    = useRef<HTMLElement>(null)
  const contentRef    = useRef<HTMLDivElement>(null)
  const subtitleRef   = useRef<HTMLParagraphElement>(null)
  const orb1Ref       = useRef<HTMLDivElement>(null)
  const orb2Ref       = useRef<HTMLDivElement>(null)
  const orb3Ref       = useRef<HTMLDivElement>(null)
  const galaxyRef     = useRef<HTMLDivElement>(null)
  const scrollRef     = useRef<HTMLDivElement>(null)
  const astronautRef  = useRef<HTMLDivElement>(null)
  const iframeRef     = useRef<HTMLIFrameElement | null>(null)

  // Reveal only when Sketchfab signals the model is fully rendered (postMessage API)
  useEffect(() => {
    let revealed = false
    const reveal = () => {
      if (revealed) return
      revealed = true
      // Extra 800ms for WebGL to finish compositing before we remove the cover
      setTimeout(() => setAstronautReady(true), 800)
    }

    const onMessage = (e: MessageEvent) => {
      try {
        const d = typeof e.data === 'string' ? JSON.parse(e.data) : e.data
        if (d?.type === 'SKETCHFAB_API_SUCCESS') reveal()
      } catch { /* ignore */ }
    }
    window.addEventListener('message', onMessage)
    // Fallback: reveal after 15s regardless (slow connections)
    const fallback = setTimeout(reveal, 15000)

    return () => {
      window.removeEventListener('message', onMessage)
      clearTimeout(fallback)
    }
  }, [])

  // GSAP entrance animation when astronaut is ready
  useEffect(() => {
    if (!astronautReady || !astronautRef.current) return
    gsap.fromTo(
      astronautRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' }
    )
  }, [astronautReady])

  // ── GSAP animations ──────────────────────────────────────────
  useGSAP(() => {
    // Galaxy rings rotation
    gsap.to('.galaxy-outer', { rotation: 360,  duration: 100, repeat: -1, ease: 'none', transformOrigin: '50% 50%' })
    gsap.to('.galaxy-mid',   { rotation: -360, duration: 65,  repeat: -1, ease: 'none', transformOrigin: '50% 50%' })
    gsap.to('.galaxy-inner-r',{ rotation: 360, duration: 40,  repeat: -1, ease: 'none', transformOrigin: '50% 50%' })

    // Ambient orb float
    gsap.to(orb1Ref.current, { x: 80,  y: 55,  scale: 1.35, duration: 9,  repeat: -1, yoyo: true, ease: 'sine.inOut' })
    gsap.to(orb2Ref.current, { x: -70, y: -45, scale: 1.45, duration: 11, repeat: -1, yoyo: true, ease: 'sine.inOut' })
    gsap.to(orb3Ref.current, { x: 45,  y: -65, scale: 1.25, duration: 14, repeat: -1, yoyo: true, ease: 'sine.inOut' })

    // ── Entrance timeline (starts after BigBang at ~3.8s) ──
    const tl = gsap.timeline({ delay: 3.8 })

    tl.from('.hero-badge', { opacity: 0, y: -30, scale: 0.65, duration: 0.7, ease: 'back.out(2.5)' })

    tl.from('.hero-char', {
      opacity: 0, y: 110,
      rotationX: -90,
      transformPerspective: 900,
      transformOrigin: '50% 100%',
      duration: 0.75,
      stagger: { amount: 0.55, ease: 'power2.inOut' },
      ease: 'back.out(1.4)',
    }, '-=0.3')

    // Subtitle typewriter
    tl.set(subtitleRef.current, { opacity: 1 })
    tl.to(subtitleRef.current, {
      duration: 2.4,
      text: { value: SUBTITLE, delimiter: '' },
      ease: 'none',
    }, '-=0.1')

    // Scroll indicator
    tl.from(scrollRef.current, { opacity: 0, y: 10, duration: 0.5 }, '-=0.2')
    gsap.to(scrollRef.current, { y: 12, duration: 1.6, repeat: -1, yoyo: true, ease: 'sine.inOut' })

    // Solar system fade in after BigBang
    gsap.from('.hero-solar-wrap', { opacity: 0, duration: 1.5, delay: 3.8, ease: 'power2.out' })
  }, { scope: sectionRef })

  // ── Cursor parallax ──────────────────────────────────────────
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const onMove = (e: MouseEvent) => {
      const r = section.getBoundingClientRect()
      const dx = (e.clientX - r.width / 2) / (r.width / 2)
      const dy = (e.clientY - r.height / 2) / (r.height / 2)
      gsap.to(orb1Ref.current, { x: dx * 45,  y: dy * 35,  duration: 1.2, ease: 'power2.out', overwrite: 'auto' })
      gsap.to(orb2Ref.current, { x: dx * -60, y: dy * -45, duration: 1.5, ease: 'power2.out', overwrite: 'auto' })
      gsap.to(orb3Ref.current, { x: dx * 28,  y: dy * 55,  duration: 1.8, ease: 'power2.out', overwrite: 'auto' })
      gsap.to(galaxyRef.current,{ x: dx * 18, y: dy * 12,  duration: 2.0, ease: 'power2.out', overwrite: 'auto' })
      gsap.to('.hero-solar-wrap',{ x: dx * -10, y: dy * -8, duration: 2.5, ease: 'power2.out', overwrite: 'auto' })
      gsap.to(astronautRef.current, { x: dx * 15, y: dy * 10, duration: 2.0, ease: 'power2.out', overwrite: 'auto' })
    }
    section.addEventListener('mousemove', onMove)
    return () => section.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* ── Solar System (full background canvas) ── */}
      <div className="hero-solar-wrap absolute inset-0 z-0 opacity-0">
        <SolarSystem className="absolute inset-0" />
      </div>

      {/* ── Floating Astronaut — Sketchfab 3D model ── */}
      {/* Deferred: iframe not mounted until after BigBang to avoid competing for GPU */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none" aria-hidden="true">
        {iframeReady && (
          <iframe
            title="Floating Astronaut"
            src="https://sketchfab.com/models/848c04d21c274b4cba8954816f26dd8a/embed?autostart=1&ui_controls=0&ui_infos=0&ui_annotations=0&ui_watermark=0&ui_hint=0&ui_loading=0&preload=1&dnt=1&autospin=0.3&transparent=1&api_id=hero"
            allow="autoplay; fullscreen; xr-spatial-tracking"
            className="border-0"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: '-90px',
              width: '100%',
              height: 'calc(100% + 90px)',
              transform: 'scale(0.9)',
              transformOrigin: '50% 45%',
            }}
          />
        )}
        {/* Loading cover — fades out once model is ready */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-black transition-opacity duration-1000 pointer-events-none"
          style={{ opacity: astronautReady ? 0 : 1 }}
        />
      </div>

      {/* ── Vignette — funde bordes ── */}
      <div className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 65% at 50% 52%, transparent 0%, rgba(0,0,0,0.10) 55%, rgba(0,0,0,0.85) 100%),
            linear-gradient(to bottom, rgba(0,0,0,0.60) 0%, transparent 14%, transparent 80%, rgba(0,0,0,0.85) 100%)
          `,
        }}
      />

      {/* ── Galaxy ring decoration ── */}
      <div
        ref={galaxyRef}
        className="absolute inset-0 z-[3] flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <div className="galaxy-outer absolute rounded-full"
          style={{
            width: '90vmin', height: '90vmin',
            background: `conic-gradient(from 0deg,
              transparent 0deg,
              rgba(139,92,246,0.07) 55deg,
              rgba(99,102,241,0.11) 120deg,
              rgba(167,139,250,0.06) 185deg,
              transparent 230deg,
              rgba(103,232,249,0.04) 310deg,
              transparent 360deg)`,
            filter: 'blur(6px)',
          }}
        />
        <div className="galaxy-mid absolute rounded-full"
          style={{
            width: '60vmin', height: '60vmin',
            background: `conic-gradient(from 120deg,
              transparent 0deg,
              rgba(192,132,252,0.08) 70deg,
              rgba(129,140,248,0.10) 150deg,
              transparent 200deg,
              rgba(216,180,254,0.05) 310deg,
              transparent 360deg)`,
            filter: 'blur(10px)',
          }}
        />
        <div className="galaxy-inner-r absolute rounded-full"
          style={{
            width: '32vmin', height: '32vmin',
            background: `conic-gradient(from 240deg,
              transparent 0deg,
              rgba(196,181,253,0.10) 90deg,
              rgba(139,92,246,0.07) 160deg,
              transparent 360deg)`,
            filter: 'blur(14px)',
          }}
        />
        {/* Core glow */}
        <div className="absolute rounded-full"
          style={{
            width: '14vmin', height: '14vmin',
            background: 'radial-gradient(circle, rgba(255,230,100,0.08) 0%, rgba(139,92,246,0.05) 60%, transparent 100%)',
            filter: 'blur(16px)',
          }}
        />
      </div>

      {/* ── Gradient orbs ── */}
      <div ref={orb1Ref} className="absolute top-1/4 left-[14%] w-[18rem] md:w-[34rem] h-[18rem] md:h-[34rem] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none z-[3]" />
      <div ref={orb2Ref} className="absolute bottom-1/3 right-[11%] w-[20rem] md:w-[38rem] h-[20rem] md:h-[38rem] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none z-[3]" />
      <div ref={orb3Ref} className="absolute top-[38%] right-[36%] w-48 md:w-72 h-48 md:h-72 bg-violet-400/10 rounded-full blur-[90px] pointer-events-none z-[3]" />

      {/* ── Subtle grid overlay ── */}
      <div className="absolute inset-0 z-[4] opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />

      {/* ── Content ── */}
      <div ref={contentRef} className="container mx-auto px-6 z-10 text-center relative">
        {/* Badge */}
        <div className="hero-badge inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full border border-purple-500/30 bg-purple-950/30 backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-purple-300 text-xs uppercase tracking-[0.28em] font-medium">
            Innovación sin límites
          </span>
        </div>

        {/* Title — characters flip in 3D */}
        <h1
          className="font-black mb-8 leading-none"
          style={{
            fontSize: 'clamp(4.5rem, 16vw, 13rem)',
            letterSpacing: '-0.04em',
            textShadow: '0 0 80px rgba(139,92,246,0.35), 0 0 160px rgba(99,102,241,0.15)',
          }}
        >
          {TITLE.split('').map((char, i) => (
            <span
              key={i}
              className="hero-char inline-block bg-gradient-to-b from-white via-gray-100 to-gray-400 bg-clip-text text-transparent"
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Subtitle — typewriter */}
        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed opacity-0"
          style={{ minHeight: '4rem', textShadow: '0 1px 20px rgba(0,0,0,0.8)' }}
        />


      </div>

      {/* ── Scroll indicator ── */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-gray-500"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <ChevronDown className="w-4 h-4" />
      </div>
    </section>
  )
}
