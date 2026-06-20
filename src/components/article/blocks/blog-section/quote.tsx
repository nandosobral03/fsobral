import HoverableLink from "../hoverable-link";

const SectionQuote = ({
  children,
  from,
}: {
  children: React.ReactNode;
  from?: {
    title: string;
    link: string;
  };
}) => (
  <blockquote className="my-[var(--lh)] border-l-2 border-accent bg-foreground px-[var(--lh)] py-[calc(var(--lh)*0.75)] text-background">
    <div className="editorial-copy italic text-background/90">{children}</div>
    {from && (
      <div className="mt-[var(--bl)] text-right meta-label text-background/45">
        - <HoverableLink href={from.link}>{from.title}</HoverableLink>
      </div>
    )}
  </blockquote>
);

export default SectionQuote;
