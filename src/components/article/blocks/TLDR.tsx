const TLDR = ({ children, customTitle }: { children: React.ReactNode; customTitle?: string }) => (
  <div className="editorial-callout flex w-full flex-col gap-[var(--bl)]">
    <span className="meta-label text-accent">{customTitle ?? "TL;DR"}</span>
    <div className="editorial-copy text-background/90">{children}</div>
  </div>
);

export default TLDR;
