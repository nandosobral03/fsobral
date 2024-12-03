import Divider from "@/components/common/divider";
import LargeTitle from "@/components/common/large-title";
import { posts, type Post } from "./posts";
import { BlogPost } from "./components/blog-post";

export default function Home() {
  return (
    <>
      <LargeTitle alt="IPSUM">BLOG</LargeTitle>
      <Divider className="my-4" />
      <div className="mx-4 flex flex-col gap-4">
        {posts.map((post, index) => (
          <BlogPost post={post} align={index % 2 === 0 ? "left" : "right"} key={post.slug} />
        ))}
      </div>
      <Divider />
    </>
  );
}
