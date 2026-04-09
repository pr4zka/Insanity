'use client'

import { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ArrowRight, Sparkles, MessageCircle, Mail } from 'lucide-react'
import { Button } from './ui/button'

gsap.registerPlugin(useGSAP)

type Particle = { left: string; top: string; duration: number; delay: number }

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const orb1Ref = useRef<HTMLDivElement>(null)
  const orb2Ref = useRef<HTMLDivElement>(null)
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    setParticles(
      Array.from({ length: 30 }, () => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: Math.random() * 4 + 3,
        delay: Math.random() * 2,
      }))
    )
  }, [])

  // Static entrance + loop animations
  useGSAP(() => {
    // Background scale pulse
    gsap.fromTo(
      bgRef.current,
      { scale: 1.1 },
      { scale: 1, duration: 20, repeat: -1, yoyo: true, ease: 'none' }
    )

    // Text entrance stagger
    gsap.from(['.hero-badge', '.hero-title', '.hero-subtitle', '.hero-ctas', '.hero-contacts'], {
      opacity: 0,
      y: 20,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out',
    })

    // Orb 1 floating
    gsap.to(orb1Ref.current, {
      x: 50, y: 30, scale: 1.2,
      duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut',
    })

    // Orb 2 floating
    gsap.to(orb2Ref.current, {
      x: -50, y: -30, scale: 1.3,
      duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut',
    })
  }, { scope: sectionRef })

  // Particle animations — re-run when particles are generated
  useGSAP(() => {
    if (!particles.length) return
    gsap.utils.toArray<HTMLElement>('.hero-particle').forEach((el, i) => {
      const p = particles[i]
      if (!p) return
      gsap.fromTo(
        el,
        { y: 0, opacity: 0.2, scale: 0.5 },
        {
          y: -30, opacity: 1, scale: 1.2,
          duration: p.duration,
          repeat: -1, yoyo: true,
          ease: 'sine.inOut',
          delay: p.delay,
        }
      )
    })
  }, { scope: sectionRef, dependencies: [particles], revertOnUpdate: true })

  const handleWhatsApp = () => {
    window.open('https://wa.me/1234567890?text=Hola%20INSANITY,%20me%20gustaría%20más%20información', '_blank')
  }

  const handleEmail = () => {
    window.location.href = 'mailto:contacto@insanity.com'
  }

  return (
    <section ref={sectionRef} className="relative h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1639322537228-f710d846310a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHRlY2hub2xvZ3klMjBuZXR3b3JrJTIwZGFya3xlbnwxfHx8fDE3NzU3MTE5NjR8MA&ixlib=rb-4.1.0&q=80&w=1080')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black z-0" />

      {/* Floating Particles */}
      <div className="absolute inset-0 z-0">
        {particles.map((p, i) => (
          <div
            key={i}
            className="hero-particle absolute w-2 h-2 bg-white rounded-full"
            style={{ left: p.left, top: p.top, opacity: 0.2 }}
          />
        ))}
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center">
        <div className="hero-badge flex items-center justify-center gap-2 mb-6">
          <Sparkles className="w-6 h-6 text-purple-400" />
          <span className="text-purple-300 text-sm uppercase tracking-wider">Innovación sin límites</span>
        </div>

        <h1 className="hero-title text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-gray-200 via-white to-gray-300 bg-clip-text text-transparent">
          INSANITY
        </h1>

        <p className="hero-subtitle text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Transformamos ideas en soluciones digitales extraordinarias.
          Tecnología de vanguardia para impulsar tu negocio al futuro.
        </p>

        <div className="hero-ctas flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="bg-white text-black hover:bg-gray-200 px-8 py-6 text-lg font-semibold">
            Comenzar ahora
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button size="lg" variant="outline" className="border-gray-400 text-gray-300 hover:bg-gray-900/30 px-8 py-6 text-lg">
            Ver servicios
          </Button>
        </div>

        <div className="hero-contacts flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={handleWhatsApp}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-medium transition-colors shadow-lg shadow-green-900/50"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp
          </button>
          <button
            onClick={handleEmail}
            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-full font-medium transition-colors shadow-lg shadow-gray-900/50"
          >
            <Mail className="w-5 h-5" />
            Email
          </button>
        </div>
      </div>

      {/* Gradient Orbs */}
      <div ref={orb1Ref} className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/30 rounded-full blur-3xl pointer-events-none" />
      <div ref={orb2Ref} className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gray-600/20 rounded-full blur-3xl pointer-events-none" />
    </section>
  )
}
