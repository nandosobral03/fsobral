# Context

## Domain Vocabulary

- **Content Collection**: module that owns authored entries plus normalized lookup and derived surfaces.
- **Article Source**: authored Article metadata plus the lazy render binding registered by an Article Content Collection.
- **Article**: written content rendered through the article shell.
- **Blog Post**: article listed on the blog and included in RSS/sitemap.
- **Marginalia Post**: shorter article listed under marginalia, excluded from RSS/sitemap in v1.
- **Project**: portfolio project entry with detail, card, gallery, metadata, and sitemap surfaces.
- **Project Year Surface**: content surface that groups visible Projects for the project index, including the year preface and layout side.
- **Content Surface**: derived representation such as route path, card entry, metadata, JSON-LD, RSS item, sitemap entry, or OG image options.

## Architectural Decisions

The `src/content/` tree is the seam for authored content and its content surfaces. Routes and UI modules should consume `@/content` instead of rebuilding slug, path, visibility, sorting, card, metadata, JSON-LD, RSS, sitemap, or OG image behavior.

Content remains component-based TSX, not MDX or markdown. The collection modules normalize authored entries and validate invariants at module initialization.
