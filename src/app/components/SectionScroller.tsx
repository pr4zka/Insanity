'use client'

import { useEffect, useRef, Children, ReactNode, useState } from 'react'
import { gsap } from 'gsap'
import { SectionContext } from './SectionContext'

/**
 * SectionScroller — full-page scroll with GSAP.
 *
 * Desktop (wheel):  lets native scroll consume events inside the section;
 *                   only navigates when the inner panel hits top / bottom.
 * Mobile (touch):   evaluates scroll position at touchend (accurate) before
 *                   deciding whether to navigate.
 * 120 fps:          expo.inOut, force3D, will-change on every animated layer.
 */
export function SectionScroller({
  children,
  overlay,
}: {
  children: ReactNode
  overlay?: ReactNode
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const gotoRef      = useRef<(i: number) => void>(() => {})

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

    // ── helpers ─────────────────────────────────────────────────
    const getInner   = () => innerWraps[currentIndex] as HTMLElement
    const atTop      = (el: HTMLElement) => el.scrollTop <= 2
    const atBottom   = (el: HTMLElement) =>
      el.scrollTop >= el.scrollHeight - el.clientHeight - 10
    const isOverflow = (el: HTMLElement) =>
      el.scrollHeight > el.clientHeight + 10

    function gotoSection(index: number, direction: number) {
      index     = wrap(index)
      animating = true

      // Reset the incoming section's scroll position
      ;(innerWraps[index] as HTMLElement).scrollTop = 0

      const dFactor = direction === -1 ? -1 : 1

      const tl = gsap.timeline({
        defaults: { duration: 1.0, ease: 'expo.inOut', force3D: true },
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
        { yPercent: (i: number) => (i ? -100 * dFactor : 100 * dFactor) },
        { yPercent: 0 },
        0,
      ).fromTo(bgPanels[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0)

      currentIndex = index
      setActiveIndex(index)
    }

    gotoRef.current = (i: number) => {
      if (!animating && i !== currentIndex) {
        gotoSection(i, i > currentIndex ? 1 : -1)
      }
    }

    // ── Desktop: wheel ───────────────────────────────────────────
    // Native scroll is consumed first; we only step sections at the boundary.
    const handleWheel = (e: WheelEvent) => {
      if (animating) { e.preventDefault(); return }
      const inner = getInner()
      if (!inner) return

      if (e.deltaY > 0) {
        // Scrolling down
        if (isOverflow(inner) && !atBottom(inner)) return   // let native scroll handle
        e.preventDefault()
        gotoSection(currentIndex + 1, 1)
      } else {
        // Scrolling up
        if (isOverflow(inner) && !atTop(inner)) return      // let native scroll handle
        e.preventDefault()
        gotoSection(currentIndex - 1, -1)
      }
    }
    container.addEventListener('wheel', handleWheel, { passive: false })

    // ── Mobile: touch ────────────────────────────────────────────
    // Capture scroll position at touchstart; decide navigation at touchend
    // (after native scroll has already moved the content).
    let touchStartY         = 0
    let touchStartScrollTop = 0

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY         = e.touches[0].clientY
      touchStartScrollTop = getInner()?.scrollTop ?? 0
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (animating) return
      const dy    = touchStartY - e.changedTouches[0].clientY   // + = swipe up
      if (Math.abs(dy) < 40) return                              // too small

      const inner = getInner()

      if (dy > 0) {
        // Swiped up → scroll/navigate down
        if (inner && isOverflow(inner) && !atBottom(inner)) return
        gotoSection(currentIndex + 1, 1)
      } else {
        // Swiped down → scroll/navigate up
        if (inner && isOverflow(inner) && !atTop(inner)) return
        gotoSection(currentIndex - 1, -1)
      }
    }

    container.addEventListener('touchstart', handleTouchStart, { passive: true })
    container.addEventListener('touchend',   handleTouchEnd,   { passive: true })

    gotoSection(0, 1)

    return () => {
      container.removeEventListener('wheel',        handleWheel)
      container.removeEventListener('touchstart',   handleTouchStart)
      container.removeEventListener('touchend',     handleTouchEnd)
    }
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
            <div
              className="ss-outer"
              style={{ width: '100%', height: '100%', overflow: 'hidden', willChange: 'transform' }}
            >
              <div
                className="ss-inner"
                style={{
                  width: '100%', height: '100%',
                  overflowY: 'auto', overflowX: 'hidden',
                  willChange: 'transform',
                  scrollbarWidth: 'none',
                }}
              >
                <div
                  className="ss-bg"
                  style={{ minHeight: '100%', position: 'relative', willChange: 'transform' }}
                >
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
