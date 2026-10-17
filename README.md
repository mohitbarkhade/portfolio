# Mohit Barkhade — Portfolio Website

A fast, single-page portfolio for **Mohit Barkhade**, Validation & Automation Engineer at Unbox Robotics.
Pure static site — HTML, CSS and vanilla JavaScript. No build step, no dependencies.

## Structure

```
Website/
├── index.html              # Page markup + content
├── css/
│   └── styles.css          # Styles, animations, form & component rules
├── js/
│   └── main.js             # Skills filter, scroll-spy, back-to-top, contact form
├── assets/
│   └── Mohit-Barkhade-Resume.pdf   # Linked by the "Download CV" buttons
├── favicon.svg
└── README.md
```

## Features

- **Responsive** layout — hero, about, experience timeline, education, skills and contact.
- **Filterable skills grid** — All / Testing / Development / Infrastructure / Domain & work.
- **Scroll-spy navigation** — the current section is highlighted in the top nav.
- **Download CV** buttons wired to the resume PDF in `assets/`.
- **Contact form** — composes a pre-filled email in the visitor's mail app via `mailto:`
  (works on any static host, no backend needed).
- **Back-to-top** button, smooth scrolling, and reduced-motion support.
- SEO + Open Graph / Twitter meta tags and an SVG favicon.

## Run locally

It's a static site, so just open `index.html` in a browser — or serve it for clean paths:

```bash
# Python 3
python3 -m http.server 8080
```

Then visit **http://localhost:8080**.

## Deploy

Upload the folder as-is to any static host:

- **GitHub Pages** — push to a repo, enable Pages on the branch root.
- **Netlify / Vercel / Cloudflare Pages** — drag-and-drop the folder or connect the repo
  (no build command; publish directory is the project root).
- Any web server / S3 bucket — copy the files to the web root.

## Customising

- **Content & layout** — edit `index.html`.
- **Skills** — edit the `GROUPS` / `CATS` arrays near the top of `js/main.js`.
- **Colours & styling** — the palette lives in the `:root` variables at the top of `css/styles.css`
  (`--ink`, `--paper`, `--lime`).
- **Resume** — replace `assets/Mohit-Barkhade-Resume.pdf` (keep the filename, or update the two
  `href`s in `index.html`).
- **Contact target** — the recipient address is the `data-to` attribute on the
  `<form id="contact-form">` element in `index.html`.

### Want the form to send without opening a mail app?

The form currently uses `mailto:`. To receive submissions directly, point it at a form service
(e.g. Formspree, Web3Forms) by setting the form `action`/`method` and removing the `mailto`
handler in `js/main.js` — ask and this can be wired up.
