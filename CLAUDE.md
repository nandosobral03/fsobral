# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

- `bun run dev` — start Next.js dev server
- `bun run build` — production build
- `bun run lint` — ESLint (extends `eslint-config-next`)
- No test framework is configured

## Workflow

- **Do not create git commits** — the user handles all commits
- Deployed on **Vercel** (auto-deploys on push to master)

## Architecture

Personal portfolio site built with **Next.js (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

### Content System

Blog posts and projects are **component-based, not MDX/markdown**. Each piece of content is a React component:

- **Blog posts**: defined as components in `src/app/blog/posts/`, metadata in `src/app/blog/posts-metadata.ts`, indexed by slug in `src/app/blog/posts/index.tsx`
- **Projects**: defined as components in `src/app/projects/projects/`, exported from `src/app/projects/projects/index.ts`
- **Marginalia**: short-form posts in `src/app/marginalia/posts/`, with their own `[slug]` dynamic route

Blog posts use building-block components from `src/app/blog/components/blog-section/` (codeblock, paragraph, section, quote, image-carousel, etc.).

## Code Style

- **Naming**: PascalCase for components, kebab-case for files/directories
- **Imports**: `@/` alias maps to `src/`
- **Styling**: Tailwind utility classes inline, `clsx` for conditional classes
- **Animations**: `motion/react` library (Framer Motion), using `initial`/`animate`/`whileHover` patterns
- **Components**: functional components with typed props interfaces
- **Client components**: use `"use client"` directive; server components are the default

## Changelog

When making significant changes to the site (new features, new content, design changes, major refactors), add an entry to the changelog at `src/app/marginalia/posts/changelog/changelog-entries.ts`. Prepend a new object to the `entries` array with `date`, `description`, and `tag` (`added`, `improved`, or `fixed`).

## Environment Variables

- `GITHUB_TOKEN` — GitHub API auth for contribution calendar
- `GITHUB_LOGINS` — comma-separated GitHub usernames
- `NEXT_PUBLIC_SITE_URL` — base URL for sitemap/OG images (defaults to `http://localhost:3000`)
