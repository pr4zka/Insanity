'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { useSectionContext } from './SectionContext'

const LABELS = ['Hero', 'Estadísticas', 'Servicios', '¿Por qué nosotros?', 'Portfolio', 'Contacto', 'Footer']

export function SectionDots() {
  const { activeIndex, total, goto } = useSectionContext()
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Fade in after BigBang
    gsap.fromTo(wrapRef.current, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 1, delay: 5.2, ease: 'power2.out' })
  }, [])

  return (
    <div
      ref={wrapRef}
      className="fixed right-5 top-1/2 -translate-y-1/2 z-[9990] hidden md:flex flex-col gap-3 items-end opacity-0"
      aria-label="Navegación de secciones"
    >
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => goto(i)}
          className="group flex items-center gap-2.5 cursor-pointer"
          aria-label={`Ir a ${LABELS[i] ?? `Sección ${i + 1}`}`}
        >
          {/* Hover label */}
          <span className="text-gray-400 text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap select-none">
            {LABELS[i] ?? `${i + 1}`}
          </span>

          {/* Dot — pill when active */}
          <div
            className="rounded-full transition-all duration-300"
            style={{
              width:      activeIndex === i ? '22px' : '7px',
              height:     '7px',
              background: activeIndex === i
                ? 'linear-gradient(90deg, #a855f7, #6366f1)'
                : 'rgba(255,255,255,0.22)',
              boxShadow:  activeIndex === i ? '0 0 10px rgba(168,85,247,0.55)' : 'none',
            }}
          />
        </button>
      ))}
    </div>
  )
}
