# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

- `npm run dev` — start Next.js dev server
- `npm run build` — production build
- `npm run lint` — ESLint (extends `next/core-web-vitals` and `next/typescript`)
- No test framework is configured

## Architecture

Personal portfolio site built with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

### Content System

Blog posts and projects are **component-based, not MDX/markdown**. Each piece of content is a React component:

- **Blog posts**: defined as components in `src/app/blog/posts/`, metadata in `src/app/blog/posts-metadata.ts`, indexed by slug in `src/app/blog/posts/index.tsx`
- **Projects**: defined as components in `src/app/projects/projects/`, exported from `src/app/projects/projects/index.ts`
- **Marginalia**: short-form posts in `src/app/marginalia/posts/`, with their own `[slug]` dynamic route

Blog posts use building-block components from `src/app/blog/components/blog-section/` (codeblock, paragraph, section, quote, image-carousel, etc.).

### Key Directories

- `src/app/` — pages, API routes, and route-specific components
- `src/components/common/` — shared UI (nav, titles, dividers, tags, animations)
- `src/components/sections/` — home page sections (about, tech-stack, projects, blog, contact)
- `src/components/ascii-animations/` — ASCII art animations (sphere, cube, donut, dna)
- `src/components/gh-activity/` — GitHub contribution heatmap (server fetch + client render)

### Dynamic Routes

- `/blog/[name]` — blog post pages
- `/projects/[name]` — project detail pages
- `/marginalia/[slug]` — marginalia entries

### API Routes

- `GET /api/github-activity` — fetches GitHub contribution calendar via GraphQL, uses `GITHUB_TOKEN` env var

### Context Providers

- `FootnoteContext` — manages footnote state within blog posts
- `ExpandedImageContext` — manages image modal state

## Code Style

- **Naming**: PascalCase for components, kebab-case for files/directories
- **Imports**: `@/` alias maps to `src/`
- **Styling**: Tailwind utility classes inline, `clsx` for conditional classes
- **Animations**: `motion/react` library (Framer Motion), using `initial`/`animate`/`whileHover` patterns
- **Fonts**: Roboto, Newsreader, Outfit, Roboto Condensed (configured in root layout)
- **Components**: functional components with typed props interfaces
- **Client components**: use `"use client"` directive; server components are the default

## Theme

Custom Tailwind v4 theme defined in `globals.css`:
- Background: `#d5d0c3` (warm beige)
- Foreground: `#171717` (near-black)
- Accent: `#d44527` (burnt orange)

## Environment Variables

- `GITHUB_TOKEN` — GitHub API auth for contribution calendar
- `GITHUB_LOGINS` — comma-separated GitHub usernames
- `NEXT_PUBLIC_SITE_URL` — base URL for sitemap/OG images (defaults to `http://localhost:3000`)
