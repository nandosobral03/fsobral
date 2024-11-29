export default function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl md:text-4xl font-semibold font-condensed uppercase">{children}</h2>;
}
