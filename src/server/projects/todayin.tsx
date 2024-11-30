import { Project } from "../projects";

export const todayin: Project = {
  name: "today in",
  links: [
    {
      url: "https://github.com/nandosobral03/todayin/",
      name: "Github",
    },
  ],
  year: 2024,
  preview: {
    cover: "/covers/todayin.png",
    description:
      "Today In is a subreddit post aggregator that allows you to see a summary of the top posts of the day in a subreddit. Giving you a quick overview of the sentiment of the subreddit and the most popular posts and comments so far. It uses Google's Gemini to summarize the content and give the user a newspaper-like experience.",
  },
  sections: [
    {
      title: "Description",
      component: (
        <>
          Today In is a subreddit post aggregator that allows you to see a summary of the top posts of the day in a subreddit. Giving you a quick overview of the sentiment of the subreddit and the most popular posts and comments so far. It
          uses Google's Gemini to summarize the content and give the user a newspaper-like experience.
          <br />
          <br />
          The idea was to create an app that allowed users to understand what was going on in a community lately without having to scroll through the subreddit for hours and read all the comments. Giving them a general idea of what the
          people were talking about and what was the general vibe of the subreddit.
          <br />
          <br />
          I decided to make the app super simple, no authentication, no user data, just a simple search bar where you can type the subreddit you want to see the top posts of the day and get a summary of the top posts and comments.
          <br />
          <br />
          Initially I wanted to allow users to see the top posts of different internet subcultures like Reddit, Substack, X/Twitter, etc. But I decided to focus on Reddit for now and maybe add more sources in the future as Reddit has a lot
          of communities and clear APIs to work with. It also has a clear separation of communities that other plataforms like Twitter manage organically.
        </>
      ),
    },
    {
      title: "Technologies",
      component: (
        <>
          As it's a trend for 2024, I decided to use Next.js again, it's a great framework and I'm very comfortable with it and it allows me to iterate and build fast. I also used Tailwind again for the styling, which is still great. Coming
          back to when I first created this page I wish I wasn't so anti-tailwind as the time I was creating it since now writing plain css feels a bit like a waste of time.
          <br />
          <br />
          For the backend I went with tRPC nothing out of the ordinary here, it's a great way to handle the backend and frontend communication, I used google's Gemini to summarize the content of the posts and comments, which was a great
          experience. Using this was the driving force behind the project, I wanted to get my feet wet using LLMs and this was a great way to do it, with an extremely generous free tier one almost feels as it's worth having to sit through
          the Google Cloud Console and Google's labyrinthine documentation.
          <br />
          <br />
          For the deployment I went back to my trusted VM, This proyect could not work with a Serverless deployment unless it was restructured to use queues for the long running process of actually summarizing the content of the posts and
          comments. Lambda functions would either timeout or simply cost a couple of dollars per request which is unsustainable. So I went back to my VM and used Nginx to serve the files with a node server running behind my evergrowing
          reverse proxy.
        </>
      ),
    },
    {
      title: "Things Learned",
      component: (
        <>
          This project was a great way to learn more about LLMs, using LLMs inside code feels weird, having to craft a prompt that makes sense and then pray that the model will understand it and give you a good response. It's a bit like
          trying to get a kid to do something, but the kid is a model which took several hundred hours to train and probably a couple decades of research to get to the point where it can understand what you're asking. I learned quite a bit
          about creating a prompt that the model understands and knows how to respond to without finetuning the model.
          <br />
          <br />
          Also the Reddit API which is a pain to setup and use. Everything was going great during development and then when I deployed I got hit with a bunch of 403s because apparently the Reddit API doesn't like when you make requests from
          the IP range of cloud providers like linode. So I had to do it the long way, create a project through their outdated and probably unmaintained console. It wasn't particularly hard but it was a pain that the problem only showed up
          when I deployed the project and saying my final goodbyes to the code.
        </>
      ),
    },
    {
      title: "Things I Would Do Differently",
      component: (
        <>
          I would like to make the project more mobile friendly and add more sources to the aggregator. Mostly that, I'm pretty happy with how the project turned out, Some cool things that could also be implemented to make it better would
          be to hook up the images to the visual model of the LLMs so they could use that to infer more information about the post instead of just going by what the post and comments say.
          <br />
          <br />I think that the proyect would also benefit from an event-driven architecture, with a queue to handle the long running process of summarizing the content of the posts and comments, this would allow for better scaling and an
          easier deployment. The reason for not doing this origianlly was that I want to keep this projects as close to free as possible and creating a queue would require a service like SQS or RabbitMQ which would cost money.
        </>
      ),
    },
  ],
  images: [
    {
      url: "/projects/todayin/1.png",
      alt: "Todayin's homepage with a list of recommended subreddits",
    },
    {
      url: "/projects/todayin/2.png",
      alt: "Todayin's search page with a search bar and a list of the top posts of the day",
    },
    {
      url: "/projects/todayin/3.png",
      alt: "Todayin's overview of the '/r/news' subreddit with a summary of the top posts and comments of the day as well as a list of the top post with their summary",
    },
    {
      url: "/projects/todayin/4.png",
      alt: "Inside one of the top posts of '/r/196' with a summary of the post and comments and the image originally posted",
    },
    {
      url: "/projects/todayin/5.png",
      alt: "Todayin's overview page loading while the content is being fetched and summarized",
    },
  ],
};
