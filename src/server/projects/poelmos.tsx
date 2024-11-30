import { Project } from "../projects";
import Link from "next/link";

export const polemos: Project = {
  name: "polemos",
  links: [
    {
      url: "https://github.com/nandosobral03/polemos",
      name: "Github",
    },
    {
      url: "http://polemos.aornum.xyz/",
      name: "Live",
    },
  ],
  year: 2023,
  preview: {
    cover: "/covers/polemos.png",
    description:
      "Polemos is a text based fight simulator. It draws clear inspiration from BrantSteele's Hunger Games Simulator. My friends and I liked playing around with the Hunger Games Simulator, but we wanted to make something that was more customizable that allowed for far more players, events and stat tracking between rounds to keep track of the winners and losers.",
  },
  sections: [
    {
      title: "Description",
      component: (
        <>
          Polemos is a text based battle simulator. With a group of friends we used to play{" "}
          <Link href="https://brantsteele.net/hungergames/" className="underline text-accent" target="_blank">
            BrantSteele's Hunger Games Simulator
          </Link>{" "}
          with our own custom characters, each of us representing a couple of teams. But as we did we found we wanted to play with more than the characters the simulator allowed us to, so I decided to make my own version of it, giving us
          the ability to add as many characters as we wanted, as well as our own custom events, scenarios, statuses and add ourselves as sponsors of each of the teams.
          <br />
          <br />
          We also wanted to keep track of the results of each of the games, so I added overall stats for each of the characters, keeping track of those with most wins, kills, deaths, etc. The project includes the create teams, players,
          events, scenarios, statuses and sponsors. As well as the ability to run a simulation with a custom number of teams and players. As the simulation runs you can see the events that are happening and the status of each of the
          players, this creates a "Story" that is shown day by day and is saved on the server so it can be viewed later.
          <br />
          <br />
          The project is live and hosted on{" "}
          <Link href="http://polemos.aornum.xyz/" className="underline text-accent" target="_blank">
            polemos.aornum.xyz
          </Link>{" "}
          and can be accessed by anyone on guest mode, where all data is removed and replaced with defaults every 24 hours.
        </>
      ),
    },
    {
      title: "Technologies",
      component: `
        The frontend of the project was built using SvelteKit, since this project required multiple different pages,
        I decided to use SvelteKit to take advantage of the routing and server side rendering. The backend was built
        in Node.js using Express and Typescript. The database used was Sqlite.
        This was my first time using a SSR framework and I really enjoyed it. At first I struggled with the having code
        run both on the server and the client but once I got the hang of it I found it to be a great way to build websites.
        I think I didn't use it to it's full potential since I didn't really use things like cookies yet that allowed me to
        render different pages depending on the user and did the user dependent rendering on the client side, but I still found
        it to be a great experience.

        For the backend initially I planned to use another language and framework (Rust and Rocket) but I decided to go with
        Node.js since I was more familiar with it, and wanted to do things like image compression for multiple image formats which
        I found to be easier to do in Node.js.`,
    },
    {
      title: "Things Learned",
      component: `
        This was my first time using a SSR framework and I really enjoyed it, file based routing was also a new thing to me
        and I found it to be a great way to organize the project. Also learned more about SvelteKit, with things like layouts
        and how to use them to create a consistent look across the website. I continued to learn about making mobile friendly
        websites, Polemos being fully usable on mobile devices.
        <br>
        I also learned the importance of planning ahead, specially when it comes to the domain model. I had to change the database
        multiple times, at first I made the mistake of making the players depend on the teams, which meant that stat tracking was
        a lot harder to do. But I learned from that and made sure to plan ahead on other entities.`,
    },
    {
      title: "Things I Would Do Differently",
      component: `
        The main thing I would do different, where I to do this project again, cookies for authentication, meaning I can render
        most if not all of the pages on the server side. I would take more advantage of SvelteKit's endpoints, making the client completely
        unaware of the backend server.`,
    },
  ],
  images: [
    {
      url: "/projects/polemos/0.png",
      alt: "Login Page",
    },
    {
      url: "/projects/polemos/8.png",
      alt: "Home Page",
    },
    {
      url: "/projects/polemos/1.png",
      alt: "Sponsors Page",
    },
    {
      url: "/projects/polemos/2.png",
      alt: "Player Page",
    },
    {
      url: "/projects/polemos/3.png",
      alt: "Event Page",
    },
    {
      url: "/projects/polemos/4.png",
      alt: "Scenario Page",
    },
    {
      url: "/projects/polemos/5.png",
      alt: "Game list Page",
    },
    {
      url: "/projects/polemos/6.png",
      alt: "Example of a day in the simulation",
    },
    {
      url: "/projects/polemos/7.png",
      alt: "Game summary page",
    },
  ],
};
