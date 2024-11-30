import NotFound from "@/components/sections/NotFound";
import { posts } from "../posts";
import Article from "./article";

export default async function PostPage({ params }: { params: Promise<{ name: string }> }) {
  const awaitedParams = await params;
  // Replace URL-encoded spaces with regular spaces before comparing
  const decodedName = decodeURIComponent(awaitedParams.name);
  const post = posts.find((post) => post.slug === decodedName);

  if (!post) {
    return <NotFound type="post" />;
  }

  return <Article post={post} />;
}
