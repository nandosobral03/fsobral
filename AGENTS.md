# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Build Commands

- `bun run dev` — start Next.js dev server
- `bun run build` — production build
- `bun run lint` — ESLint (extends `eslint-config-next`)
- `bun test` / `bun run test:content` â€” Bun invariant tests for content collections

## Workflow

- **Do not create git commits** — the user handles all commits
- Deployed on **Vercel** (auto-deploys on push to master)

## Architecture

Personal portfolio site built with **Next.js (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

### Content System

Blog posts, marginalia posts, and projects are **component-based, not MDX/markdown**. Each piece of content is a React component and is registered through the deep content collection seam in `src/content/`.

- **Blog posts**: authored in `src/content/articles/blog-posts/`, registered in `src/content/articles/blog.tsx`
- **Projects**: authored in `src/content/projects/entries/`, registered in `src/content/projects/projects.ts`
- **Marginalia**: authored in `src/content/articles/marginalia-posts/`, registered in `src/content/articles/marginalia.tsx`

Articles use building-block components from `src/components/article/blocks/` (codeblock, paragraph, section, quote, image-carousel, etc.).

## Code Style

- **Naming**: PascalCase for components, kebab-case for files/directories
- **Imports**: `@/` alias maps to `src/`
- **Styling**: Tailwind utility classes inline, `clsx` for conditional classes
- **Animations**: `motion/react` library (Framer Motion), using `initial`/`animate`/`whileHover` patterns
- **Components**: functional components with typed props interfaces
- **Client components**: use `"use client"` directive; server components are the default

## Changelog

When making significant changes to the site (new features, new content, design changes, major refactors), add an entry to the changelog at `src/content/articles/marginalia-posts/changelog/changelog-entries.ts`. Prepend a new object to the `entries` array with `date`, `description`, and `tag` (`added`, `improved`, or `fixed`).

## Environment Variables

- `GITHUB_TOKEN` — GitHub API auth for contribution calendar
- `GITHUB_LOGINS` — comma-separated GitHub usernames
- `NEXT_PUBLIC_SITE_URL` — base URL for sitemap/OG images (defaults to `http://localhost:3000`)
