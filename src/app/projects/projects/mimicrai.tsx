import { Project } from ".";

import Link from "next/link";

export const mimicrai: Project = {
  name: "mimicrai",
  links: [
    {
      url: "https://mimicrai.com",
      name: "Live",
    },
  ],
  year: 2025,
  preview: {
    cover: "/covers/mimicrai.png",
    description: "Mimicrai is a writing assistant that amplifies your own writing skills by asking questions, helping you structure and brainstorm, as well as giving you suggestions for your writing, all in your own writing style.",
  },
  sections: [
    {
      title: "Description",
      component: (
        <>
          The idea behind mimicrai came when I was writing my{" "}
          <Link href="/blog/tailwind-v4" className="underline text-accent">
            tailwind v4 blog post
          </Link>
          . I had the main points I wanted to go over but was struggling a bit to structure my thoughts and ideas. As a non-native English speaker, even though I don't struggle with writing or speaking, I sometimes find my tone to be too
          bland and always using simple ways to convey my ideas, whereas a native speaker could convey not only the ideas but also part of their personality in the writing.
          <br />
          <br />
          The core flow of mimicrai came from what I usually do when I write: I take out a blank document, make a list of key points I want to go over, then I start writing. Lately, I've been using LLMs to aid me, not in the writing itself,
          but in helping the ideas flow for what I should be writing in each section. I prompt it to ask me questions that they would expect to see answered in the section I'm writing, and that gets my writing juices flowing. So that's
          exactly what mimicrai first became. Then I decided to add some "cursor for writing" flare to it, helping you rewrite sections, complete the next sentence, and so forth. Aside from this, what I think makes mimicrai stand out is
          that it has a section for managing your writing styles. With this, you can upload a bunch of previous writings of yours or of any other creator you like to read, and the AI will use these excerpts to distill the things that make
          that tone work and apply them to whatever you are currently writing. So in a sense, you can mimic others. <Link href="https://dictionary.cambridge.org/dictionary/english/mimicry" className="underline text-accent"></Link>I wanted
          to create a tool that could help me with this, so I could write in my own style and still be able to convey the ideas I want to convey.
          <br />
          <br />
          MimicrAI will be the first project for which I will be writing a blog post without having finished it completely. I have, at this moment, a working version that I call an MVP which I am happy with. This is usually where I stop
          with most of my projects, but I really do enjoy mimicrai as a tool and see myself coming back to it as soon as I regain some of the motivation to work on it. Currently, as I'm writing this, I am slightly burnt out from a lot of
          work that has gone into this project as well as others and a handful of other real-life things. But I have a vision of things I want to add to it, and I will get back to it.
          <br />
          <br />
          Something special about mimicrai is that it is the first project I ever made for which I implemented monetization. I have not officially launched it yet, but I have tested that this works. I've realized that one of my weaknesses
          is the non-technical side of things; I struggle to promote or market my projects, which is why I always want to add the next feature and tell myself once I've finished the project I will start promoting it.
        </>
      ),
    },
    {
      title: "Technologies",
      component: (
        <>
          The usual suspects: React, Next, tRPC, Tailwind, Shadcn, Vercel. It truly is my tried and tested stack. I've learned so much about web development with these technologies, and feel comfortable that I can pretty much build anything
          I want with them.
          <br />
          <br />
          This is not my first time using LLMs for a project of mine. Keen readers might remember{" "}
          <Link href="/projects/today in" className="underline text-accent">
            Today In
          </Link>
          , which was an aggregator of news from different corners of the internet. I used an LLM to generate the content for the project. But this is my biggest project that involves AI, so it takes a spot here. I managed to implement
          various features with it, and I'm pretty comfortable with the structure to set up different prompts and use cases for it. I implemented things from choosing different models from different providers to tracking tokens and requests
          to charge the users for it, kind of like Cursor-style monetization.
          <br />
          <br />
          The other <i>peculiar</i> piece of technology I used was{" "}
          <Link href="https://www.paddle.com/" target="_blank" className="underline text-accent">
            Paddle
          </Link>{" "}
          as a payment processor. Quick tangent here: I had implemented the complete structure and everything for Stripe only to find out they don't work with Uruguayan-based companies, so I had to scramble to find a new payment processor.
          Paddle seemed like a fine choice, with the only drawback being that they don't have anywhere near as much documentation as Stripe does, nor people that work with it to know the intricacies of it.
          <br />
          <br />
          Last thing to mention here: I want to give an anti-shoutout to MDXEditor. Just kidding! I tried using it, but it just wasn't the right fit for the project. The main problem arose when trying to implement the replace-in-place text,
          since MDXEditor generates different chunks of HTML for each element. Finding and replacing that in the text from the selection was impossible, and I opted for simply implementing a text editor with contenteditable.
        </>
      ),
    },
    {
      title: "Things Learned",
      component: (
        <>
          What haven't I learned? This project was my biggest undertaking yet. It's a product that I use whenever I have to write, and I see a real use case to evolve it towards. As a funny side note, partly thanks to this project, I was
          able to travel to SF with the "Puentes" initiative, which I might write about in a future blog post. And I was able to meet and learn from really cool people, which was incredible and certainly changed how I approach a bunch of
          things in life.
          <br />
          <br />
          As for more tangible things, I've learned a lot about LLMs: keeping prompts synchronized with the user's context, how to switch between models and providers, and how to implement a payment processor, among a bunch of other things.
        </>
      ),
    },
    {
      title: "Things I Would Do Differently",
      component: (
        <>
          I would have investigated Stripe's compatibility before implementing it and having to backtrack and implement Paddle. I want to market it more once I reach a place where I'm happy with the product, and I have a bunch of features
          in mind to do so.
        </>
      ),
    },
  ],
  images: [
    { url: "/projects/mimicrai/0.png", alt: "Landing page screenshot" },
    { url: "/projects/mimicrai/1.png", alt: "Landing page features section" },
    { url: "/projects/mimicrai/2.png", alt: "Landing page pricing section" },
    { url: "/projects/mimicrai/3.png", alt: "Project selection screen" },
    { url: "/projects/mimicrai/4.png", alt: "Tone list view" },
    { url: "/projects/mimicrai/5.png", alt: "Tone creation screen" },
    { url: "/projects/mimicrai/6.png", alt: "Tone analysis screen" },
    { url: "/projects/mimicrai/7.png", alt: "Tone analysis part 2 screen" },
    { url: "/projects/mimicrai/8.png", alt: "Outline and text editor view" },
    { url: "/projects/mimicrai/9.png", alt: "Outline sections generated by AI" },
    { url: "/projects/mimicrai/10.png", alt: "First draft generated by AI" },
    { url: "/projects/mimicrai/11.png", alt: "Peer-write/chat interface about the text" },
    { url: "/projects/mimicrai/12.png", alt: "Sentence completion feature" },
    { url: "/projects/mimicrai/13.png", alt: "Project settings for AI model, strength, and tone" },
    { url: "/projects/mimicrai/14.png", alt: "Subscription settings screen" },
  ],
};
