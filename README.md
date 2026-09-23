# YummyVoo — Website

Marketing site for YummyVoo, built with **React + Vite**.

## Project structure

```
yummyvoo-site/
├── index.html              HTML shell (mounts <div id="root"> and loads /src/main.jsx)
├── package.json            Scripts and dependencies
├── vite.config.js
├── public/
│   └── assets/
│       └── sprite.svg      One shared SVG file: every icon + illustration used on the page
└── src/
    ├── main.jsx            React root; imports style.css
    ├── App.jsx             Loads the SVG sprite, injects the site markup, then boots
    │                       yummyvoo.js (with a proper teardown for React unmount)
    ├── siteMarkup.js       Body markup as a template-literal string (header, sections,
    │                       footer, and the <template>s for the phone app screens).
    │                       Injected via dangerouslySetInnerHTML.
    ├── yummyvoo.js         Runtime logic: builds phone-frame app screens from <template>s,
    │                       wires up header state, mobile menu, scroll-reveal, the app
    │                       preview rail, and injects real food photos via [data-img].
    └── style.css           All styles: design tokens, layout, components, responsive rules.
```

## Prerequisites

- Node.js 18+ and npm (or pnpm / yarn — everything below is shown with npm)

## Local development

```sh
npm install
npm run dev
```

Open http://localhost:5173/

## Production build

```sh
npm run build      # emits ./dist/
npm run preview    # serves the dist/ folder locally
```

## Editing content

- **Text, sections, footer, phone-screen templates** — edit `src/siteMarkup.js`.
- **Design tokens & CSS** — edit `src/style.css`.
- **Icons/illustrations** — edit `public/assets/sprite.svg`. Reference symbols with `<svg><use href="#id"/></svg>`.
- **Real food photos in `.ph` slots** — add `data-img="<url>"` on the `.ph` element (drop the `data-fd` attribute). `yummyvoo.js` will inject an `<img>` that fills the container (`object-fit: cover; border-radius: inherit`).
- **Runtime behavior** — edit `src/yummyvoo.js`. It exports `initYummyVoo()` which returns a teardown, so React can clean up listeners/observers on unmount / StrictMode remounts.

## Contact

admin@yummyvoo.com