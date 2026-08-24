# SMT Furniture Solutions — Premium Website

A complete, premium frontend prototype for **SMT Furniture Solutions**, a furniture fittings company based in Muscat, Oman.

## Design Philosophy

- **70% White / Warm White** — Clean, spacious, breathable
- **20% Charcoal / Black** — Strong contrast, editorial depth  
- **10% Rust Orange (#B85C38)** — Brand accent for CTAs, labels, hover states

Inspired by luxury furniture brands like Hettich, Blum, and Häfele. Built with editorial layouts, large typography, generous whitespace, and cinematic imagery.

## Tech Stack

- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS
- Framer Motion (animations)
- Lucide React (icons)
- React Router (routing)

## Project Structure

```
src/
  components/        # Reusable UI components
    Navbar.tsx       # Sticky nav with mega menu, mobile menu, search
    Footer.tsx       # Premium footer with brand statement
    AIChat.tsx       # Floating AI assistant widget
    BackToTop.tsx    # Animated back-to-top button
    Newsletter.tsx   # Dark newsletter signup section
    CustomCursor.tsx # Desktop custom cursor with spring physics
  pages/             # Route-level pages
    Home.tsx         # Full homepage with 12+ sections
    Products.tsx     # Product listing with search/filter
    ProductDetail.tsx # Individual product page
    Solutions.tsx    # Tabbed solutions showcase
    Inspiration.tsx  # Magazine-style articles
    Projects.tsx     # Case studies
    Resources.tsx    # Download center
    About.tsx        # Company story
    Contact.tsx      # Contact form
    NotFound.tsx     # 404 error page
  data/              # Mock data (CMS-ready)
    products.ts
    company.ts
    articles.ts
    projects.ts
    resources.ts
  hooks/             # Custom React hooks
    useScrollAnimation.ts
    useCounter.ts
  App.tsx            # Router with page transitions
  main.tsx           # Entry point
```

## Getting Started

```bash
cd smt-website
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Features

### Navigation
- ✅ Sticky navigation with transparent → solid transition
- ✅ Mega menu for Products (6 categories with images)
- ✅ Mobile hamburger menu with animated overlay
- ✅ Full-screen search overlay with popular searches
- ✅ Language selector placeholder

### Homepage Sections
- ✅ Hero with cinematic imagery and scroll indicator
- ✅ Brand statement with large editorial typography
- ✅ Product categories grid (6 categories, editorial layout)
- ✅ Featured product showcase with specs
- ✅ Solutions for every space (tabbed interface)
- ✅ Statistics with animated counters (25+ years, 500+ solutions, etc.)
- ✅ Technology section with dark background
- ✅ Inspiration / magazine articles
- ✅ Case study showcase
- ✅ Services / support grid
- ✅ Resources & download center with filtering
- ✅ Audience segments
- ✅ Newsletter signup
- ✅ Contact CTA

### Pages
- ✅ Product listing with search & category filters
- ✅ Product detail with specs, benefits, related products
- ✅ Solutions with tabbed image showcase
- ✅ Inspiration (magazine-style editorial)
- ✅ Projects (alternating case study layouts)
- ✅ Resources (downloadable documents with filters)
- ✅ About (company story, values, stats)
- ✅ Contact (form with validation & success state)
- ✅ 404 Not Found

### Interactions
- ✅ AI chat widget with mock responses
- ✅ Custom cursor (desktop only, spring physics)
- ✅ Back-to-top button (appears after scroll)
- ✅ Cookie consent banner
- ✅ Page transitions (fade/slide)
- ✅ Scroll-triggered animations (Framer Motion)
- ✅ Animated counters
- ✅ Image hover zoom effects
- ✅ Button arrow animations
- ✅ Mobile touch-friendly interactions

### Design
- ✅ Premium rust-orange accent system
- ✅ Editorial typography hierarchy
- ✅ Generous whitespace
- ✅ Dark/light section rhythm
- ✅ Section numbers (01, 02, 03...)
- ✅ Consistent micro-interactions
- ✅ Fully responsive (desktop, tablet, mobile)

## CMS-Ready Architecture

All content is stored in `src/data/` files. To connect a backend CMS later, simply replace the mock data imports with API calls. The component architecture is designed to accept data as props, making the transition seamless.

## License

Prototype for demonstration purposes.
