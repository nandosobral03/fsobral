import { Codeblock, ImageWithAlt, List, ListTitle, Paragraph, Quote, Section, SectionTitle } from "@/app/blog/components/blog-section";
import HoverableLink from "@/app/blog/components/hoverable-link";
import TLDR from "@/app/blog/components/TLDR";

export default function Spring84() {
  return (
    <>
      <TLDR>
        Spring '84 is my follow-up to Robin Sloan's Spring '83, and to my own implementation of it. I liked that project too much to leave it alone, so this became an excuse to write my own small successor protocol: same general spirit,
        but with more room for visual boards, linked identities, and a client that feels much closer to what I originally had in mind.
      </TLDR>

      <Section>
        <SectionTitle>Preface</SectionTitle>
        <Paragraph>
          A while ago I built{" "}
          <HoverableLink href="/projects/spring'83">
            my implementation of Spring '83
          </HoverableLink>
          , Robin Sloan's small protocol for signed web boards. It was one of those projects that I kept thinking about after I had already crossed it off the list, which for me is usually a sign that there was something there.
        </Paragraph>
        <Paragraph>
          I liked Spring '83 as an idea, but I also liked my own implementation of it in a very specific "this could be so much better if I made it now" way. The original project proved I could get the protocol working. It did not really
          prove that I could make the experience feel like what I wanted it to feel like.
        </Paragraph>
        <Paragraph>
          Robin's post is framed as a provocation, but that is not really the position I am writing from. I am not trying to convince anyone that the web needs this exact thing. This is more of a follow-up to a project I loved, done in the
          same spirit: take the idea seriously, specify it carefully, then see what happens when the constraints are slightly different.
        </Paragraph>
        <Quote>Spring '84 is not a replacement for Spring '83. It is more like me answering it a year later.</Quote>
      </Section>

      <Section>
        <SectionTitle>What Stuck From Spring '83</SectionTitle>
        <Paragraph>
          The thing I liked most about Spring '83 was how opinionated it was for something so small. A board was tiny. A key expired. There was no account system, no feed, no notifications, no sense that the protocol was secretly waiting
          to become a social network with enough engineering effort.
        </Paragraph>
        <Paragraph>
          It also had a very strong visual metaphor. The board rack idea is great because it makes the lack of a feed feel intentional. You are not opening an inbox. You are not checking what the algorithm decided you should see. You are
          walking up to a wall of little things and looking around.
        </Paragraph>
        <Paragraph>
          That part I wanted to keep. One key, one board. Pull-only. No tracking. Boards that expire. No infinite historical profile. The stuff that makes it feel a bit temporary and handmade.
        </Paragraph>
        <Paragraph>
          What I wanted to change was mostly everything around expression and connection. Spring '83's size limit was useful, but after building with it I felt like I was constantly fighting for a few extra bytes. Text fit. Some clever CSS
          fit. The kind of tiny visual artifact I had in my head did not really fit.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>The Board</SectionTitle>
        <Paragraph>
          A Spring '84 board is still just an HTML fragment. Not a page, not an app, not a profile. It is signed by a key, sent to a server, and rendered by a client that has to verify it first.
        </Paragraph>
        <Codeblock language="html">{`<article>
  <time datetime="2026-03-30T14:22:00Z">March 30, 2026</time>
  <h1>Hello, Spring '84</h1>
  <p>A small signed board, present for now.</p>
</article>`}</Codeblock>
        <Paragraph>
          The board limit is now 19,840 bytes. That is still basically nothing by normal web standards, but it changes the feeling a lot. You can fit an image. You can add a real layout. You can make a little poster or a card or a weird
          classified ad without immediately turning the whole exercise into byte golf.
        </Paragraph>
        <Paragraph>
          I think this is where the seed boards finally started to look like what I wanted from the first version. Spring '83 was great at forcing smallness, but the board size made visual texture really hard. With Spring '84 there is still
          pressure, but there is enough space for the boards to have a little personality.
        </Paragraph>
        <ImageWithAlt src="/projects/spring84/rack-dark.png" alt="Spring '84 dark rack with editorial board cards">
          These are much closer to what I had in mind when I first got excited about tiny web boards.
        </ImageWithAlt>
      </Section>

      <Section>
        <SectionTitle>Keys</SectionTitle>
        <Paragraph>
          Spring '84 identities are Ed25519 keys. The public key has to end in <code>84eMMYY</code>, where the month and year encode when the key expires. That means generating a key is a small grind. You keep making keypairs until one
          happens to end with the right pattern.
        </Paragraph>
        <Paragraph>
          I like this because it makes identity feel less free in a good way. It is not expensive enough to be a serious barrier, but it does ask for some commitment. Also, from a project perspective, it gave me a very fun excuse to mess
          with key generation again.
        </Paragraph>
        <Paragraph>
          I optimized my old keygen and modified a CUDA hash generator to grind harder Spring '84 keys. The best one I got was:
        </Paragraph>
        <Codeblock language="text">{`0000c3c690ca08fd6f071cfd6fb587efc10c9d5a81f1c7ce7c901066b84e1126`}</Codeblock>
        <Paragraph>
          This is one of those details that makes the protocol feel more real to me. It is easy to write "keys must match this pattern" in a spec. It is more fun to actually make the machine sit there and find one.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>Linked Boards</SectionTitle>
        <Paragraph>
          Spring '83 has this very nice "one board per person" ideal. I like it. I also think it is obviously impossible to enforce, because anyone can generate more keys. So instead of pretending that is not true, Spring '84 makes linked
          boards an explicit part of the protocol.
        </Paragraph>
        <Paragraph>
          The version I landed on is reciprocal. If board A wants to link itself to board B, both boards need to contain a signed declaration. One side cannot just claim the other. If either side removes the declaration, the link is gone.
        </Paragraph>
        <Codeblock language="html">{`<spring-84-link
  key="the_other_board_public_key"
  sig="signature_from_the_other_private_key"
/>`}</Codeblock>
        <Paragraph>
          I like this because it keeps the meaning loose. A linked board could be a project, a public identity, a pseudonym, a temporary thing, whatever. The protocol does not need to know. It only needs to prove that both boards agreed to
          be seen together.
        </Paragraph>
        <ImageWithAlt src="/projects/spring84/constellation-modal.png" alt="Spring '84 constellation modal showing linked boards side by side">
          In the client, linked boards become little constellations instead of profile fields.
        </ImageWithAlt>
      </Section>

      <Section>
        <SectionTitle>The Server Rules</SectionTitle>
        <Paragraph>
          One of the parts I wanted to be clear about in the spec was what a server has to do versus what a server is allowed to decide for itself. I do not want every Spring '84 server to feel the same. I do want every Spring '84 server to
          agree on what a valid board is.
        </Paragraph>
        <ListTitle>A compliant server needs to:</ListTitle>
        <List type="disc">
          <span>Accept boards with <code>PUT /board/&lt;key&gt;</code> and serve them with <code>GET /board/&lt;key&gt;</code>.</span>
          <span>Require the <code>Spring-84-Version</code> and <code>Spring-84-Signature</code> headers when publishing.</span>
          <span>Verify the signature against the request body and the public key in the URL.</span>
          <span>Reject malformed keys, expired keys, and keys that are not valid yet.</span>
          <span>Reject boards over 19,840 bytes.</span>
          <span>Require exactly one UTC <code>&lt;time&gt;</code> element.</span>
          <span>Reject unsafe HTML, CSS, images, attributes, scripts, forms, external links, and network-loaded resources.</span>
          <span>Make sure a new publish does not move a board backwards in time.</span>
          <span>Stop serving expired boards.</span>
          <span>Expose the current live keys through <code>GET /keys</code>.</span>
        </List>
        <Paragraph>
          That is the boring part, and it should be boring. If a server says it speaks Spring '84, a client should be able to trust those basics.
        </Paragraph>
        <ListTitle>After that, the server can have taste:</ListTitle>
        <List type="disc">
          <span>Require extra proof of work.</span>
          <span>Rate-limit how often a key can publish.</span>
          <span>Delete expired boards immediately, or keep them internally while refusing to serve them.</span>
          <span>Refuse boards for moderation or hosting reasons.</span>
          <span>Run invite-only with an allowlist of keys.</span>
          <span>Use linked boards as introductions into an allowlist.</span>
          <span>Aggregate boards from other servers.</span>
        </List>
        <Paragraph>
          I think this split is important. The protocol defines validity. The server operator defines the room.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>The Client</SectionTitle>
        <Paragraph>
          This is where I think the project improved the most compared to my Spring '83 implementation. The first version worked, but it looked and felt like a project whose main goal was proving the protocol could run. Spring '84 feels
          much closer to an actual place.
        </Paragraph>
        <Paragraph>
          The client is a rack. It fetches the keys, fetches the boards, verifies them, shuffles them once for the session, and puts them on screen as fixed-size cards. No likes, no follow button, no ranking. You just look at what is
          currently there.
        </Paragraph>
        <Paragraph>
          I spent a surprising amount of time on the visual language: the dark shell, the warm paper, the red marks, the texture, the seed boards, the publish modal, the constellation modal. That was not separate from the protocol work. For
          a project like this, the client is what teaches the protocol's values.
        </Paragraph>
        <ImageWithAlt src="/projects/spring84/publish-editor.png" alt="Spring '84 publish modal with HTML editor and live board preview">
          The publisher being part of the same app also helped. It made the whole loop feel less abstract.
        </ImageWithAlt>
      </Section>

      <Section>
        <SectionTitle>Transmission</SectionTitle>
        <Paragraph>
          The wire protocol is intentionally plain. Publishing is a <code>PUT</code>. Reading is a <code>GET</code>. The server validates and stores. The client verifies and renders.
        </Paragraph>
        <Codeblock language="http">{`PUT /board/<key> HTTP/1.1
Spring-84-Version: 1
Spring-84-Signature: <hex signature>
Content-Type: text/html

<board HTML>`}</Codeblock>
        <Paragraph>
          Boards are rendered in a sandboxed frame. They cannot run scripts, submit forms, load remote assets, or phone home. If a board links somewhere, it links to another Spring '84 board through a <code>spring84://</code> URI.
        </Paragraph>
        <Codeblock language="text">{`spring84://<key>
spring84://<key>?relay=boards.example.com`}</Codeblock>
        <Paragraph>
          The relay hint is there for convenience. It tells the client where it might try looking, but it does not become the identity. The key is still the identity.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>What I Changed</SectionTitle>
        <Paragraph>
          The short version is that Spring '84 is more permissive where I felt Spring '83 was too tight, and stricter where I wanted the safety story to be clearer.
        </Paragraph>
        <Paragraph>
          Bigger boards. Embedded images. A larger HTML allowlist. A Spring-specific link scheme. Mutual board links. Relay hints. A cleaner distinction between server responsibilities and client responsibilities. A reference client that
          actually feels like the metaphor it is using.
        </Paragraph>
        <Paragraph>
          It is still constrained though. You cannot turn a board into a normal webpage. You cannot load a random script. You cannot outsource attention to the rest of the internet from inside the board. It is a tiny rectangle, and you have
          to decide what belongs in it.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>Invitation</SectionTitle>
        <Paragraph>
          I do not know if Spring '84 is a good protocol in any serious standard-body sense. I know I liked specifying it. I liked taking an idea I already loved and asking how I would move it forward now. That was enough of a reason to
          make it.
        </Paragraph>
        <Paragraph>
          The full project is on{" "}
          <HoverableLink href="https://github.com/nandosobral03/spring84">GitHub</HoverableLink>. I also wrote the compact spec as{" "}
          <HoverableLink href="/marginalia/spring84-spec">marginalia</HoverableLink>, and there is a normal project writeup at{" "}
          <HoverableLink href="/projects/spring'84">/projects/spring'84</HoverableLink>. The spec itself feels like it should live somewhere a little less formal than a normal project page.
        </Paragraph>
      </Section>
    </>
  );
}
