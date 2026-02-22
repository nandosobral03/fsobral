import { Project } from ".";
import Link from "next/link";

export const consequences: Project = {
  name: "consequences",
  links: [
    {
      url: "https://consequences.fsobral.dev",
      name: "Live",
    },
  ],
  year: 2026,
  preview: {
    cover: "/covers/consequences.png",
    description:
      "An online multiplayer version of the classic paper party game where players take turns writing answers to prompts without knowing what others wrote, then revealing the resulting stories together.",
  },
  sections: [
    {
      title: "Description",
      component: (
        <>
          Consequences is an online multiplayer version of the classic paper
          party game where players take turns writing answers to prompts without
          knowing what others wrote, then revealing the resulting stories
          together. Players join via a room code, customize a little avatar, and
          play through rounds of writing before a reveal phase where the stories
          are read out line by line.
          <br />
          <br />
          This one actually has a history, it first appeared in my{" "}
          <Link
            href="/blog/graveyard-of-dead-projects"
            className="underline text-accent"
          >
            graveyard of dead projects
          </Link>{" "}
          back in February 2024. The original idea included AI-generated images
          at the end of each story, but free image generation wasn&apos;t good
          enough at the time and the cost per game didn&apos;t make sense. I
          always wanted to come back to it though, and after playing an online
          version of STOP with some friends I remembered the idea, stripped out
          the AI image generation part, and wrote it up in a weekend.
          <br />
          <br />
          The game supports 2-10 players per room, optional round timers,
          bilingual prompts (English and Spanish), and a custom avatar creator
          that ended up being one of my favorite parts of the project. No
          accounts, no login, you join, you play, you leave. There&apos;s no
          reason to store anything past the game.
        </>
      ),
    },
    {
      title: "Technologies",
      component: (
        <>
          This is a departure from my usual stack. The whole thing is built with{" "}
          <span className="font-semibold text-primary">Elixir</span> and{" "}
          <span className="font-semibold text-primary">Phoenix LiveView</span>,
          which I&apos;d been wanting to try for a while. Even though the
          project was small, the fit felt perfect. LiveView handles all the
          real-time UI updates over WebSockets without me having to manually
          manage socket connections or figure out how the UI should respond to
          state changes. Everything felt baked in and ready to go. I leaned on
          the canonical Phoenix way of implementing rooms and layered my game
          logic on top of that.
          <br />
          <br />
          The game state lives entirely in memory via GenServers, one per room,
          supervised by a DynamicSupervisor. No database, completely
          intentional. I didn&apos;t want the hassle of deploying and managing a
          database for something that&apos;s inherently ephemeral. Rooms
          auto-terminate after 2 hours of inactivity.
          <br />
          <br />
          For the avatar system, I wanted something like Gartic Phone&apos;s
          avatars. I looked for libraries to do it but couldn&apos;t find a
          great fit. I ended up using{" "}
          <a
            href="https://github.com/zengm-games/facesjs"
            className="underline text-accent"
            target="_blank"
          >
            facesjs
          </a>
          , limiting it heavily, no body, no accessories, zoomed way in so the
          face shapes get lost, which made them look more cartoony. Since
          I&apos;m not much of an artist, I extended it with extra eye, nose,
          and mouth SVGs that I generated with Gemini, plus some fun skin colors
          beyond the realistic palette.
          <br />
          <br />
          The frontend styling uses{" "}
          <span className="font-semibold text-primary">
            Tailwind v4
          </span> with{" "}
          <span className="font-semibold text-primary">daisyUI</span>. I wanted
          to explore a different visual direction, more cartoony and playful to
          match what the app is about. I&apos;ve been doing some work on my
          portfolio that I&apos;m happy with, but it didn&apos;t make sense to
          use a more refined or serious aesthetic here. Bold outlines, rounded
          typography, hand-stamped offset shadows. Fun over polish.
          <br />
          <br />
          Deployed on{" "}
          <span className="font-semibold text-primary">Railway</span>, which was
          a first for me and a surprisingly great experience.
        </>
      ),
    },
    {
      title: "Things Learned",
      component: (
        <>
          The biggest takeaway was about learning with AI tools. I&apos;m used
          to using agentic coding, but mostly with tech I already understand.
          Using it to learn something from scratch was a different experience,
          the AI would just gloss over things and get them right without me
          understanding the <i>why</i> behind the decisions. It made me realize
          that AI assistance is much better as a force multiplier for things you
          already have a foundation in than as a tool for going from zero to
          one. I had to actively put myself in a learning mood at times rather
          than defaulting to &quot;get the thing working&quot; mode.
          <br />
          <br />
          On the tech selection side, I spent real time evaluating options,
          LiveView vs Convex vs hand-rolled WebSocket support, and choosing
          deliberately rather than defaulting to whatever I&apos;m most
          comfortable with. That felt good. This is also my first real-time
          multiplayer app, so there were a bunch of things to figure out around
          connection handling, host handoff when someone disconnects, and making
          sure the game keeps moving even when players drop (the game fills in
          default answers for disconnected players).
        </>
      ),
    },
  ],
  images: [
    {
      url: "/projects/consequences/1.png",
      alt: "Desktop landing page with Create Game and Join Game",
    },
    {
      url: "/projects/consequences/2.png",
      alt: "Mobile landing page",
      isMobile: true,
    },
    {
      url: "/projects/consequences/3.png",
      alt: "Mobile lobby with player list, avatar customizer, and settings",
      isMobile: true,
    },
    {
      url: "/projects/consequences/4.png",
      alt: "Mobile prompts editor with default answers",
      isMobile: true,
    },
    {
      url: "/projects/consequences/5.png",
      alt: "Desktop lobby with avatar customizer and game settings",
    },
    {
      url: "/projects/consequences/6.png",
      alt: "Desktop lobby with two players joined",
    },
    {
      url: "/projects/consequences/7.png",
      alt: "Desktop gameplay, round 1 Name a person prompt",
    },
    {
      url: "/projects/consequences/8.png",
      alt: "Mobile gameplay with prompt and skip player panel",
      isMobile: true,
    },
    {
      url: "/projects/consequences/9.png",
      alt: "Desktop last round, What was the consequence prompt",
    },
    {
      url: "/projects/consequences/10.png",
      alt: "Story reveal with all prompts and answers",
    },
  ],
};
