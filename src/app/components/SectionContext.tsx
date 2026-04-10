'use client'

import { createContext, useContext } from 'react'

interface SectionContextValue {
  activeIndex: number
  total: number
  goto: (index: number) => void
}

export const SectionContext = createContext<SectionContextValue>({
  activeIndex: 0,
  total: 0,
  goto: () => {},
})

export function useSectionContext() {
  return useContext(SectionContext)
}
