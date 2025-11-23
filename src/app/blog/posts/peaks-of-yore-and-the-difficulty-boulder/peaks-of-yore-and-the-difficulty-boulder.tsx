import { ImageWithAlt, List, ListTitle, Paragraph, Quote, Section, SectionTitle } from "@/app/blog/components/blog-section";

import HoverableLink from "@/app/blog/components/hoverable-link";
import TLDR from "@/app/blog/components/TLDR";
import Footnote from "../../components/footnote";

export default function PeaksOfYoreAndTheDifficultyBoulder() {
  return (
    <>
      <TLDR>Peaks of Yore introduces all mechanics in 14 climbs then spends the rest making you master them. The game never gets easier, you do. A lesson in building difficulty through player growth, not feature creep.</TLDR>
      <Section>
        <SectionTitle>Introduction</SectionTitle>
        <Paragraph>Rock climbing is a sport focused on scaling natural or artificial rock faces; it’s a test of one’s grip, balance, and endurance to ascend, overcoming obstacles by carefully choosing each hold and foothold.</Paragraph>
        <Paragraph>
          Rock climbing spans multiple styles, each with its own demands and distinct techniques. Bouldering, for example, involves short but challenging routes that focus on strength and technique over endurance, often without ropes but
          with crash pads for protection. They often require few but heavily demanding and technically complex movements.
        </Paragraph>
        <Paragraph>
          Single-pitch climbing offers a different challenge: climbers ascend a longer route often using ropes and anchors, to protect against falls. Though many challenged themselves without these aids to maintain the purity of the sport.
        </Paragraph>
        <Paragraph>
          At the extreme end, big-wall climbing involves multi-pitch routes that span hundreds or even thousands of feet. Early completions required the use of climbing gear and aid simply to assist progress instead of merely for safety.
        </Paragraph>
        <Paragraph>
          Rock climbing as a sport developed from mountaineering in the mid 19th century, especially in the rugged terrains of Europe. Various regions and communities contributed to its early rise. Climbers in the Lake District (England),
          Saxon Switzerland (Germany), the Dolomites (Italy), and Fontainebleau (France) began to establish techniques and challenges that went beyond simple mountain ascent, aiming to conquer rock faces specifically rather than just
          reaching a
          <Footnote footnote=" summit">
            <HoverableLink href="https://www.atlantis-press.com/proceedings/isemss-21/125959751">The Origin and Early Evolution of Rock Climbing</HoverableLink>
          </Footnote>
        </Paragraph>
        <Paragraph>
          Primarily led by English mountaineers, the Golden Age of Alpinism (1854–1865) was a defining period when climbers, motivated by both adventure and scientific inquiry, sought to conquer the peaks of the Alps. This era began with
          Alfred Wills’ celebrated ascent of the Wetterhorn in 1854, an achievement that captured public interest and helped elevate climbing to a respected activity in Britain.
        </Paragraph>
        <Paragraph>
          The climbs of this era set standards for modern alpinism, from ethical practices to the techniques climbers still use today. It was a time that celebrated human resilience, curiosity, and the drive to conquer nature, leaving a
          lasting legacy on the sport of
          <Footnote footnote=" mountaineering.">
            <HoverableLink href=" https://www.stanfords.co.uk/1865-the-golden-age-of-mountaineering-an-illustrated-history-of-alpine-climbing-s-greatest-era-9781910240526">The golden age of mountaineering</HoverableLink>
          </Footnote>
        </Paragraph>
        <Paragraph>
          After this era of mountaineering, rock climbing began to separate itself as a distinct recreational practice. In 1886, Haskett Smith and W. P. F. S. completed the climbing of the Napes and Needle rocks in the Lake District using
          free solo techniques. This climb was undertaken purely for aesthetic enjoyment and fun, marking it as one of the first recorded instances of rock climbing as a sport. Consequently, Haskett Smith has been referred to as the “Father
          of Rock Climbing” in England.
        </Paragraph>
        <Paragraph>
          While earlier mountaineers relied on climbing as a means to an end, conquering large peaks, this new generation of climbers began to view it as an end in itself, the allure of the inaccessible mountain. As a result, climbers began
          to appreciate the challenges posed by difficult routes for their
          <Footnote footnote=" own sake.">
            <HoverableLink href="https://www.frcc.co.uk/wp-content/uploads/2022/04/V24-2.pdf">100 YEARS OF ROCK CLIMBING IN THE LAKE DISTRICT</HoverableLink>
          </Footnote>
        </Paragraph>
      </Section>
      <Section>
        <SectionTitle>Peaks of Yore</SectionTitle>
        <Paragraph>Peaks of Yore drops us in the middle of this surge for mountain climbing, the year 1887, and we are a faceless climber ready to join the official Ascension Society to conquer the peaks of the Great Gales.</Paragraph>
        <Paragraph>
          The game starts with little to no introduction, showing a title card with the current year, and we are promptly introduced to our "cosy" cabin. We take control of the climber, and as we walk into the cabin, the first thing we see
          is a book on the table to our right, labeled "Fundamentals". Interacting with this book, we are greeted with the game's level selector.
        </Paragraph>
        <Paragraph>On the first page, there's a quick introduction about the difficulty of each of the peaks, ranging from Easy to Unconquered, including an extra note for the severity and frequency of the obstacles in the way.</Paragraph>
        <Paragraph>
          After this, we get a list of climbs with their name, an image, their difficulty, and a short description of each, followed by an empty space ready to be stamped. From this moment, the objective of the game becomes clear: complete
          the climbs in the book and "stamp" them as completed.
        </Paragraph>
        <ImageWithAlt src="https://i.imgur.com/EQlD9j3.jpeg" alt="The fundamentals" />

        <ImageWithAlt src="https://i.imgur.com/5lulkWf.jpeg" alt="The first boulder of the game" />
      </Section>

      <Section>
        <SectionTitle>Game Mechanics and Progression</SectionTitle>
        <Paragraph>
          The first couple of peaks serve as clear tutorials for the main mechanics of the game, such as how to grab a ledge and propel yourself between rocks. This is where the game first reveals its magic. Initially, it feels like a
          rage-inducing game similar to titles like "Getting Over It" or "Jump King." The mechanics may seem clunky at first; your mouse controls your view and hands while you swing from side to side with WASD. Falling means starting a
          climb again, which might seem unimportant initially since the climbs are no more than a couple of grabs high, but this concept is made clear from the beginning.
        </Paragraph>
        <Paragraph>
          Yes, the game is hard, but its greatest strength lies in teaching and proposing increasingly difficult challenges in a way that matches the player's growing abilities. Game mechanics are introduced and expanded upon one at a time
          through these levels, intermixed with reinforcement of all that was already taught and tools to help you along the way. For the first 14 climbs, each presents players with either a new mechanic or a spin on an old one. From climb
          15 (Aldr Grotto) to the end of the book with climb number 24 (Wuthering Crest), the peaks focus on reinforcing those mechanics and mixing them with level-specific gimmicks.
        </Paragraph>
        <ListTitle>Basic Levels and Mechanics:</ListTitle>
        <List type="number">
          <span>
            <b>Greenhorn's Top</b> - How to grab ledges
          </span>
          <span>
            <b>Paltry Peak</b> - "Jump/Pull" as a way to gain upwards impulse from a grab
          </span>
          <span>
            <b>Old Mill</b> - Lost items and moving surfaces
          </span>
          <List type="disc">
            <span>These three first climbs are the "tutorial" of the game, teaching the basic mechanics: how to grab holds, how to swing and jump between holds, and how to retrieve lost items during climbs.</span>
            <span>
              After completing these three climbs, the player is rewarded with ropes. These can be used to attach themselves to a point, limiting their movement to a circumference around it. This acts as a safety net - if attached to a
              point, they can return to it if they fall. However, the rope's length limits how far they can progress.
            </span>
          </List>
          <span>
            <b>Gray Gully</b> - Leaves in ledges Leaves sit on the side of climbable walls. When attempting to grab a hold covered by leaves, that hand removes the leaves and becomes occupied. Since leaves often cover grabbable surfaces, if
            the player releases their previous hold to grab underneath, they'll grab the leaves instead and fall.
          </span>
          <span>
            <b>The Lighthouse</b> - Temporary holds (falling bricks)
          </span>
          <List type="disc">
            <span>
              The Lighthouse is one of only two man-made climbs in the game, alongside the Old Mill. It introduces temporary holds - some bricks are loose and will fall if grabbed too long. A dramatic song plays when grabbing a loose brick,
              signaling the need to quickly change grips. While falling bricks don't appear again, this climb teaches players that falling is okay and to think quickly. It serves as an introduction to other temporary hold mechanics that
              appear later.
            </span>
          </List>
          <span>
            <b>Old Man of Sjor</b> - Birds Birds nest above grabbable holds.
            <List type="disc">
              <span>
                Disturbing them by grabbing their ledge causes them to harass the player until they either fall or climb far enough above. Once disturbed, birds circle above, periodically attacking and forcing the release of one hand's
                grip. If both hands are on the same rock when attacked, the player falls.
              </span>
            </List>
          </span>
          <span>
            <b>Gigant's Shelf</b> - Temporary holds (cramps)
            <List type="disc">
              <span>
                This introduces cramps, a mechanic used frequently throughout the game. When grabbing smaller holds, hands cramp after a timer expires. Each hand has an independent timer that recharges when not holding small holds. The
                recharge rate matches the cramping rate, creating challenging sections where players must juggle hand timers while climbing.
              </span>
            </List>
          </span>
          <span>
            <b>Evergreens End</b> - Branches
            <List type="disc">
              <span>Unlike static rock holds, branches move when gripped. The entire branch moves with the player's swing, allowing greater range of motion but requiring careful coordination for effective jumps.</span>
            </List>
          </span>
          <span>
            <b>The Twins</b> - Cruxes
            <List type="disc">
              <span>Cruxes are particularly challenging sections that often determine a climb's difficulty rating. Previous climbers' rope holds mark these sections, signaling where extra care and rope usage is advised.</span>
              <span>This climb's specific crux is a difficult vertical jump, made easier using coffee obtained from twin climbers at the base.</span>
            </List>
          </span>
          <span>
            <b>Old Groves Skelf</b> - Thorns
            <List type="disc">
              <span>
                Similar to leaves but more hazardous, thorns line wall sides. Unlike leaves, thorns aren't removed when touched but instead damage the player. This damage temporarily disables the affected hand's grip and pushes it away.
              </span>
            </List>
          </span>
          <span>
            <b>Handman's Leap</b> - Advanced rope techniques
            <List type="disc">
              <span>
                While not introducing new mechanics, this climb demonstrates advanced rope usage. Instead of just safety nets, ropes become essential for controlled descents. Though possible without ropes, this would require blind leaps of
                faith.
              </span>
            </List>
          </span>
          <span>
            <b>Lands End</b> - Sloped holds
            <List type="disc">
              <span>These larger but less secure holds introduce a new challenge. Unlike standard holds where grip is maintained while holding the button, sloped holds cause gradual slipping until the player falls.</span>
              <span>Their reduced grip also makes jumping and swinging more difficult.</span>
            </List>
          </span>
          <span>
            <b>Old Langr</b> - Temporary holds (fragile)
            <List type="disc">
              <span>
                The final fundamental mechanic introduces fragile holds - an advanced version of falling bricks. Once grabbed, these holds gradually disappear until destroyed. Unlike bricks, there's no audio cue, requiring players to
                carefully monitor their limited lifespan.
              </span>
            </List>
          </span>
        </List>
        <Paragraph>
          As well as the obstacles, there are a few pieces of equipment the player can use to counteract these challenges. All these items can be accessed with their hotkey or by looking at them on your belt and clicking, which is excellent
          inventory design in my opinion.
        </Paragraph>
        <ListTitle>Equipment:</ListTitle>
        <List type="disc">
          <span>Seeds - Calm birds down temporarily</span>
          <span>Coffee - Increases swing and jump distance</span>
          <span>Chalk Bag - Temporarily ignores cramps for a few grabs</span>
        </List>

        <Paragraph>
          These are most, if not all, of the mechanics a player will encounter up to the endgame. Introducing them early allows players to face an easy iteration, be presented with a solution, and then train on increasingly harder
          variations and combinations. Presenting all mechanics this early in the game (22% according to the save file, but realistically closer to 5-10% considering how much longer later peaks take compared to these climbs) means that the
          developers need to really work on taking these mechanics to their limit. Otherwise, the experience would become trivial to the player very soon, and artificially increasing difficulty with longer climbs would be tedious but not
          particularly hard.
        </Paragraph>
        <Paragraph>
          This, I think, is one of Peaks of Yore's greatest strengths. Instead of resorting to constantly adding new mechanics, they focus on cementing the already existing ones and making the difficulty ramp up as the player understands
          the game better. During my first playthrough, I felt that the game was tough to beat, but coming back for a second playthrough, most levels felt trivial. Much like other games such as Sekiro or The Outer Wilds, knowledge is an
          integral part of how one experiences the game. I can never play Peaks of Yore like I did for the first time again.
        </Paragraph>
        <Paragraph>
          Interestingly enough, the developers decided to do the opposite of simply creating longer climbs. After completing peak 17, we are greeted by a member of the OAS, telling us we've done well and that we can now access more
          technical climbing. From this point onwards, we can select any of the Bouldering challenges or continue with our Fundamentals.
        </Paragraph>
        <ImageWithAlt src="https://i.imgur.com/ogvL558.jpeg" alt="Bouldering challenges introduction" />
        <ImageWithAlt src="https://i.imgur.com/czBggpA.jpeg" alt="Bouldering challenges selection" />
      </Section>
      <Section>
        <SectionTitle>Bouldering Challenges</SectionTitle>
        <Paragraph>
          Bouldering is much like regular climbing in Peaks of Yore, with the main difference being the length of the climbs. The bouldering climbs rarely require more than 7 or 8 total grabs to complete, while every climb after the first
          two requires more time. So what's the catch? Bouldering climbs require much more precise and difficult movements.
        </Paragraph>
        <Paragraph>
          These boulders allow the player to learn and practice tough grabs and jumps that they would often be afraid to try without a rope, even on the fundamental climbs, since failing high up on any of those means restarting from the
          beginning. Boulders still have you start again, but since they are just a couple of jumps total, they are much more easily replayable.
        </Paragraph>
        <ImageWithAlt src="https://i.imgur.com/IaRNZ3h.jpeg" alt="Bouldering challenge example" />
        <Paragraph>
          For bouldering, the game disables the use of ropes and crampons, both of which aren't really needed since the routes are extremely short. However, it also means that any misstep results in starting again from the beginning.
        </Paragraph>
        <Paragraph>
          Most early boulders focus on moving quickly but safely. The grabs require stretching just enough, and your hands cramp faster. Crucial jumps require jumping off sliding holds or turning mid-air. None of the boulders are extremely
          easy, but they are quite forgiving. Compared to losing a run on the later fundamental climbs, they induce much less frustration, and the repetition of failing helps you get comfortable with the movement.
        </Paragraph>
        <Paragraph>
          Giant's Nose is the first really tough boulder, in my opinion, including some lengthy jumps and very cramping rocks. This stands as a roadblock in the progression. Luckily, it seems the developers were aware of this. On the ground
          before this boulder are the twins we first met at The Twins climb. They are here to remind us that we can use coffee, which makes this boulder much easier. Coffee restocks every time you touch the ground, making it a great help on
          these boulders where you can be caffeinated for the whole boulder, unlike on a regular peak where you save it for crucial jumps.
        </Paragraph>
        <ImageWithAlt src="https://i.imgur.com/QDkwwVF.png" alt="Giant's Nose boulder challenge" />
      </Section>
      <Section>
        <SectionTitle>Advanced Peaks</SectionTitle>
        <Paragraph>
          Around this time, we are greeted with the advanced climbs book. The Tines are a series of 5 climbs that represent the hardest the game has to offer. Unlike the fundamental and bouldering books, these climbs start at a difficulty
          of Severe and go all the way up to Abominable. Here, once again, the game uses the first climb as an introduction. The climb is done with the help of an NPC we talked with a couple of times during previous climbs, who encourages
          and helps us along the way. This first peak works as an introduction for the future; it is longer than all our previous climbs but not by much. For comparison, the highest peak in the fundamentals is Ugsome Storr with a height of
          82.85m, while this one stands at 96.59m.
        </Paragraph>
        <ImageWithAlt src="https://i.imgur.com/YyZzoQ6.jpeg" alt="Advanced peaks introduction" />
        <Paragraph>
          After this first peak, the height increases drastically, with the following being 166.34m, 234.41m, 388.15m, and the last one, Ymir's Shadow, standing at a staggering 543.83m. The obstacles used in all the advanced peaks are the
          same we've been dealing with since the start, and these climbs don't have any other special obstacles. They are a test for the player to see if they've learned. They also become a game of managing resources; now, what previously
          felt like more than enough ropes become just enough, and it's up to the player to manage what obstacles they feel they need a safety net for.
        </Paragraph>
        <ImageWithAlt src="https://i.imgur.com/dIbJTAe.png" alt="Ymir's shadow from the distance" />
        <Paragraph>
          What was once a game of having a good run on a mountain becomes a game of endurance. It's not enough to be pretty consistent; you need to be sure of the steps you are taking. Climbs up these peaks can take up to 40 minutes or an
          hour, and failing a single jump without a rope means starting all over again.
        </Paragraph>
        <Paragraph>
          These climbs are some of the most challenging yet most engaging parts of the game. It is frustrating to lose a run after spending over half an hour getting somewhere, but at the same time, you know you are prepared for it. Each
          run up the mountain becomes more familiar; you stop using ropes in places you once did, leaving you more for later, and reaching the top of these is exhilarating.
        </Paragraph>
        <ImageWithAlt src="https://i.imgur.com/PFxIu6V.jpeg" alt="The top of Ymir's shadow" />

        <Paragraph>So that's it, right? We conquered Ymir's Shadow, over 500 meters of climbing across some of the hardest obstacles. We beat the peakbagging challenge, time to move on, right?</Paragraph>
        <ImageWithAlt src="https://i.imgur.com/FsIpYck.png" alt="Peakbagging challenge finale" />
        <Paragraph>
          If you scrolled past this part already or are keeping eye on your scrollbar you might notice that the article does not in fact end here. Anders Grube Jensen, the developer of Peaks of Yore, added a small free expansion for those
          who completed the main game.
        </Paragraph>
      </Section>
      <Section>
        <SectionTitle>Expert Peaks</SectionTitle>
        <Paragraph>
          The expert book is given to you when you finish the "base" game. They are a bit of extra content added by the developers as a thank you to the community. You take an air balloon to the yet unexplored regions, and these are the
          expert peaks, instead of conquering known routes as before, we venture into the unknown, into the Great Northen Range. The only difficulty in this book is unconquered we no longer stamp completed climbs, we place a flag on the top
          of it, we conquer them, it's time to prove ourselved not as simply climbers but as mountaineers.
          <ImageWithAlt src="https://i.imgur.com/BYQBlst.jpeg" alt="Expert peaks difficulty" />
        </Paragraph>
        <Paragraph>
          I have to admit, I wanted to talk about this game for a long time. I think the difficulty curve is amazing, how it works on a small set of mechanics, and how it brings such a sense of accomplishment upon completion. But one thing
          was holding me back: until I started writing this, I never tackled the expert peaks. The sheer monstrosity that the first of the two implied made me try it a couple of times and fail miserably. I put the game aside and went on
          with my life. Peaks of Yore was always in the back of my mind during that time, and after a couple of months, when I saw the announcement for the Alps DLC, I had to come back.
        </Paragraph>
        <Paragraph>
          I overcame The Great Bulwark, a 2,261.00m climb, just the other day. I played through all other peaks as I was writing this article as a sort of refreshment, but nothing came even close to this last book. In sheer scale, each of
          these climbs is as big as all the ones that came before it together. Yes, that also goes for the last peak, The Solemn Tempest, which is taller than the entire base game plus The Great Bulwark.
        </Paragraph>
        <Paragraph>
          Here, a new mechanic is also introduced: Ice Picks. With these, we can climb upon ice surfaces but not regular holds. This effectively means that during the entire climb, you are switching to and from your hands and ice picks,
          even doing so mid-jump.
        </Paragraph>
        <Paragraph>
          The Solemn Tempest is the last climb of the game. It is an excessive 7,461.19m tall and is probably the largest mountain in all of gaming. The game gives you a bag to carry with you as a one-time-use safety location, which should
          be enough of a warning.
        </Paragraph>
      </Section>
      <Section>
        <SectionTitle>The Solemn Tempest</SectionTitle>
        <Paragraph>
          The Solemn Tempest stands as the ultimate challenge in Peaks of Yore, a monumental climb that dwarfs all others. Since completing The Great Bulwark, I've spent over a month steadily working at this peak. The climb itself takes
          about 4-5 hours, often split into two sessions, thanks to the bivouac that provides a much-needed respite.
        </Paragraph>
        <Paragraph>
          Each fall on The Solemn Tempest is a lesson, teaching you more about the climb and your own limits. Every attempt sees you reaching higher, using fewer ropes, and becoming more efficient in your movements. The climb demands not
          just physical skill but mental endurance, as you learn to manage resources and plan each move with precision.
        </Paragraph>
        <Paragraph>
          Overconfidence becomes your greatest enemy on this climb. The temptation to push forward without caution can lead to devastating setbacks. Failing a jump here doesn't just mean a minor inconvenience; it can set you back hours,
          forcing you to retrace your steps and rethink your strategy.
        </Paragraph>
        <Paragraph>
          Yet, with each setback comes growth. The climb becomes a journey of self-discovery, where persistence and patience are rewarded. The satisfaction of reaching new heights, knowing you've learned from every previous fall, is
          unparalleled. The Solemn Tempest is not just a test of skill but a testament to the resilience and determination of every climber who dares to face it.
        </Paragraph>
        <ImageWithAlt src="https://i.imgur.com/iLLhje0.jpeg" alt="The sights from the top of The Solemn Tempest" />
        <Paragraph>
          Reaching the summit of The Solemn Tempest is a breathtaking experience, both literally and figuratively. The feeling of overcoming such a challenge is indescribable. It's a testaments to the developers that managed to create such
          an experience that presents both the challenges and the tools in such a way as to let players find the solution themselves. The game never gets easier, you as a player become better and the game constantly challenges you to be
          better.
        </Paragraph>
        <Paragraph>With that, I'll leave you with some quotes from the game that I think provide a good summary of the experience.</Paragraph>
        <Paragraph>
          <Quote>The true mountaineer is a wanderer ... who loves to be where no human being has been before. - ALBERT FREDERICK MUMMERY</Quote>
          <Quote>The summit is just a halfway point. - ED VIESTURS</Quote>
          <Quote>Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time. - THOMAS EDISON</Quote>
          <Quote>Better we raise our skill than lower the climb. - ROYAL ROBBINS</Quote>
          <Quote>Mountains are not fair or unfair, they are just dangerous. - REINHOLD MESSNER</Quote>
          <Quote>The best view comes after the hardest climb. - UNKNOWN</Quote>
          <Quote>The mountains have rules. They are harsh rules, but they are there, and if you keep to them you are safe. - WALTER BONATTI</Quote>
          <Quote>Mountains have a way of dealing with overconfidence. - HERMANN BUHL</Quote>
        </Paragraph>
      </Section>
      <Section>
        <SectionTitle>Conclusion</SectionTitle>
        <Paragraph>
          Peaks of Yore is a game that I think is a great example of how to handle difficulty in a game. It's not just about making the game harder, but about teaching the player and presenting them with tools to overcome the challenges.
          The difficulty never stops, and the game never stops teaching, always pushing the player to be better. If at any point of this article any of this resonated with you, I can't recommend this game enough. It's one of the biggest
          surprises I've had in a long time when searching for a new game to play and I'll dive into the Alps DLC now that it's out. Oh wait and I didn't event mention the <b>You fall you die</b> mode or <b>Free Solo</b> which doesn't allow
          the use of any equipment. Yeah, I think I'll be playing this game for a while more.
        </Paragraph>
      </Section>
    </>
  );
}
