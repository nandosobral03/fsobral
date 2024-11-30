import { Project } from ".";
import Link from "next/link";

export const chimera: Project = {
  name: "chimera",
  links: [
    {
      url: "https://github.com/nandosobral03/chimera/",
      name: "Github",
    },
  ],
  year: 2023,
  preview: {
    cover: "/covers/chimera.png",
    description:
      "Chimera is a Minesweeper game that provides a daily challenge, similar to games like NYT's Wordle. Each board is unique every day, and all players are given the same starting position. It also includes a leaderboard that tracks the highest winstreaks and statistics of previous days, with heatmaps to show in what bombs the players exploded the most.",
  },
  sections: [
    {
      title: "Description",
      component: (
        <>
          Chimera is a Minesweeper game that provides a daily challenge. It takes heavy inspiration from other daily games like{" "}
          <Link href="https://www.nytimes.com/puzzles/spelling-bee" className="underline text-accent" target="_blank">
            NYT Spelling Bee
          </Link>{" "}
          and{" "}
          <Link href="https://www.nytimes.com/puzzles/wordle" className="underline text-accent" target="_blank">
            NYT Wordle
          </Link>
          .
          <br />
          <br />
          The idea was to take the idea of a daily challenge and apply it to Minesweeper. Each day a new board is generated together with a starting point, the goal is to finish the board starting from that point the fastest. The mines are
          placed randomly, always allowing for a big starting area. Chimera also comes with a leaderboard that shows the fastest times for each day and the highest overall winstreaks. Each day also has its own heatmap that shows the places
          where people clicked on bombs the most. The current day heatmap being only visible to those who have completed the current day. On either winning or losing a game, the user is presented with a shareable link that shows the result
          of the game, their current stats and a sharaeable image created of the board that doesn't spoil the location of the bombs. The project is also mobile friendly so it can be played on mobile devices.
          <br />
          <br />
          The project was live and hosted on{" "}
          <Link href="http://chimera.aornum.xyz" className="underline text-accent" target="_blank">
            chimera.aornum.xyz
          </Link>{" "}
          for a while but was since removed because the backend kept causing issues over long periods of time.
          <br />
          <br />
        </>
      ),
    },
    {
      title: "Technologies",
      component: `
        The frontend of the project was built using SvelteKit, since this project required multiple different pages,
        I decided to use SvelteKit to take advantage of the routing and server side rendering. The backend was built
        in Rust with the Axum framework.`,
    },
    {
      title: "Things Learned",
      component: (
        <>
          I continued to learn more about SvelteKit, which I really enjoyed using. I also learned more about Rust, a language I have been learning on and off for a while now with no real project to use it on. With Axum I learned how to
          apply it to a real project and how to use it to create a REST API. I also learned how to use the Rust ORM Diesel, which I used to connect to the database, run migrations and create the models.
          <br />
          <br />
          At this point I still wasn't using SvelteKit to it's full potential, I was still doing a lot of the rendering on the client, something I have since changed in my more recent projects, for example this very website. Making it
          mobile friendly was also a new challenge, Since the board was a 16x30 grid, it was hard to make it fit on a mobile screen, and flipping it in TypeScript would be a painfull process. So I decided to rotate it with css and rotate
          everything else back, this way I could keep the same code for the board and just rotate it on mobile devices.
        </>
      ),
    },
    {
      title: "Things I Would Do Differently",
      component: `
        I would probably make it so that the client is completely unaware of the backend server, using SvelteKit's endpoints to make the requests.
        and using cookies for authentication. I would also like to add more features to the game, make other leaderboards, different difficulties
        each day, etc.`,
    },
  ],
  images: [
    {
      url: "/projects/chimera/0.png",
      alt: "Chimera Home Page",
    },
    {
      url: "/projects/chimera/1.png",
      alt: "Chimera first time playing",
    },
    {
      url: "/projects/chimera/2.png",
      alt: "Chimera playing as guest",
    },
    {
      url: "/projects/chimera/3.png",
      alt: "Chimera navigating page",
    },
    {
      url: "/projects/chimera/4.png",
      alt: "Chimera heatmap of the current day",
    },
    {
      url: "/projects/chimera/5.png",
      alt: "Chimera heatmap of a day with 2 explosions",
    },
    {
      url: "/projects/chimera/6.png",
      alt: "Chimera losing a game",
    },
    {
      url: "/projects/chimera/7.png",
      alt: "Chimera share result",
    },
    {
      url: "/projects/chimera/8.png",
      alt: "Chimera leaderboards",
    },
  ],
};
