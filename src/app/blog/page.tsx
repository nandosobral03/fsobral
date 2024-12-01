import Divider from "@/components/common/divider";
import LargeTitle from "@/components/common/large-title";
import { posts } from "./posts";
import Link from "next/link";
import SectionTitle from "@/components/common/section-title";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <LargeTitle alt="IPSUM">BLOG</LargeTitle>
      <Divider className="my-4" />
      {posts.map((post, index) => (
        <Link href={`/blog/${post.slug}`} key={post.slug} className={`mb-6 mx-4 flex md:h-[300px] grow border-[3px] border-foreground group flex-col-reverse ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
          <div className={`p-4 group-hover:bg-foreground group-hover:text-background transition-colors grow ${index % 2 === 0 ? "text-left" : "text-right"}`}>
            <SectionTitle>{post.title}</SectionTitle>
            <p className="text-lg mb-2">{post.description}</p>
            <p className="text-sm font-condensed">{post.date}</p>
          </div>
          {post.coverImage && <Image src={post.coverImage} alt={post.title} width={1600} height={900} className="md:w-auto md:h-full w-full h-auto" />}
        </Link>
      ))}
      <Divider />
    </>
  );
}
