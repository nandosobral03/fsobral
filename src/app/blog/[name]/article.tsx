"use client";

import { useExpandedImage } from "../context/ExpandedImageContext";
import type { Post } from "../posts";
import { Header, Title, Subtitle } from "../components/blog-header";

export default function Article({ post }: { post: Post }) {
  const { image, clearImage } = useExpandedImage();

  return (
    <>
      {image && (
        <>
          <div className="fixed inset-0 z-40 bg-black bg-opacity-75 object-contain" onClick={clearImage}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image.src} alt={image.alt} className="w-full cursor-pointer transition-all duration-300 fixed m-auto inset-0 z-50 h-[90vh] object-contain" onClick={clearImage} />
          </div>
        </>
      )}
      <div className="my-8">
        <Header date={post.date}>
          <Title>{post.title}</Title>
          <Subtitle>{post.subtitle ?? post.description}</Subtitle>
        </Header>
        {post.components}
      </div>
    </>
  );
}
