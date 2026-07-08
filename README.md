# Aura — E-commerce Storefront (React)

React + Vite port of the Aura storefront: product catalog, filters, cart drawer,
simulated checkout, and an AI shopping assistant. Same design and behavior as the
static-HTML version, rebuilt as componentized, stateful React.

## Project structure

```
aura-react/
├── index.html                # Vite entry (loads /src/main.jsx)
├── src/
│   ├── main.jsx               # React root
│   ├── App.jsx                 # Assembles the page, mounts providers
│   ├── index.css               # Tailwind + custom styles (glass, spotlight, drawer/modal transitions...)
│   ├── data/products.js        # Product catalog (swap for a real API later)
│   ├── lib/lenis.js            # Lenis smooth-scroll singleton (GSAP ScrollTrigger wired in)
│   ├── context/
│   │   ├── CartContext.jsx     # Cart state, drawer, checkout, success flow
│   │   └── ToastContext.jsx    # Global toast notifications
│   └── components/
│       ├── Navbar.jsx
│       ├── Hero.jsx             # GSAP entrance + magnetic button
│       ├── FeaturedMarquee.jsx
│       ├── Catalog.jsx          # Owns filter/sort state
│       ├── FilterSidebar.jsx
│       ├── ProductGrid.jsx      # Loading skeleton, empty state, spotlight hover, stagger-in
│       ├── ProductCard.jsx
│       ├── Footer.jsx
│       ├── CartDrawer.jsx
│       ├── CheckoutModal.jsx
│       ├── SuccessOverlay.jsx
│       ├── Toast.jsx
│       └── Chatbot.jsx          # Calls /api/chat (see below)
├── api/chat.js                 # Serverless function proxying to Gemini
├── tailwind.config.js / postcss.config.js
├── vite.config.js
├── package.json
├── vercel.json
└── .env.example
```

### What changed structurally vs. the plain-HTML version
- **State is now React state**, not global mutable variables: cart lives in
  `CartContext`, filters/sort live in `Catalog`, chat history lives in `Chatbot`.
- **DOM manipulation → JSX.** Product cards, filter checkboxes, cart line items,
  and chat bubbles are rendered from arrays via `.map()` instead of built with
  `innerHTML` template strings.
- **GSAP/Lenis effects live in `useEffect` hooks** scoped to the component that
  owns the DOM node they animate (hero entrance in `Hero.jsx`, spotlight + stagger
  in `ProductGrid.jsx`, etc.), and clean up on unmount.
- The `.cart-open` / `.modal-open` body-class CSS transitions from the original
  are preserved as-is (toggled from `CartContext` via `useEffect`), so the drawer
  and checkout modal animate exactly like before.
- Tailwind now runs as a real build step (`tailwindcss` + `postcss`) instead of
  the CDN `<script>` version, which is faster and production-appropriate.
- Phosphor Icons are still loaded as the CDN icon-font script and used via
  `className="ph ph-x"` for a 1:1 visual match. If you'd rather have tree-shaken,
  no-CDN icons, swap to the `@phosphor-icons/react` component package — every
  `<i className="ph ph-x">` maps to an equivalent `<X />` import.

## ⚠️ About the AI chatbot / API key

Same as the static version: the chatbot never calls Gemini directly from the
browser. `src/components/Chatbot.jsx` posts to a same-origin `/api/chat`
endpoint; `api/chat.js` is a serverless function that holds the real
`GEMINI_API_KEY` server-side. Never put an API key in `src/` — anything there
ships to the browser in the built JS bundle.

**Before deploying:**
1. Get a key from https://aistudio.google.com/apikey
2. Set `GEMINI_API_KEY` as an environment variable on your hosting platform (not
   committed to git — see `.env.example`).

## Local development

```bash
npm install
npm run dev          # http://localhost:3000 — UI only, chatbot calls will fail
```

To exercise the chatbot locally too, run through Vercel's CLI so `/api/chat` is
served alongside the app:

```bash
npm i -g vercel
cp .env.example .env.local     # fill in your real key
npm run vercel-dev
```

## Deploying

### Vercel (recommended)
1. Push to a GitHub repo, import at https://vercel.com/new.
2. Vercel auto-detects the Vite app (`npm run build` → `dist/`) and the
   `api/chat.js` serverless function.
3. Add `GEMINI_API_KEY` under Settings → Environment Variables.
4. Deploy.

### Netlify
1. Build command `npm run build`, publish directory `dist`.
2. Move `api/chat.js` to `netlify/functions/chat.js`, adjusting its export to
   Netlify's handler signature.
3. Update the fetch URL in `Chatbot.jsx` from `/api/chat` to
   `/.netlify/functions/chat`.
4. Set `GEMINI_API_KEY` under Site settings → Environment variables.

### Static-only hosting (GitHub Pages, S3, etc.)
Run `npm run build` and deploy the `dist/` folder. These hosts can't run the
serverless function — either drop `<Chatbot />` from `App.jsx`, or point
`/api/chat` at a backend you host elsewhere.

## Known limitations (carried over from the original design)

- Product catalog is hardcoded in `src/data/products.js` — no real backend/database.
- Checkout is simulated (`CartContext.processPayment`): a 2-second fake delay
  then a success screen, no real payment provider integration.
- No persistence: cart resets on page reload. Add `localStorage` sync in
  `CartContext` (or swap in a backend) if you want it to survive refreshes.
