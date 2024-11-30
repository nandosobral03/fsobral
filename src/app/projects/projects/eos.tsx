import Link from "next/link";
import { Project } from ".";

export const eos: Project = {
  name: "eos",
  links: [
    {
      url: "https://github.com/nandosobral03/eos/",
      name: "Github",
    },
    {
      url: "http://eos.aornum.xyz",
      name: "Live",
    },
  ],
  year: 2023,
  preview: {
    cover: "/projects/eos/0.png",
    description: "Eos is a starterpage that combines the things I use the most when I launch a new tab with extra functionality including notetaking, RSS feed aggregation, spotify tracking stats and more.",
  },
  sections: [
    {
      title: "Description",
      component: (
        <>
          Eos is a starterpage that combines the things I use the most when I launch a new tab with extra functionality including notetaking, RSS feed aggregation, spotify tracking stats and more. The project was inspired by ricing
          communities like{" "}
          <Link href="https://www.reddit.com/r/startpages/" className="underline text-accent" target="_blank">
            r/startpages
          </Link>{" "}
          and
          <Link href="https://www.reddit.com/r/unixporn/" className="underline text-accent" target="_blank">
            r/unixporn
          </Link>{" "}
          as well as other <i> ricing </i> communities. I wanted to create a page that both looked good and was functional. The main goal of the project was to create a page that I would use everyday and it has become just that. I wanted it
          to be pretty customizable so I created a settings section that allows you to change how it looks. From changing the color scheme, saving and loading themes, to changing the background image. You can also select what tabs to show
          on the upper-right modal which include bookmarks, notes, spotify, and an episode tracker. In addition to that you can add RSS feeds to the page and it will display the latest articles from those feeds, modify the bookmarks,
          connect to the spotify API, select a time frame for the stats and show a currently playing song. Finally you can change the bottom right modal to either show a static image, the NASA image of the day nothing at all. The notes are
          saved as Markdown files in the database and can be edited and deleted from the app, showing a preview of the markdown as you type. The project is technically live and hosted on{" "}
          <Link href="http://eos.aornum.xyz/" className="underline" target="_blank">
            eos.aornum.xyz
          </Link>{" "}
          but it's not really meant to be used by anyone else. It's more of a personal project that I use everyday. So it is behind a login screen and you can't create an account. I might change that in the future but for now it's just for
          me.
        </>
      ),
    },
    {
      title: "Technologies",
      component: `
        The project is built using Svelte and technically uses Sveltekit but since it's a single page app it
        doesn't really use any of the features of it's Sveltekit. The backend is built using Node.js, Express and
        Typescript. I used Sqlite as the database since it's a small project and I didn't need anything more.`,
    },
    {
      title: "Things Learned",
      component: `
        This was my first project using Svelte and I really enjoyed it. I had used React and Angular before
        but I found Svelte to be much more intuitive and easy to use. I also learned a lot about how to
        connect to different APIs and how to use them in my project.
        It was my first time deploying a project to a server which I did on Linode. Doing it in a IaaS provider
        meant I had to do everything myself which was a great learning experience. I had to setup the server and
        the reverse proxy for the domain.
        I also had to solve problems like page loads being slow with high resolution images. I solved this by
        creating a script that would resize the images to a smaller size and then serve those instead of the
        original images on initial load and loaded the original images in the background.`,
    },
    {
      title: "Things I Would Do Differently",
      component: `
        I would probably do the RSS feed aggregation differently. I call all the feeds in parallel and then
        sort them by date. This works well on a small scale but as more feeds are added it will take longer,
        a would solution for this would include a database and a backend that would call the feeds every so oftern
        and stores them in the database/cache. Then the frontend would just call the backend and get the data from
        there.`,
    },
  ],
  images: [
    {
      url: "/projects/eos/0.png",
      alt: "The default view of the page",
    },
    {
      url: "/projects/eos/1.png",
      alt: "The notes section",
    },
    {
      url: "/projects/eos/2.png",
      alt: "The notes section",
    },
    {
      url: "/projects/eos/12.png",
      alt: "Editing a note with the preview on the bottom",
    },
    {
      url: "/projects/eos/3.png",
      alt: "Spotify section, showing top artists",
    },
    {
      url: "/projects/eos/4.png",
      alt: "Style settings, showing background upload, themes and current colors",
    },
    {
      url: "/projects/eos/5.png",
      alt: "Tabs settings, showing what tabs to show",
    },
    {
      url: "/projects/eos/6.png",
      alt: "Tabs settings, with all but the bookmarks tab unchecked",
    },
    {
      url: "/projects/eos/7.png",
      alt: "RSS feed settings, showing the feeds that are currently added",
    },
    {
      url: "/projects/eos/8.png",
      alt: "Bookmark settings, showing the bookmark categories and links",
    },
    {
      url: "/projects/eos/9.png",
      alt: "Spotify settings showing, current player toggle and time frame selection",
    },
    {
      url: "/projects/eos/10.png",
      alt: "Bottom container settings, showing the options for the bottom right modal",
    },
    {
      url: "/projects/eos/11.png",
      alt: "Page without the bottom right modal and no tabs selected",
    },
  ],
};
