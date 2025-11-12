# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TD STUDIOS website - a Vite + React + TypeScript application built with shadcn/ui components and Tailwind CSS. Uses Supabase as a backend and features a patriotic USA theme with red, white, and blue color scheme.

## Development Commands

**Package Manager**: This project uses pnpm (v10.15.1+). Always use pnpm for consistency.

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Build for development
pnpm build:dev

# Lint code
pnpm lint

# Preview production build
pnpm preview

# Run tests
pnpm test

# Run tests with UI
pnpm test:ui

# Run tests with coverage
pnpm test:coverage
```

## Architecture

### Project Structure

- `src/pages/` - Page components (Index, About, Services, Contact, Pricing, Products, ProductDetail, MylarBags, NotFound)
- `src/components/` - Reusable UI components (Navigation, HeroSection, ServicesGrid, Footer, BrandMark, etc.)
- `src/components/ui/` - shadcn/ui component library (50+ pre-built components)
- `src/integrations/supabase/` - Supabase client configuration and type definitions
- `src/lib/` - Utility functions (cn utility for className merging)
- `src/hooks/` - Custom React hooks (use-toast, use-mobile, useCart)
- `public/tdstudios_assets/` - Brand assets and images
- `public/data/` - JSON data files for products and content

### Routing

Uses React Router v6 with lazy loading for pages. Routes are defined in `src/App.tsx`:
- `/` - Index/Home page
- `/about` - About page
- `/services` - Services page
- `/products` - Products listing page
- `/products/custom-mylar-bags` - Product detail page
- `/mylar-bags` - Mylar bags page
- `/premadedesigns` - Premade designs page
- `/contact` - Contact page
- `/pricing` - Pricing page
- `*` - 404 NotFound page (catch-all)

**Important**:
- Add all custom routes ABOVE the catch-all "*" route in App.tsx
- All pages are lazy-loaded using `React.lazy()` for code splitting
- Suspense boundary provides loading fallback during page transitions

### State Management

- React Query (@tanstack/react-query) for server state
- Query client configured in `src/App.tsx`
- CartProvider context (`src/hooks/useCart.tsx`) for shopping cart state with localStorage persistence
- No global state management (Redux/Zustand) - uses React Query and component state

**Cart System**:
- Cart context wraps entire app in `App.tsx`
- Uses `useCart()` hook to access cart state and methods
- Persists cart data to localStorage with key `tdstudios-cart`
- Cart items include: id, name, price, quantity, optional image/href/metadata
- Methods: `addItem`, `removeItem`, `updateQuantity`, `clearCart`
- Computed values: `subtotal`, `totalItems`

### Styling System

Uses a custom TD STUDIOS design system defined in `src/index.css`:

**Global Background**:
- Dynamic image mosaic background using designs from Supabase bucket
- 5x5 grid of rotating design images (25 cells)
- Images cycle automatically every 1.5 seconds with smooth fade-in animation
- 20% opacity with patriotic red/white/blue gradient overlays
- 70% black overlay for readability
- Implemented in `GlobalBackground` component, rendered globally in `App.tsx`
- All page content appears on top with proper z-index layering

**Brand Colors (HSL format)**:
- Primary: USA Blue (`--primary: 220 100% 50%`)
- Accent: USA Red (`--accent: 0 84% 60%`)
- Background: Black (`--background: 0 0% 0%`)
- Foreground: White (`--foreground: 0 0% 100%`)
- Card: Dark gray (`--card: 0 0% 5%`)
- Legacy Lightning Yellow preserved (`--lightning-yellow: 60 100% 50%`)

**Custom Gradient Classes**:
- `.gradient-primary` - Blue to red patriotic gradient
- `.gradient-patriotic` - Red, white, and blue gradient
- `.gradient-patriotic-stripes` - Patriotic striped gradient
- `.gradient-cannabis` - Yellow to white gradient (legacy)
- `.gradient-dark` - Black to dark gray gradient
- `.gradient-lightning` - Animated shimmer effect with keyframe animation (legacy)
- `.gradient-overlay` - Dark overlay with blue accent
- `.lightning-shimmer` - Continuous shimmer animation (10s duration)

**Custom Shadow Classes**:
- `.shadow-premium` - Blue glow shadow
- `.shadow-red-glow` - Red glow shadow
- `.shadow-dark` - Deep black shadow
- `.shadow-glow` - Blue glow effect

**Custom Transition Classes**:
- `.transition-smooth` - Smooth easing transition (0.4s cubic-bezier)
- `.transition-bounce` - Bounce effect transition (0.6s cubic-bezier)

**Custom Utility Classes**:
- `.text-gradient-primary` - Text with lightning yellow gradient fill
- `.hover-glow` - Adds glow effect and lift on hover

**Special Animation Effects**:
- `.hero-lightning` - Container for lightning animation effects (requires `.hero-lightning__pulses` and `.hero-lightning__bolts` children)
- `.lightning-divider` - Animated lightning bolt divider element
- Animations use keyframes: `shimmer`, `lightningPulse`, `lightningFlash`, `dividerPulse`

**Watermark System** (for design galleries):
- `.watermark-overlay` - Diagonal pattern overlay to protect designs
- `.logo-watermark` - Centered logo watermark with drop shadow

### Backend Integration

- Supabase client: `src/integrations/supabase/client.ts`
- Environment variables required:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_PUBLISHABLE_KEY`
- Authentication configured with localStorage persistence and auto-refresh
- Contact form submission via Formspree endpoint: `https://formspree.io/f/movkvrpz`
  - Used in `src/pages/Contact.tsx` and `src/pages/ContactForm.tsx`

### Path Aliases

TypeScript and Vite configured with `@/` alias:
```typescript
import { Component } from "@/components/Component"
import { supabase } from "@/integrations/supabase/client"
```

**Important**: React and React DOM are deduplicated in `vite.config.ts` to prevent multiple React instances. All imports resolve to the same `node_modules/react` and `node_modules/react-dom` instances.

### UI Components

This project uses shadcn/ui components. All UI components are in `src/components/ui/`. To use them:
```typescript
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
```

Common components available: accordion, alert-dialog, avatar, badge, button, calendar, card, carousel, checkbox, command, dialog, dropdown-menu, form, input, label, navigation-menu, popover, select, separator, sheet, sidebar, slider, switch, tabs, textarea, toast, tooltip, and many more.

### Utilities

- `cn()` function from `src/lib/utils.ts` - Merges Tailwind classes using clsx and tailwind-merge
- Use for conditional className composition: `cn("base-class", condition && "conditional-class")`

## Testing

The project uses Vitest with Testing Library for unit and component tests.

**Test Configuration**:
- Test runner: Vitest (configured in `vitest.config.ts`)
- Test environment: happy-dom (lightweight DOM implementation)
- Setup file: `src/test/setup.ts` (imports @testing-library/jest-dom matchers)
- Globals enabled: `describe`, `it`, `expect` available without imports
- CSS support: enabled for component testing

**Running Tests**:
```bash
# Run all tests in watch mode
pnpm test

# Run tests with UI dashboard
pnpm test:ui

# Run tests with coverage report
pnpm test:coverage
```

**Test File Locations**:
- Place test files adjacent to source files: `src/lib/utils.test.ts` for `src/lib/utils.ts`
- Use `.test.ts` or `.test.tsx` extension for test files
- Example test: `src/lib/utils.test.ts` tests the `cn()` utility function

## TypeScript Configuration

- `noImplicitAny: false` - Implicit any types allowed
- `strictNullChecks: false` - Null checks not enforced
- `noUnusedLocals: false` - Unused locals allowed
- `noUnusedParameters: false` - Unused parameters allowed
- Path mapping configured for `@/*` imports

## Deployment

Deploy this project using your preferred hosting platform (Vercel, Netlify, etc.):
- Build command: `pnpm build`
- Output directory: `dist`
- Environment variables: Configure `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`

## Asset Management

- Brand assets stored in `public/tdstudios_assets/`
- Primary logo: `/td-usa.png` (patriotic TD STUDIOS logo with American flag styling)
- Additional logos in `public/tdstudios_assets/` (tdstudios-256.png, tdstudios-512.png, tdstudios-1024.png)
- Design gallery images in `public/mylar-designs/` (100+ product images)
- Calypso mylars in `public/tdstudios_assets/calypso-mylars/`
- PWA icons and manifests in `public/`
- Storefront photo at `/tdstudios-storefront.jpg`
- Product configuration data in `public/data/tdstudios-options.json` (defines available sizes, colors, finishes, print styles, quantities, and addons)

## Key Features

**Premade Designs Gallery** (`/premadedesigns`):
- Fetches designs from Supabase `premade_designs` table
- Displays watermarked preview images to protect intellectual property
- Uses `.watermark-overlay` and `.logo-watermark` CSS classes
- Integrates with cart system for adding designs to cart
