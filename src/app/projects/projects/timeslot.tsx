import { Project } from ".";
import Link from "next/link";

export const timeslot: Project = {
  name: "timeslot",
  links: [
    {
      url: "https://github.com/nandosobral03/timeslot",
      name: "Github",
    },
    {
      url: "https://github.com/nandosobral03/timeslot-extension",
      name: "Companion Extension",
    },
    {
      url: "https://timeslot.aornum.xyz",
      name: "Live",
    },
  ],
  year: 2025,
  preview: {
    cover: "/covers/timeslot.png",
    description: "Timeslot is a spiritual successor to deadair that enhances the viewing experience through improved UI/UX design, expanded functionality, and a seamless companion browser extension for ease of use.",
  },
  sections: [
    {
      title: "Description",
      component: (
        <>
          Timeslot is a spiritual successor to{" "}
          <Link href="/projects/deadair" className="underline text-accent" target="_blank">
            deadair
          </Link>
          , improving on many aspects of the original project. The idea came from wanting to expand on the original concept - while deadair allowed users to create their own TV stations from YouTube videos, Timeslot takes it further by
          adding more features and improving the overall experience.
          <br />
          <br />
          The main improvements include a completely redesigned UI that's more intuitive and visually appealing, better channel management with more flexible scheduling options, and enhanced video playback controls. One of the biggest
          additions is a companion browser extension that lets users quickly add videos to their stations while browsing YouTube, making content curation much more seamless.
          <br />
          <br />
          The project maintains the core concept of letting users create and share their own TV-like stations , but makes it much more accessible and feature-rich. Users can still create scheduled programming and now have more control over
          how their stations run and look Being able to create a minute by minute schedule for their stations. The companion extension was a direct response to user feedback from deadair, where adding videos was one of the main pain points,
          now it can be done directly from youtube.
        </>
      ),
    },
    {
      title: "Technologies",
      component: (
        <>
          For this project I used Next.js with the app router and tRPC for the backend. The frontend was built using React with Tailwind for styling. I used the YouTube API to fetch video information and manage playlists, similar to the
          original deadair project but with improvements to the data fetching and caching strategy.
          <br />
          <br />
          Authentication was handled through Google OAuth, allowing users to sign in with their Google accounts. Using{" "}
          <Link href="https://arcticjs.dev/" className="underline text-accent" target="_blank">
            arcticjs
          </Link>{" "}
          and{" "}
          <Link href="https://oslo.js.org/" className="underline text-accent" target="_blank">
            oslo
          </Link>{" "}
          to handle the authentication flow which made it a breeze.
          <br />
          <br />
          The database was once again hosted with{" "}
          <Link href="https://turso.tech/" className="underline text-accent" target="_blank">
            Turso
          </Link>{" "}
          and the project was deployed on Vercel, I find this to be one of the easiest stacks to deploy and manage, no more than a few clicks and it's done. Being able to continualy deploy and test the project on Vercel allows for an
          extremely fast feedback loop which means I can iterate faster and fix bugs faster.
          <br />
          <br />
          The companion extension was built using{" "}
          <Link href="https://wxt.dev/" className="underline text-accent" target="_blank">
            wxt
          </Link>
          , it's a great way to build chrome extensions, it's easy to set up and it's very powerful. Hot reloading makes it a 10x better experience, I'm quite impressed with how easy it was to develop and deploy the extension. Integration
          with the main application was done by allowing users to create an API key the can then use to authenticate requests to the extension.
        </>
      ),
    },
    {
      title: "Things Learned",
      component: (
        <>
          This project is in some way a capstone for this last year for me, It shows how much I've grown during this last 12 months, considering when I finished deadair, I looked back at the original code for deadair to check how I had
          implemented some of the features and I was appalled at how much I had improved (Something I have talked about in{" "}
          <Link href="/blog/lessons-from-redoing-projects" className="underline text-accent" target="_blank">
            Lessons from redoing projects
          </Link>
          ).
          <br />
          <br />
          I did learn new things that I'd never done before, particularly the extension, I had created some simple extensions before but nothing like this, using wxt a great experience compared to how I'd done it on previous projects.
          <br />
          <br />
          Something interesting I learned was to optimize database queries for reads, I didn't really think of this until I deployed the project and noticed that turso said I had generated 100.000 reads in a couple of minutes, I had no idea
          that the project was being used that much, I had to optimize the queries to reduce the number of reads, I'm glad I learned this, it's a good lesson and I'll keep it in mind for future projects. I think deploying earlier and simply
          iterating over the project would have meant I could have fixed this issue earlier and saved myself a lot of headaches.
          <br />
          <br />I also learned there is not a single decent Scheduler component for React, search for it and you'll see what I mean there are a bunch of options, none of them work, and the ones that look promising are paid. There is no way
          I'm paying for a component. I almost called off the project because I couldn't find a decent scheduler component but after trying a bunch of them and being disappointed I decided to implement it myself purely out of spite for
          people trying to profit out of a React component.
        </>
      ),
    },
    {
      title: "Things I Would Do Differently",
      component: (
        <>
          I came into the projecy with the idea of possibly making a paid/pro version of the project, but working through the features I realized that there wasn't something that I would like to strip the free version of, so I decided to
          keep it free and open source as it should be. If anything I would have liked to have deployed the project earlier and simply iterated over it while testing on a staging environment instead of doing in on my machien since I would
          have caught a lot of bugs and issues earlier.
        </>
      ),
    },
  ],
  images: [
    {
      url: "/projects/timeslot/1.png",
      alt: "Timeslot Landing Page",
    },
    {
      url: "/projects/timeslot/2.png",
      alt: "Station view showing the now playing and upcoming videos",
    },
    {
      url: "/projects/timeslot/3.png",
      alt: "Watching a video with the chat open",
    },
    {
      url: "/projects/timeslot/4.png",
      alt: "Custom sleep timer",
    },
    {
      url: "/projects/timeslot/5.png",
      alt: "Landing page with light mode",
    },
    {
      url: "/projects/timeslot/6.png",
      alt: "Search for a station that has videos from a specific channel",
    },
    {
      url: "/projects/timeslot/7.png",
      alt: "Search for a station that has videos from a specific channel",
    },
    {
      url: "/projects/timeslot/8.png",
      alt: "Following stations",
    },
    {
      url: "/projects/timeslot/9.png",
      alt: "User profile",
    },
    {
      url: "/projects/timeslot/10.png",
      alt: "Station details when its your own station",
    },
    {
      url: "/projects/timeslot/11.png",
      alt: "Editing a station",
    },
    {
      url: "/projects/timeslot/12.png",
      alt: "Adding videos to a station",
    },
    {
      url: "/projects/timeslot/13.png",
      alt: "Setting the schedule for a station",
    },
    {
      url: "/projects/timeslot/14.png",
      alt: "Schedule ordered view",
    },
    {
      url: "/projects/timeslot/15.png",
      alt: "API key management",
    },
    {
      url: "/projects/timeslot/16.png",
      alt: "Usage of the extension",
    },
    {
      url: "/projects/timeslot/17.png",
      alt: "Adding a video to a station with the extension",
    },
    {
      url: "/projects/timeslot/18.png",
      alt: "The video being added to the station after using the extension",
    },
    {
      url: "/projects/timeslot/19.png",
      alt: "The extension popup",
    },
  ],
};
