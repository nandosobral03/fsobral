"use client";

import { ExpandedImageProvider, useExpandedImage } from "../context/ExpandedImageContext";
import { FootnoteProvider } from "../context/FootnoteContext";
import type { Post } from "../posts";
import { Header, Title, Subtitle } from "../components/blog-header";
import Image from "next/image";
import Tag from "@/components/common/tag";
import ReactDOMServer from "react-dom/server";

const calculateReadingTimeMinutes = (components: React.ReactNode) => {
  const html = ReactDOMServer.renderToStaticMarkup(
    <FootnoteProvider>
      <ExpandedImageProvider>{components}</ExpandedImageProvider>
    </FootnoteProvider>
  );
  const words = html.replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
};

export default function Article({ post }: { post: Post }) {
  const { image, clearImage } = useExpandedImage();
  const readingTimeMinutes = calculateReadingTimeMinutes(post.components);

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
      <div>
        {post.coverImage && <Image src={post.coverImage} alt={post.title} width={1600} height={900} className="w-[95%] h-auto max-w-[1600px] mx-auto my-12 shadow-[6px_6px_0_rgba(0,0,0,1)] md:shadow-[16px_16px_0_rgba(0,0,0,1)]" />}
        <div className="flex flex-col items-center justify-start gap-4 w-fit px-4 md:w-article px-0 mx-auto">
          <Header date={post.date} readingTimeMinutes={readingTimeMinutes}>
            <Title>{post.title}</Title>
            <Subtitle>{post.subtitle ?? post.description}</Subtitle>
          </Header>
          {post.tags && post.tags.length > 0 && (
            <div className="w-full flex flex-wrap gap-2 mb-2">
              {post.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          )}
          {post.components}
        </div>
      </div>
    </>
  );
}
