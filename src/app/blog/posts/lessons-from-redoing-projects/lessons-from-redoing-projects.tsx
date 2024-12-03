import { ImageCarousel, ImageWithAlt, List, ListTitle, Paragraph, Quote, Section, SectionTitle, Sidenote } from "@/app/blog/components/blog-section";

import HoverableLink from "@/app/blog/components/hoverable-link";
import TLDR from "@/app/blog/components/TLDR";

export default function LessonsFromRedoingProjects() {
  return (
    <>
      <TLDR>
        Revisiting the same project idea over and over is a fascinating way to grow as a developer. Each iteration lets you experiment with new technologies in a known environment, measure how your skills have evolved, and reflect on your
        development journey. It's not just about seeing what you've learned or forgotten—it's about improving both your process and the end result. With each new take, you get the chance to add features, streamline functionality, and refine
        the project, making each version a little bit better than the last.
      </TLDR>
      <Section>
        <SectionTitle>Introduction</SectionTitle>
        <Paragraph>
          Over the past few years, I've found myself unintentionally recreating the same project time and time again. Funnily enough, I've done this with multiple projects but this post will focus on just one of them. I've coded this
          project from scratch at least four times—though I believe the number is actually higher. The thing is that the first iterations were done before I even knew about version control, meaning they are probably in a zipped folder
          somewhere on an old hard drive or on the unsearchable mess that is my Google Drive.
        </Paragraph>
        <Paragraph>
          My intention with this post is to go over the main idea of the project, why I've done it so many times, and what I've learned from it. I'll also go over the different iterations of the project so we can see its evolution. I think
          there are some interesting lessons to be learned from this, and even if you don't find them useful, you can still stick around to see the different iterations of the project and how it evolved over time.
        </Paragraph>
        <Paragraph>
          I believe it's a fun experiment for any developer to revisit their own personal projects, even if they're not anything fancy, and try recreating them from scratch. You'll be surprised at how much you've learned since you first
          worked on it, remember the pitfalls you encountered, and see how much you've improved. It's a great way to measure your growth as a developer and improve on your previous work. Plus, by the end, you might end up with a new version
          of the project that you like even more than the original.
        </Paragraph>
        <Paragraph>
          Why revisit an old project instead of working on the existing one? For me, working on a project I've previously abandoned can be tedious. I often lose track of where things are, the technologies I used back then are outdated, and
          dealing with legacy code isn't as exciting as starting fresh. This is especially true if the <Sidenote anchorText="previous developer">me</Sidenote> didn't document anything, because they thought they would either:
        </Paragraph>
        <List type="letter">
          <span>never come back to it</span>
          <span>they would remember everything if they did</span>
        </List>
      </Section>

      <Section>
        <SectionTitle>Why did I start doing this in the first place?</SectionTitle>
        <Paragraph>
          Remember the "Hunger Games" series? Back when I started college and was just learning to code, my friends and I got into this cool "Hunger Games Simulator." We used what I believe is the{" "}
          <HoverableLink href="https://brantsteele.net/hungergames/disclaimer.php">most popular version of the game</HoverableLink> (if you can even call it a game), though there are several other, less polished versions out there; these
          simulators are somewhat popular on forums where people create teams of famous characters in media and have them battle to see what absurd scenarios play out. Here are some examples of teams and players I found:
        </Paragraph>
        <ImageWithAlt src="https://i.imgur.com/iafLhJn.png" alt="Example of a Hunger Games created from random characters">
          Taken from one of the top posts on <HoverableLink href="https://www.reddit.com/r/BrantSteele/comments/134xsji/rbrantsteele_madness_cast_reveal_and_round_1/">r/BrantSteele</HoverableLink>
        </ImageWithAlt>
        <ImageWithAlt src="https://i.imgur.com/bw2ej7q.png" alt="Another of a Hunger Games created from random characters">
          Taken from <HoverableLink href="https://knowyourmeme.com/memes/sites/hunger-games-simulator">knowyourmeme.com</HoverableLink>
        </ImageWithAlt>
        <Paragraph>
          My friends and I used the simulator in much the same way as these communities, but with our own cast of characters. Each member of the group selected characters that represented them. We kept track of everything with a
          spreadsheet, allowing us to recreate the same characters each time we played and record the results in a shared document.
          <br />
          It was a fun way to pass the time. However, as our spreadsheet grew, we started running into limitations.{" "}
          <Sidenote anchorText="It was a hassle to recreate the characters every time">Reuploading the images for each character to Imgur took ages.</Sidenote> The simulator had a strict upper limit on the number of characters, and we were
          already exceeding that limit, cycling characters in and out. So, with just six months of coding experience and about three "Hello World" programs under my belt, I had the brilliant idea to create my own version of the simulator.
        </Paragraph>
      </Section>
      <Section>
        <SectionTitle>Ok, So What's the Project?</SectionTitle>
        <ListTitle>These were the initial requirements:</ListTitle>
        <List type="disc">
          <span>
            A "battle simulator" that could create "stories" based on the characters in the game. (See <HoverableLink href="https://brantsteele.net/hungergames/disclaimer.php">Brant Steele's website</HoverableLink>)
          </span>
          <span>Keep a log of the events that happened in the game and show those events with the characters that took part in them.</span>
          <span>
            Support a character limit of at least the number of characters we had in our spreadsheet. Simulate the characters fighting each other and have a winner at the end (or none if everyone died, which was a common occurrence in our
            games).
          </span>
        </List>
        <ListTitle>
          <b>Ideally, the project would also include:</b>
        </ListTitle>
        <List type="disc">
          <span>The ability to add as many characters as we wanted to the game.</span>
          <span>The ability to add as many events as we wanted to the game.</span>
        </List>
        <Paragraph>
          Sounds easy enough, and I believe it was a fairly nice project for someone starting out with coding. It touches on a bunch of different concepts. It covers all the basic parts of a tech stack since you need a backend to store the
          characters and events, a frontend to display them, some non-trivial logic to simulate the characters fighting each other, and a way to store the results of the game.
        </Paragraph>
      </Section>
      <Section>
        <SectionTitle>Implementation 0</SectionTitle>
        <Paragraph>I don't want to dwell too much on these first iterations, since I don't have any record of them, but I want to mention that they did exist and were my initial attempts at the project.</Paragraph>
        <Paragraph>
          The first couple of iterations were done without any framework, just using plain JavaScript, HTML, and CSS. The focus during these early implementations was on functionality, not aesthetics or efficiency. Although I don't have any
          records of these first attempts, I have messages that confirm their existence and indicate they were quite messy. I recall using it once with my friends, and it went about as well as you'd expect. These early versions had no
          backend, no database—just a bunch of hardcoded characters and events in a JSON file that was loaded into the game. It was a mess, but it worked, and it was fun.
        </Paragraph>
        <ListTitle>Main features of the first implementation:</ListTitle>
        <List type="disc">
          <span>No backend</span>
          <span>No database</span>
          <span>No framework of any kind</span>
          <span>Hardcoded characters and events loaded from a JSON file</span>
          <span>Plain JavaScript</span>
          <span>All logic ran client-side</span>
          <span>No persistence of past games or stats</span>
          <span>No ability to add new characters or events</span>
        </List>
      </Section>
      <Section>
        <SectionTitle>First Implementation (That I Have Records Of)</SectionTitle>
        <Paragraph>
          This implementation was done at the end of 2021, when I was just starting to learn React on my own. The use of React with plain JavaScript, rather than TypeScript, is a clear indicator of my beginner status. At the time, using
          Create React App (CRA) might have been the standard way to start a React project.
        </Paragraph>
        <Paragraph>
          Holy, when I started writing this blog post, I knew I had the repositories for the later iterations of the project but hadn't tried running them yet. I just ran the first one, and it's a mess. I can't even imagine what the
          earliest version looked like. I'm somewhat disappointed that I don't have a record of the very first version, but if it was worse than this one, maybe it's for the best. Even though I managed to get the app running, I couldn't
          find a way to actually play the game. Browsing the code, it's clear that it doesn't work as intended. With that said, let's go over the differences from the initial implementation.
        </Paragraph>
        <Quote>We are using React now! That's an improvement, right?</Quote>
        <Paragraph>
          It's evident that I was still learning React, for some reason using React with JavaScript instead of TypeScript. Using CRA was likely the standard way to start a React project at the time.
          <br />
          While it's great that this version uses React, it's clear that I didn't fully understand how it worked and was mostly learning by doing. This meant the final code was even more unmaintainable, but it was a valuable learning
          experience
        </Paragraph>
        <Paragraph>
          The code is a mess—there's no separation of concerns, components are scattered, and the logic is disorganized. Hooks were not used effectively, but despite all that, it was a valuable learning experience to dive into the tool and
          adapt what I had already done with vanilla JavaScript.
        </Paragraph>
        <ImageWithAlt src="https://i.imgur.com/WcVW3mu.png" alt="Code of the implementation showing unnecessary fragments">
          Love the unnecessary fragments
        </ImageWithAlt>
        <ImageWithAlt src="https://i.imgur.com/SEQPKOt.png" alt="Code showing a key on the root of the component but missing keys on elements generated by a map">
          Interesting choice to have a key on the component but not on the elements generated by the map
        </ImageWithAlt>
        <ListTitle>What Could Be Improved from This Implementation?</ListTitle>
        <List type="disc">
          <span>Make it work!</span>
          <span>Use TypeScript</span>
          <span>Implement linters or Prettier for code standards</span>
          <span>
            <Sidenote anchorText="Utilize hooks effectively">
              There are at least 4 unnecessary <i>useEffect</i>
            </Sidenote>
          </span>
          <span>Improve the UI</span>
          <span>Add a backend</span>
        </List>
      </Section>
      <Section>
        <SectionTitle>Second Implementation (I Swear It Works This Time)</SectionTitle>
        <Paragraph>
          Let's try that again! This time, the implementation was done about 8 months after the first one, and I can see some improvements. Notably, this implementation was created using{" "}
          <HoverableLink href="https://svelte.dev/">Svelte</HoverableLink>. If I'm not mistaken, this was my first project with Svelte, and handling a project I had previously worked on with new technology was a great way to learn it.
          Working on a project I already knew the ins and outs of allowed me to focus more on learning Svelte itself rather than getting bogged down by the project details. Also, seeing how different frameworks tried to solve the same
          problem gave me a better understanding of the philosophy behind them.
        </Paragraph>
        <Paragraph>
          The project is still client-side only, but now it works! We are still using JavaScript for some reason, but the logic is much cleaner. Even though the design is terrible, it at least shows some intentionality. The code is
          organized into cleaner components, and the logic is much more readable.
        </Paragraph>
        <Paragraph>
          All in all, I'm somewhat proud of this implementation. It's not perfect, but it's a big improvement over any previous iteration of the project. Considering it was my first time with Svelte, I think it turned out pretty well.
        </Paragraph>
        <ImageWithAlt src="https://i.imgur.com/vgv5i6g.png" alt="Screenshot of the second implementation characters">
          Team list with characters
        </ImageWithAlt>
        <ImageWithAlt src="https://i.imgur.com/qMPIBb1.png" alt="Screenshot of an example of an event">
          Example of an event during a game
        </ImageWithAlt>
        <ImageWithAlt src="https://i.imgur.com/tVwxAJJ.png" alt="Screenshot of the game results">
          Game results, tracking things like kills during the game
        </ImageWithAlt>
        <Paragraph>
          In this implementation, there is also the first sign of "Statuses". This was an idea we had for the game: after certain events, there was a chance for those involved to receive a status. In this implementation, those statuses
          either multiplied by 1.5x or 0.5 the damage done or received by the character.
        </Paragraph>
        <Paragraph>There are still some bugs related to this, such as a good status that halved the damage you take also halving all heals because of how it was implemented.</Paragraph>
        <ListTitle>What Could Be Improved:</ListTitle>
        <List type="disc">
          <span>Use TypeScript</span>
          <span>Add a backend and logic to store the characters and events</span>
          <span>Refine game mechanics</span>
          <span>Refine design</span>
        </List>
      </Section>
      <Section>
        <SectionTitle>Third Implementation (Polemos)</SectionTitle>
        <Paragraph>
          I've talked about Polemos at length before <HoverableLink href="https://aornum.xyz/polemos">on my portfolio</HoverableLink> so I won't go into too much detail here. But I'll go over the main differences between this and the
          previous implementations.
        </Paragraph>
        <Paragraph>
          Polemos was born from wanting to recreate the project in more detail to add to my portfolio of personal projects. Even though I'm proud of previous implementations, none were good enough to show off, nor could I show them off
          considering I hadn't deployed any of them. Polemos also worked as a way of learning{" "}
          <Sidenote
            anchorText="SvelteKit"
            config={{
              side: "left",
              align: "start",
            }}
          >
            The meta-framework for Svelte, just like Next or Remix are to React.
          </Sidenote>
        </Paragraph>
        <Paragraph>
          The funny thing is, even though I'm using a full-stack framework, the idea of having both the logic and the frontend in the same project{" "}
          <Sidenote anchorText="sounded weird to me">I blame my university for instilling the idea that coupling the backend and frontend in the same project was a cardinal sin.</Sidenote>
          meant the project is divided into a frontend application and an Express server, requiring two servers to run. This is, of course, not ideal, but I think it was a nice first step into the idea of these meta-frameworks.
        </Paragraph>
        <Paragraph>
          To load all of our characters and events, I created a seed script by modifying the downloaded spreadsheet and adjusting it to an SQL migration that would add all the characters and events to the database. This worked out okay, but
          it was a bit cumbersome to use, especially when creating/updating characters and events. I needed to redownload the spreadsheet and go step by step adjusting it to a migration script.
          <br />
          Event though there clearly was some though into making this process easier, by creating this seed script in the first place, a new pain point was introduced of having to create said seed script again and again.
        </Paragraph>
        <ListTitle>Some improvements featured in this version are:</ListTitle>
        <List type="disc">
          <span>The ability to add events and characters using the platform</span>
          <span>The ability to add statuses to the game</span>
          <span>Information is stored about previous games, meaning you can see the results of past games and stats for the players</span>
          <span>There is also an authentication system in place, which in retrospect I don't like, but it allowed me to create a "Guest" user to show off if anyone wanted to see the project.</span>
          <span>The design is an improvement but the dropshadows are a bit off making it look unfinished</span>
        </List>
        <ImageWithAlt src="https://i.imgur.com/6E7M1Cr.png" alt="Screenshot of the players and their teams">
          List of players with their teams, you can see there are a bunch more options on the navigation bar
        </ImageWithAlt>
        <ImageWithAlt src="https://i.imgur.com/8m8wMTb.png" alt="Screenshot of events on a given game">
          Example of events on a given game
        </ImageWithAlt>
        <ImageWithAlt src="https://i.imgur.com/KPEBcDe.png" alt="Screenshot of the game results">
          Game results, tracking things like kills and damage during the game
        </ImageWithAlt>
        <Paragraph>
          From previous iterations, we also found we wanted to add "Player Journeys." This means that we wanted to be able to see all the events of a given player once a game is over. Even though this wasn't in the initial requirements, we
          found it to be a nice feature to have and would become one of our favorite features.
        </Paragraph>
        <ListTitle>What could be improved:</ListTitle>
        <List type="disc">
          <span>The design still needs work</span>
          <span>Some features don't work as intended and are underutilized (Statuses)</span>
          <span>Authentication works but isn't necessary</span>
          <span>The UI for creating events and characters is quite lacking</span>
        </List>
        <ImageWithAlt src="https://i.imgur.com/NsZ3mLh.png" alt="Screenshot of the create event UI">
          Create event UI (I know)
        </ImageWithAlt>
      </Section>
      <Section>
        <SectionTitle>Last Implementation (For Now)</SectionTitle>
        <Paragraph>
          The last implementation (for now) of the project is "Polemos Royale". I have also discussed this project in detail on my <HoverableLink href="https://aornum.xyz/polemos-royale">portfolio</HoverableLink>, so go there if you want to
          learn more about it. In this iteration, I decided to rebuild the project using <HoverableLink href="https://nextjs.org/">Next.js</HoverableLink>. Since I've been working extensively with Next.js, the focus was less on learning a
          new technology and more on refining the core functionality of the project.
        </Paragraph>
        <Paragraph>
          I aimed to strip away unnecessary features and return to the fundamentals. The goal was to distill the project to its core functionality and then rebuild it with a clearer focus. By removing features like statuses and
          authentication, I simplified the project and concentrated on expanding the core concept of a battle royale-style game within the original framework of a text-based battle simulator.
        </Paragraph>
        <Paragraph>
          The new implementation introduces a system of what we call locations and hazards, each with a set of events that can occur. When creating a game, users can customize the map by selecting locations for each tile and adding hazards
          to any of the tiles meaning that if a character is in a given tile, the event's that they will go through come from a pool of events that are associated with the corresponding location and hazard(s) in that tile. This makes each
          game slightly different and allows users to create their own scenarios.
        </Paragraph>
        <ImageWithAlt src="https://i.imgur.com/0y8NQQr.png" alt="Screenshot of the map showing different tiles and events">
          The new locations system with various tiles and events
        </ImageWithAlt>
        <ImageWithAlt src="https://i.imgur.com/COK1fwU.png" alt="Screenshot of game creation UI where users customize the map">
          Customizing the map with tiles and hazards
        </ImageWithAlt>
        <Paragraph>
          Features that were previously considered workarounds are now integral to the project. For example, the ability to import characters and events from a CSV file was once a quick fix but is now a core feature, enabling mass import of
          game entities from the spreadsheet.
        </Paragraph>
        <Paragraph>
          I also put a greater emphasis on design improvements. The project now includes features like light and dark modes, more detailed information about characters and events, and a better way to display game events.
        </Paragraph>
        <Paragraph>
          Overall, I believe this is the best iteration of the project to date. I enhanced key features such as "Player Journeys", which now track a player's movements, health over time, and participation in events throughout the game.
        </Paragraph>
        <ImageCarousel images={[{ src: "https://i.imgur.com/8YxSuPD.png", alt: "Screenshot of the top of a player's journey page" }]}>Player journey showing movements, events, and health over the course of the game</ImageCarousel>
        <ImageWithAlt src="https://i.imgur.com/lTWZE10.png" alt="Screenshot of the player list with improved navigation">
          Updated player list with enhanced design and navigation options
        </ImageWithAlt>
        <ImageWithAlt src="https://i.imgur.com/81yR9WJ.png" alt="Screenshot of events with detailed information">
          Events display with detailed information and location/hazard context
        </ImageWithAlt>
        <ImageCarousel
          images={[
            { src: "https://i.imgur.com/XOUyVMM.png", alt: "Screenshot of a specific day in the game" },
            { src: "https://i.imgur.com/XiEsudf.png", alt: "Alternative screenshot showing the map of a specific day" },
          ]}
        >
          Example of a game day showing events and map view
        </ImageCarousel>
      </Section>
      <Section>
        <SectionTitle>Conclusion</SectionTitle>
        <Paragraph>
          So, what's the takeaway from all of this? While there is clear value in revisiting and redoing the same project from scratch multiple times to learn new things and compare your skills with your previous self, suggesting that
          everyone should do this might come off as a bit pretentious. However, I do recommend it to any developer who wants to gauge their learning over the years and see how they can improve upon their previous work. The sense of
          accomplishment that comes from recognizing how far you've come can be a powerful motivator.
        </Paragraph>
        <Paragraph>
          Revisiting this project through various iterations has proven to be an incredibly valuable way to learn new technologies, benchmark my skills, and observe my growth as a developer. Each iteration provided unique lessons and helped
          me refine my skills. Revisiting these implementations has been, for me, both fun and a bit nostalgic, it allows me to reflect on how much I&apos;ve learned and grown over the years. I hope this journey hasn&apos;t been too tedious
          from an outsider&apos;s perspective.
        </Paragraph>
        <Paragraph>
          This iterative process is a testament to the learning journey inherent in software development. Each step, no matter how small, contributes to both your growth as a developer and your understanding of the problem you are trying to
          solve.{" "}
        </Paragraph>
        <Paragraph>
          I&apos;m certain that I&apos;ll revisit this project again in the future and learn new things from it. For now, I&apos;m satisfied with the results of the latest iteration and grateful for the opportunity to share this journey
          with you.
        </Paragraph>
      </Section>
    </>
  );
}
