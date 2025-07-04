import TLDR from "@/app/blog/components/TLDR";
import {
  ImageCarousel,
  ImageWithAlt,
  List,
  Paragraph,
  Quote,
  Section,
  SectionSubtitle,
  SectionTitle,
  Sidenote,
} from "../../components/blog-section";
import FishingGame from "./game";

export default function AutomatingFishingForFunAndNoProfit() {
  return (
    <>
      <TLDR>
        I decided to write a script that played a fishing game for me because I
        can, now I'm probably one of the few persons in the world to have
        completed it in its entirety without the use of mods
      </TLDR>
      <Section>
        <SectionTitle>Introduction</SectionTitle>
        <Paragraph>
          A couple of weeks ago, I was browsing YouTube, as one does, and
          stumbled upon{" "}
          <a
            href="https://www.youtube.com/watch?v=Geq1_M3DrQ4"
            target="_blank"
            rel="noopener noreferrer"
          >
            a video
          </a>{" "}
          about a guy who decided to automate a few different Minecraft farms
          and essentially destroyed that server's economy. I really liked the
          idea. I'd seen it done a couple of times before, but this time I
          thought it would be a fun project. This got me thinking about trying
          automation myself, so I went to my Steam library and started scrolling
          through my games to see if I could find anything that would be fun to
          automate.
        </Paragraph>

        <Paragraph>
          My goal was to find a game that was easy to automate, mainly through
          replicating mouse and keyboard actions, since most games don't let you
          pull out their data directly. Plus, I wanted to reach some kind of
          goal or achievement by automating it, rather than just automating for
          the sake of it.
        </Paragraph>

        <Paragraph>
          That's when I stumbled upon{" "}
          <a
            href="https://store.steampowered.com/app/3146520/WEBFISHING/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Webfishing
          </a>
          . Webfishing is, as you might have guessed, a game about fishing, it
          describes itself as:
        </Paragraph>

        <Quote>
          WEBFISHING is a multiplayer, chatroom-based fishing game created by
          lamedeveloper. The game offers a cozy environment where players can
          catch nearly 100 different species of fish, meet new people, customize
          their character to their liking, play instruments, and generally be a
          silly little critter.
        </Quote>

        <Paragraph>
          Webfishing is a sandbox game where 1-12 players can fish, metal
          detect, and play guitar on small online servers. Players earn cash by
          selling fish and completing quests, which they use to buy avatar
          customizations and equipment upgrades. The fishing minigame involves
          reeling in catches and occasionally clicking when prompted. In the
          game, you can reel in 79 different things. This includes 32 freshwater
          fish, 32 saltwater fish, 4 fish that only appear when it's raining, 7
          undesirable junk items, and 2 other unique fish. Each time a player
          catches something it can be in one of 6 different qualities:
        </Paragraph>

        <List type="disc">
          <b className="font-bold">Normal</b>
          <b className="font-bold">Shining</b>
          <b className="font-bold">Glistening</b>
          <b className="font-bold">Opulent</b>
          <b className="font-bold">Radiant</b>
          <b className="font-bold">Alpha</b>
        </List>

        <Paragraph>
          Each of these has a different probability of dropping depending on the
          type of bait used. Different baits significantly modify your chances
          of catching higher quality fish, with premium baits offering much
          better odds for rare Alpha quality catches. My objective with the game
          was to complete the fishing journal, for which I would have to catch
          all 79 different catches in each of the rarities, so a total of 474
          unique items, each of them having a random chance that was determined
          by the rarity and quality of the catch.
        </Paragraph>
      </Section>
      <Section>
        <SectionTitle>The Plan</SectionTitle>
        <Paragraph>
          After playing for a bit I found that the game would be the perfect
          target for automation. The actions were simple enough, the objective
          was clear. From the Steam Achievements statistics I could see that
          0.5% of players had actually completed the journal. Considering that
          there are mods that allow you to catch any fish you want, the number
          of players that had actually completed the journal "legitimately" was
          probably extremely low.
        </Paragraph>
        <Paragraph>
          So I chose to write a script that would play the game for me, sounded
          simple enough. The main gameplay loop of the game is the following:
        </Paragraph>
        <List type="disc">
          <span>Select the type of bait</span>
          <span>Go to a fishing spot you'd like to fish at</span>
          <span>Cast your line</span>
          <span>Wait for the fish to bite</span>
          <span>
            Once the fish bites, you are prompted to a minigame where you have
            to cycle between holding and mashing the click button to reel in the
            fish in a certain amount of time.
          </span>
          <span>
            If you are successful, you catch the fish and get the item, if you
            fail, you can try again.
          </span>
          <span>
            Bait is consumed when you cast your line, so every time you run out
            of bait you have to go back to the shop, sell the fish you have, and
            buy more bait.
          </span>
          <span>
            Selecting different types of bait will modify your odds of catching
            different quality fish.
          </span>
          <span>
            The different fishing spots have different pools of fish, so you
            have to go to the ones that have the fish you want.
          </span>
        </List>
        <Paragraph>
          Here's a minimalistic recreation of the fishing loop
        </Paragraph>
        <FishingGame />

        <Paragraph>
          With just a few additional details to work out, I was ready to start
          coding.
        </Paragraph>
      </Section>
      <Section>
        <SectionTitle>Automating webfishing</SectionTitle>
        <Paragraph>
          My first step was to tackle the fishing loop itself, since that would
          be the core of the script and the easiest to iterate over.
        </Paragraph>
        <Paragraph>
          So first thing I did was to create a script that would cast a new line
          at max distance, then when the prompt for having a successful catch
          came up, it would hold the left mouse button down, reeling in the
          fish.
        </Paragraph>
        <Paragraph>
          I had to figure out when to rapidly click the mouse button versus when
          to hold it down. At first I thought maybe I could get away with
          constantly mashing since each click would add a bit to the reeling
          progress, but I quickly realized that the game would not register as
          many clicks as I was clicking, meaning that it would only slightly
          move and eventually fail to reel in the fish.
        </Paragraph>
        <Paragraph>
          My next approach was to hold until I saw the prompt for mashing. At
          that point click for a couple of cycles, then release the mouse button
          and wait for the next prompt. This worked okay for a bit but it had 2
          issues. For higher quality fish it sometimes needed more clicks than
          the ones I programmed it to mash for, meaning it would get stuck
          holding when it had to mash and lose enough time to fail the catch.
          For lower quality fish it would mash way too much for no reason,
          eventually also leading to not reeling enough to catch the fish. For a
          human player this is quite easy since they can see the number of
          clicks required to mash, and count while they do so, but if I wanted
          to do it for a script I would need to figure out a way of detecting
          the number, reading it with computer vision, and then clicking for the
          correct number of times.
        </Paragraph>
        <ImageWithAlt
          src="/blog/posts/automating-fishing-for-fun-and-no-profit/catching.png"
          alt="Catching a fish in the game"
        >
          <Paragraph>How it looks like when you catch a fish</Paragraph>
        </ImageWithAlt>
        <Paragraph>
          Here I tried a bunch of different solutions, from using Tesseract to
          read the number, to trying opencv. The problem was I'd have to run
          this check after finishing every mash interval which could be many
          during a single catch. Parsing the image to get the number would take
          too much time, causing the reeling to fail. Speed was critical because
          the fishing mechanic has a tight time window - any delay in processing
          would result in a failed catch.
        </Paragraph>
        <Paragraph>
          So in the end after a couple of hours of trying different solutions I
          found that there was a much easier way to do it. The game has a
          setting that allows you to switch the mashing mechanism to also work
          while holding the button down, so I just had to click once and then
          hold the button down.
        </Paragraph>
        <Paragraph>
          This worked great, I could just click once and then hold the button
          down and the game would do the rest.
        </Paragraph>
        <Paragraph>
          After the fish has been caught next thing is to skip all the text
          prompts for having caught the fish, which are either 1 or 2 depending
          on if you were lucky enough to also catch a treasure, and then the
          script could loop back and start fishing once again.
        </Paragraph>
        <ImageWithAlt
          src="/blog/posts/automating-fishing-for-fun-and-no-profit/fishing.webp"
          alt="Fishing"
        >
          <Paragraph>Fishing loop</Paragraph>
        </ImageWithAlt>
        <Paragraph>
          With that out of the way, the next challenge was changing the bait
          after it had run out. The game gives you a series of different baits
          you can have stocked at the same time, so my initial solution was to
          have it switch between them once it ran out. This worked okay and the
          script could keep running for a couple of hours without intervention.
          I almost thought of leaving it like that, but seeing how little of a
          dent it was making in the journal completion, it was clear I had to
          improve it and make it fully autonomous.
        </Paragraph>
        <Paragraph>
          The first thing I did was to add a shop class that would handle the
          buying and selling of baits, and a fishing spot class that would
          handle the selection of the fishing spot, and the casting of the line.
        </Paragraph>
      </Section>
      <Section>
        <SectionTitle>Automating the whole game</SectionTitle>
        <SectionSubtitle>Navigation and Store Integration</SectionSubtitle>
        <Paragraph>
          With the fishing loop done, the next logical step was to automate the
          process of selling fish and buying bait. The only problem with that is
          that I would also need to automate the process of getting to the store
          (a physically different location than the fishing spots) and then
          getting back to the same spot to guarantee the script would be able to
          keep fishing. If the position was off, over the iterations it would
          eventually be in a completely different place and the script would
          fail.
        </Paragraph>
        <Paragraph>
          Luckily the game has a "Return to Spawn" button that could teleport me
          to a set location. With this I only had to write logic to move from
          the spawn to the store, and from the spawn to a fishing spot without
          having to worry about slight deviations as they would be fixed by the
          teleport. In the process of trial and error, I found that the camera
          did not reset to the default position when teleported, so I had to
          write logic to move the camera to a known position so the inputs which
          are camera relative would be correct.
        </Paragraph>
        <Paragraph>
          <Sidenote anchorText="This process took some time but eventually I implemented the logic to move to the store and to three different fishing spots which should be able to cover all fishing pools">
            <Paragraph>
              Below are the routes to the freshwater, saltwater and void fishing
              spots respectively
            </Paragraph>
          </Sidenote>
        </Paragraph>
        <ImageCarousel
          images={[
            {
              src: "/blog/posts/automating-fishing-for-fun-and-no-profit/freshwater.webp",
              alt: "Freshwater fishing spot",
            },
            {
              src: "/blog/posts/automating-fishing-for-fun-and-no-profit/saltwater.webp",
              alt: "Saltwater fishing spot",
            },
            {
              src: "/blog/posts/automating-fishing-for-fun-and-no-profit/void.webp",
              alt: "Void fishing spot",
            },
          ]}
        />
        <Paragraph>
          With this done I felt confident that the script would soon be running
          continuously, so I went to sleep.
        </Paragraph>
        <SectionSubtitle>Optimization and Fishing Buddies</SectionSubtitle>
        <Paragraph>
          To my surprise, when I woke up the next day, the script was still
          running which was good, but when I checked the progress I found that
          progress on the journal was much slower than I expected. So I started
          looking for possible optimizations that could help me finish the
          journal faster.
        </Paragraph>
        <Paragraph>
          I remembered the game had a "Fishing Buddy" feature which are
          basically 2 buckets one of freshwater and one of saltwater, and you
          could set them to automatically catch fish for you.
        </Paragraph>
        <ImageWithAlt
          src="/blog/posts/automating-fishing-for-fun-and-no-profit/buddies.webp"
          alt="Fishing buddies"
        >
          <Paragraph>Setting up the fishing buddies in the void</Paragraph>
        </ImageWithAlt>
        <Paragraph>
          They sounded interesting and after a bit of fiddling I managed to set
          up locations for them on all the fishing spots. After completing every
          second reeling attempt the script would now check on the fishing
          buddies to see if they had caught anything, this meant that on the
          time that before I got 2 fish, now I was getting 4.
        </Paragraph>
        <Paragraph>
          More idling attempts, more fish, and the script was making good
          progress on the journal. I had already reached max level and bought
          all upgrades in about 50 or so hours of idling. At this point I wanted
          to make changes to the script so I could target the elements I needed
          to catch. As I said before each of the 79 items has a random chance of
          dropping in one of the 6 qualities, each type of bait modifies the
          odds of getting these qualities, up until now I was switching between
          baits as they ran out, but now I specifically wanted to target{" "}
          <span className="font-bold">Alpha</span> quality fish. So I added the
          option for picking which bait to use, and instead of switching to the
          next one it would instead initiate the buy/sell process when the
          current bait runs out.
        </Paragraph>
        <SectionSubtitle>
          Targeting Specific Fish and CLI Improvements
        </SectionSubtitle>
        <Paragraph>
          Around this time I also chose to polish a bit the CLI, with the
          different options for bait, fishing locations so that I could switch
          between modes once I was done looking for specific fish.
        </Paragraph>
        <ImageWithAlt
          src="/blog/posts/automating-fishing-for-fun-and-no-profit/cli.png"
          alt="CLI"
        >
          <Paragraph>
            CLI with different options for bait, fishing locations and more
          </Paragraph>
        </ImageWithAlt>
        <ImageWithAlt
          src="/blog/posts/automating-fishing-for-fun-and-no-profit/cli-fishing.png"
          alt="CLI while fishing"
        >
          <Paragraph>CLI while fishing</Paragraph>
        </ImageWithAlt>
      </Section>
      <Section>
        <SectionTitle>The stats</SectionTitle>
        <Paragraph>
          Before diving into the final results, here's what the script
          accomplished (it took a lot longer than I expected):
        </Paragraph>
        <List type="disc">
          <span>
            <b>474 unique items</b> collected (79 creatures × 6 rarities)
          </span>
          <span>
            <b>189 hours</b> of fishing
          </span>
          <span>
            <b>15514 fish</b> caught
          </span>
          <span>
            <b>3+ million </b> in profit
          </span>
          <span>
            <b>4+ million </b> exp more than required for max level
          </span>
        </List>
      </Section>
      <Section>
        <SectionTitle>Victory</SectionTitle>
        <Paragraph>
          With that done, completing the journal became inevitable. I left the
          script running at night during a couple of days and eventually I woke
          up to a completed journal.
        </Paragraph>
        <ImageCarousel
          images={[
            {
              src: "/blog/posts/automating-fishing-for-fun-and-no-profit/freshwater-completion.png",
              alt: "Freshwater completion",
            },
            {
              src: "/blog/posts/automating-fishing-for-fun-and-no-profit/saltwater-completion.png",
              alt: "Saltwater completion",
            },
            {
              src: "/blog/posts/automating-fishing-for-fun-and-no-profit/misc-completion.png",
              alt: "Misc completion",
            },
          ]}
        />
        <Paragraph>
          This was quite the different project from what I usually tackle but it
          was really fun, tedious at times to get the right set of inputs but
          overall it was a great experience, I'm glad to have done it, and there
          is some sense of accomplishment in knowing I 100% completed the game
          without the use of mods, even though I wouldn't call it completely
          legitimate because I used a script to do it. I still took the time to
          create and refine the script.
        </Paragraph>
      </Section>
      <Section>
        <SectionTitle>What I learned</SectionTitle>
        <Paragraph>
          This was a fun project that scratched the automation itch I've had for
          a while, not much learning in terms of new technologies, but it's fun
          to see some programming cornerstones being as important as ever.
        </Paragraph>
        <List type="disc">
          <span>
            <b>Incremental improvement</b> - Starting with basic fishing and
            gradually adding features was more effective than trying to automate
            everything at once
          </span>
          <span>
            <b>Defining self-contained flows</b> - Breaking down the problem
            into smaller, manageable parts and testing each part in isolation,
            then orchestrating them to achieve the overall goal.
          </span>
        </List>
        <Paragraph>
          Automation continues to be one of my favorite ways to solve
          interesting problems, and this project reminded me why I love building
          things that work while I sleep!
        </Paragraph>
      </Section>
    </>
  );
}
