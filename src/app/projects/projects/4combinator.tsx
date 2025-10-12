import Link from "next/link";
import { Project } from ".";

export const fourCombinator: Project = {
  name: "4combinator",
  links: [
    {
      url: "https://github.com/nandosobral03/4combinator",
      name: "Github",
    },
  ],
  year: 2024,
  preview: {
    cover: "/covers/4combinator.png",
    description:
      "4combinator is a read-only interface for selected 4chan boards, featuring a Hacker News-inspired UI designed for a work safe browsing experience.",
  },
  sections: [
    {
      title: "Description",
      component: (
        <>
          4combinator is a read-only interface for selected 4chan boards,
          featuring a Hacker News-inspired UI designed for a work safe browsing
          experience.
          <br />
          <br />
          This is an unofficial client that provides a simplified way to browse
          4chan content. No account is required, and you cannot post or interact
          with the content.
          <br />
          <br />
          It basically ports the concepts of 4chan to a Hacker News-inspired UI,
          threads become posts, replies become comments, and the rest of the
          content is the same. Images are hidden in the mainpage but can be
          viewed by hovering over them. This way one can browse /g/ even at the
          office without having to worry about people wondering why you are
          looking at an image board.
        </>
      ),
    },
    {
      title: "Technologies",
      component: (
        <>
          4combinator was created with Next, basing the project on the t3 stack
          with some modifications, I used the tRPC library to handle the backend
          as usual, I went with app router this time since I'm getting more
          comfortable with it. Used the 4chan API to fetch threads, posts and
          images from the boards.
          <br />
          <br />
          The project was deployed with Vercel, as usual it was easy and fast
          since Next is the bread and butter of the platform. The database I
          went with something new, I used{" "}
          <Link
            href="https://turso.tech/"
            className="underline text-accent"
            target="_blank"
          >
            Turso
          </Link>{" "}
          for the database, it uses libsql which is a fork of sqlite. The
          experience so far has been great, coming out of mushare I had pretty
          much the same problems at the time of setting up the database but I
          already knew how to fix it so it was a breeze. The purpose of a
          database in this project is mainly to use it as a cache for the 4chan
          API, since the API is public and doesn't require any authentication
          the 4chan API kindly asks to not abuse the API and not make too many
          requests per minute so this way we can play fair with everyone
          accessing the service.
          <br />
          <br />
          No authentication was needed since this is a read-only interface, the
          4chan API is public and doesn't require any authentication either
          which made the development process quite straightforward.
        </>
      ),
    },
    {
      title: "Things Learned",
      component: (
        <>
          Mostly UI design and copying the Hacker News design, I think I did a
          pretty good job at it and I'm happy with the result. The design is
          mobile friendly and works great, I'm happy with the outcome.
          <br />
          <br />I could say I learned a bit about how to handle rate limiting
          and caching, I had to implement a caching system to avoid making too
          many requests to the 4chan API, which was a great but not too hard. So
          yeah, a quick project.
        </>
      ),
    },
    {
      title: "Things I Would Do Differently",
      component:
        "Not much, it was simple enough to spin up in a weekend and I'm happy with the outcome.",
    },
  ],
  images: [
    {
      url: "/projects/4combinator/1.png",
      alt: "4combinator Landing Page",
    },
    {
      url: "/projects/4combinator/2.png",
      alt: "Thread listing page",
    },
    {
      url: "/projects/4combinator/3.png",
      alt: "Image hover preview",
    },
    {
      url: "/projects/4combinator/4.png",
      alt: "Thread view",
    },
    {
      url: "/projects/4combinator/5.png",
      alt: "Thread view mobile",
    },
    {
      url: "/projects/4combinator/6.png",
      alt: "Homepage mobile",
    },
    {
      url: "/projects/4combinator/7.png",
      alt: "Listing page mobile view",
    },
  ],
};
