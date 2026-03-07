import { Project } from ".";

export const overload: Project = {
  name: "overload",
  links: [
    {
      url: "https://overload.fsobral.dev",
      name: "Live",
    },
  ],
  year: 2026,
  preview: {
    cover: "/covers/overload.png",
    description:
      "A live-streaming website that blends real internet content from 50+ sources with AI-generated noise in an endless feed where nothing can be trusted.",
  },
  sections: [
    {
      title: "Description",
      component: (
        <>
          Overload is a screenshot of the internet today, except some of it
          never existed. It&apos;s a single-page website that streams an endless
          feed of real content from 50+ sources — headlines, Reddit posts,
          tweets, opinions, breaking news, Substack excerpts — mixed with
          AI-generated content in the same formats. You can&apos;t tell which is
          which.
          <br />
          <br />
          The idea started differently. The original concept was a feed of purely
          AI-generated text, like using a small locally run model into generating a constant stream of text, from that premise I jumped around the best way of visualizing and deploying something but that felt like it was missing something. The
          more interesting version was mixing real and generated content together
          so you genuinely can&apos;t distinguish them. The server fetches real
          RSS feeds round-robin, extracts keywords from today&apos;s actual
          news, and uses those to seed Gemini prompts that generate content in
          the same formats. Real and generated items land in the same buffer,
          interleaved by a randomized scheduler, and stream to the browser over
          SSE. There is no label, no toggle, no way to check.
          <br />
          <br />
          There&apos;s nothing to click. No like button, no comment section. The
          only interaction is scrolling up to pause and read. Or simply being
          mesmerized by the endless stream of content.
        </>
      ),
    },
    {
      title: "Design Direction",
      component: (
        <>
          This project was as much about design as it was about the concept. I
          collected design inspiration for a while as I browsed twitter
          before writing a single line of code, pulling from brutalist web design, Swiss/International
          typographic posters, industrial tech interfaces, and data terminal
          UIs. The mood I was after was something like a data terminal or
          control room readout. Information-dense, grid-obsessed, typographically
          loud, and visually restrained in color but aggressive in layout.
          In some way the project was a way of USING this visual identity
          in a project I could show off. I feel like building pages with Lorem
          Ipsum or placeholder text for fake companies is a bit boring, so I have
          to resort to the idea bag for projects where I can work some design and
          real content.
          <br />
          <br />
          The entire visual identity is built on typography alone. There are no
          images, no illustrations, no photographs anywhere in the interface.
          Every visual element is text, pattern, or texture. Headlines render in
          Noto Serif, metadata in JetBrains Mono at 8-10px, breaking news in
          massive uppercase monospace at 48-72px. There are 11 distinct content
          format components, each with its own typographic treatment, from serif
          italic opinion pieces with bylines to sans-serif tweets with fake
          engagement counts.
          <br />
          <br />
          Some of the motifs I&apos;m happiest with: the{" "}
          <span className="font-semibold text-primary">[BRACKET NOTATION]</span>{" "}
          on every label, borrowed from engineering spec sheets. The diagonal
          orange slash that cuts through breaking news items. The cycling sidebar
          label that rotates through words like OVERLOAD, SIGNAL, NOISE,
          TRUTH?, GENERATED using a character-by-character redaction animation
          with unicode block characters (&#x2588;&#x2593;&#x2592;&#x2591;), each
          word dissolving into static before the next one reveals itself. The
          subtle grain overlay using SVG turbulence noise at 3% opacity for a
          risograph print texture. The 40px graph-paper grid behind everything.
          <br />
          <br />
          The header has a live EKG-style pulse graph that spikes with incoming
          content, a millisecond-precision clock, and an uptime counter. On page
          load, a CRT boot sequence flickers through system initialization
          messages before the stream kicks in. Every new item typewriters onto
          screen character by character, with speed varying by format. A
          scrolling marquee at the bottom repeats:{" "}
          <span className="italic">
            &quot;YOU CANNOT TRUST WHAT YOU READ&quot;
          </span>
          . The design intentionally doesn&apos;t help you distinguish real from
          generated.
        </>
      ),
    },
    {
      title: "Technologies",
      component: (
        <>
          Monorepo with{" "}
          <span className="font-semibold text-primary">Turborepo</span>. The
          backend is a{" "}
          <span className="font-semibold text-primary">Bun</span> server that
          runs two loops: an RSS fetcher cycling through 50+ sources every ~2
          minutes, and a{" "}
          <span className="font-semibold text-primary">Gemini</span> generation
          loop that produces ~10 fake items every 30 seconds, seeded by keywords
          from real content. A scheduler interleaves both queues into a ring
          buffer and broadcasts over SSE. The whole thing runs on the Gemini free
          tier at $0 since we can generate massive amounts of data per request, and limit
          generation only to when it's needed. Quite a lot of thought went into
          how to best round robin and balance the generation to fit into the free tier of gemini API keys,
          switching between models, rate-limitting myself, and cycling through
          different API keys.
          <br />
          <br />
          The frontend is{" "} the standard
          <span className="font-semibold text-primary">Vite</span> +{" "}
          <span className="font-semibold text-primary">React 19</span> +{" "}
          <span className="font-semibold text-primary">Tailwind v4</span>. All
          animations are pure CSS keyframes and React hooks, no animation
          library. Deployed on{" "}
          <span className="font-semibold text-primary">Vercel</span> (frontend)
          and{" "}
          <span className="font-semibold text-primary">Railway</span> (backend). As I've been doing lately which has been a nice combo and easy to setup
        </>
      ),
    },
    {
      title: "Things Learned",
      component: (
        <>
          The biggest lesson was about designing before building. I usually jump
          into code and figure out the visual direction as I go, but for this
          project I forced myself to collect inspiration, write a full design
          document, and extract a design system before touching any components.
          That upfront work paid off massively. When I started building, I
          wasn&apos;t guessing at colors or font sizes, I was implementing a
          spec. The result feels more cohesive than anything I&apos;ve built
          before. This is one of the visual identities (with my portfolio and some of the latest projects) where I've actually felt proud of the design.
          <br />
          <br />
          I also learned that restraint is harder than excess. No images, one
          accent color, zero interactivity. Every instinct says &quot;add a hover
          state, add a click handler, add a photo.&quot; Resisting that and
          letting typography do all the work forced me to think much harder about
          hierarchy, spacing, and rhythm. The constraint that the design must not
          help you tell real from generated was especially interesting. It meant
          every format component had to feel equally authentic, and any visual
          flourish had to apply uniformly.
        </>
      ),
    },
  ],
  images: [
    {
      url: "/projects/overload/1.png",
      alt: "Boot screen with CRT flicker effect and system initialization messages on dark grid background",
    },
    {
      url: "/projects/overload/2.png",
      alt: "Desktop three-column stream with mixed content formats and breaking news",
    },
    {
      url: "/projects/overload/3.png",
      alt: "Desktop stream with massive breaking earthquake headline spanning the left column",
    },
    {
      url: "/projects/overload/4.png",
      alt: "Header close-up showing OVERLOAD title, live clock, EKG pulse graph, and market ticker",
    },
    {
      url: "/projects/overload/5.png",
      alt: "Left sidebar with full market ticker showing stocks, crypto, and forex prices",
      isMobile: true,
    },
    {
      url: "/projects/overload/6.png",
      alt: "Desktop two-column stream with weather alerts, research papers, opinions, and reddit posts",
    },
    {
      url: "/projects/overload/7.png",
      alt: "Mobile view of the stream in single-column layout with mixed serif and sans-serif content",
      isMobile: true,
    },
    {
      url: "/projects/overload/8.png",
      alt: "Mobile view with breaking news headline about a major power grid failure",
      isMobile: true,
    },
  ],
};
