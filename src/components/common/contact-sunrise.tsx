import Image from "next/image";

export default function ContactSunrise() {
  return (
    <figure
      className="relative my-[var(--lh)] aspect-[2/1] w-full overflow-hidden"
    >
      <Image
        src="/images/impression-sunrise-dither.png"
        alt="Dithered harbor scene with white boats and an orange sun"
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
    </figure>
  );
}
