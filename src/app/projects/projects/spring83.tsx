import { Project } from ".";
import Link from "next/link";

export const spring83: Project = {
  name: "spring'83",
  links: [
    {
      url: "https://github.com/nandosobral03/spring83/",
      name: "Github",
    },
    {
      url: "https://github.com/nandosobral03/spring83-keygen/",
      name: "Key Generator",
    },
    {
      url: "http://spring83-server.aornum.xyz",
      name: "Live Server",
    },
  ],
  year: 2023,
  preview: {
    cover: "/covers/spring83.png",
    description:
      "Spring '83 is a protocol for communication dreamed up by Robin Sloan. This project implements both a client and server for the protocol, which is based on the distribution of HTML 'boards' - limited to 2217 bytes and unable to execute JavaScript or load external resources. It also includes a key generator for users to generate their own cryptographic keys.",
  },
  sections: [
    {
      title: "Description",
      component: (
        <>
          This project implements both a client and server for the speculative protocol Spring'83, first ideated by{" "}
          <Link href="https://www.robinsloan.com/" className="underline text-accent" target="_blank">
            Robin Sloan
          </Link>{" "}
          on his blog and later specified in the Spring '83 specification Draft.
          <br />
          <br />
          The protocol provides a simple, expressive, and predictable way to follow interesting people, regardless of their content frequency or type. Users create "boards" - HTML fragments limited to 2217 bytes, without JavaScript or
          external resources, but otherwise unrestricted. Publishers use public key cryptography rather than usernames, with boards being signed by their private keys. Only one post can exist per key at a time, and keys have a maximum
          lifespan of 2 years.
          <br />
          <br />I first discovered the protocol through{" "}
          <Link href="https://hnr.fyi/spring.html" className="underline text-accent" target="_blank">
            Honor Ash's blog
          </Link>{" "}
          and was immediately intrigued after reading the original{" "}
          <Link href="https://www.robinsloan.com/lab/specifying-spring-83/" className="underline text-accent" target="_blank">
            blog post
          </Link>{" "}
          and specifications. I implemented it to learn more about the protocol while developing my backend skills with Rust.
        </>
      ),
    },
    {
      title: "Technologies",
      component: (
        <>
          The client was built using SvelteKit for its server-side rendering and routing capabilities. Authentication uses JWT tokens stored in cookies, enabling server-side page rendering with user data.
          <br />
          <br />
          The server was built in Rust using the Axum framework, incorporating idiomatic Rust patterns for error handling and traits. MongoDB was chosen as the database for its flexibility with unstructured data.
          <br />
          <br />I created two key generators: a browser-based one integrated into the client for easy access but slower generation, and a multithreaded CLI tool in Rust that generates keys 50-100x faster and allows specifying expiration
          years.
        </>
      ),
    },
    {
      title: "Things Learned",
      component: (
        <>
          This project significantly improved my Rust proficiency and understanding of the Axum framework for building REST APIs with authentication. It deepened my knowledge of cryptography, particularly regarding Elliptic Curve and
          asymmetric cryptography.
          <br />
          <br />
          On the frontend, I enhanced my SvelteKit skills in building responsive applications. The deployment process taught me more about Docker, particularly multi-stage builds for creating efficient container images.
        </>
      ),
    },
  ],
  images: [
    {
      url: "/projects/spring83/0.png",
      alt: "Spring83 client home page, showing recently updated boards",
    },
    {
      url: "/projects/spring83/1.png",
      alt: "Spring83 client board page, showing the board's content, and detail about it",
    },
    {
      url: "/projects/spring83/10.png",
      alt: "Spring83 client following page",
    },
    {
      url: "/projects/spring83/2.png",
      alt: "Spring83 client board page, showing the board's code, and detail about it",
    },
    {
      url: "/projects/spring83/3.png",
      alt: "Spring83 submition page, showing the text editor and how the board is rendered in real time",
    },
    {
      url: "/projects/spring83/4.png",
      alt: "Spring83 submition page, showing the text editor and the information about how to publish the board",
    },
    {
      url: "/projects/spring83/5.png",
      alt: "Spring83 submition page, showing the sign and publish modal",
    },
    {
      url: "/projects/spring83/6.png",
      alt: "Spring83 about page, showing the information about the protocol and the project",
    },
    {
      url: "/projects/spring83/7.png",
      alt: "Spring83 server hello page, showing the server's information",
    },
    {
      url: "/projects/spring83/11.png",
      alt: "Spring83 client generate key page",
    },
    {
      url: "/projects/spring83/8.png",
      alt: "Spring83 client homepage on mobile, showing the recently updated boards",
      isMobile: true,
    },
    {
      url: "/projects/spring83/9.png",
      alt: "Spring83 client navigation on mobile",
      isMobile: true,
    },
  ],
};
