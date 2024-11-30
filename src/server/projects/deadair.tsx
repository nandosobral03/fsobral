import { Project } from "../projects";
import Link from "next/link";

export const deadair: Project = {
  name: "deadair",
  links: [
    {
      url: "https://github.com/nandosobral03/deadair/",
      name: "Github",
    },
    {
      url: "http://deadair.aornum.xyz/",
      name: "Live",
    },
  ],
  year: 2023,
  preview: {
    cover: "/covers/deadair.png",
    description:
      "Deadair is a new way to watch youtube in the background. It allows you to create channels with set schedules that run throughout the week, allowing you to hop in and out of the constant stream of content, just like a TV channel would. It also allows you to create your own channels and share them with your friends.",
  },
  sections: [
    {
      title: "Description",
      component: (
        <>
          The idea for this project came from an actual problem I had, I like watching youtube videos in the background while I work or do other things but I don't like the idea of having to constantly switch context to find a new video to
          watch. I also like having the background noise like a TV would before going to sleep, but found no real way to do this with youtube. So I decided to create a website that would allow me to do this.
          <br />
          <br />A big part of the inspiration from this project also came from a post I saw in{" "}
          <Link href="https://news.ycombinator.com/item?id=35740334" className="underline text-accent" target="_blank">
            Hacker News
          </Link>{" "}
          about a guy who created his own TV Channel with a Raspberry Pi and a bunch of movies and videos he had downloaded. I thought this was a great idea and wanted to create something similar but leveraging the power of the internet,
          allowing anyone to create their own channel and share it with their friends. I decided to stick to youtube since it's the biggest video platform and has a lot of content, and it's where I watch most of videos.
          <br />
          <br />
          The project is live and hosted on{" "}
          <Link href="http://deadair.aornum.xyz/" className="underline text-accent" target="_blank">
            deadair.aornum.xyz
          </Link>{" "}
          but it is not mobile responsive so I only recommend using it on a desktop. It's free to use without having to create an account, but if you want to create your own channels you'll have to create an account, which is made easy by
          using google social sign in. Once you create an account you can create your own channels and share them with your friends. You can also create a channel with a schedule, allowing you to create a channel that runs your favorite
          videos in a set schedule, just like a TV channel.
        </>
      ),
    },
    {
      title: "Technologies",
      component: (
        <>
          For this project I decided to use SvelteKit, it's what I like the most as of late and I wanted to try it out in a bigger project. I also used Tailwind for styling, I've been using it for a while now and I really like it, I had
          some preconceptions about it but I've come to really like it. I also express as my backend framework, I've been using it for a while now and I'm very comfortable with it. I also used Typescript for the backend, with a Sqlite
          database for simplicity.
          <br />
          <br />
          When it comes to new techonologies for me, I decided to give Kysely a try, it's a new SQL query builder for Typescript that I've been wanting to try out for a while now. And this project seemed like a good fit for it. I used the
          google API's to fetch videos based on their URL or a given playlist ID. I also used the youtube API library to fetch metadata from youtube videos, like the thumbnail and the duration, those are saved into the database and used to
          display the videos in the channel. Users can create their own channels where they can add videos and set a schedule for them to run on.
          <br />
          <br />
          It was also my first time using the imgur API, I used it to upload the channel thumbnails. Surprisingly it was very easy to use and I was able to get it working in no time. And considering they don't have pricing plans it's a
          great option for small projects like this one.
        </>
      ),
    },
    {
      title: "Things Learned",
      component: (
        <>
          This project allowed me to learn more about Google API's, I had used them before but never in a project of this scale. I also learned more about the Youtube API and how to use it to fetch videos and playlists. One of the most
          important things I learned was how to use the Google OAuth API to allow users to sign in with their google account. I had never done this before but I always wanted to learn how to do it since it makes the barrier to entry for
          users much lower.
          <br />
          <br />I also used websockets for the first time, I used them to create a live chat for each channel. I used the socket.io library for this and it was very easy to use, except for the deploy part, since I'm using a reverse proxy to
          host the website I had to configure it to allow websockets to work. I also had to configure the server to allow websockets to work, which was a bit of a pain but I was able to get it working in the end.
        </>
      ),
    },
    {
      title: "Things I Would Do Differently",
      component: (
        <>
          I don't have much to say here, I'm pretty happy with how the project turned out. I would probably try to make it more mobile friendly, as of now it is responsive but some user actions are not available on mobile, such as editing
          channel schedules since it heavily relies on drag and drop. I would also like to add more features to the channels, like the ability to add a description and tags to them.
          <br />
          <br />I would like to add more features such as making collaborative channels, where multiple users can add videos to the channel. I would also like to add a way to search for channels and videos, like trending channels so people
          can find new channels to watch. I might add these later on but for now I'm pretty happy with how it turned out. Probably will come back to the project after finishing my next project or so and add some of these features since I
          really like the idea of the project and am already using it daily.
        </>
      ),
    },
  ],
  images: [
    {
      url: "/projects/deadair/0.png",
      alt: "Deadair on desktop showing the homepage",
    },
    {
      url: "/projects/deadair/1.png",
      alt: "Deadair showing the start of the about page",
    },
    {
      url: "/projects/deadair/2.png",
      alt: "Deadair on desktop showing browse page, without being logged in",
    },
    {
      url: "/projects/deadair/3.png",
      alt: "Deadair channel search page",
    },
    {
      url: "/projects/deadair/4.png",
      alt: "Inside of a channel, showing the schedule and currently playing video",
    },
    {
      url: "/projects/deadair/5.png",
      alt: "Inside of a channel, showing the current playing video",
    },
    {
      url: "/projects/deadair/6.png",
      alt: "Logged in view, with both public and user channels",
    },
    {
      url: "/projects/deadair/7.png",
      alt: "Channel view, where users can select their channels and edit them",
    },
    {
      url: "/projects/deadair/8.png",
      alt: "Channel view, inside of a channel, where users can select the schedule or their videos",
    },
    {
      url: "/projects/deadair/9.png",
      alt: "Channel view, showing the channel's videos",
    },
    {
      url: "/projects/deadair/10.png",
      alt: "Login page, showing the google sign in button",
    },
    {
      url: "/projects/deadair/11.png",
      alt: "Create channel page, showing the channel creation form",
    },
    {
      url: "/projects/deadair/12.png",
      alt: "Sleep timer modal, where users can set a sleep timer for the channel",
    },
    {
      url: "/projects/deadair/15.png",
      alt: "Join channel screen",
    },
    {
      url: "/projects/deadair/13.png",
      alt: "Browse channel on mobile",
      isMobile: true,
    },
    {
      url: "/projects/deadair/14.png",
      alt: "Watch channel on mobile showing the chat and the currently playing video",
      isMobile: true,
    },
  ],
};
