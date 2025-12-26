import { Section, Paragraph, List, Divider, Quote } from "@/app/blog/components/blog-section";
import TimelineProgress, { TimelineSection } from "@/app/blog/components/timeline-progress";

const MONTHS = [{ label: "JAN" }, { label: "FEB" }, { label: "MAR" }, { label: "APR" }, { label: "MAY" }, { label: "JUN" }, { label: "JUL" }, { label: "AUG" }, { label: "SEP" }, { label: "OCT" }, { label: "NOV" }, { label: "DEC" }];

const sections = [
  { id: "intro", markers: [0] },
  { id: "early-year", markers: [0, 1, 2] },
  { id: "sf-trip", markers: [3] },
  { id: "long-term-plan", markers: [3] },
  { id: "greenfield", markers: [4, 5, 6] },
  { id: "europe", markers: [6, 7] },
  { id: "interviews", markers: [7, 8] },
  { id: "argentina", markers: [9] },
  { id: "new-job", markers: [9, 10] },
  { id: "reflection", markers: [9, 10, 11] },
];

export default function TwentyTwentyFive() {
  return (
    <TimelineProgress markers={MONTHS} sections={sections}>
      <TimelineSection id="intro">
        <Section>
          <Paragraph>
            As 2025 is coming to an end, I think it's a good time to stop and think a bit about this year. It feels like every year I get to December, look back, and I'm astounded by how different my life is from the previous year and how
            much I think I've grown, both as a professional and a person. This year, almost nothing went according to plan and I learned that's not a bad thing.
          </Paragraph>
        </Section>
      </TimelineSection>

      <Divider />

      <TimelineSection id="early-year">
        <Section>
          <Paragraph>
            The first couple of months of the year started pretty chill. The last month of 2024, the team I was working on was split because the client wasn't paying our company the full amount, which left me alone without a team to lead,
            which was what I was supposed to be doing. During this time I was the sole maintainer, developer, tester, product owner, project manager, you name it. Since the client's company didn't have any other tech people, I was basically
            the one who did everything regarding the website. I think it was one of the few times where I actually felt like I wasn't enjoying my job, not because of the work itself, but it felt very demotivating having little to no
            communication on the project. I had no other team members, and the client was growing detached since they had their own problems to deal with (not going bankrupt, probably).
          </Paragraph>
          <Paragraph>
            I remember in March writing my blog about my 3D printed GitHub history, which was in itself a look back at what had been that year since graduation up to that point, a new job, new responsibilities, the whole shtick. Looking now
            back to March, which wasn't even that far away, feels like a completely different time in my life.
          </Paragraph>
        </Section>
      </TimelineSection>

      <Divider />

      <TimelineSection id="sf-trip">
        <Section>
          <Paragraph>
            Soon after I wrote that blog (about 3 weeks after, actually, and I only found out I was going around 2 weeks before departure) I went to SF because of this initiative called Puentes. The idea was
            basically taking a bunch of Uruguayan (and 2 Argentinian) engineers to SF to meet startup founders, people in the industry, and introduce them to the whole SF vibe. I think it's hard for me to put into words how much this
            experience ended up changing the trajectory of my life.
          </Paragraph>
          <Paragraph>
            It was the first time traveling "on my own" though not super on my own because I was going with some of the other Uruguayan guys, but I didn't really know them beforehand. We stayed at a house rented by the program organizers.
            No one really knew what to expect going there since it was the first time they'd done it, but it was a weird and incredible experience.
          </Paragraph>
          <Paragraph>
            There, I met Guillermo Rauch, the CEO of Vercel. I visited the Google headquarters because a Uruguayan who worked there offered to show us around the offices. I got around in my first Waymo. I did technical interviews and
            traveled around the city while still working remotely for my Uruguayan job from like 4am to 12pm since I had no PTO. I got offered a job at a startup to stay and live in SF. I learned about startup culture, met people working at
            FAANG and Nvidia, and made some great friends with the guys that went over with me.
          </Paragraph>
          <Paragraph>
            When I arrived back home, I declined the job offers and the visa that came with them because deep down I knew it wasn't the right choice for me. It felt like a moment of real agency. Telling other people about it, I was met with
            a bunch of different responses; most surprised, since I think taking the job would have been the more <em>logical</em> choice in a way.
          </Paragraph>
        </Section>
      </TimelineSection>

      <Divider />

      <TimelineSection id="long-term-plan">
        <Section>
          <Paragraph>
            After coming back, even though my life was going to go back to normalcy, it would never be exactly the same. At that point it was April and I was planning my <em>long term plan</em>, which was basically:
          </Paragraph>
          <div className="bg-foreground !text-background p-4 ">
            <List type="number">
              <span>Get promoted to senior at my current company</span>
              <span>Get cracked at leetcode, systems design, and my tech stack</span>
              <span>Interview with US companies, probably starting with medium-sized startups that already had some traction</span>
              <span>????</span>
              <span>Hopefully make it into one of those</span>
            </List>
          </div>
          <Paragraph>
            Around this time I also started going to therapy, which was one of the biggest improvements in my life this year. It allowed me to understand and pinpoint a lot of the things that were bad for me, things I was both somehow aware
            and unaware of at the same time.
          </Paragraph>
        </Section>
      </TimelineSection>

      <Divider />

      <TimelineSection id="greenfield">
        <Section>
          <Paragraph>
            Around the start of May, I was reassigned from the project I was working on to go lead a new greenfield project, this time with a full team and a couple of developers, which was super nice. The only bad thing was that from the
            very start, everyone knew we were short on time, which as you may know is not super good for a software project.
          </Paragraph>
          <Paragraph>
            The client wanted to go to market the first days of October, and according to their words "it needed to be done by the start of September, which means it needs to be ready to test by mid-August." Meaning they wanted us to have
            about 3 months to develop <em>a whole app</em> that could handle millions of photos, connect with more than 4 external systems (each of which needed their own custom integration, and of course none were documented), and use a
            payment provider that was mid-migration to a new structure and was still developing features we needed to implement more than halfway through July.
          </Paragraph>
          <Paragraph>On top of this, I had already scheduled 2 weeks of PTO by the end of July with booked flights from back in February. Yeah, you can guess how well that whole thing went.</Paragraph>
          <Paragraph>
            On one hand, it was nice because the team was super fast-paced. We got the client to understand that we needed until the start of October to have everything ready, which bought us about 2 extra months. When we thought we might
            make it on time, they decided to increase the scope. So yeah. It was a stressful time for me, but at the same time the team was working great and we did the best we could with the time we had.
          </Paragraph>
          <Paragraph>
            I didn't get to see the end of the project, but after a bunch of{" "}
            <strong>
              <em>LONG</em>
            </strong>{" "}
            hours, a lot of external help from other developers, and the app going down a couple of times when peak traffic hit, the project is now running and there are users online. I'll get back to why I didn't get to see the end of it
            in a bit.
          </Paragraph>
        </Section>
      </TimelineSection>

      <Divider />

      <TimelineSection id="europe">
        <Section>
          <Paragraph>
            So now we're in July or so, and that PTO I mentioned was starting. Back in February I had decided that this year I wanted to take some time and travel through Europe on my vacation. I also wanted to solo travel, so I bought
            tickets to Kendrick Lamar's concert in Barcelona as kind of an excuse to force myself to do the trip and not fall into routine and end up not traveling like I wanted.
          </Paragraph>
          <Paragraph>
            This was the REAL traveling on my own experience. As I said before, the SF trip was on my own but with people I kinda knew — this time I was truly on my own. I still remember the first day in Barcelona when I arrived, leaving
            the house and asking myself "now what?" I had to, in a sense, learn to be completely on my own and have fun by myself. And I did. Solo traveling ended up being an experience I really enjoyed and that I'll be doing again,
            hopefully in 2026 and onwards.
          </Paragraph>
        </Section>
      </TimelineSection>

      <Divider />

      <TimelineSection id="interviews">
        <Section>
          <Paragraph>
            The week before I left for my trip, I received a message on LinkedIn from a YC company that had seen my profile from the trip to SF back in May and was interested in interviewing me. I honestly felt out of my depth because if
            you remember the <strong>long term plan</strong> I still wasn't even done with step 1. I probably had at least a year before my company would move me from tech lead to senior developer based on what we talked about in my
            performance reviews, mostly because of "experience" (or if we're being honest, "time in the company" makes more sense).
          </Paragraph>
          <Paragraph>
            So yeah, I ended up having the first set of interviews with this startup. I didn't really study for any of them since I was more like testing the waters and trying myself on the interviews without expecting to pass them. Long
            story short, the interviews ended up going my way. But as I had to book my last couple of interviews, my trip was coming up and I had to ask them for a pause in the interview process for at least 2 weeks since I would be on
            vacation.
          </Paragraph>
          <Paragraph>
            To my surprise, they were super fine with it (I've had experiences in the past where the exact same thing happened to me and I got disqualified because of it). So with over half the interviews done, I left for Europe.
          </Paragraph>
          <Paragraph>
            When I got back, I scheduled my last interview, which was systems design. I had never had a systems design interview and was a bit nervous, but it ended up going really well, the main thing being that I may have overcomplicated
            some of my solutions, but I passed it anyway. A couple more easier interviews later, I got offered a position as a senior software engineer.
          </Paragraph>
          <Paragraph>
            <strong>Skipping steps 1–4 of the long term plan :)</strong>
          </Paragraph>
          <Paragraph>
            I was super happy at my previous company, but the offer was too good to pass up. It paid well, it was an advancement in my career, it was the exact size of company I was looking for, it perfectly aligned with my long term plan.
            So yeah, I asked them if it was okay to wait 3 weeks before resigning from my current position, as I wanted to see the project through to as close as I could to the end. They were super okay with it.
          </Paragraph>
          <Paragraph>
            Those 3 weeks were HARD. Rushing the last part of the project while also knowing I was going to leave, so I was trying to leave everything in order for whoever would have to take up the role. I blame my engineering manager a bit
            at the time for not stepping up for the team after I told him multiple times that I was leaving and someone had to guide the project to port. But what can you do.
          </Paragraph>
        </Section>
      </TimelineSection>

      <Divider />

      <TimelineSection id="argentina">
        <Section>
          <Paragraph>
            That was by the end of September. Funnily enough, the week after I left my old job I had a scheduled trip to Argentina with some of the coworkers there, which we of course still did, to see none other than Kendrick Lamar (again
            for me, yes). Though this time I enjoyed it a lot more. I decided to not take a single picture or video and just pogo in the crowd.
          </Paragraph>
        </Section>
      </TimelineSection>

      <Divider />

      <TimelineSection id="new-job">
        <Section>
          <Paragraph>
            These last 3 months or so have been great at the new company. Coworkers are great, we had an onsite which was nice and I got to meet everyone in person, the job is engaging, I am learning a lot and I am working on something a
            lot of people use, something which is not as common as it should be when working for Software Factories here in Uruguay. I was scared during the first weeks about whether I was up to the task, but I proved to myself that I am.
          </Paragraph>
          <Paragraph>When I was offered the job, I couldn't help but remember a talk I had with one of the guys I went to SF with, he said:</Paragraph>
          <Quote>"You don't become a senior engineer just by learning stuff; you become a senior engineer when people start to see you as one."</Quote>
          <Paragraph>Which is of course a bit of a catch-22, but it's true. You need to act as one until someone acknowledges it.</Paragraph>
        </Section>
      </TimelineSection>

      <Divider />

      <TimelineSection id="reflection">
        <Section>
          <Paragraph>
            Looking back at everything, I think the thread that ties this year together is learning to trust myself. Declining that first SF offer when everyone thought I should take it. Betting on a long term plan that got completely
            upended. Taking a leap on interviews I didn't think I was ready for. Each time, the outcome wasn't something I could have predicted but the decisions themselves felt right.
          </Paragraph>
          <Paragraph>
            A year ago, I wouldn't have imagined being where I am now. And honestly, I have no idea where I'll be a year from now. But I think that's okay. Every year I try to lower my expectations, thinking I can't grow as much as the year before. Every year I prove myself wrong. If 2025 taught me anything, it's that the interesting stuff happens when you stop waiting until you're ready.
          </Paragraph>
        </Section>
      </TimelineSection>
    </TimelineProgress>
  );
}
