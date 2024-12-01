import HoverableLink from "@/app/blog/components/hoverable-link";
import { Codeblock, List, Paragraph, Quote, Section, SectionSubtitle, SectionTitle, Sidenote } from "@/app/blog/components/blog-section";
import TLDR from "@/app/blog/components/TLDR";

export default function Inngest() {
  return (
    <>
      <TLDR>
        While serverless platforms like Vercel offer an excellent developer experience, they struggle with tasks that are trivial in traditional environments. Inngest provides an elegant solution for handling background jobs, scheduled
        tasks, and long-running processes in serverless environments without managing additional infrastructure.
      </TLDR>
      <Section>
        <SectionTitle>Introduction</SectionTitle>
        <Paragraph>
          As someone who works with Next.js on a daily basis, I am the first to admit that Vercel has done a great job at making the developer experience as smooth as possible,{" "}
          <Sidenote anchorText="few other tools come close to the developer experience that comes with using Vercel as a team.">Of course at quite the steep price for what they offer</Sidenote>. But working side by side with people who
          don't use serverless tools, I've come to realize that some of the most trivial problems in almost any other developer workflow are surprisingly annoying to deal with in a serverless environment.
        </Paragraph>
        <Paragraph>
          Using serverless often means being limited to short-lived functions, no persistent state, and no native support for background jobs. Even simple workflows like sending delayed notifications, processing large datasets, or running
          scheduled tasks can feel like uphill battles. And while Vercel's serverless platform is powerful and intuitive in many respects, there's a notable gap when it comes to handling these stateful or long-running tasks.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>Running a delayed job</SectionTitle>
        <Paragraph>
          Let's say your clients have a requirement to schedule an email 30 minutes after a user signs up. In Ruby on Rails, this could be easily solved with the following code: First we define the job, then we schedule it to run 30 minutes
          from now.
          <Codeblock language="ruby">{`# Define the job
class SendEmailJob < ApplicationJob
  queue_as :default

  def perform(user)
    UserMailer.with(user: user).welcome_email.deliver_later
  end
end`}</Codeblock>
          <Paragraph>Now we can enqueue a job to be performed 30 minutes from now.</Paragraph>
          <Codeblock language="ruby">{`# Enqueue a job to be performed 30 minutes from now
SendEmailJob.set(wait: 30.minutes).perform_later(user)

# Or schedule it for a specific time
SendEmailJob.set(wait_until: 30.minutes.from_now).perform_later(user)

# Can also be performed immediately
SendEmailJob.perform_later(user)`}</Codeblock>
        </Paragraph>
        <Paragraph>
          Now say you want to do the exact same thing using just Next.js and Vercel. Well you are out of luck, you cannot execute a function 30 minutes from now. Using a setTimeout and praying for the best? Sounds like a terrible idea that
          might work but function execution cannot be longer than{" "}
          <Sidenote anchorText="60 seconds">
            Unless you feel like
            <HoverableLink href="https://vercel.com/docs/functions/scheduled-functions"> paying </HoverableLink> for a pro or enterprise plan of course
          </Sidenote>
          .
          <Paragraph>
            New idea, let's run a cron job that runs every 30 minutes and sends the emails! That's an idea alright, but you now have a function executing every 30 minutes which might not do anything, have to keep track of the state of the
            jobs yourself, and also be careful not to send enough emails at once that you hit the function execution limit at which point you have no way of handling the error gracefully.
          </Paragraph>
          <Paragraph>
            Of course you could spin up another server and send a request there to run a scheduled job in a non-serverless environment, but that adds the extra cost and complexity of handling another server and reduces the main benefit of
            having all your full-stack code in a single application.
          </Paragraph>
        </Paragraph>
      </Section>
      <Section>
        <SectionTitle>Running a long task</SectionTitle>
        <SectionSubtitle>God I hate Streak</SectionSubtitle>
        <Paragraph>
          Another common scenario is needing to run a long running background task, be it processing a large dataset or running a computationally intensive task. Or waiting for an extremely slow and unreliable third party API to return a
          response.
        </Paragraph>
        <Paragraph>
          I have no idea what the folks at <HoverableLink href="https://www.streak.com/pricing">Streak</HoverableLink> are doing but I've had the great pleasure of having to integrate some of their APIs into a project and when I tell you
          that it was a nightmare, you have no idea. For some reason their APIs might randomly take up to <em>1 minute</em> to return a response out of nowhere, and let me tell you that is not something fun to deal with when you are bound
          by 30 seconds execution time. Anyways, back from hating on Streak. Wait no they suck, you want to know more of it, check out their <HoverableLink href="https://streak.readme.io/reference/create-a-box">API reference</HoverableLink>
          . Why do I have to create an empty box and then update it to have all the fields that are supposed to be required? Oh wait no, there is a <Sidenote anchorText="non-documented field">Don't ask how I found out</Sidenote> you can
          pass to the API to make it work, and don't get me started on their <HoverableLink href="https://streak.readme.io/reference/webhooks">Webhooks</HoverableLink>. Are you telling me there is no way of verifying the origin of your
          requests? How am I supposed to know if the request is coming from Streak or some random hacker? I had a real conversation with a real person at Streak about how to verify the origin of the request with no luck.
        </Paragraph>
        <Paragraph>Sorry I got off track, now actually back to the point, you want to run a long running task, we all know what those are. You are in a serverless environment, what do you do?</Paragraph>
        <Paragraph>Well, you have a few options, none of them great:</Paragraph>
        <List type="disc">
          <span>Split your task into smaller chunks that can complete within the time limit (usually not possible)</span>
          <span>Roll your own queue system (adds complexity and potential for failures)</span>
          <span>Use a third party queueing system (SQS, RabbitMQ, Bull, etc.) You still need a server to run it</span>
          <span>Offload the work to another service (defeats the purpose of serverless)</span>
        </List>
        <Paragraph>
          Even if you manage to get one of these approaches working, you still have to handle error cases, retries, and state management yourself. What happens if your function fails halfway through? How do you resume from where you left
          off? These are problems that traditional servers solve easily but become major headaches in a serverless environment.
        </Paragraph>
        <Section>
          <SectionTitle>Inngest</SectionTitle>
          <SectionSubtitle>The section in which I stop complaining</SectionSubtitle>
          <Paragraph>
            According to the <HoverableLink href="https://www.inngest.com/">Inngest</HoverableLink> website:
            <Quote>Inngest is an event-driven durable execution platform that allows you to run fast, reliable code on any platform, without managing queues, infra, or state.</Quote>
            What does this mean for us? Inngest allows us to work with an event-driven approach even in a serverless environment. It does this without having to manage anything else outside of your Next.js application which is the neat
            part. When an event is triggered, Inngest will run an API request to your code,
            <Sidenote anchorText="(with validation that the request is actually coming from Inngest to prevent against attacks)">Hear that engineers at Streak?</Sidenote>
            It supports retries, and even retries of retries. It also supports scheduled jobs, crons, delayed function calls, background jobs, and more.
          </Paragraph>
          <Paragraph>Let's go with the case of sending a delayed email. Inngest allows you to trigger an event 30 minutes from now, and if it fails to run you can configure the retry behavior, backoff, and more.</Paragraph>
          <Codeblock language="typescript">{`import { inngest } from "@/inngest/client";
export default inngest.createFunction(
// Function config
  {
    event: "signup/user.created",
    retries: 3,
    onFailure: async ({ event, error }) => {
      await addToDeadLetterQueue(event, error);
    },
  },
  // Function handler
  async ({ event, step }) => {
    await step.sleep("wait-for-30-minutes", "30 minutes");
    await step.run("send-welcome-email", async () => {
      await sendEmail(event.data.user.email, "Welcome to the app!");
    });
  };
);
`}</Codeblock>
          <Paragraph>
            Now when a user is created, we simply call with the event name and the data we want to pass to the function. Inngest will handle the rest.
            <Codeblock language="typescript">{`
import { inngest } from "@/inngest/client";

await inngest.send({
  // The event name (this is typed in the inngest definition)
  name: "signup/user.created",
  // The event's data, can be typed with zod
  data: {
    user: {
      id: 123,
      email: "test@example.com",
    },
  },
});
`}</Codeblock>{" "}
          </Paragraph>
          <Paragraph>
            Inngest also supports scheduled jobs, crons, and more. You can schedule a function to run on a specific date and time, or on a recurring schedule. This is useful for running scheduled tasks like cleaning up old data, sending out
            periodic reports, or running maintenance tasks. All while being able to see the results and errors in the Inngest dashboard, which gives you quite a bit more information about why things failed than Vercel logs.
          </Paragraph>
        </Section>
        <Section>
          <SectionTitle>Dev Experience</SectionTitle>
          <Paragraph>
            One of the best parts about Inngest is how seamless the local development experience is. When you're developing locally, Inngest provides a dev server that runs alongside your application, simulating the entire event processing
            pipeline without needing an internet connection or Inngest account.
          </Paragraph>
          <Paragraph>
            Running the dev server is as simple running <Codeblock language="bash">{`npx inngest-cli@latest dev`}</Codeblock> and you'll get access to a local dashboard at <code>http://localhost:8288</code> where you can:
          </Paragraph>
          <List type="disc">
            <span>View all registered functions in your project</span>
            <span>Manually trigger events with custom payloads to test and debug</span>
            <span>Monitor event execution in real-time</span>
            <span>Inspect function logs and debug issues</span>
            <span>Test retry scenarios and error handling</span>
          </List>
          <Paragraph>
            For testing, this is a godsend. You can run through your entire workflow completely offline without having to deploy to production, and provides a great dev experience both locally and on staging environments.
          </Paragraph>
        </Section>
        <Section>
          <SectionTitle>What's the catch?</SectionTitle>
          <Paragraph>
            With Inngest we can run a delayed job, a long running task, or pretty much anything we want without having to manage any of the underlying infrastructure since it will simply use Vercel's serverless functions. Does this mean it
            can handle all long running tasks? No, but it does mean that you can handle a lot of cases before you need to resort to a bigger gun.
          </Paragraph>
          <Paragraph>
            Another pretty bad thing about Inngest is having to rely on their platform to run your code. What if the company goes under? The prices are pretty good for most use cases but scaling to handle millions of events a month might
            cost a pretty penny. The good thing is that they offer a self-hosted open-source option, on their own <HoverableLink href="https://www.inngest.com/docs/self-hosting?ref=github-inngest-readme">documentation</HoverableLink> you
            can host it yourself on any cloud provider of your choosing.
          </Paragraph>
        </Section>
        <Section>
          <SectionTitle>Conclusion</SectionTitle>
          <Paragraph>
            Inngest provides a powerful solution for handling background jobs and scheduled tasks in serverless environments. It offers a developer-friendly experience with TypeScript support, error handling, retries, and a comprehensive
            dashboard for monitoring. While there are considerations around vendor lock-in and pricing at scale, the ability to self-host mitigates many of these concerns.
          </Paragraph>
          <Paragraph>
            For most applications, especially those built on platforms like Vercel, Inngest fills an important gap by enabling reliable background processing without the complexity of managing infrastructure. The combination of ease of use,
            robust features, and flexible deployment options makes it a compelling choice for handling asynchronous workloads in modern web applications.
          </Paragraph>
        </Section>
      </Section>
    </>
  );
}
