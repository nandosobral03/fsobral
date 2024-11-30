const HoverableLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} className="hover:underline text-accent">
    {children}
  </a>
);

export default HoverableLink;
