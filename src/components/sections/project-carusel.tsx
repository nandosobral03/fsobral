"use client";

import ProjectCard from "./project-card";
import { motion } from "motion/react";
import { useRef } from "react";

const projects = [
  {
    title: "Project 1",
    image: "/covers/rhea.png",
    description: (
      <span>
        Rhea is a{" "}
        <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" className="underline">
          Conway's Game of Life
        </a>{" "}
        simulator that I made in my free time. It's a simple project that I made to get to know the framework better. A difference I wanted to have from other game of life simulators is that the simulation loops around the edges of the
        grid, so that the cells on the edges can interact with the cells on the opposite side. It also comes with a panel that allows you to create patterns and use them as a brush to draw on the grid.
      </span>
    ),
  },
  {
    title: "Project 1",
    image: "/covers/rhea.png",
    description: (
      <span>
        Rhea is a{" "}
        <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" className="underline">
          Conway's Game of Life
        </a>{" "}
        simulator that I made in my free time. It's a simple project that I made to get to know the framework better. A difference I wanted to have from other game of life simulators is that the simulation loops around the edges of the
        grid, so that the cells on the edges can interact with the cells on the opposite side. It also comes with a panel that allows you to create patterns and use them as a brush to draw on the grid.
      </span>
    ),
  },
  {
    title: "Project 1",
    image: "/covers/rhea.png",
    description: (
      <span>
        Rhea is a{" "}
        <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" className="underline">
          Conway's Game of Life
        </a>{" "}
        simulator that I made in my free time. It's a simple project that I made to get to know the framework better. A difference I wanted to have from other game of life simulators is that the simulation loops around the edges of the
        grid, so that the cells on the edges can interact with the cells on the opposite side. It also comes with a panel that allows you to create patterns and use them as a brush to draw on the grid.
      </span>
    ),
  },
  {
    title: "Project 1",
    image: "/covers/rhea.png",
    description: (
      <span>
        Rhea is a{" "}
        <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" className="underline">
          Conway's Game of Life
        </a>{" "}
        simulator that I made in my free time. It's a simple project that I made to get to know the framework better. A difference I wanted to have from other game of life simulators is that the simulation loops around the edges of the
        grid, so that the cells on the edges can interact with the cells on the opposite side. It also comes with a panel that allows you to create patterns and use them as a brush to draw on the grid.
      </span>
    ),
  },
];

export default function ProjectCarousel() {
  const constraintsRef = useRef(null);

  return (
    <motion.div ref={constraintsRef} className="w-full overflow-hidden">
      <motion.div
        drag="x"
        dragConstraints={{
          left: -(projects.length * 600 + (projects.length - 1) * 16 - (typeof window !== "undefined" ? window.innerWidth : 0)) - 60,
          right: 0,
        }}
        className="flex gap-4 cursor-grab active:cursor-grabbing"
      >
        {projects.map((project, index) => (
          <motion.div key={index} className="flex-shrink-0">
            <ProjectCard title={project.title} image={project.image}>
              {project.description}
            </ProjectCard>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
