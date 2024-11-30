const TLDR = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-foreground text-background p-4 flex flex-col gap-2">
    <span className="text-balance text-start font-bold font-condensed">TL;DR</span>
    <div className="text-base text-justify">{children}</div>
  </div>
);

export default TLDR;
