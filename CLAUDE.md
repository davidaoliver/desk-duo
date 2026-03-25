# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Desk Duo is a B2B SaaS marketing website for salon, barbershop, and wellness business software. Built with Next.js (App Router), TypeScript, and Tailwind CSS v4.

## Commands

- `npm run dev` — Start dev server (http://localhost:3000)
- `npm run build` — Production build (also runs TypeScript checks)
- `npm run start` — Serve production build
- `npm run lint` — Run ESLint

## Architecture

- **Next.js App Router** with static generation (SSG) for SEO. All pages are pre-rendered as static HTML.
- **Tailwind CSS v4** using `@tailwindcss/postcss` plugin (not the legacy `tailwind.config.js` approach). Theme tokens are defined in `src/app/globals.css` via `@theme`.
- **No external CMS** — blog posts are defined as data in `src/lib/blog.ts`. Add new posts there.
- **SEO infrastructure**: `src/lib/metadata.ts` provides `createMetadata()` helper and JSON-LD structured data generators. Every page has unique meta tags, Open Graph, and canonical URLs. Sitemap (`/sitemap.xml`) and robots (`/robots.txt`) are generated from `src/app/sitemap.ts` and `src/app/robots.ts`.

## Key Files

- `src/lib/metadata.ts` — SEO metadata helpers and JSON-LD schema generators
- `src/lib/blog.ts` — Blog post data (add new posts here)
- `src/components/Header.tsx` — Site navigation (client component for mobile menu)
- `src/components/Footer.tsx` — Site footer with link sections
- `src/components/CTA.tsx` — Reusable call-to-action section
- `src/app/globals.css` — Tailwind theme tokens (colors, fonts)

## Products & Pricing

- Custom App: $60/mo
- AI Receptionist: $30/mo
- Self Check-In Kiosk: $20/mo
- AI Agents: Custom pricing

## Domain

Target domain: getdeskduo.com (hardcoded in metadata throughout `src/lib/metadata.ts`)
