# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Project Overview

Professional bilingual (English/Spanish) doula website for Viomar Güerere — [VioLaDoula.com](https://www.violadoula.com). Provides doula services, HypnoBirthing® courses, and motherhood coaching. Business entity: **Vida Buena Vibra LLC** (dba Vio La Doula).

## Technology Stack

- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite 7.0.0 (requires Node.js 20.19.0+)
- **Styling:** Tailwind CSS 3.4.17 with custom brand colors
- **Routing:** React Router (for legal pages)
- **Internationalization:** react-i18next for English/Spanish toggle
- **Forms:** react-hook-form with validation
- **Email:** @emailjs/browser (production — Service ID: `service_kd7nnoj`, Public Key: `9l2ro5MAeErk2Bug4`)
- **SEO:** react-helmet-async, JSON-LD structured data in index.html
- **Icons:** Lucide React
- **Animations:** Framer Motion (installed, not yet implemented)

## Development Setup

```bash
# Start development server (recommended)
./dev.sh

# OR manual method:
npm run dev
```

- `npm run dev` — Dev server at http://localhost:5173/
- `npm run build` — Production build
- `npm run preview` — Preview production build
- `.npmrc` has `legacy-peer-deps=true` for React 19 compatibility

## Brand Guidelines

### Color Palette (from `/Brand Assets/Brand Color Palette.png`)
- **Cream tones:** #FAF3E3, #FBEBD2, #F7D4B6, #FFCFBB, #EBD0BB
- **Coral tones:** #FDD19C, #FCA669, #D17D44 (terracotta — primary text color)
- **Sage/Blue tones:** #C5E1E0, #C5D9E7, #83ABAD (dark teal accent)
- **Lavender tones:** #EAE3EA, #E4CEDB
- **Accent colors:** #FFE28A (yellow), #F48EAB (pink accent)
- **Key rule:** No black/gray text — all text uses warm dark brown (#D17D44)

### Typography
- **Headings:** Bogart Light (weight 200) — licensed premium font, @font-face in index.css
- **Body:** Lato (300, 400, 700) from Google Fonts
- **Fallback:** Serif fonts

### Logo Assets (in `/public/`)
- **Primary:** `VD_ARCH-LOGO_CREAM.png` — Circular botanical tree logo (Hero section)
- **Secondary:** `VD_SECONDARY-LOGO_CREAM.png` — Badge-style logo (Header/Footer)
- **Background:** `watercolor-pattern-2.png` — Full-page watercolor pattern
- **Portrait:** `Viomar_Professional_Portrait.jpg` — About section

## Project Structure

```
src/
├── components/
│   ├── Header.tsx              Responsive nav, language toggle, brand logo
│   ├── Hero.tsx                Brand messaging, CTAs, watercolor background
│   ├── About.tsx               Bio, portrait, credentials, personal birth story
│   ├── Services.tsx            2-tier doula packages (Essentials/Premium)
│   ├── HypnobirthingForm.tsx   Course enrollment with validation + EmailJS
│   ├── Coaching.tsx            Session types and booking info
│   ├── DueDateCalculator.tsx   Interactive pregnancy tracking tool
│   ├── Contact.tsx             Contact form, bilingual FAQ, contact info
│   ├── Footer.tsx              Social links, nav, Vida Buena Vibra LLC copyright
│   ├── TermsOfService.tsx      Bilingual Terms of Service page
│   ├── PrivacyPolicy.tsx       Bilingual Privacy Policy page
│   ├── SEOHead.tsx             Dynamic meta tag management
│   └── DecorativeElements.tsx  Botanical SVG components
├── utils/
│   ├── emailService.ts         EmailJS integration + auto-reply system
│   ├── navigation.ts           Smooth scrolling, service pre-population
│   ├── seo.ts                  SEO configs for all pages
│   └── schemas.ts              JSON-LD structured data schemas
├── i18n/
│   ├── i18n.ts                 i18n configuration
│   └── locales/
│       ├── en.json             English translations
│       └── es.json             Spanish translations
├── App.tsx                     Main app with React Router
├── main.tsx                    Entry point with BrowserRouter
└── index.css                   Tailwind + Bogart Light @font-face
```

## Current Business Information

### Service Packages
- **The Essentials ($2,200):** Unlimited phone/email support, 2 prenatal visits, birth plan, unlimited labor support, postpartum + breastfeeding support, 1 postpartum visit, HypnoBirthing® basics session
- **The Premium ($2,500):** All Essentials + 3 prenatal visits (vs 2), extra TLC. Marked "Most Popular"
- All packages include a backup doula
- Payment: 36-week gestation deadline

### HypnoBirthing® Courses
- Group sessions: $350
- Individual sessions: $650

### Professional Credentials
1. Certified Full-Spectrum Doula
2. Certified HypnoBirthing® Educator ([directory link](https://hypnobirthing.com/directory/hypnobirthing/the-woodlands/viomar-guerere/))
3. Certified Motherhood Coach
- Always use ® symbol with HypnoBirthing

### Location & Contact
- **Service area:** The Woodlands, Spring, Conroe, Greater North Houston Area
- **Brand identity:** "Vio" / "Your Doula Latina"
- **Languages:** Native Spanish, fluent English

### Social Media
- **Instagram:** @vio_ladoula
- **YouTube:** @vio_ladoula
- **Facebook:** vio.ladoula

## SEO Implementation

### Technical SEO (all live)
- `index.html` contains pre-rendered meta tags, Open Graph, Twitter Cards, and JSON-LD (LocalBusiness + Person schemas) — critical for Google crawling since React is client-side rendered
- `src/utils/seo.ts` — Per-section SEO configs
- `src/utils/schemas.ts` — Structured data schemas (LocalBusiness, ProfessionalService, Person, Course)
- `public/robots.txt` and `public/sitemap.xml` — Crawler directives
- Google Search Console connected, sitemap submitted
- Rich Results validated: 2 valid items (LocalBusiness + Organization)

### Local SEO Targeting
- Primary keywords: "The Woodlands doula", "birth doula The Woodlands"
- Geographic coordinates: 30.1588° N, 95.4892° W
- Bilingual hreflang tags for English/Spanish

## Email System

### EmailJS (production active)
- **Service ID:** `service_kd7nnoj`
- **Public Key:** `9l2ro5MAeErk2Bug4`
- **Templates:** `contact_template`, `hypnobirthing_template`
- **Auto-reply:** `sendAutoReply()` function sends branded confirmation emails
- Both Contact and HypnoBirthing forms include Terms/Privacy agreement checkboxes

## Deployment

- **Hosting:** GitHub Pages via GitHub Actions
- **Domain:** www.violadoula.com (custom domain configured)
- **Repository:** github.com/ahutto87/VLD
- **Branch:** main
- Push to main triggers automatic build and deploy

### Known Development Notes
- Use `./dev.sh` to start dev server (handles nvm and clean startup)
- `.npmrc` required for React 19 peer dependency compatibility
- `index.html` must keep its structured data — do not strip meta tags or JSON-LD
- All sections have transparent backgrounds to show watercolor pattern
- Tailwind v3.4.17 (not v4) for PostCSS compatibility

## Content Guidelines

- Professional but warm tone
- Emphasis on comfort, safety, and empowerment
- Cultural sensitivity for Spanish-speaking clients
- Evidence-based information about birth and HypnoBirthing®
- Clear pricing and service descriptions
- "Vio" as primary brand identity, "Your Doula Latina" positioning
- Spanish hero title: "Acompañándote hacia un Nacimiento Empoderado"

## Pending / Future Work

### High Priority
- **Google Analytics 4** — Setup for performance tracking
- **Blog Section** — Article filtering, search, botanical styling for ongoing SEO content
- **Google My Business** — Profile optimization and review collection

### Medium Priority
- **Accessibility** — ARIA labels, keyboard navigation, contrast improvements
- **Performance** — Image lazy loading, Core Web Vitals optimization
- **Framer Motion animations** — Smooth transitions and micro-interactions

### Low Priority
- **Client portal / advanced booking** system integration
- **Newsletter** signup functionality
- **Progressive Web App** — Service worker, offline support

## Development History (Summary)

| Date | Key Changes |
|------|------------|
| Dec 2024 | Initial build: React/TS/Vite, brand colors, bilingual i18n, HypnoBirthing® trademark compliance, watercolor background, "Vio" branding |
| Jun 2025 | Bogart Light premium fonts, Woodlands location update, credential updates, pricing for group/individual HypnoBirthing® |
| Aug 2025 | Dev environment fix (caching resolved), button/form functionality, EmailJS integration, comprehensive SEO with structured data, FAQ updates |
| Sep 2025 | Auto-reply email system, social media links corrected (@vio_ladoula), Google My Business setup guide |
| Oct 2025 | Simplified to 2 packages (Essentials $2,200 / Premium $2,400), certification updates, critical SEO fix (structured data in index.html) |
| Dec 2025 | Hero/about content updates — personal birth story, expanded taglines |
| Jan 2026 | LLC branding (Vida Buena Vibra LLC), legal pages (Terms of Service, Privacy Policy), React Router, form consent checkboxes, Premium price to $2,500 |
