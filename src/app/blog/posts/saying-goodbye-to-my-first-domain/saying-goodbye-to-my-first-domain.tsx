import { List, Paragraph, Section, SectionTitle } from "@/app/blog/components/blog-section";
import HoverableLink from "@/app/blog/components/hoverable-link";
import TLDR from "@/app/blog/components/TLDR";

export default function SayingGoodbyeToMyFirstDomain() {
  return (
    <>
      <TLDR>Reflecting on the journey with aornum.xyz, from its beginnings as a portfolio and tech playground to the lessons learned through server admin mishaps and project development, leading to the transition to fsobral.dev.</TLDR>
      <Section>
        <SectionTitle>Aornum.xyz: A Chapter&apos;s Beginning and End</SectionTitle>
        <Paragraph>
          Aornum.xyz holds a special place in my journey as a developer. When I first registered the domain, it was intended to be somewhere where I could simply showoff some of my projects and what I had been working on – a simple online
          resume, if you will. But like any good project, it quickly took on a life of its own. It became a playground for new technologies, a repository for half-baked ideas, and, ultimately, a reflection of my continuous learning process.
          It&apos;s more than just a website; it&apos;s a digital chronicle of my development as an engineer
        </Paragraph>
        <Paragraph>
          I remember thinking for a long time about a domain, and finally settling for aornum which was a greek oracle (at that time I liked how greek mythology names sounded on proyects). I thought it sounded cool and mysterious,
          everything a good project name should be! It stuck with me, and I&apos;ve used it ever since.
        </Paragraph>
        <Paragraph>
          I rented the most basic VPC available on Linode. For quite some time, I developed projects locally and then manually transferred the contents to the remote machine using FTP. Subsequently, I configured the pm2 process manager and
          set up a reverse proxy to manage subdomains. Considering the variety of tools that do the whole deployment process for you now a days it seems it was the longest and worst way of doing it, but I enjoyed it and I learned a lot from
          doing so.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>The Projects of Aornum</SectionTitle>
        <Paragraph>
          As Aornum.xyz was my central hub, it naturally became the home for a variety of projects, each representing a step in my learning and development journey. The projects ranged from simple experiments to more ambitious undertakings,
          reflecting my evolving skills and interests over the years. While not all of them are still actively maintained, they each hold a special place in my portfolio as milestones of my progress. 2023 was the year of aornum, the most
          proyects I&apos;d ever done, every time I was done with one, the next one popped out of the idea pile. 2023 was a year of exploration, where I poured my efforts into learning a multitude of new technologies and frameworks without
          focusing on a specific subset. My aim was to gain a broad understanding of the web development ecosystem and discover what resonated with me. Learning how different frameworks and libraries work and how they solve problems allowed
          me to see the bigger picture and make more informed decisions in the future. The main objective was simply to &apos;just build stuff&apos; and see what I could create. (All of this before the age of vibe-coding and agents mind
          you)
        </Paragraph>
        <List type="disc">
          <span>
            <b>Deadair</b>: Deadair offers a new way to watch YouTube in the background. It allows you to create channels with set schedules that run throughout the week, enabling you to hop in and out of the constant stream of content,
            just like a TV channel. It also allows you to create your own channels and share them with your friends.
          </span>
          <span>
            <b>Nochan</b>: Nochan is an ephemeral imageboard I created to learn more about Next.js, Tailwind CSS, and Bun. It allows users to create threads and post images that are stored in a database and deleted after 24 hours.
          </span>
          <span>
            <b>Spring &apos;83</b>: Spring &apos;83 is a protocol for communication dreamed up by Robin Sloan. This project implements both a client and server for the protocol, which is based on the distribution of HTML &apos;boards&apos;
            - limited to 2217 bytes and unable to execute JavaScript or load external resources. It also includes a key generator for users to generate their own cryptographic keys.
          </span>
          <span>
            <b>Chimera</b>: Chimera is a Minesweeper game that provides a daily challenge, similar to games like NYT&apos;s Wordle. Each board is unique every day, and all players are given the same starting position. It also includes a
            leaderboard that tracks the highest win streaks and statistics of previous days, with heatmaps to show in what bombs the players exploded the most.
          </span>
          <span>
            <b>Minos</b>: Minos is a pathfinding visualizer that I made. My main goal with this project was to revisit some of the pathfinding algorithms I learned in college and to try out Next.js. In the spirit of revisiting the
            algorithms, I added a section to learn more about them, their premise, and how their implementation works in TypeScript.
          </span>
          <span>
            <b>Polemos</b>: Polemos is a text-based fight simulator that draws clear inspiration from BrantSteele&apos;s Hunger Games Simulator. My friends and I liked playing around with the Hunger Games Simulator, but we wanted to make
            something more customizable that allowed for far more players, events, and stat tracking between rounds to keep track of the winners and losers.
          </span>
          <span>
            <b>Rhea</b>: Rhea is Conway&apos;s Game of Life simulator with a finite grid that wraps around, allowing for unique patterns and behaviors. Features include saving/loading patterns, speed control, and a pattern creation panel.
          </span>
          <span>
            <b>Eos</b>: Eos is a starter page that combines the things I use the most when I launch a new tab with extra functionality, including note-taking, RSS feed aggregation, Spotify tracking stats, and more.
          </span>
        </List>
        <Paragraph>And of course aornum.xyz itself, my previous portolio website where I linked to them all. Creating writeups about each of them to gain some closure after finishing each of them</Paragraph>
      </Section>

      <Section>
        <SectionTitle>Lessons Learned in the Aornum Era</SectionTitle>
        <Paragraph>
          Aornum.xyz wasn&apos;t just a portfolio; it was a crash course in server administration and security, often learned the hard way. I gained invaluable experience in setting up a reverse proxy, configuring SSL certificates, and
          managing long-running jobs with PM2. I also dipped my toes into the world of self-hosting and database management.
        </Paragraph>
        <Paragraph>
          One particularly memorable (and slightly embarrassing) incident involved a security breach. In my early days, I exposed a MongoDB instance to the open internet. The funny thing is, I noticed the project wasn&apos;t working as
          expected and, in a moment of panic, I thought a rogue script was deleting my database. So, I kept running the seed script, inadvertently amplifying the problem. It turned out, a malicious actor had gained access and was attempting
          to ransom my database, which, ironically, only contained about ten documents. While the stakes were low, the lesson was profound. This incident underscored the critical importance of firewalls and robust security measures.
        </Paragraph>
        <Paragraph>
          Beyond direct attacks, I also faced challenges from excessive web crawling. I quickly learned the necessity of implementing `robots.txt` to manage crawler behavior and setting up rate limiters to prevent denial-of-service (DDoS)
          attacks from overly aggressive bots. It&apos;s a constant game of cat and mouse, but these experiences have significantly shaped my understanding of web security and infrastructure management.
        </Paragraph>
        <Paragraph>
          I cannot put into words how much I learned through the different projects that passed through aornum, not just in a technical standpoint, but it was a creative outlet for me in which I learned to mold my ideas and take on projects
          with increasing difficulty, being able to finish a project, then go on and write about what I learned was incredible for retaining those lessons. As I&apos;ve said before, the ability to articulate what you&apos;ve learned is just
          as important as the learning itself. Writing about my projects forced me to think critically about my process, identify areas for improvement, and solidify my understanding of the concepts involved. This practice has transformed
          me from someone who simply follows instructions to someone who can design and implement solutions independently.
        </Paragraph>
        <Paragraph>
          I think of aornum as <HoverableLink href="https://www.swyx.io/learn-in-public">learning in public</HoverableLink> lite, putting my work out there without really promoting or marketing it still helps me set clear goals of
          &quot;what if&quot; someone stumbles upon this, the standard of quality I set for myself was higher as it was going to be shown even if no one saw it is not about the destination, views or internet points, but the journey of
          creation itself. The act of publishing, even to an empty room, solidifies the intent, transforming fleeting ideas into tangible outputs. This process, I believe, is invaluable for any creator seeking to hone their craft and build
          a body of work.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>Moving to fsobral.dev</SectionTitle>
        <Paragraph>
          Shutting down the Linode VPC and letting the `aornum.xyz` domain expire felt like closing a significant chapter. It wasn&apos;t just about decommissioning servers; it was about acknowledging the end of an era defined by broad
          exploration and, often, learning by making mistakes. While the public repositories and write-ups preserve the tangible work, the feeling of that initial, somewhat chaotic playground is now a memory. It&apos;s a fond memory,
          however, one that laid the essential groundwork for everything that followed.
        </Paragraph>
        <Paragraph>
          The move to `fsobral.dev` represents a natural evolution. I continue with the same &quot;just build stuff&quot; mentality, the new domain will be for more random projects without the weight of having to upkeep the old ones. I will
          still write about my projects, and blogs, it&apos;s always about chapters, and this is just the next one.
        </Paragraph>
      </Section>
    </>
  );
}
