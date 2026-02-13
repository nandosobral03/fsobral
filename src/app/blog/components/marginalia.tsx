"use client";

import Link from "next/link";
import { marginaliaPosts, MarginaliaPost } from "@/app/marginalia/posts";
import Tag from "@/components/common/tag";
import { motion } from "motion/react";

function MarginaliaCard({ post, index }: { post: MarginaliaPost; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: (index % 2) * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link href={`/marginalia/${post.slug}`} className="block bg-foreground text-background hover:border-accent group overflow-hidden relative">
        <div className="p-8 transition-all duration-300">
          <h3 className="text-2xl font-bold uppercase font-condensed mb-2 text-background">{post.title}</h3>
          <p className="text-background/60 mb-3 font-serif">{post.description}</p>
          <p className="meta-label text-accent">{post.date}</p>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((t) => (
                <Tag key={t} interactive>
                  {t}
                </Tag>
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

export default function MarginaliaList() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {marginaliaPosts.map((post, index) => (
        <MarginaliaCard key={post.slug} post={post} index={index} />
      ))}
    </div>
  );
}
