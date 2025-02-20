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
  <blockquote className="text-justify p-4 italic text-background bg-foreground my-4">
    {children}
    {from && (
      <div className="text-right">
        <br />- <HoverableLink href={from.link}>{from.title}</HoverableLink>
      </div>
    )}
  </blockquote>
);

export default SectionQuote;
