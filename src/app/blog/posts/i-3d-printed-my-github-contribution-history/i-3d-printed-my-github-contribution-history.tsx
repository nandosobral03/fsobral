import { ImageWithAlt, Paragraph, Section, SectionTitle } from "@/app/blog/components/blog-section";
import HoverableLink from "@/app/blog/components/hoverable-link";

export default function I3dPrintedMyGithubContributionHistory() {
  return (
    <>
      <Section>
        <SectionTitle>I 3D printed my Github contribution history</SectionTitle>
        <Paragraph>
          So, after a pretty long year of coding, I finally decided to print out my Git contribution history. I was inspired by a developer at my company who had done the same, and the idea stuck with me. It's a small memento, but it
          represents a year's worth of effort, both during and outside of work.
        </Paragraph>

        <ImageWithAlt src="https://i.imgur.com/BS0Zo99.jpeg" alt="A picture of the 3d printed contribution history" />

        <Paragraph>
          Since the moment I saw it I knew I wanted to have one, thing is at the time I had just transitioned from another job, in which I had been using a separate github account for work, meaning that my contribution history wasn't
          complete (and it wouldn't have been as great either way)
        </Paragraph>

        <Paragraph>
          I think seeing that visual representation of someone's work, all those little squares lighting up to show activity, is really cool, that's one of the reasons I added it to page{" "}
          <HoverableLink href="https://fsobral.dev">fsobral.dev</HoverableLink>, recruiters don't really care about it but other developers tend to like it.
        </Paragraph>

        <ImageWithAlt src="https://i.imgur.com/jdXScTC.png" alt="GitHub contribution chart on website" />

        <Paragraph>It's not about showing off, but more about reflecting on the work you've put in. For me, printing it out was something I wanted from that first day I saw it, and now a bit over an year later I have it.</Paragraph>
      </Section>

      <Section>
        <SectionTitle>Graduating, and reflecting on a Year of Growth</SectionTitle>
        <Paragraph>
          It feels like only yesterday I was defending my dissertation, anxious about what the evaluators thought, and then filled with happiness that the 5-year journey was finally over. I had already switched jobs just before graduating,
          and the timing made it feel like one was a continuation of the other.
        </Paragraph>

        <Paragraph>
          Stepping into this new role brought a level of responsibility I hadn't fully grasped before. Initially, I felt somewhat overwhelmed, but thanks to my excellent colleagues, I navigated through it and became much more confident. I
          gradually took on more responsibilities, eventually being assigned as the project leader. The problems grew more complex, but so did I, managing to stay ahead and learning each week through interactions with my team and the
          client. This past year has really shown me the importance of having a good team and a positive work environment; I have nothing but the greatest appreciation for them.
        </Paragraph>

        <Paragraph>
          The past year has been a time of significant growth, both technically and professionally. My understanding of tools like React and Next.js has grown considerably, and I now feel much more confident using them. More importantly,
          I've developed my ability to collaborate effectively, communicate my ideas clearly, and handle the challenges of working on a product in production.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>Beyond the 9-5</SectionTitle>
        <Paragraph>
          If you look closely at the contribution history, you might notice a bunch of commits on non-working days. Coding, for me, is more than just work. I initially started building a portfolio page to be more "hireable," but I kept
          working on things because I genuinely loved doing it. After changing jobs at the start of 2024, I continued building increasingly complex things, learning by doing and applying what I had learned, simply because I enjoyed it. If I
          have a cool idea, it'll likely go into my notes to be refined and eventually created when I'm done with the backlog of other ideas before it.
        </Paragraph>

        <Paragraph>
          Programming felt like a way to express myself, so I started this blog (the one you're reading now!) as part of redesigning my portfolio page. Now, I look forward to writing down whatever I'm thinking about or working on. I'd
          already explored this idea a bit by writing short prefaces for all my projects, and I liked it, so having this new space feels like a natural evolution.
        </Paragraph>

        <ImageWithAlt src="https://i.imgur.com/X6eYJot.png" alt="The github contribution history" />

        <Paragraph>
          I've made over 4000 contributions year-to-date, a number I can only attribute to both personal projects and work; neither alone would have been nearly enough. One thing about contributions is that while saying "Yeah, I have 4k
          contributions on GitHub" sounds good, it's entirely fakeable. I could easily set up a daily cron job or GitHub Action to commit a change to a README in a private repo, and it would show as a contribution. Or, if I wanted, I could
          create thousands of commits and change their dates. So, you'll have to trust me that mine are real. Of all the things you could fake, this would be the most boring, in my opinion. It kind of discredits a metric that's supposed to
          show how much work you've done, and I think no one really cares about someone's GitHub stats except for themselves.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>My first open-source PR</SectionTitle>
        <Paragraph>
          Another cool thing that happened this year was opening my first PR to an open-source project. Funnily enough, it was for <HoverableLink href="https://github.com/github/gh-skyline">Github Skyline</HoverableLink>, the repo I used to
          create the 3D-printed version of my contribution history. As I mentioned, since joining this company, I'd wanted to get one of those. After a year of hard work, I finally had something I'd be proud to have as a solid piece of 3D
          filament. I started using the tool to generate it, and boom: it only works in calendar years. This meant my contribution history would be January-December, with sparse commits from January to March due to the two GitHub accounts I
          was using. So I did what any sane person would do, I went to the tool's repository issues tab, found one that talked about making it work year-to-date, forked the repo and created my own solution. For now it hasn't been merged,
          and it probably never will but the PR works, and it's what I used to print my own which is what I really cared about.
        </Paragraph>

        <Paragraph>
          The funny thing is, when I first created this, I thought it was just some random, no-name open-source repo. There were a couple of similar web apps already, so I didn't think much of it. After creating the PR, I saw the GitHub
          notifications on my profile and realized the repo is actually part of the main GitHub organization! Luckily, I had already submitted the PR before I understood the scope of what I was doing.
        </Paragraph>

        <ImageWithAlt src="https://i.imgur.com/cB3fLjG.png" alt="Screenshot of the PR" />
      </Section>

      <Section>
        <SectionTitle>What's next?</SectionTitle>
        <Paragraph>
          Wouldn't you like to now huh? I'm not sure, I hope to have many years like this last one. Ultimately, my goal is to continue growing as a developer and as a person, making a positive impact on the projects I work on and the people
          I work with. Perhaps next year I'll get another interesting paperweight like this one, but even if I don't, I'm sure I'll continue learning in different ways.
        </Paragraph>
      </Section>
    </>
  );
}
