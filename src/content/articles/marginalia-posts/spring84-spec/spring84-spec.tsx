import HoverableLink from "@/components/article/blocks/hoverable-link";

const serverChecks = [
  ["Key format", "Key matches 84eMMYY.", "403 Forbidden"],
  ["Key expiration", "Key has not expired.", "403 Forbidden"],
  ["Key validity", "Key is inside its two-year validity window.", "403 Forbidden"],
  ["Signature", "Signature verifies for this key and exact body.", "401 Unauthorized"],
  ["Body size", "Body is at most 19,840 bytes.", "413 Content Too Large"],
  ["Time element", "Body contains exactly one parseable UTC time element.", "400 Bad Request"],
  ["Future timestamp", "Timestamp is no more than five minutes in the future.", "400 Bad Request"],
  ["Monotonicity", "Timestamp is not older than the stored board for this key.", "409 Conflict"],
  ["Board age", "Board is not older than 60 days.", "400 Bad Request"],
  ["Board safety", "HTML, CSS, links, attributes, and embedded images are allowed.", "400 Bad Request"],
];

function SpecSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-foreground/20 pt-7">
      <h2 className="mb-4 font-mono text-xl font-bold uppercase tracking-tight text-foreground md:text-2xl">
        {id}. {title}
      </h2>
      <div className="space-y-4 font-mono text-[0.95rem] leading-7 text-foreground">
        {children}
      </div>
    </section>
  );
}

function Subheading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="pt-2 font-mono text-base font-bold uppercase tracking-[0.08em] text-accent">
      {children}
    </h3>
  );
}

function Pre({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto border border-foreground/30 bg-foreground px-4 py-3 font-mono text-sm leading-6 text-background">
      <code>{children}</code>
    </pre>
  );
}

function SpecList({ children }: { children: React.ReactNode }) {
  return (
    <ul className="space-y-2 pl-0">
      {children}
    </ul>
  );
}

function SpecItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="grid grid-cols-[1.25rem_1fr] gap-2">
      <span className="font-bold text-accent">-</span>
      <span>{children}</span>
    </li>
  );
}

function Requirement({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-4 border-accent bg-foreground/5 px-4 py-3 font-mono text-sm uppercase leading-6 tracking-[0.04em]">
      {children}
    </div>
  );
}

export default function Spring84Spec() {
  return (
    <article className="mx-auto max-w-5xl space-y-8 font-mono">
      <header className="border-y border-foreground/30 py-5 text-sm uppercase tracking-[0.08em]">
        <div className="grid gap-2 md:grid-cols-[1fr_auto]">
          <div>
            <div>Spring '84</div>
            <div>Request For Friendly Critique And Comment</div>
          </div>
          <div className="md:text-right">
            <div>Draft 2026-03-30</div>
            <div>Version 1</div>
          </div>
        </div>
      </header>

      <section className="space-y-4">
        <h1 className="font-mono text-3xl font-bold uppercase tracking-tight md:text-5xl">
          Spring '84 Specification
        </h1>
        <p className="font-mono text-base leading-7">
          This document specifies Spring '84, a protocol for the exchange and display of small, expressive, self-certifying web boards.
        </p>
        <p className="font-mono text-base leading-7">
          Spring '84 builds on Robin Sloan's{" "}
          <HoverableLink href="https://www.robinsloan.com/lab/specifying-spring-83">
            Spring '83
          </HoverableLink>
          . It inherits one board per person, no algorithms, no tracking, pull-only reading, and the rack metaphor, then adds the connective tissue required for boards to link, expire, move between servers, and still feel self-contained.
        </p>
        <p className="font-mono text-base leading-7">
          The working specification, validator, and implementation live in the{" "}
          <HoverableLink href="https://github.com/nandosobral03/spring84">
            Spring '84 repository
          </HoverableLink>
          .
        </p>
      </section>

      <SpecSection id="1" title="Overview">
        <p>Spring '84 has two roles: servers and clients.</p>
        <Requirement>A server accepts boards, validates them, stores them, and serves them. A server MUST NOT render boards.</Requirement>
        <Requirement>A client fetches boards, verifies signatures, sanitizes content, and renders boards for a human. A client MUST NOT store authoritatively.</Requirement>
        <p>
          A board is a small HTML fragment signed with an Ed25519 key that encodes its own expiration date. One key publishes one board. A newer valid board replaces the old board for that key.
        </p>
      </SpecSection>

      <SpecSection id="2" title="Keys">
        <p>A Spring '84 identity is an Ed25519 keypair. The public key MUST be expressed as 64 lowercase hexadecimal characters.</p>
        <p>
          The final seven characters MUST match <code>84eMMYY</code>, where <code>84e</code> identifies the protocol family, <code>MM</code> is the expiration month, and <code>YY</code> is the expiration year.
        </p>
        <Pre>{`0000c3c690ca08fd6f071cfd6fb587efc10c9d5a81f1c7ce7c901066b84e1126`}</Pre>
        <p>
          A key is valid for exactly two years preceding its expiration date. A key ending in <code>84e0328</code> becomes valid on April 1, 2026 and expires at 23:59:59 UTC on March 31, 2028.
        </p>
        <Requirement>Servers MUST reject boards signed with keys that are not yet valid or have expired.</Requirement>
        <p>
          There is no built-in succession mechanism. If continuity is desired, the publisher must generate a new key before the old one expires and use linked keys during the overlap period.
        </p>
      </SpecSection>

      <SpecSection id="3" title="Boards">
        <p>
          A board is an HTML fragment. It MUST NOT include a doctype, <code>&lt;html&gt;</code>, <code>&lt;head&gt;</code>, or a full document wrapper.
        </p>
        <Requirement>Every board MUST contain exactly one UTC ISO 8601 time element.</Requirement>
        <Pre>{`<time datetime="2026-03-30T14:22:00Z">March 30, 2026</time>`}</Pre>
        <Requirement>The board body MUST NOT exceed 19,840 bytes.</Requirement>
        <Subheading>Allowed Elements</Subheading>
        <Pre>{`<div>, <span>, <p>, <br>, <h1> ... <h6>, <em>, <strong>,
<a>, <img>, <ul>, <ol>, <li>, <blockquote>, <pre>, <code>,
<style>, <hr>, <figure>, <figcaption>, <section>, <article>,
<header>, <footer>, <time>, <mark>, <del>, <ins>, <sub>, <sup>,
<details>, <summary>, <spring-84-link>`}</Pre>
        <Subheading>Allowed Attributes</Subheading>
        <SpecList>
          <SpecItem><code>class</code>, <code>id</code>, <code>style</code>, <code>title</code>, <code>lang</code>, and <code>dir</code> on any allowed element.</SpecItem>
          <SpecItem><code>href</code> on <code>&lt;a&gt;</code>, constrained to the <code>spring84://</code> scheme.</SpecItem>
          <SpecItem><code>src</code>, <code>alt</code>, <code>width</code>, and <code>height</code> on <code>&lt;img&gt;</code>. Image sources MUST be data URIs.</SpecItem>
          <SpecItem><code>datetime</code> on <code>&lt;time&gt;</code>.</SpecItem>
          <SpecItem><code>key</code> and <code>sig</code> on <code>&lt;spring-84-link&gt;</code>.</SpecItem>
        </SpecList>
        <Requirement>CSS MUST NOT include @import, url(), or expression().</Requirement>
        <Requirement>Images MUST be embedded as data URIs. SVG is forbidden.</Requirement>
        <p>
          Embedded images MUST contain pixel data only. Servers MUST reject EXIF, XMP, IPTC, PNG text chunks, GIF application extensions, WebP metadata chunks, and other non-rendering metadata.
        </p>
        <Requirement>A board expires 60 days after its timestamp. Servers MUST NOT serve expired boards. Clients MUST NOT render expired boards.</Requirement>
      </SpecSection>

      <SpecSection id="4" title="Wire Protocol">
        <p>Spring '84 uses three HTTP endpoints.</p>
        <Subheading>4.1 Publishing</Subheading>
        <Pre>{`PUT /board/<key> HTTP/1.1
Spring-84-Version: 1
Spring-84-Signature: <hex-encoded Ed25519 signature>
Content-Type: text/html;charset=utf-8

<board HTML>`}</Pre>
        <p>
          The key in the URL is the publisher's public key. The signature header contains an Ed25519 signature over the exact request body.
        </p>
        <div className="overflow-x-auto border border-foreground/30">
          <table className="w-full border-collapse text-left font-mono text-sm">
            <thead className="bg-foreground text-background">
              <tr>
                <th className="border-r border-background/25 px-3 py-2">Check</th>
                <th className="border-r border-background/25 px-3 py-2">Requirement</th>
                <th className="px-3 py-2">Failure</th>
              </tr>
            </thead>
            <tbody>
              {serverChecks.map(([check, requirement, failure]) => (
                <tr key={check} className="border-t border-foreground/20">
                  <td className="border-r border-foreground/20 px-3 py-2 font-bold">{check}</td>
                  <td className="border-r border-foreground/20 px-3 py-2">{requirement}</td>
                  <td className="px-3 py-2">{failure}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>If all checks pass, the server stores the board and responds with 200 OK. The timestamp check provides monotonic freshness and replay protection.</p>

        <Subheading>4.2 Retrieving</Subheading>
        <Pre>{`GET /board/<key> HTTP/1.1

HTTP/1.1 200 OK
Spring-84-Signature: <hex-encoded Ed25519 signature>
Content-Type: text/html;charset=utf-8
Last-Modified: Sun, 30 Mar 2026 14:22:00 GMT

<board HTML>`}</Pre>
        <Requirement>Clients MUST verify the signature before rendering. If verification fails, the board MUST be discarded.</Requirement>
        <p>Servers MUST support conditional requests with <code>If-Modified-Since</code> and return 304 Not Modified when the stored board is not newer.</p>
        <p>Missing and expired boards both return 404 Not Found.</p>

        <Subheading>4.3 Listing</Subheading>
        <Pre>{`GET /keys?limit=100&after=<cursor> HTTP/1.1

HTTP/1.1 200 OK
Content-Type: application/json
Spring-84-More: true

["ab12cd34...ef56", "cd56ef78...1234"]`}</Pre>
        <p>
          GET /keys returns 64-character public keys with non-expired boards in lexicographic order. <code>limit</code> defaults to 100 and MUST NOT exceed 1000. <code>after</code> is the last key from the previous page.
        </p>
      </SpecSection>

      <SpecSection id="5" title="Multi-Server Architecture">
        <p>Spring '84 assumes multiple independent servers. There is no central server, canonical instance, relay-to-relay synchronization, or authoritative host for a key.</p>
        <SpecList>
          <SpecItem>Publishers MAY push the same signed board to multiple servers.</SpecItem>
          <SpecItem>Clients MAY pull from multiple servers and use the newest valid board for a key.</SpecItem>
          <SpecItem>Servers MAY aggregate boards from other servers. A board remains valid regardless of where it was retrieved from.</SpecItem>
        </SpecList>
      </SpecSection>

      <SpecSection id="6" title="Board URIs">
        <Pre>{`spring84://<key>
spring84://<key>?relay=boards.example.com`}</Pre>
        <p>The optional relay query parameter is a discovery hint. Clients MAY use it, MAY ignore it, and MUST NOT treat it as authoritative.</p>
      </SpecSection>

      <SpecSection id="7" title="Linked Keys">
        <p>A link is active only when both boards contain reciprocal declarations, both signatures verify, and both keys are within their valid period.</p>
        <Pre>{`<spring-84-link key="<key_b_hex>" sig="<key_b_signature>" />`}</Pre>
        <p>The signature is over the canonical link string:</p>
        <Pre>{`LINK:<lower_key>:<higher_key>`}</Pre>
        <Requirement>Clients MUST NOT render spring-84-link elements. They are metadata.</Requirement>
        <p>Servers do not parse, validate, or act on linked-key declarations beyond normal HTML allowlist validation.</p>
      </SpecSection>

      <SpecSection id="8" title="Client Security">
        <Requirement>A board, once rendered, cannot phone home, execute code, or reach beyond its own rectangle.</Requirement>
        <SpecList>
          <SpecItem>Render boards with CSP: <code>default-src 'none'; style-src 'unsafe-inline'; img-src data:;</code></SpecItem>
          <SpecItem>Render boards in a sandboxed iframe or equivalent isolation mechanism with no permissions granted.</SpecItem>
          <SpecItem>Verify <code>Spring-84-Signature</code> against the board body and URL key before rendering.</SpecItem>
          <SpecItem>Independently sanitize HTML before rendering, even if the server already validated it.</SpecItem>
          <SpecItem>Resolve <code>spring84://</code> links inside the client.</SpecItem>
        </SpecList>
      </SpecSection>

      <SpecSection id="9" title="Server Recommendations">
        <p>The following are MAY-level policies, not conformance requirements.</p>
        <SpecList>
          <SpecItem>Servers MAY impose extra proof-of-work requirements.</SpecItem>
          <SpecItem>Servers MAY limit how frequently a key can update its board.</SpecItem>
          <SpecItem>Servers MAY delete expired boards from storage, provided expired boards are not served.</SpecItem>
          <SpecItem>Servers MAY refuse boards for any local policy reason.</SpecItem>
          <SpecItem>Servers MAY maintain allowlists and reject all other keys.</SpecItem>
          <SpecItem>Servers MAY use mutual linked-key declarations as introductions for allowlist expansion.</SpecItem>
        </SpecList>
      </SpecSection>

      <SpecSection id="10" title="Conformance">
        <p>A Spring '84 conformance suite should include:</p>
        <SpecList>
          <SpecItem>Valid boards covering the full allowed HTML and CSS surface.</SpecItem>
          <SpecItem>Invalid boards exercising every rejection condition.</SpecItem>
          <SpecItem>Signature verification test vectors.</SpecItem>
          <SpecItem>Key format validation test vectors.</SpecItem>
          <SpecItem>Expiration and timestamp edge cases.</SpecItem>
          <SpecItem>Linked-key verification scenarios.</SpecItem>
        </SpecList>
        <Requirement>An implementation that passes the full suite may claim Spring '84 conformance.</Requirement>
        <p>
          The current validator and implementation work is maintained in the{" "}
          <HoverableLink href="https://github.com/nandosobral03/spring84">
            Spring '84 GitHub repository
          </HoverableLink>
          .
        </p>
      </SpecSection>

      <SpecSection id="11" title="Versioning">
        <p>The current Spring '84 version is 1. Publishers MUST include a Spring-84-Version header. Servers MUST reject unsupported versions with 400 Bad Request.</p>
        <p>The version number increments only for validation-affecting changes: new allowed elements, new required checks, or wire-format changes.</p>
      </SpecSection>

      <SpecSection id="12" title="References">
        <SpecList>
          <SpecItem><HoverableLink href="https://github.com/nandosobral03/spring84">Spring '84 specification, validator, and implementation</HoverableLink>.</SpecItem>
          <SpecItem><HoverableLink href="https://github.com/robinsloan/spring-83">Spring '83 specification</HoverableLink> by Robin Sloan.</SpecItem>
          <SpecItem><HoverableLink href="https://www.robinsloan.com/lab/specifying-spring-83/">Specifying Spring '83</HoverableLink> by Robin Sloan.</SpecItem>
          <SpecItem><HoverableLink href="https://datatracker.ietf.org/doc/rfc865/">RFC 865: Quote of the Day Protocol</HoverableLink> by Jon Postel.</SpecItem>
          <SpecItem><HoverableLink href="https://ed25519.cr.yp.to/">Ed25519: High-speed high-security signatures</HoverableLink> by Daniel J. Bernstein et al.</SpecItem>
        </SpecList>
      </SpecSection>
    </article>
  );
}
