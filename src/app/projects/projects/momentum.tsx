import { Project } from ".";

export const momentum: Project = {
  name: "momentum",
  links: [
    {
      url: "https://github.com/nandosobral03/momentum/",
      name: "Github",
    },
  ],
  year: 2024,
  preview: {
    cover: "/covers/momentum.png",
    description:
      "Momentum is a daily habit tracker that I made to help me keep track of my habits. It allows you to create habits lists and challenges that you and other users can subscribe to and complete, getting badges and rewards for completing them.",
  },
  sections: [
    {
      title: "Description",
      component: (
        <>
          Momentum is a web application that allows you to track your habits, set goals, and visualize your progress. It is designed to help you build good habits and break bad ones. The premise is simple: instead of setting single habits
          you want to get to, you create a list of habits you want to track. You can then track your progress over time and see how you are doing. These lists can be either public or private, allowing others to subscribe to the same habits
          as you and work through them together.
          <br />
          <br />
          The idea is to create a community of people who are all working towards the same goals, and to help each other out along the way.
          <br />
          <br />
          As well as tracking your habits, you can create and subscribe to challenges. These are structured sets of goals with a defined time duration and a set of rules. Challenges have to be completed one stage at a time, and you can only
          move on to the next stage once you have completed the current one.
          <br />
          <br />
          Once challenges are completed or habit lists are completed for a given time period, you can see a visual representation of your progress in the badges displayed on your profile. Next to some information the user might want to
          share with the community.
          <br />
          <br />
          Everything is designed to be as simple and easy to use as possible, with the aim of making it as easy as possible to build good habits. All tasks assigned for the day are displayed on the home page where the user can mark them as
          completed or not, easily keeping track of their progress.
        </>
      ),
    },
    {
      title: "Technologies",
      component: (
        <>
          Momentum was created using Next.js and felt like a stepup from my previous project, nochan. I was able to use Next.js' server side rendering, using cookies to fetch the data as the user and rendering all posts, identifying those
          made by the user serverside. Making the website feel more responsive and faster. I'm also using Next.js' API routes to handle the backend, which is a great way to handle the backend of a Next.js project which is something I hadn't
          done before.
          <br />
          <br />
          The business logic of the project is handled using tRPC which allowed me to create a type safe connection between the frontend and the backend. This way I could move fast and not have to worry about the frontend and backend being
          out of sync. I also used Prisma to handle the database, which was a great experience, I found it to be very easy to use and better than the other ORMs I've used in the past and will continue to use it in the future for my
          projects.
          <br />
          <br />
          For the Auth I opted for Auth.js (formerly NextAuth.js) which was a great experience, it was very easy to use and I was able to get it up and running in no time. Making this implementation far safer than my previous projects and
          allowed me to setup multiple SSO providers with ease.
          <br />
          <br />
          As for the frontend I used Tailwind again and I'm glad I did it's a great way to style the website and I was able to make it look very similar to the original without having to write a lot of CSS. I decided not to make it
          responsive since it's a web app and I wanted to focus on the desktop experience. I also the shadcn component library to create the app making the process much easier and aesthetically consistent.
          <br />
          <br />
          Also managed the deploy using Vercel which was a great experience, for Next.js is the easiest way to deploy a project no doubt
        </>
      ),
    },
    {
      title: "Things Learned",
      component: (
        <>
          This project was a great way to learn more about Next.js, I felt like my use React has improved greatly from my last project. My usage of React overall has improved and I was able to use it in a more idiomatic way. I also got to
          use Next.js' server side rendering, using cookies to fetch the data as the user and rendering all posts, identifying those made by the user serverside.
          <br />
          <br />I also learned about tRPC which allowed me to create a type safe connection between the frontend and the backend. This way I could move fast and not have to worry about the frontend and backend being out of sync. I also used
          Prisma to handle the database, which was a great experience, I found it to be very easy to use and better than the other ORMs I've used in the past and will continue to use it in the future for my projects.
        </>
      ),
    },
    {
      title: "Things I Would Do Differently",
      component: `
        I liked most of the technologies I used in this project and felt like they were a great fit for the project. I would like to make the project more mobile friendly and add more features to the challenges and habit lists. But overall I'm pretty happy with how the project turned out and I'm glad I was able to create it. I might come back to it in the future but for now I'm happy with how it turned out and eager to move on to the next project and create something new.`,
    },
  ],
  images: [
    {
      url: "/projects/momentum/1.png",
      alt: "Momentum login page",
    },
    {
      url: "/projects/momentum/2.png",
      alt: "Momentum home page showing the user's tasks for the day structured by list and challenge",
    },
    {
      url: "/projects/momentum/3.png",
      alt: "Momentum habit list page showing the user's tasks for the day unsctructured",
    },
    {
      url: "/projects/momentum/4.png",
      alt: "List of habit lists to browse and subscribe to with filters, search and sorting options and pagination",
    },
    {
      url: "/projects/momentum/5.png",
      alt: "List of challenges to browse and subscribe to with filters, search and sorting options and pagination",
    },
    {
      url: "/projects/momentum/6.png",
      alt: "About page",
    },
    {
      url: "/projects/momentum/7.png",
      alt: "Habit list details page showing the list's tasks and the badges associated with it",
    },
    {
      url: "/projects/momentum/8.png",
      alt: "Edit habit list badges page",
    },
    {
      url: "/projects/momentum/9.png",
      alt: "Challenge details page showing the challenge's tasks and the badges associated with it",
    },
    {
      url: "/projects/momentum/10.png",
      alt: "User profile page showing the user's badges and some information about the user",
    },
    {
      url: "/projects/momentum/11.png",
      alt: "Create habit list page",
    },
    {
      url: "/projects/momentum/12.png",
      alt: "Create challenge page",
    },
    {
      url: "/projects/momentum/13.png",
      alt: "Edit habit list page",
    },
  ],
};
