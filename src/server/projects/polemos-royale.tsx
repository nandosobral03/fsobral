import { Project } from "../projects";
import Link from "next/link";

export const polemosRoyale: Project = {
  name: "polemos royale",
  links: [
    {
      url: "https://github.com/nandosobral03/polemos-royale",
      name: "Github",
    },
  ],
  year: 2024,
  preview: {
    cover: "/covers/polemos-royale.png",
    description:
      "Polemos Royale is a remake of the original Polemos, but with a battle royale twist. It allows for more players, more events and more customization and a map through which the players can move and roll dice to determine the outcome of the events.",
  },
  sections: [
    {
      title: "Description",
      component: (
        <>
          Polemos Royale is a remake of my previous project,{" "}
          <Link href="/projects/polemos" className="underline text-accent">
            Polemos
          </Link>
          , like the first implementation, Polemos Royale is a text based battle simulator inspired by{" "}
          <Link href="https://brantsteele.net/hungergames/" className="underline text-accent" target="_blank">
            BrantSteele's Hunger Games Simulator
          </Link>
          . The idea is the same as before, have a cast of user-selected characters and run a simulation to see who comes out on top, while reading the twists and turns of the story that unfolds.
          <br />
          <br />
          Polemos Royale is a remake of the original project, distilling the idea to it's core components and building upon them. This time features like authentication, user management, and more were stripped away, focusing on the core
          functionality of the project. Once I felt like the implementation of the core features was solid and reflected what I wanted to achieve, I started adding new features, the main difference with this implementation and all previous
          ones is the addition of what we call <i>locations</i> these locations come in 2 types, "tiles" and "hazards". The idea behind this addition is to attach events to locations and have the simulation work with that instead of having
          a never ending array of events that can happen at any time. This we can mold the story to our liking, having each game be unique.{" "}
          <Link href="https://engineering.atspotify.com/2014/02/how-to-shuffle-songs/" className="underline text-accent" target="_blank">
            Much like how spotify realised that people don't want true randomness in their playlists
          </Link>{" "}
          we realised that we didn't want true randomness in our simulations, it often lead to events repeating themselves or anticlimatic endings. Locations are our way of controlling the flow of the simulation and removing the bad parts
          of 100% randomness, while leaving the uncertainty that makes the simulation fun.
          <br />
          <br />
          The game now runs on a hexagonal grid of tiles, each tile having any given number of hazards on them, leading to characters on that tile being able to "roll" events related to either of those sources. As the game progresses we can
          see the characters move to new locations, giving a sense of anticipation of what they might face, all these movements eventually leading to a final showdown on the center of the stage where we can remove anticlimatic endings and
          have a final battle between the last remaining characters.
        </>
      ),
    },
    {
      title: "Technologies",
      component: (
        <>
          For this project, I continued using Next.js as the main framework, which has proven to be an excellent choice for rapid development and iteration. Tailwind CSS once again employed for styling, opting for{" "}
          <Link href="https://ui.shadcn.com/" className="underline text-accent" target="_blank">
            Shadcn
          </Link>{" "}
          as the component library to speed up the development process.
          <br />
          On the backend, I utilized tRPC to handle the communication between the frontend and backend, ensuring type-safe API calls.
          <br />
          For deployment, I decided not to deploy it, the deployment could easily be done on Vercel without mayor issue but since I will be using it for personal use I decided to keep it local.
        </>
      ),
    },
    {
      title: "Things Learned",
      component: (
        <>
          This project was a great way to learn more about the importance value of iteration. As I stripped the project to its core features, I realized the true essence of the project and what I wanted to achieve. This allowed me to focus
          on the core features and build upon them, and find why the project was interesting to me in the first place.
          <br />
          <br />
          The shift from doing a proyect for the public to doing a project for myself was also a great learning experience, I was able to focus on what I wanted to do and how I wanted to do it, removing features that would be required in a
          public project but that I didn't need for my personal use.
          <br />
          <br />
          This proyect made me realize some benefits of doing the same proyects over and over, I already knew the problems I would face and how to solve them, I could focus solely on the new features and how to implement them, instead of
          having to figure out how to do the core functionality of the project. I knew what worked and what didn't and could design and work based on that, having feedback of previous iterations to guide me.
        </>
      ),
    },
    {
      title: "Things I Would Do Differently",
      component: (
        <>
          Not much honestly, I'm pretty happy with how it turned out, the main thing would be to give the aesthetic a bit more of a unique feel, it feels a bit generic because of the use of a component library, but that's a tradeoff with
          having a faster development process and standardized components that look good. I remember reading about how using component libraries allow for a higher "design floor" where everything you do will look decent but molding it into
          something with <i>soul</i> is harder.
        </>
      ),
    },
  ],
  images: [
    {
      url: "/projects/polemos-royale/1.png",
      alt: "Home Page",
    },
    {
      url: "/projects/polemos-royale/2.png",
      alt: "About Page",
    },
    {
      url: "/projects/polemos-royale/3.png",
      alt: "Locations",
    },
    {
      url: "/projects/polemos-royale/4.png",
      alt: "Events",
    },
    {
      url: "/projects/polemos-royale/5.png",
      alt: "Characters",
    },
    {
      url: "/projects/polemos-royale/6.png",
      alt: "Start simulation, choosing a tile",
    },
    {
      url: "/projects/polemos-royale/7.png",
      alt: "Day Recap",
    },
    {
      url: "/projects/polemos-royale/8.png",
      alt: "Character recap through locations",
    },
  ],
};
