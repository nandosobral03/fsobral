"use client";

import SectionTitle from "@/components/common/section-title";
import Image from "next/image";
import SectionDescription from "../common/section-description";
import { motion } from "motion/react";
import { useState } from "react";

export default function ContactMe() {
  return (
    <section className="flex flex-col gap-8 w-full" id="contact">
      <div className="p-6 flex flex-col gap-4">
        <SectionTitle>Contact Me</SectionTitle>
        <SectionDescription>If you have any questions or just want to say hi, feel free to contact me, it's always nice to hear from strangers on the internet.</SectionDescription>
      </div>
      <div className="w-full items-center justify-center flex flex-col md:flex-row gap-8 mb-20 px-6">
        <ContactCard href="mailto:nandosobral03@gmail.com" icon="/icons/email.png" label="Email" delay={0} />
        <ContactCard href="https://www.linkedin.com/in/fernando-sobral-2b100621b/" icon="/icons/linkedin.png" label="LinkedIn" delay={0.1} />
        <ContactCard href="https://www.github.com/nandosobral03" icon="/icons/github.png" label="Github" delay={0.2} />
      </div>
    </section>
  );
}

function ContactCard({ href, icon, label, delay }: { href: string; icon: string; label: string; delay: number }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.a
      href={href}
      className="group w-full md:w-[300px] py-16 border-[3px] border-foreground flex flex-col items-center justify-center text-sm gap-3 transition-all duration-300 relative overflow-hidden accent-corner"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div className="absolute inset-0 bg-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: "spring", stiffness: 300 }}>
        <Image src={icon} alt={label} width={32} height={32} className="group-hover:invert transition-all duration-300" />
      </motion.div>
      <span className="font-condensed font-bold uppercase tracking-wider text-base relative group-hover:text-background">
        {label}
        <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-background transition-all duration-300 group-hover:w-full" />
      </span>
    </motion.a>
  );
}
