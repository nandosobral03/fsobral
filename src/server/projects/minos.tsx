import { Project } from "../projects";
import Link from "next/link";

export const minos: Project = {
  name: "minos",
  links: [
    {
      url: "https://github.com/nandosobral03/minos/",
      name: "Github",
    },
    {
      url: "http://minos.aornum.xyz/visualizer",
      name: "Live",
    },
  ],
  year: 2023,
  preview: {
    cover: "/covers/minos.png",
    description:
      "Minos is a pathfinding visualizer that I made, my main goal with this project was to revisit some of the pathfinding algorithms I learned in college and to try out Next.js. In the spirit of revisiting the algorithms added a section to learn more about them, their premise and how their implementation works in TypeScript.",
  },
  sections: [
    {
      title: "Description",
      component: (
        <>
          Minos is a visualizer for different pathfinding algorithms. It allows you to create a grid and place a starting point, one or more end points and obstacles. Then you can select an algorithm and it will show you how it works. You
          can see the nodes it visited and the path it took to get to the end point.
          <br />
          <br />
          I created this project because I wanted to touch up on my pathfinding algorithm knowledge and I thought this would be a fun way to do it. I also wanted to learn more about how to create a visualizer and how to make it look good.
          <br />
          <br />
          Minos also comes with an about page that explains how the different nodes in the grid work and how the different algorithms work. Each algorithm has 3 different explanations, each increasing in complexity. Each algorithm also
          comes with the typescript code that runs it, each section of the code is commented explaining what it does.
          <br />
          <br />
          The project is live and hosted on{" "}
          <Link href="http://minos.aornum.xyz/visualizer" className="underline text-accent" target="_blank">
            minos.aornum.xyz
          </Link>{" "}
          but it is not mobile responsive so I only recommend using it on a desktop.
        </>
      ),
    },
    {
      title: "Technologies",
      component: `
        The frontend of the project was built using Next.js, I wanted to use Next.js because I wanted to learn
        more about it and I thought it would be a good fit for this project. I knew React before heading into this
        project but I had never used Next.js, so it seemed like a good opportunity to touch up on my React knowledge
        while learning Next.js.`,
    },
    {
      title: "Things Learned",
      component: `
        This was my first time using Next.js and I enjoyed developing with it. It felt similar to SvelteKit but slightly
        more opinionated. The deployment process was a bit trickier compared to what I was used to since it seems
        like Next.js is meant to be used with Vercel while I was hosting on my own Linode. I also learned more about
        pathfinding algorithms and how they work.`,
    },
    {
      title: "Things I Would Do Differently",
      component: `
        I would probably make it mobile responsive. I would also like to add more functionality to it, like the ability
        to add different weights to the nodes and have the algorithms take that into account. I added some laberinth
        creation algorithms but I would like to add more.
        <br />
        I also think my I certainly overcomplicated my code, I think I could have made it a lot simpler. I believe removing
        most useEffects and using a single state object would have made it a lot simpler. But overall I was happy
        with how it turned out and it was a fun project to make.`,
    },
  ],
  images: [
    {
      url: "/projects/minos/0.png",
      alt: "The main page of the project witth an empty grid and A* selected as the algorithm",
    },
    {
      url: "/projects/minos/1.png",
      alt: "The main page with muliple end points, random obstacles and Depth First Search selected as the algorithm",
    },
    {
      url: "/projects/minos/2.png",
      alt: "The main page with a maze generated using the Recursive Division algorithm and Dijkstra selected as the algorithm",
    },
    {
      url: "/projects/minos/3.png",
      alt: "The main page with a maze generated using the brush",
    },
    {
      url: "/projects/minos/4.png",
      alt: "The about page with the explanation for the Greedy Best First Search algorithm, in simple terms",
    },
    {
      url: "/projects/minos/5.png",
      alt: "The about page with the explanation for the Breath First Search algorithm, in medium terms",
    },
    {
      url: "/projects/minos/6.png",
      alt: "The about page with the explanation for the Dijkstras algorithm, in complex terms",
    },
    {
      url: "/projects/minos/7.png",
      alt: "The code for dijkstras algorithm, with each section commented",
    },
  ],
};
