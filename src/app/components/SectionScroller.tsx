'use client'

import { useEffect, useRef, Children, ReactNode, useState } from 'react'
import { gsap } from 'gsap'
import { Observer } from 'gsap/Observer'
import { SectionContext } from './SectionContext'

gsap.registerPlugin(Observer)

/**
 * SectionScroller — full-page scroll hijacking with GSAP Observer.
 * Provides SectionContext so child components know which section is active.
 */
export function SectionScroller({
  children,
  overlay,
}: {
  children: ReactNode
  overlay?: ReactNode
}) {
  const containerRef  = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const gotoRef       = useRef<(i: number) => void>(() => {})

  const childArray = Children.toArray(children)
  const total      = childArray.length

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const sections   = gsap.utils.toArray<HTMLElement>('.ss-section',  container)
    const outerWraps = gsap.utils.toArray<HTMLElement>('.ss-outer',    container)
    const innerWraps = gsap.utils.toArray<HTMLElement>('.ss-inner',    container)
    const bgPanels   = gsap.utils.toArray<HTMLElement>('.ss-bg',       container)

    if (sections.length === 0) return

    let currentIndex = -1
    let animating    = false
    const wrap       = gsap.utils.wrap(0, sections.length)

    gsap.set(outerWraps, { yPercent: 100 })
    gsap.set(innerWraps, { yPercent: -100 })

    function gotoSection(index: number, direction: number) {
      index     = wrap(index)
      animating = true
      const dFactor = direction === -1 ? -1 : 1

      const tl = gsap.timeline({
        defaults: { duration: 0.85, ease: 'power2.inOut' },
        onComplete: () => { animating = false },
      })

      if (currentIndex >= 0) {
        gsap.set(sections[currentIndex], { zIndex: 0 })
        tl.to(bgPanels[currentIndex], { yPercent: -15 * dFactor })
          .set(sections[currentIndex], { autoAlpha: 0 })
      }

      gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 })
      tl.fromTo(
        [outerWraps[index], innerWraps[index]],
        { yPercent: (i: number) => i ? -100 * dFactor : 100 * dFactor },
        { yPercent: 0 },
        0
      )
      .fromTo(bgPanels[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0)

      currentIndex = index
      setActiveIndex(index)
    }

    gotoRef.current = (i: number) => {
      if (!animating && i !== currentIndex) {
        gotoSection(i, i > currentIndex ? 1 : -1)
      }
    }

    const observer = Observer.create({
      type: 'wheel,touch,pointer',
      wheelSpeed: -1,
      onDown: () => !animating && gotoSection(currentIndex - 1, -1),
      onUp:   () => !animating && gotoSection(currentIndex + 1,  1),
      tolerance: 10,
      preventDefault: true,
    })

    gotoSection(0, 1)

    return () => { observer.kill() }
  }, [])

  return (
    <SectionContext.Provider
      value={{ activeIndex, total, goto: (i) => gotoRef.current(i) }}
    >
      <div ref={containerRef} className="h-screen overflow-hidden">
        {overlay}
        {childArray.map((child, i) => (
          <div
            key={i}
            className="ss-section"
            style={{ position: 'fixed', inset: 0, visibility: 'hidden', zIndex: 0 }}
          >
            <div className="ss-outer" style={{ width: '100%', height: '100%', overflowY: 'hidden', willChange: 'transform' }}>
              <div className="ss-inner" style={{ width: '100%', height: '100%', overflowY: 'hidden', willChange: 'transform' }}>
                <div className="ss-bg" style={{ position: 'absolute', inset: 0, willChange: 'transform' }}>
                  {child}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionContext.Provider>
  )
}
