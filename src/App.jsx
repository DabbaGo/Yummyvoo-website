import { useEffect, useRef } from 'react'
import { siteMarkup } from './siteMarkup.js'
import { initYummyVoo } from './yummyvoo.js'

const SPRITE_URL = '/assets/sprite.svg'

export default function App() {
  const rootRef = useRef(null)

  useEffect(() => {
    let cleanupFns = []
    let cancelled = false

    // 1) Load the SVG sprite and inject it inline so <use href="#id"> resolves.
    const injectSprite = async () => {
      try {
        const res = await fetch(SPRITE_URL)
        if (!res.ok) throw new Error('Sprite request failed: ' + res.status)
        const svgMarkup = await res.text()
        if (cancelled) return
        const holder = document.createElement('div')
        holder.setAttribute('aria-hidden', 'true')
        holder.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden'
        holder.innerHTML = svgMarkup
        document.body.insertBefore(holder, document.body.firstChild)
        cleanupFns.push(() => holder.remove())
      } catch (err) {
        // Fail open — still boot the app so text/layout work.
        // eslint-disable-next-line no-console
        console.error('YummyVoo: could not load icon sprite (' + SPRITE_URL + ').', err)
      } finally {
        if (!cancelled) {
          const teardown = initYummyVoo()
          if (typeof teardown === 'function') cleanupFns.push(teardown)
        }
      }
    }

    injectSprite()

    return () => {
      cancelled = true
      cleanupFns.forEach((fn) => {
        try { fn() } catch { /* noop */ }
      })
    }
  }, [])

  return (
    <div ref={rootRef} dangerouslySetInnerHTML={{ __html: siteMarkup }} />
  )
}