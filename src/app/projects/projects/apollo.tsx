import { Project } from ".";

export const apollo: Project = {
  name: "apollo",
  links: [{ url: "https://github.com/nandosobral03/apollo", name: "Github" }],
  year: 2025,
  preview: {
    cover: "/covers/apollo.png",
    description: "Fast WebGL ASCII art for images, text, webcam.",
  },
  sections: [
    {
      title: "Description",
      component: (
        <>
          Apollo is a fast, themeable ASCII art studio. Convert images, text,
          and webcam streams into crisp ASCII with edge-aware rendering,
          semantic color tokens, and an always-dark preview canvas. Includes a
          light/dark theme toggle with a small View Transitions animation and
          polished scrollbars. I had the idea in my notes for a while and wanted
          a quick project for the weekend so I decided to make it, nothing fancy
          but looks nice.
          <br />
          <br />
          The UI in my opinion looks slick, pretty happy with how it turned out.
        </>
      ),
    },
    {
      title: "Technologies",
      component: (
        <>
          React 19, Vite, TypeScript, Tailwind , Radix UI, lucide-react,
          TanStack Router, WebGL ASCII renderer, View Transitions API.
          Everything is handled client side meaning no privacy issues for user
          images and stuff.
        </>
      ),
    },
    {
      title: "Things Learned",
      component: (
        <>
          Some WebGL and a couple of optimizations tricks here and there to
          allow for consistent performance with the live webcam rendering. As
          well as edge detection for the ASCII rendering.
          <br />
          <br />
          Something fun was that for text to ASCII I decided the best way of
          doing it was to use a font and a canvas to render the text and then
          use the canvas to get the ASCII art. I was also able to use the canvas
          to get the ASCII art instead of using something like{" "}
          <a
            href="https://www.npmjs.com/package/ascii-art"
            className="underline text-accent"
            target="_blank"
          >
            ascii-art
          </a>{" "}
          npm package.
        </>
      ),
    },
  ],
  images: [
    { url: "/projects/apollo/1.png", alt: "Landing / Image to ASCII" },
    { url: "/projects/apollo/2.png", alt: "ASCII Preview" },
    { url: "/projects/apollo/3.png", alt: "ASCII Preview" },
    { url: "/projects/apollo/4.png", alt: "ASCII Preview" },
    { url: "/projects/apollo/5.png", alt: "ASCII Preview Controls" },
    { url: "/projects/apollo/6.png", alt: "Edge Detection Controls" },
    {
      url: "/projects/apollo/7.png",
      alt: "Text to ASCII",
    },
    {
      url: "/projects/apollo/8.png",
      alt: "Webcam to ASCII live view",
    },
    {
      url: "/projects/apollo/9.png",
      alt: "Darkmode preview",
    },
    {
      url: "/projects/apollo/10.png",
      alt: "Darkmode text preview",
    },
    {
      url: "/projects/apollo/11.png",
      alt: "Darkmode webcam preview",
    },
  ],
};
