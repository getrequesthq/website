'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const SCROLL_ANIMATE_SELECTORS = [
  '.animate-in',
  '.section__header',
  '.feature-card',
  '.step',
  '.pricing-card',
  '.card--pain',
  '.feature-section__layout',
  '.use-case-card',
  '.persona-card',
  '.post-card',
  '.faq-item',
  '.cta-section .container',
  '.comparison-table',
].join(', ')

export function ScrollAnimations() {
  const pathname = usePathname()

  useEffect(() => {
    const elements = document.querySelectorAll(SCROLL_ANIMATE_SELECTORS)
    const targets = Array.from(elements).filter(el => !el.classList.contains('visible'))
    if (!targets.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [pathname])

  return null
}
