import { Codeblock, ImageWithAlt, List, Paragraph, Quote, Section, SectionTitle } from "@/app/blog/components/blog-section";
import HoverableLink from "@/app/blog/components/hoverable-link";
import TLDR from "@/app/blog/components/TLDR";

export default function TailwindV4() {
  return (
    <>
      <TLDR>
        Tailwind CSS v4 introduces significant changes like a simplified CSS-based configuration, dynamic utility values, container queries, and new utilities. Also some my thoughts on the unique challenges of releasing major framework
        updates now that AI coding tools are everywhere, and how the Tailwind team is responding.
      </TLDR>
      <Section>
        <SectionTitle>Preamble</SectionTitle>
        <Paragraph>
          This blog is also published on <HoverableLink href="https://eagerworks.com/blog/tailwind-css-v4">eagerworks.com</HoverableLink>, the company I work for. This is my first technical blog for them, I stirred away a bit from just the
          Tailwind v4 release and added some of my own thoughts on the matter.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>What is Tailwind CSS, and why has it taken over frontend development?</SectionTitle>
        <Paragraph>
          Tailwind CSS, the utility-first framework that's become the de facto standard for modern web development, just released its fourth major version. Before diving into what's new, let's understand why Tailwind has become so
          fundamental to how we build websites today.
        </Paragraph>
        <Paragraph>
          Tailwind revolutionized frontend development by taking a utility-first approach to styling. While frameworks like Bootstrap offer both pre-built components and some utility classes, Tailwind focuses solely on atomic utility
          classes, allowing developers to compose custom designs directly within their HTML. Here's a simple example comparing what defining a button would look like in using regular CSS vs Tailwind:
        </Paragraph>
        <Codeblock language="html">{`<!-- Traditional CSS: -->
<button class="primary-button">Click me</button>`}</Codeblock>
        <Codeblock language="css">{`/* Traditional CSS: */
.primary-button {
  background-color: var(--blue);
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: bold;
}

.primary-button:hover {
  background-color: var(--dark-blue);
}`}</Codeblock>
        <Codeblock language="html">{`<!-- Tailwind CSS: -->
<button
  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
>
  Click me
</button>`}</Codeblock>
        <Paragraph>
          In the past, the biggest friction point with Tailwind was unlearning the traditional approach of writing CSS in separate files and instead embracing the idea of having all styles live directly within the HTML markup. This shift in
          mindset from separation of concerns to colocated styling was one of the main reasons developers hesitated to adopt Tailwind. While it does make HTML longer, the benefits of managing styles in a single file outweigh the drawbacks.
          With no need to context-switch between CSS files and markup, and once you become familiar with Tailwind's syntax, writing and iterating on styles becomes much faster. In a way, these longer class lists encourage developers to
          reconsider whether repeated styles should be extracted into shared components, ultimately making the codebase more modular and maintainable.
        </Paragraph>
        <Paragraph>
          Another benefit of this approach is that your entire design system lives in a single configuration file. Want to change your primary color? One change propagates everywhere. Other frameworks allow this customization inside their
          own components, but this means that whenever you start building something of your own you are outside the design system configuration. If you are using tailwind you are using it everywhere, this means that you are always inside
          the design system.
        </Paragraph>
        <Paragraph>This philosophy has made Tailwind the backbone of modern UI development, powering most new applications and popular component libraries like shadcn, DaisyUI, and Tailwind UI.</Paragraph>
        <Paragraph>
          An unexpected benefit that the Tailwind team couldn't have anticipated back in 2019 was the usefulness of style colocation in the LLM era. AI tools were trained on HTML that was styled with Tailwind, and can now create entire
          components styled with Tailwind. Whereas in the case of CSS, the AI tool would have to know that the CSS files and the HTML markup are related, both for training having a single view of the component and for creating/suggesting
          code in 2 different files.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>What's New in v4?</SectionTitle>
        <Paragraph>
          The first impressions of v4 have been great. While it's still too early to talk about adoption, the initial feedback has been really positive. The updates tackle a lot of the concerns people had, and the new features feel like a
          logical step forward. Plus, it seems easier than ever for new developers to get started.
        </Paragraph>
        <Paragraph>
          Version 4.0 launched a couple of weeks ago, bringing significant improvements that enhance the developer experience while introducing highly requested features. Let's take a look at the most relevant changes since its release.
        </Paragraph>

        <SectionTitle>1. Simplified Installation and Configuration</SectionTitle>
        <Paragraph>
          One of the biggest changes in v4 is the removal of the `tailwind.config.js` file. This file was used to configure the framework, here you'd expand on the existing utility classes and create new ones, if you wanted to tune your
          style system this was the place to do it. The new update throws out this config file, instead opting for doing it directly in your global css file.
        </Paragraph>
        <Paragraph>Lets take a look for example at the default tailwind config file for a Next.js project using shadcn/ui with v3 vs what it looks like in v4:</Paragraph>
        <Codeblock language="typescript">{`import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        //...
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;`}</Codeblock>
        <Codeblock language="css">{`@import "tailwindcss";
@plugin "tailwindcss-animate";

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  /* ... */
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}`}</Codeblock>
        <Paragraph>
          At first sight we can clearly see that the new config file is much more compact, one of the key differences it that we are no longer using strings to represent css, this means that in most modern IDE's we are able to use a CSS LSP
          extension that provides us with autocomplete and previews of the colors for this variables we use.
        </Paragraph>
        <Paragraph>
          Not only this but now we have access to the theme variables (as well as all the default tailwind variables like colors, spacing, font sizes, etc) in the css file, this means that we can use them in any given custom class we decide
          to create. For example we could do something like this:
        </Paragraph>
        <Codeblock language="css">{`.custom-element {
  margin: var(calc(--spacing * 4);
  color: var(--color-blue-500);
  font-family: var(--font-sans);
}`}</Codeblock>
        <Paragraph>
          No longer do we need to go looking for the HEX values for tailwind colors when trying to do something with css, now it's as simple as using it as a class. You can find the whole list of default classes{" "}
          <HoverableLink href="https://tailwindcss.com/docs/theme#default-theme-variable-reference">here</HoverableLink>
        </Paragraph>
        <Paragraph>This is particularly useful when you need to use your theme values in custom components or when integrating with third-party libraries.</Paragraph>

        <SectionTitle>2. Dynamic Utility Values</SectionTitle>
        <Paragraph>
          One of the changes I liked the most in this new release is the introduction of dynamic utility values. In v3 and before most utility classes needed to be defined before use, for padding for example p-12 and p-14 were perfectly
          valid classes, but p-13 didn't exist, you could still define it in your config file or use p-[3.25rem] but it either was a pain to do so for each value you wanted to use or you had to use the square bracket notation which meant
          not being tied to your design config file like for the rest of the classes.
        </Paragraph>
        <Paragraph>
          Where this most came into play for me was with things like width and height, width for example had a cutoff as w-96 which is about 24rem (or 384px) from there you'd have to use things like w-md or w-lg which lost a bit of the
          semantic meaning of the class and were big jumps in value.
        </Paragraph>
        <Paragraph>In v4 this is no longer the case, you can now use any value you want and have it tied to the spacing scale,width classes are now tied to the --spacing css variable and each class is defined as:</Paragraph>
        <Codeblock language="css">{`width: calc(var(--spacing) * 103);`}</Codeblock>
        <Paragraph>
          This means that you can now use any value you want and have it tied to the spacing scale, for example w-103 is a valid class and will be 25.75rem (or 412px) under normal spacing but you can update the --spacing css variable to
          have it be 103 times whatever spacing value you define.
        </Paragraph>
        <Paragraph>For example these are now completely valid Tailwind classes:</Paragraph>
        <Codeblock language="html">{`<div class="grid grid-cols-15">
  <!-- Finally being able to manage columns without [] -->
  <div class="mt-17">
    <div class="w-29"></div>
  </div>
</div>`}</Codeblock>
        <Paragraph>With the use of extensions, tailwind still provides sensible defaults for their values with their autocomplete while still allowing us to pick any value we might need.</Paragraph>
        <ImageWithAlt src="https://i.imgur.com/va2KETC.png" alt="Tailwind CSS autocomplete showing standard and dynamic values">
          Hovering on a non-standard class still shows us what its implementation
        </ImageWithAlt>
        <ImageWithAlt src="https://i.imgur.com/vng30jj.png" alt="IDE tooltip showing the CSS implementation of a dynamic Tailwind class (w-29)" />

        <SectionTitle>3. Container Queries</SectionTitle>
        <Paragraph>
          Container queries are one of the most exciting additions in Tailwind v4, allowing components to adapt based on their parent container's size rather than just the viewport width. This is a game-changer for building truly reusable
          components that are not bound to where they are placed. To use container queries we need to use the `@container` class to mark the container as the one to reference, then in it's children whenever we use container breakpoints such
          as `@md`, `@sm`, `@max-md` to conditionally style the child depending on the size of the parent
        </Paragraph>
        <Paragraph>Imagine a product card that needs to work in multiple contexts - a main product grid, a sidebar widget, and a modal dialog:</Paragraph>
        <Codeblock language="html">{`<div class="@container">
  <div class="flex flex-col @md:flex-row gap-4 p-4">
    <!-- Product Image -->
    <img src="/product.jpg" class="w-full @md:w-1/3 rounded-lg" alt="Product" />

    <!-- Content -->
    <div class="space-y-2">
      <h3 class="text-lg @md:text-xl font-bold">Wireless Headphones</h3>
      <p class="@md:text-lg text-gray-600 @sm:hidden @md:block">
        Premium noise-cancelling headphones with 30-hour battery life
      </p>
      <div class="flex @md:items-center gap-2 flex-col @md:flex-row">
        <span class="text-xl font-bold">$299.99</span>
        <button class="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</div>`}</Codeblock>
        <Paragraph>This single component automatically:</Paragraph>
        <List type="disc">
          <span>Stacks vertically in narrow containers (like sidebars)</span>
          <span>Switches to horizontal layout in wider containers (like product grids)</span>
          <span>Shows/hides the description based on available space</span>
          <span>Adjusts text sizes and spacing for optimal readability</span>
        </List>

        <SectionTitle>4. New utilities</SectionTitle>
        <Paragraph>Tailwind v4 also comes with a new set of utilities that can be used to better target the components you want to style, the main ones for me are:</Paragraph>
        <List type="disc">
          <span>
            Targeting custom boolean data attributes without the need for [] (e.g. <code>data-current:opacity-100</code> instead of <code>[data-current]:opacity-100</code>)
          </span>
          <span>
            The <code>not-*</code> utility class, which allows you to negate conditions (e.g. <code>not-hover:opacity-75</code> instead of <code>opacity-75 hover:opacity-100</code>)
          </span>
          <span>
            The <code>nth-*</code> utility class joins <code>first-*</code> and <code>last-*</code>, making it easier to target a specific child of a given element. This provides more flexibility for styling dynamic lists or grids, allowing
            you to apply styles like <code>nth-3:bg-red-500</code> or <code>nth-last-3:bg-red-500</code> without needing custom CSS.
          </span>
        </List>

        <SectionTitle>What This All Means For Developers</SectionTitle>
        <Paragraph>
          The changes in Tailwind v4 represent a significant step forward in how we'll build and maintain web applications. These updates span everything from improving developer experience to performance improvements and new features that
          will make your life easier.
        </Paragraph>
        <Paragraph>
          It's easier than ever to start a new project with Tailwind and the team has done a great job at making the transition as smooth as possible with tools like the <code>@tailwindcss/upgrade</code> codemod for existing projects.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>The hidden cost of updates in the LLM era</SectionTitle>
        <Paragraph>
          The release of Tailwind v4 highlights an interesting new challenge in modern development: the impact of major framework updates on AI-powered development tools. While updates have always required learning and adaptation, the
          widespread adoption of AI coding assistants adds a new layer of complexity to this process.
        </Paragraph>

        <SectionTitle>The AI Knowledge Gap</SectionTitle>
        <Paragraph>Most current AI models, including those powering popular coding assistants, were trained on codebases using Tailwind v3. This creates a temporary but significant disconnect where these tools might:</Paragraph>
        <List type="disc">
          <span>Suggest outdated syntax</span>
          <span>Miss new v4 features and optimizations</span>
        </List>
        <Paragraph>Now more than ever backwards compatibility is key, as the AI tools have been trained on the old syntax and will not be able to adapt as easily to new introductions to the framework.</Paragraph>
        <Paragraph>A couple of utility classes where also deprecate and changed for a different name such as:</Paragraph>
        <Codeblock language="text">{`bg-opacity-* → bg-black/50
text-opacity-* → text-black/50
border-opacity-* → border-black/50
divide-opacity-* → divide-black/50
ring-opacity-* →ring-black/50
placeholder-opacity-* → placeholder-black/50
flex-shrink-* → shrink-*
flex-grow-* → grow-*
overflow-ellipsis → text-ellipsis
decoration-slice → box-decoration-slice
decoration-clone → box-decoration-clone
shadow-sm → shadow-xs
shadow → shadow-sm
drop-shadow-sm → drop-shadow-xs
drop-shadow → drop-shadow-sm
blur-sm → blur-xs
blur → blur-sm
backdrop-blur-sm → backdrop-blur-xs
backdrop-blur → backdrop-blur-sm
rounded-sm → rounded-xs
rounded → rounded-sm
outline-none → outline-hidden
ring → ring-3`}</Codeblock>
        <Paragraph>
          These classes will likely still show up in new code as developers use autocomplete and code generation tools in their day-to-day work. Tools like v0 and Copilot will still generate these old elements, making it more important than
          ever to have codemods and language servers/extensions to help catch these errors.
        </Paragraph>
        <Paragraph>
          In the age of LLMs, tools that improve how we write code might also slow down the adoption of new versions and best practices. Since automated suggestions often rely on outdated patterns, they can lead to the continued use of
          deprecated features long after they've been replaced. This creates a concerning feedback loop where the very tools meant to accelerate development end up reinforcing legacy approaches.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>Looking Forward</SectionTitle>
        <Paragraph>
          As AI becomes more integral to development workflows, the relationship between framework updates, tooling, and the developer experience will continue to evolve. We might see smarter, version-aware models, better adaptation to
          framework changes, and more sophisticated context-sharing mechanisms. Both frameworks and coding tools will likely form a more symbiotic relationship, where suggestions align more closely with best practices, and updates provide
          clearer guidance for adaptation.
        </Paragraph>
        <Paragraph>
          For now, the key is to recognize this new dimension of framework updates and plan accordingly. The benefits of this release far outweigh these temporary challenges, and understanding and adapting to them will make the transition
          smoother for teams using on AI-assisted development.
        </Paragraph>
        <Paragraph>
          The first impressions of v4 have been overwhelmingly positive, praising the simplified configuration, improved performance, and the embrace of modern CSS features. The framework continues to evolve in the right direction, making
          CSS development more intuitive and iteration cycles faster than ever.
        </Paragraph>
        <Paragraph>
          The future of frontend development looks bright with frameworks like Tailwind leading the way. By embracing modern web standards, prioritizing developer experience, and maintaining a strong focus on performance, Tailwind continues
          to be one of the backbones of modern web development.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>Postscript</SectionTitle>
        <Paragraph>This section was added after the article was initially written. As projects began adopting the new version, some of the challenges mentioned earlier gained traction among developers.</Paragraph>
        <Paragraph>Brian Lovin, a prominent designer and developer, highlighted this issue on X:</Paragraph>
        <Quote>"Cursor hates Tailwind v4 — it's nearly impossible to use the latest tech. Has anyone cracked this? It's constantly suggesting v3 syntax/setup."</Quote>
        <Paragraph>This problem arises because AI models are trained on hundreds of thousands of examples written in v3, while codebases using v4 are still emerging. Consequently, these models tend to suggest outdated syntax.</Paragraph>
        <Paragraph>Encouragingly, the Tailwind team is already working on solutions. Adam Wathan, Tailwind's creator, posted the following message the next day:</Paragraph>
        <Quote>"We're working on a Cursor rules file for Tailwind CSS v4 to make your computer seem less dumb — anyone want to test it out and let us know if it's helping?"</Quote>
        <Paragraph>
          His post includes a link to a <HoverableLink href="https://gist.github.com/danhollick/d902cf60e37950de36cf8e7c43fa0943">Gist</HoverableLink> containing a .mdc file that helps models operating inside Cursor recognize the new
          features and prefer them over the old ones.
        </Paragraph>
        <Paragraph>
          This proactive approach demonstrates how framework maintainers are beginning to consider AI compatibility as part of their release strategy. By creating specialized rules files and training materials for popular AI coding
          assistants, they can bridge the gap between new releases and AI capabilities.
        </Paragraph>
      </Section>
    </>
  );
}
