import Link from "next/link";
import type { ProjectSource } from "../project-types";

export const spring84: ProjectSource = {
  name: "spring'84",
  links: [
    { url: "https://github.com/nandosobral03/spring84", name: "Github" },
    { url: "https://fsobral.dev/blog/spring84", name: "Blog" },
  ],
  year: 2026,
  updatedAt: "2026-05-14",
  preview: {
    cover: "/covers/spring84.png",
    description:
      "Designed a successor web protocol and shipped its reader, publisher, and server: Ed25519-signed HTML boards, verified mutual links, sandboxed rendering, and an editorial rack UI.",
  },
  sections: [
    {
      title: "Description",
      component: (
        <>
          Spring '84 is a protocol and client for small, expressive,
          self-certifying web boards. It is also a direct successor to{" "}
          <Link href="/projects/spring'83" className="underline text-accent">
            my implementation
          </Link>{" "}
          of Robin Sloan's{" "}
          <Link
            href="https://www.robinsloan.com/lab/specifying-spring-83"
            className="underline text-accent"
          >
            Spring '83
          </Link>
          , which was one of those projects I kept thinking about after I was
          done with it. I liked the shape of the idea too much to leave it as a
          one-off experiment, but I also did not want to simply implement the
          original protocol again. Spring '84 became a second iteration: a
          response to Spring '83 in the spirit of Robin Sloan's request for
          friendly critique and comment, and a chance to specify my own
          successor to a protocol I loved.
          <br />
          <br />
          It keeps the parts that made Spring '83 stick with me: one board per
          key, no algorithmic feed, no tracking, pull-only reading, and the
          newspaper rack metaphor. Then it pushes the idea toward the things I
          wanted from a second version: more room for visual expression, signed
          links between boards, relay hints for discovery, and a client that
          makes the network feel like a place instead of just a pile of HTML.
          <br />
          <br />
          This project implements the complete reader and publisher loop. The
          app fetches keys from a server, validates and renders boards in a
          sandboxed iframe, verifies signatures, handles Spring '84 links, and
          includes a publishing modal for composing and signing new boards. The
          interface is shaped like a newspaper rack rather than a social feed:
          fixed-size boards, session shuffle, manual refresh, no accounts, no
          subscriptions, no hidden personalization.
          <br />
          <br />
          Visually, I wanted it to feel editorial without becoming nostalgic
          decoration for its own sake. The UI uses a dark shell, warm paper
          surfaces, restrained red accents, and boards that look like small
          printed artifacts. A lot of the final work was not adding more
          features, but making the app feel coherent enough that the protocol's
          ideas were visible through the interface.
        </>
      ),
    },
    {
      title: "Technologies",
      component: (
        <>
          The client is built with React, Vite, TypeScript, Tailwind CSS,
          TanStack Router, CodeMirror, and a small internal Spring '84 client
          package. The backend uses Bun, Hono, Drizzle, and Postgres
          <br />
          <br />
          The core protocol work is split into shared validation and client
          packages: key parsing, board validation, Ed25519 signature
          verification, Spring '84 URI rewriting, link verification, and
          publishing helpers. The web app consumes those packages instead of
          duplicating protocol rules in the UI.
          <br />
          <br />
          The publish flow uses CodeMirror for the HTML editor, live preview in
          the same sandboxed board renderer used by the rack, in-memory private
          key handling, byte-budget validation, and image insertion that keeps
          boards within the protocol's size constraints.
        </>
      ),
    },
    {
      title: "Things Learned",
      component: (
        <>
          I liked taking the time to specify how I thought the protocol should
          evolve instead of treating the implementation as the whole project.
          Spring '83 already had the core spark, but writing Spring '84 made me
          slow down and ask what I personally wanted from a successor: what
          should stay small, what deserved more room, and where the network
          needed a little more connective tissue to feel alive.
          <br />
          <br />
          The UI is also miles ahead of my original Spring '83 implementation,
          which is always one of the most satisfying parts of revisiting an old
          idea. The first version proved I could build the thing. This version
          let me make it feel like something: a rack, a publisher, a small
          editorial surface, and a visual language that fits the protocol
          instead of just wrapping it.
          <br />
          <br />
          The seed boards are a good example of that difference. They look much
          closer to the original vision I had for this kind of tiny web
          artifact, but Spring '83's board size made that vision hard to
          express. The constraint was useful, but it left very little room for
          visual texture. Spring '84 keeps the pressure of a small format while
          giving the boards enough space to actually have personality.
          <br />
          <br />
          <span>I also got to optimize my old keygen and modify a CUDA hash generator to grind
            harder Spring '84 keys.The best of which I got being <span className="text-accent bg-accent/10 px-1 rounded-md font-mono text-sm">0000c3c690ca08fd6f071cfd6fb587efc10c9d5a81f1c7ce7c901066b84e1126</span>.
            The key format is intentionally a small proof
            of commitment, and pushing the generator further made that part of
            the protocol feel much more real than if I had only written the
            validation code. </span>
        </>
      ),
    },
  ],
  images: [
    {
      url: "/projects/spring84/rack-dark.png",
      alt: "Spring '84 dark-mode rack with editorial board cards",
    },
    {
      url: "/projects/spring84/rack-light.png",
      alt: "Spring '84 light-mode rack with seeded boards",
    },
    {
      url: "/projects/spring84/publish-editor.png",
      alt: "Spring '84 publish modal with HTML editor and live board preview",
    },
    {
      url: "/projects/spring84/constellation-modal.png",
      alt: "Spring '84 constellation modal showing linked boards side by side",
    },
    {
      url: "/projects/spring84/about-page.png",
      alt: "Spring '84 about page explaining the protocol and client",
    },
    {
      url: "/projects/spring84/mobile-rack.png",
      alt: "Spring '84 mobile rack layout",
      isMobile: true,
    },
    {
      url: "/projects/spring84/mobile-links.png",
      alt: "Spring '84 mobile link stack view",
      isMobile: true,
    },
    {
      url: "/projects/spring84/mobile-publish.png",
      alt: "Spring '84 mobile publishing flow",
      isMobile: true,
    },
  ],
};
