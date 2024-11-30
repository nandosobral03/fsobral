import { Project } from ".";
import Link from "next/link";

export const nochan: Project = {
  name: "nochan",
  links: [
    {
      url: "https://github.com/nandosobral03/nochan/",
      name: "Github",
    },
  ],
  year: 2023,
  preview: {
    cover: "/covers/nochan.png",
    description: "nochan is a ephemeral imageboard that I made as a way to learn more about Next, Tailwind and Bun! It allows users to create threads and post images that are stored in a database and are deleted after 24 hours.",
  },
  sections: [
    {
      title: "Description",
      component: (
        <>
          This project is a simple{" "}
          <Link href="https://en.wikipedia.org/wiki/Imageboard" className="underline text-accent" target="_blank">
            imageboard
          </Link>{" "}
          inspired by the family of "chan" websites, it's a smaller project that I made to try out some technologies with the goal of learning more about them and testing my skill at making a website that looked as close as possible to the
          original.
          <br />
          <br />
          The project allows users to anonymously create threds and post images and text. Users can then reply to those posts and create new ones. An insteresting part of the project was allowing users to mantain anonymity while still being
          able to reply to see what posts were made by them and when they were tagged. To do this each user is assigned a random{" "}
          <Link href="https://github.com/dsw/proquint" className="underline text-accent" target="_blank">
            proquint
          </Link>{" "}
          that is stored as a cookie in their browser. This proquint is then used to identify the user and their posts. But users these identifiers are never shown to the users, the server receives the proquint and uses it to identify the
          user and their posts. This allows users to reply to posts and see what posts were made by them while not exposing their identifier to other users. Users can easily clear their identifier by clearing their cookies or pressing the
          "Refresh Identity" button at the top of the page.
          <br />
          <br />
          Threads on the website are also ephemeral, they are deleted after 24 hours. This is done to keep the imageboard clean and to prevent it from being filled with spam. Images are also deleted after 24 hours to prevent the server from
          filling up with images. Images are compressed and stored in the server, serving first a compressed version of the image and then the original once it is fully loaded. Creating a reply or thread also requires a captcha to prevent
          spam. The captcha is created using reCAPTCHA v2 and is verified by the server before the post is created.
        </>
      ),
    },
    {
      title: "Technologies",
      component: (
        <>
          This project was a great way to learn more about Next.js, I felt like my use React has improved greatly from my last project (Minos) and I was able to use it in a more idiomatic way. I also got to use Next.js' server side
          rendering, using cookies to fetch the data as the user and rendering all posts, identifying those made by the user serverside.
          <br />
          <br />
          I gave Tailwind a second chance with this project and I'm glad I did, I found it to be a great way to style the website and I was able to make it look very similar to the original without having to write a lot of CSS. I've never
          been a fan of Tailwind but I think I'm starting to see the appeal of it, the DX and speed of development is great and I think it's a great tool for small projects like this one.
          <br />
          <br />I also tried out{" "}
          <Link href="https://www.framer.com/motion/" className="underline text-accent" target="_blank">
            Framer Motion
          </Link>{" "}
          for animations because it looked cool and I'm glad I did, it was very easy to use and I was able to add some neat animations to the thread/reply closing and opening. And got to create a draggable modal for the create thread/reply
          form which looks great in my opinion.
          <br />
          <br />
          As for the backend I wanted to try{" "}
          <Link href="https://bun.sh/" className="underline text-accent" target="_blank">
            Bun
          </Link>{" "}
          since it's a new runtime that claims to have much better performance than Node.js. I coupled it with its leading server framework{" "}
          <Link href="https://elysiajs.com/" className="underline text-accent" target="_blank">
            Elysia
          </Link>{" "}
          which allows for an Express-like development experience. It was honestly a great experience, I found it to be very easy to use and better than express in many ways, allowing for things like cron jobs and background tasks to be run
          easily. Sadly I wasn't able to try it out with its type safe interface "Eden" since bun doesn't like to play nice with Next.js and I had to settle for normal HTTP requests.
        </>
      ),
    },
    {
      title: "Things Learned",
      component: (
        <>
          This project was a great way to learn more about Next.js, I felt like my use React has improved greatly from my last project. My usage of React hooks has improved and escaped useEffect hell. I also got to use Next.js' server side
          rendering, using cookies to fetch the data as the user and rendering all posts, many of the things I learned in SveteKit were also applicable here, like the use of cookies and layouts.
          <br />
          <br />I also learned about VSCode Dev Containers, which allowed me to develop the project since Bun isn't available on Windows, meaning my only option was to use a Linux VM. But with Dev Containers I was able to develop the
          project without much friction, this also gave me a jump start on creating the Dockerfile for the project which I would later need to deploy it.
        </>
      ),
    },
    {
      title: "Things I Would Do Differently",
      component: (
        <>
          I would probably swap out Next for another React metaframework. The Next development experience was great but I found it to be a bit too opinionated and deploying without Vercel is a pain. I'd like to try something like Astro or
          Remix, which seem to be more flexible and vendor agnostic.
          <br />
          <br />
          Bun was great to learn but it's clearly still rough around the edges, I'd like to try it again once it's more mature and has better support since I had to make some weird workarounds like installing sharp with npm while still
          using Bun's package manager since it didn't install sharp's dependencies correctly meaning my final Dockerfile had to install npm only to then remove it after installing sharp.
        </>
      ),
    },
  ],
  images: [
    {
      url: "/projects/nochan/0.png",
      alt: "nochan on desktop with a thread open",
    },
    {
      url: "/projects/nochan/1.png",
      alt: "nochan on desktop showing the pagination",
    },
    {
      url: "/projects/nochan/2.png",
      alt: "nochan on desktop showing various threads and replies created by the user",
    },
    {
      url: "/projects/nochan/3.png",
      alt: "nochan about page",
    },
    {
      url: "/projects/nochan/4.png",
      alt: "nochan empty state",
    },
    {
      url: "/projects/nochan/5.png",
      alt: "nochan on mobile",
      isMobile: true,
    },
    {
      url: "/projects/nochan/6.png",
      alt: "nochan on desktop showing the create thread modal",
    },
    {
      url: "/projects/nochan/7.png",
      alt: "nochan on desktop showing the create thread with valid captcha",
    },
  ],
};
