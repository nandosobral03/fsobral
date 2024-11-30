import Divider from "@/components/common/divider";
import LargeTitle from "@/components/common/large-title";
import { posts } from "./posts";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <LargeTitle alt="IPSUM">BLOG</LargeTitle>
      <Divider />
      {posts.map((post) => (
        <Link href={`/blog/${post.slug}`} key={post.slug}>
          {post.title}
        </Link>
      ))}
      <Divider />
    </>
  );
}
