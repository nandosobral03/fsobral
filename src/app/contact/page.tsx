import type { Metadata } from "next";
import ContactMe from "@/components/sections/contact-me";

export const metadata: Metadata = {
  title: "Contact",
  description: "Email, LinkedIn, and GitHub links for Fernando Sobral in Montevideo, Uruguay.",
};

export default function ContactPage() {
  return (
    <main>
      <ContactMe standalone />
    </main>
  );
}
