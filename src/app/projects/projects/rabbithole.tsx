import { Project } from ".";
import Link from "next/link";

export const rabbithole: Project = {
  name: "rabbithole",
  links: [
    {
      url: "https://github.com/nandosobral03/rabbithole",
      name: "Github",
    },
    {
      url: "https://rabbithole.fsobral.dev",
      name: "Live",
    },
  ],
  year: 2025,
  preview: {
    cover: "/covers/rabbithole.png",
    description: "An interactive Wikipedia graph explorer that visualizes article connections as dynamic force-directed graphs, transforming linear browsing into visual knowledge discovery journeys that can be shared with others.",
  },
  sections: [
    {
      title: "Description",
      component: (
        <>
          Rabbithole transforms the way people explore Wikipedia by turning the linear experience of following article links into beautiful, interactive graph visualizations. Instead of losing track of where you started or how you got
          there, users can see their entire exploration journey laid out as a dynamic network of interconnected knowledge.
          <br />
          <br />
          The idea is to improve the experience of losing one's self down a wikipedia rabbit hole by providing a visual representation of the journey as well as allowing users to save and share their most interesting rabbit holes with
          others.
        </>
      ),
    },
    {
      title: "Technologies",
      component: (
        <>
          The project is built on T3 Stack once again, going deep into learning rather than wide. I used Next.js 15 with the App Router for server-side rendering and routing, paired with React 19 and tRPC for complete type safety across the
          entire application.
          <br />
          <br />
          The graph visualization is powered by{" "}
          <Link href="https://github.com/vasturiano/react-force-graph" className="underline text-accent" target="_blank">
            react-force-graph-2d
          </Link>{" "}
          which was slightly annoying to use at times because of some quirks, but I managed to get it looking pretty good.
          <br />
          <br />
          For the backend, tRPC provides end-to-end type safety between the client and server, making API development incredibly smooth. The database uses Drizzle ORM with SQLite for development and{" "}
          <Link href="https://turso.tech/" className="underline text-accent" target="_blank">
            Turso
          </Link>{" "}
          for production. The analytics tables are carefully indexed to support complex queries about article popularity and connection patterns without performance issues. I hadn't used Drizzle much before but it was a great experience, I
          didn't have many hard queries so I didn't get to see it's full potential but it seems to be at least on par with Prisma.
          <br />
          <br />
          The Wikipedia integration fetches articles through their REST API, with smart caching strategies to avoid hitting rate limits. I used DOMPurify to safely render Wikipedia's HTML content, and implemented sophisticated link parsing
          to detect and create connections between articles already in the graph.
        </>
      ),
    },
    {
      title: "Things Learned",
      component: (
        <>
          This was a smaller, weekend+ project that I did in a couple of days while I restore from some mimicrAI burnout, the main things I learned were to do with focusing on the user experiene and the UI, the functionality itself wasn't
          trivial but not too hard either and the scope was small enough that I could focus on the design.
          <br />
          <br />
          I feel like I'm getting to the point were I am pretty proud of how my designs are looking, I'm not a designer by any means but I'm starting to develop a taste for what looks good and what doesn't. And I'm really happy with how the
          project turned out.
          <br />
          <br />I also posted it on{" "}
          <Link href="https://news.ycombinator.com/item?id=44090387" className="underline text-accent" target="_blank">
            {" "}
            hackernews
          </Link>{" "}
          as part of a "Ask HN: What are you working on?" which is pretty out of my comfort zone but I thought it was a good opportunity to get some exposure and get some feedback on the project.
        </>
      ),
    },
    {
      title: "Things I Would Do Differently",
      component: <>Not much to be honest, I'm pretty happy with how the project turned out, I'm planning to add some features like a daily wiki game to reach a certain page out wikipedia's article of the day</>,
    },
  ],
  images: [
    {
      url: "/projects/rabbithole/1.jpeg",
      alt: "Rabbithole Landing Page",
    },

    {
      url: "/projects/rabbithole/2.jpeg",
      alt: "Rabbithole Graph View",
    },
    {
      url: "/projects/rabbithole/3.jpeg",
      alt: "Rabbithole Graph View with an article selected",
    },
    {
      url: "/projects/rabbithole/4.jpeg",
      alt: "Some analytics",
    },

    {
      url: "/projects/rabbithole/8.jpeg",
      alt: "Darkmode",
    },
    {
      url: "/projects/rabbithole/9.jpeg",
      alt: "Darkmode with an article selected",
    },
    {
      url: "/projects/rabbithole/5.png",
      alt: "Mobile view of the landing page",
      isMobile: true,
    },
    {
      url: "/projects/rabbithole/6.png",
      alt: "Mobile view of the graph view",
      isMobile: true,
    },
    {
      url: "/projects/rabbithole/7.png",
      alt: "Mobile view of the graph view with an article selected",
      isMobile: true,
    },
  ],
};
