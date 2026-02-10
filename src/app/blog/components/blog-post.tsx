import Link from "next/link";
import type { Post } from "../posts";
import Image from "next/image";

export const BlogPost = ({ post, align }: { post: Post; align: "left" | "right" }) => {
  return (
    <Link
      href={`/blog/${post.slug}`}
      key={post.slug}
      className={`flex bg-foreground text-background group flex-col-reverse ${align === "left" ? "lg:flex-row" : "lg:flex-row-reverse"} overflow-hidden`}
    >
      <div className={`p-5 md:p-6 grow text-left ${align === "left" ? "lg:text-left" : "lg:text-right"} flex flex-col gap-2`}>
        <h3 className="font-bold font-condensed uppercase text-xl md:text-2xl text-background">{post.title}</h3>
        <p className="font-serif text-sm md:text-base leading-relaxed text-background/50">{post.description}</p>
        <p className="meta-label text-background/30 mt-1">{post.date}</p>
        {post.tags && post.tags.length > 0 && (
          <div className={`mt-auto flex flex-wrap gap-2 pt-2 justify-start ${align === "left" ? "lg:justify-start" : "lg:justify-end"}`}>
            {post.tags.map((t) => (
              <span key={t} className="meta-label text-[10px] text-background/40 border border-background/15 px-2 py-0.5">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
      {post.coverImage && (
        <div className="lg:w-[400px] lg:shrink-0 w-full h-48 lg:h-auto relative overflow-hidden">
          <Image src={post.coverImage} alt={post.title} width={1600} height={900} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
      )}
    </Link>
  );
};
