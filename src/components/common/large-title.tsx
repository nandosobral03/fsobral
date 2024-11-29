export default function LargeTitle({ children }: { children: React.ReactNode }) {
  return <h1 className="text-[15vw] font-semibold font-condensed text-end leading-[0.8] select-none my-20">{children}</h1>;
}
