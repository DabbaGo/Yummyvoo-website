/*!
 * YummyVoo — yummyvoo.js (React port)
 * Builds the phone-frame app screens from <template>s, wires up the header,
 * mobile menu, scroll-reveal animations, and the app-preview rail.
 *
 * Exported as initYummyVoo() which returns a teardown function so React can
 * clean up listeners/observers on unmount.
 */
export function initYummyVoo() {
  const STORE_LINKS = { ios: '#', android: '#' }

  const $ = (s, r) => (r || document).querySelector(s)
  const $$ = (s, r) => Array.prototype.slice.call((r || document).querySelectorAll(s))

  const disposers = []
  const on = (target, ev, fn, opts) => {
    target.addEventListener(ev, fn, opts)
    disposers.push(() => target.removeEventListener(ev, fn, opts))
  }

  /* ---------- toast ---------- */
  const toast = $('#toast')
  let tt
  const say = (msg) => {
    if (!toast) return
    toast.textContent = msg
    toast.classList.add('show')
    clearTimeout(tt)
    tt = setTimeout(() => toast.classList.remove('show'), 2600)
  }

  $$('[data-store]').forEach((a) => {
    const u = STORE_LINKS[a.dataset.store]
    if (u && u !== '#') {
      a.href = u
      a.target = '_blank'
      a.rel = 'noopener'
    } else {
      a.setAttribute('data-soon', 'App store links are coming soon')
    }
  })

  const onDocClick = (e) => {
    const el = e.target.closest('[data-soon]')
    if (el) {
      e.preventDefault()
      say(el.getAttribute('data-soon'))
    }
  }
  on(document, 'click', onDocClick)

  /* ---------- illustrated food injector ---------- */
  const MAP = { w: 'width', l: 'left', r: 'right', t: 'top', b: 'bottom' }
  const food = (root) => {
    $$('[data-fd]', root).forEach((el) => {
      el.getAttribute('data-fd').split(';').forEach((spec) => {
        const t = spec.trim().split(/\s+/)
        const name = t.shift()
        let st = ''
        let cls = 'fd'
        t.forEach((k) => {
          if (k === 'fl') { cls += ' float'; return }
          const m = k.match(/^([a-z]+)(-?[\d.]+)$/)
          if (m && MAP[m[1]]) st += MAP[m[1]] + ':' + m[2] + '%;'
        })
        const vb = name === 'chef' ? '0 0 200 240' : '0 0 200 200'
        el.insertAdjacentHTML(
          'afterbegin',
          '<svg class="' + cls + '" viewBox="' + vb + '" style="' + st + '" aria-hidden="true"><use href="#f-' + name + '"/></svg>'
        )
      })
      el.removeAttribute('data-fd')
    })
  }

  const NAV = [
    ['home', 'i-home', 'HOME'],
    ['explore', 'i-compass', 'EXPLORE'],
    ['subs', 'i-cal', 'SUBS'],
    ['orders', 'i-receipt', 'ORDERS'],
    ['profile', 'i-user', 'PROFILE'],
  ]
  const chrome = (root) => {
    $$('[data-sb]', root).forEach((el) => {
      el.innerHTML = '<span>9:41</span><svg class="sbr"><use href="#sb"/></svg>'
      el.removeAttribute('data-sb')
    })
    $$('[data-nav]', root).forEach((el) => {
      const onName = el.getAttribute('data-nav')
      el.innerHTML = NAV.map(
        (n) => '<span' + (n[0] === onName ? ' class="on"' : '') + '><svg class="ic"><use href="#' + n[1] + '"/></svg>' + n[2] + '</span>'
      ).join('')
      el.removeAttribute('data-nav')
    })
  }

  /* ---------- real photos inside .ph containers via data-img ---------- */
  const photo = (root) => {
    $$('[data-img]', root).forEach((el) => {
      const src = el.getAttribute('data-img')
      if (!src) return
      // Make sure the container establishes a positioning + block context.
      el.style.display = 'block'
      el.style.position = 'relative'
      const img = document.createElement('img')
      img.src = src
      img.alt = ''
      img.loading = 'lazy'
      img.setAttribute(
        'style',
        [
          'position:absolute',
          'inset:0',
          'width:100%',
          'height:100%',
          'object-fit:cover',
          'border-radius:inherit',
          'display:block',
          'z-index:2',
          'pointer-events:none',
        ].join(';'),
      )
      img.addEventListener('error', () => {
        // Fail-visible so we can debug: show a magenta ring background if load fails.
        el.style.background = '#ff00aa'
      })
      el.appendChild(img)
      el.removeAttribute('data-img')
    })
  }

  /* ---------- phones ---------- */
  const phones = $$('.phone[data-screen]')
  phones.forEach((p) => {
    const tpl = $('#tpl-' + p.dataset.screen)
    if (!tpl) return
    p.innerHTML = '<div class="screen"></div><span class="island"></span>'
    const frag = tpl.content.cloneNode(true)
    const holder = document.createElement('div')
    holder.appendChild(frag)
    chrome(holder)
    food(holder)
    while (holder.firstChild) $('.screen', p).appendChild(holder.firstChild)
  })
  chrome(document)
  food(document)
  photo(document)

  const fit = (p) => {
    const w = p.offsetWidth
    if (!w) return
    p.style.setProperty('--u', (w / 100) + 'px')
    p.style.setProperty('--s', (w * 0.944 / 390).toFixed(4))
  }
  phones.forEach(fit)

  let ro
  if ('ResizeObserver' in window) {
    ro = new ResizeObserver((es) => es.forEach((e) => fit(e.target)))
    phones.forEach((p) => ro.observe(p))
    disposers.push(() => ro.disconnect())
  } else {
    const onResize = () => phones.forEach(fit)
    on(window, 'resize', onResize)
  }
  const onLoad = () => phones.forEach(fit)
  on(window, 'load', onLoad)

  /* ---------- header ---------- */
  const hdr = $('#hdr')
  const mb = $('#menuBtn')
  const onScroll = () => hdr && hdr.classList.toggle('scrolled', window.scrollY > 8)
  onScroll()
  on(window, 'scroll', onScroll, { passive: true })

  const closeMenu = () => {
    if (!hdr || !mb) return
    hdr.classList.remove('open')
    mb.setAttribute('aria-expanded', 'false')
    mb.setAttribute('aria-label', 'Open menu')
  }
  if (mb) {
    on(mb, 'click', () => {
      const o = hdr.classList.toggle('open')
      mb.setAttribute('aria-expanded', String(o))
      mb.setAttribute('aria-label', o ? 'Close menu' : 'Open menu')
    })
  }
  $$('.nav a').forEach((a) => on(a, 'click', closeMenu))
  on(document, 'keydown', (e) => { if (e.key === 'Escape') closeMenu() })
  on(window, 'resize', () => { if (window.innerWidth >= 1100) closeMenu() })

  let spy, io
  if ('IntersectionObserver' in window) {
    const links = $$('.nav a')
    spy = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting) {
          links.forEach((a) => a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id))
        }
      })
    }, { rootMargin: '-45% 0px -50% 0px' })
    ;['home', 'how', 'features', 'stories', 'eco', 'kitchens', 'about'].forEach((id) => {
      const s = document.getElementById(id)
      if (s) spy.observe(s)
    })
    disposers.push(() => spy.disconnect())

    io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in')
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' })
    $$('.rv').forEach((el) => io.observe(el))
    disposers.push(() => io.disconnect())
  } else {
    $$('.rv').forEach((el) => el.classList.add('in'))
  }

  /* ---------- app preview rail ---------- */
  const rail = $('#rail')
  const prev = $('#prev')
  const next = $('#next')
  if (rail && prev && next) {
    on(prev, 'click', () => rail.scrollBy({ left: -rail.clientWidth * 0.6, behavior: 'smooth' }))
    on(next, 'click', () => rail.scrollBy({ left: rail.clientWidth * 0.6, behavior: 'smooth' }))

    let down = false, sx = 0, sl = 0
    on(rail, 'pointerdown', (e) => {
      if (e.pointerType !== 'mouse') return
      down = true
      sx = e.clientX
      sl = rail.scrollLeft
      rail.classList.add('drag')
    })
    on(window, 'pointermove', (e) => { if (down) rail.scrollLeft = sl - (e.clientX - sx) })
    on(window, 'pointerup', () => { if (down) { down = false; rail.classList.remove('drag') } })
    on(rail, 'keydown', (e) => {
      if (e.key === 'ArrowRight') rail.scrollBy({ left: 280, behavior: 'smooth' })
      if (e.key === 'ArrowLeft') rail.scrollBy({ left: -280, behavior: 'smooth' })
    })
  }

  // Teardown for React StrictMode / unmount
  return () => {
    clearTimeout(tt)
    disposers.forEach((d) => { try { d() } catch { /* noop */ } })
  }
}