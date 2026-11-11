# Forever & Always — Luxury 3D Romantic Proposal Experience

A five-star luxury, interactive 3D romantic proposal website designed for static hosting on **Cloudflare Pages** and version control on **GitHub**.

---

## 🚀 Cloudflare Pages Deployment Guide

### Option 1: Direct Git Integration via GitHub (Recommended)

1. Push this repository to **GitHub**.
2. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/) and navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select your repository and configure the build settings:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/` (leave empty or `/`)
4. Click **Save and Deploy**. Cloudflare Pages will automatically build and publish your website with a free SSL certificate and global CDN edge routing.

### Option 2: Direct Upload (Drag & Drop)

1. Build the production bundle locally:
   ```bash
   npm run build
   ```
2. In the Cloudflare Pages dashboard, select **Upload assets** under **Pages**.
3. Drag and drop the generated `dist/` folder.
4. Your site is instantly live!

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start local development server (http://localhost:3000)
npm run dev

# Run unit tests
npm test

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 💎 Features & Architecture

- **100% Frontend-Only**: Completely static React + TypeScript single-page application with zero server runtime dependencies.
- **Procedural 3D WebGL (Three.js)**: Custom procedural velvet ring box, realistic faceted diamond ring with transmission, floating rose petals, and golden light beam.
- **Procedural Web Audio API**: Romantic grand piano arpeggios, atmospheric pads, reveal chimes, and celebration fanfare synthesized in-browser with zero external audio assets required.
- **Interactive Storyline**:
  - Chapter I: The Milestones (interactive timeline with date cards and custom photos)
  - Chapter II: The Confession (digital royal love letter with illuminated drop-caps)
  - Chapter III: The Archive (asymmetric editorial memory photo gallery with full-screen lightbox)
  - Chapter IV: The Turning Point (3D ring box reveal, "WILL YOU MARRY ME?" and celebration confetti or respectful moment flow)
  - Chapter V: To Our Next Chapter (intertwined glowing rings and calligraphic signature)
- **Centralized Customization Studio**: Built-in customization modal allowing the proposer to customize all names, dates, milestones, letter text, gallery photos, and proposal questions with instant live preview and `localStorage` persistence.
- **Production Routing & Headers**: Includes `public/_redirects` for SPA routing and `public/_headers` for asset caching and security headers on Cloudflare Pages.
