import { Project } from ".";
import Link from "next/link";

export const reactBonsai: Project = {
  name: "react bonsai",
  links: [
    {
      url: "https://github.com/nandosobral03/react-bonsai",
      name: "Github",
    },
    {
      url: "https://www.npmjs.com/package/react-bonsai",
      name: "NPM",
    },
  ],
  year: 2024,
  preview: {
    cover: "/covers/react-bonsai.png",
    description: "React Bonsai is a bonsai tree generator, written in react using typescript. It intelligently creates, colors, and positions a bonsai tree, and is entirely configurable",
  },
  sections: [
    {
      title: "Description",
      component: (
        <>
          React Bonsai is a small project that I made as a part of a bigger project that I'm working on. React bonsai itself is a library that is a direct port of{" "}
          <Link href="https://gitlab.com/jallbrit/cbonsai" className="underline text-accent" target="_blank">
            cbonsai
          </Link>{" "}
          which itself is a newer version of{" "}
          <Link href="https://gitlab.com/jallbrit/bonsai.sh" className="underline text-accent" target="_blank">
            bonsai.sh
          </Link>
          , which was written in <i>bash</i> and was itself a port of{" "}
          <Link href="https://avelican.github.io/bonsai/" className="underline text-accent" target="_blank">
            this bonsai tree generator
          </Link>{" "}
          written in <i>javascript</i>.
          <br />
          <br />
          react-bonsai is a bonsai tree generator, written in react using typescript. It intelligently creates, colors, and positions a bonsai tree, and is entirely configurable. There are 2 modes of operation: static (see finished bonsai
          tree), and live (see growth step-by-step).
        </>
      ),
    },
    {
      title: "Things Learned",
      component: (
        <>
          This project was a great learning experience in porting code from one language to another. I had to understand the original C implementation deeply to recreate its functionality in TypeScript while maintaining the same behavior
          and output.
          <br />
          <br />
          I also learned a lot about the NPM package publishing process, it was my first time actually publishing a package so all the way from setting up the package.json correctly to managing versions and documentation. The experience of
          creating a package that others can easily install and start immediately using it felt amazing.
          <br />
          <br />
          Additionally, I learned about using Rollup as a bundler for creating distributable packages, bundlers fought quite a tough fight getting it to play nice with typescript react and tailwind but I learned a lot about how to use it
          and how to make it work with my project.
        </>
      ),
    },
    {
      title: "Things I Would Do Differently",
      component: (
        <>
          This is a small project that didn't really have much to improve, one thing I learned that has changed how I started working was how I approached the problem, when I first thought about porting cbonsai I thought I could just throw
          the c code into an LLM and have it spit out the typescript code. But I quickly realized that the subtelties of the code made it imposible for AI to straight up port it, I for a second thought about just ditching the idea all
          together because I thought AI was the safest bet for something like this, but I decided to spend an afternoon really getting into the C code and understanding it deeply. Having that in mind it was just a matter of porting pointer
          logic to some more innefficient but idomatic typescript and I was able to get it to work.
          <br />
          <br />
          It felt great to have it working after a couple of hours and the thrill of uploading it to NPM was also very satisfying, I had something like 2000 weekly downloads at some point, which in retrospect were all bots and npm crawlers,
          but I was happy with the results and beign able to use it myself.
        </>
      ),
    },
  ],
  images: [
    {
      url: "/projects/react-bonsai/1.png",
      alt: "Static Bonsai",
    },
    {
      url: "/projects/react-bonsai/2.png",
      alt: "Live Bonsai Growth",
    },
  ],
};
