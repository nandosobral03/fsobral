const TLDR = ({ children, customTitle }: { children: React.ReactNode; customTitle?: string }) => (
  <div className="bg-foreground text-background p-4 flex flex-col gap-2 w-full">
    <span className="text-balance text-start font-bold font-condensed">{customTitle ?? "TL;DR"}</span>
    <div className="text-base text-justify">{children}</div>
  </div>
);

export default TLDR;
