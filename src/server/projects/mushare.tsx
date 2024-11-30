import { Project } from "../projects";
import Link from "next/link";

export const mushare: Project = {
  name: "mushare",
  links: [
    {
      url: "https://github.com/nandosobral03/mushare",
      name: "Github",
    },
    {
      url: "https://mushare.aornum.xyz",
      name: "Live",
    },
  ],
  year: 2024,
  preview: {
    cover: "/covers/mushare.png",
    description: "Mushare is a music sharing platform that allows you to create and share music charts and grids with your friends.",
  },
  sections: [
    {
      title: "Description",
      component: (
        <>
          Mushare is a web app that allows users to create beautiful album{" "}
          <Link href="https://www.spotlistr.com/articles/view/2020/04/22/lastfm-grid-generator" className="underline text-accent" target="_blank">
            grids
          </Link>{" "}
          and ranked charts that can be easily shared or imported to their Spotify library. This idea came to me as I was looking for music recommendations, I stumbled upon the{" "}
          <Link href="https://mu4chan.fandom.com/wiki//mu/_Wiki" className="underline text-accent" target="_blank">
            /mu/ wiki
          </Link>{" "}
          and wanted to give some of the charts a go. To my dismay the only way to do so was to manually search each album, put them in a playlist so I could listen to the albums in the span of a couple of days.
          <br />
          <br />
          That inspired me to create Mushare, this way it would be easier to both create these charts (no having to use an image editor), there are other tools out there like last.fm but they focus on charts created from the top listened to
          albums of a user. This way any user can curate a set of albums and share them with their friends under the form of a grid or a ranked chart. These charts can be easily shared as a link or an image and if viewing them from mushare
          they can be easily imported into a playlist in the user's Spotify account.
          <br />
          <br />
          Not much more to it, you can also like grids and charts so they are easier to find and see what other people think of the charts. It was a fun short project to fix a problem I had.
        </>
      ),
    },
    {
      title: "Technologies",
      component: (
        <>
          Mushare was created with Next, basing the project on the t3 stack with some modifications, I used the tRPC library to handle the backend as usual, I went with app router this time since I'm getting more comfortable with it. Used
          the Spotify API a bunch to fetch albums, album covers, signing the user in with Spotify and fetching their playlists, creating playlists, etc.
          <br />
          <br />
          Authentication was done manually with cookies and using the spotify token itself as the user's session. This way I could easily fetch the user's information and not have to handle unnecessary complexity.
          <br />
          <br />
          The project was deployed with Vercel, as usual it was easy and fast since Next is the bread and butter of the platform. The database I went with something new, I used{" "}
          <Link href="https://turso.tech/" className="underline text-accent" target="_blank">
            Turso
          </Link>{" "}
          for the database, it uses libsql which is a fork of sqlite. The experience so far has been great, it's easy to set up with the prisma driver and going from local to deployed with was done jumping just a few hoops.
        </>
      ),
    },
    {
      title: "Things Learned",
      component: (
        <>
          This project was a great way to learn more about the Spotify API and how to use it to create playlists, fetch user information, etc. It was also a great way to learn more about Next.js' app router and how to use it to handle the
          backend of a project. Found a fun interaction with how Next works, at first I implemented the signout flow as a GET server action, but since Next pretriggers GET requests to some pages to speed up the process that meant that the
          user would be signed out even if they were just navigating around the website. Had to change it to a POST request to fix it.
          <br />
          <br />
          Also learned about turso a bit, from what I experienced it's a great way to get a database up and running, I think I will continue using it for smaller projects and see how it goes but for now the experience has been superior to
          my experiences with other providers
        </>
      ),
    },
    {
      title: "Things I Would Do Differently",
      component: (
        <>
          I think I would go for a more mobile friendly design, I'm love how it looks on desktop but on mobile it feels a bit too squished. But I don't care too much about it so it's not a big deal.
          <br />
          <br />
          Overall not much that I would change, I'm happy with the outcome and I think it works great.
        </>
      ),
    },
  ],
  images: [
    {
      url: "/projects/mushare/1.png",
      alt: "Mushare Landing Page",
    },
    {
      url: "/projects/mushare/2.png",
      alt: "Album grid information",
    },
    {
      url: "/projects/mushare/3.png",
      alt: "Ranked chart information",
    },
    {
      url: "/projects/mushare/4.png",
      alt: "Most popular charts and grids",
    },
    {
      url: "/projects/mushare/5.png",
      alt: "Profile page",
    },
    {
      url: "/projects/mushare/6.png",
      alt: "Create grid",
    },
    {
      url: "/projects/mushare/7.png",
      alt: "View details of a grid",
    },
    {
      url: "/projects/mushare/8.png",
      alt: "Spotify playlist created by the app",
    },
    {
      url: "/projects/mushare/9.png",
      alt: "Grid image generated by the app",
    },
  ],
};
