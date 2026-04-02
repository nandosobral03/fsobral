export type ChangelogTag = "added" | "improved" | "fixed";

export interface ChangelogEntry {
  date: string;
  description: string;
  tag: ChangelogTag;
}

export const entries: ChangelogEntry[] = [
  {
    date: "2026-04-02",
    description: "Hidden overscroll creature easter egg — try scrolling up past the top",
    tag: "added",
  },
  {
    date: "2026-03-28",
    description: "ASCII-rendered classical art backgrounds for Blog and Projects pages",
    tag: "added",
  },
  {
    date: "2026-03-28",
    description: "Added changelog to marginalia",
    tag: "added",
  },
  {
    date: "2026-03-07",
    description: "Redesigned contact section with bold typographic CTAs",
    tag: "improved",
  },
  {
    date: "2026-03-07",
    description: "Added brush-radius hover effect to GitHub heatmap",
    tag: "added",
  },
  {
    date: "2026-03-06",
    description: "Added Overload project",
    tag: "added",
  },
  {
    date: "2026-02-26",
    description: "Added Git Copycat project",
    tag: "added",
  },
  {
    date: "2026-02-22",
    description: "Added Consequences project",
    tag: "added",
  },
  {
    date: "2026-02-13",
    description: "Responsive mobile layout for GitHub contribution heatmap",
    tag: "improved",
  },
  {
    date: "2026-02-11",
    description: "Major dependency upgrade, migrated ESLint to flat config, removed unused components",
    tag: "improved",
  },
  {
    date: "2026-02-11",
    description: "Added GitHub activity skeleton loader and total contribution count",
    tag: "added",
  },
  {
    date: "2026-02-10",
    description: "Added ASCII dithered image component for the landing page",
    tag: "added",
  },
  {
    date: "2026-02-10",
    description: "Major site redesign: overhauled home page, new theme, restyled nav",
    tag: "improved",
  },
  {
    date: "2025-12-26",
    description: "Added marginalia content system with year-in-review and favorites posts",
    tag: "added",
  },
  {
    date: "2025-12-26",
    description: "Patched React Server Components CVE vulnerabilities",
    tag: "fixed",
  },
  {
    date: "2025-11-23",
    description: "Added Atmosphere project",
    tag: "added",
  },
  {
    date: "2025-11-23",
    description: "Added ASCII art animations (cube, donut, DNA, sphere) for page headers",
    tag: "added",
  },
  {
    date: "2025-11-23",
    description: "Redesigned blog article layout with dark intro header and image modal",
    tag: "improved",
  },
  {
    date: "2025-11-22",
    description: "Major site redesign with scroll-reveal animations, revamped nav and layouts",
    tag: "improved",
  },
  {
    date: "2025-10-12",
    description: "Added Apollo project",
    tag: "added",
  },
  {
    date: "2025-10-09",
    description: "New blog post: E Unibus Infinitum",
    tag: "added",
  },
  {
    date: "2025-10-09",
    description: "Added reading time estimation to blog posts",
    tag: "added",
  },
  {
    date: "2025-10-07",
    description: "Multi-user GitHub activity support and redesigned favorites section",
    tag: "improved",
  },
  {
    date: "2025-09-25",
    description: "Updated about section with new role at Keeper.app (now double)",
    tag: "improved",
  },
  {
    date: "2025-08-16",
    description: "Extracted blog post metadata into dedicated file",
    tag: "improved",
  },
  {
    date: "2025-08-15",
    description: "Added SEO infrastructure: OG images, sitemap, robots.txt, RSS feed",
    tag: "added",
  },
  {
    date: "2025-08-15",
    description: "Added Favorites page showcasing books, music, and web finds",
    tag: "added",
  },
  {
    date: "2025-08-15",
    description: "Animated skeleton loading state for GitHub activity heatmap",
    tag: "improved",
  },
  {
    date: "2025-07-26",
    description: "Upgraded dependencies and migrated Tailwind CSS config",
    tag: "improved",
  },
  {
    date: "2025-07-26",
    description: "Fixed layout shift by extracting GitHub activity into client component with API route",
    tag: "fixed",
  },
  {
    date: "2025-06-22",
    description: "New blog post: Automating Fishing for Fun and No Profit",
    tag: "added",
  },
  {
    date: "2025-06-22",
    description: "Added interactive fishing minigame embedded in blog post",
    tag: "added",
  },
  {
    date: "2025-05-26",
    description: "Added Rabbithole project",
    tag: "added",
  },
  {
    date: "2025-05-26",
    description: "Integrated site analytics",
    tag: "added",
  },
  {
    date: "2025-05-01",
    description: "Added MimicRAI project",
    tag: "added",
  },
  {
    date: "2025-05-01",
    description: "New blog post: Saying Goodbye to My First Domain",
    tag: "added",
  },
  {
    date: "2025-03-28",
    description: "New blog post about Tailwind CSS v4",
    tag: "added",
  },
  {
    date: "2025-03-13",
    description: "Added swipe/touch gesture support to project carousel",
    tag: "added",
  },
  {
    date: "2025-03-12",
    description: "New blog post about 3D printing GitHub contribution history",
    tag: "added",
  },
  {
    date: "2025-02-20",
    description: "New blog post: The Endless Media Epidemic",
    tag: "added",
  },
  {
    date: "2025-01-09",
    description: "Added Topological Goals Thing to the graveyard blog post",
    tag: "added",
  },
  {
    date: "2025-01-03",
    description: "Added Timeslot and Superhuman Benchmark project pages",
    tag: "added",
  },
  {
    date: "2025-01-03",
    description: "Added year sections to projects page",
    tag: "added",
  },
  {
    date: "2024-12-03",
    description: "Extracted blog post list into its own component",
    tag: "improved",
  },
  {
    date: "2024-12-02",
    description: "New blog post: Peaks of Yore and the Difficulty Boulder",
    tag: "added",
  },
  {
    date: "2024-12-01",
    description: "Added blog post preview section to the home page",
    tag: "added",
  },
  {
    date: "2024-12-01",
    description: "Added cover images for all blog posts with refined typography",
    tag: "improved",
  },
  {
    date: "2024-11-30",
    description: "Built full blog system with component-based posts and three initial articles",
    tag: "added",
  },
  {
    date: "2024-11-29",
    description: "Added projects section with cards, carousel, and 14 project entries",
    tag: "added",
  },
  {
    date: "2024-11-28",
    description: "Moved from aornum.xyz, started page from scratch",
    tag: "added",
  },
];
