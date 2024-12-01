import Divider from "@/components/common/divider";
import LargeTitle from "@/components/common/large-title";
import { posts } from "./posts";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <LargeTitle alt="IPSUM">BLOG</LargeTitle>
      <Divider className="my-4" />
      {posts.map((post) => (
        <Link href={`/blog/${post.slug}`} key={post.slug} className="block mb-6 mx-4">
          <div className="border-[3px] border-foreground p-4  hover:bg-foreground hover:text-background transition-colors">
            <h2 className="text-2xl font-serif mb-2">{post.title}</h2>
            <p className="text-lg mb-2">{post.description}</p>
            <p className="text-sm font-condensed">{post.date}</p>
          </div>
        </Link>
      ))}
      <Divider />
    </>
  );
}
