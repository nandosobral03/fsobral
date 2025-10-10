import React from "react";

function extractTextFromReactNode(node: React.ReactNode): string {
  if (!node) return "";

  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(extractTextFromReactNode).join(" ");
  }

  if (React.isValidElement(node)) {
    if (typeof node.type === "function") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rendered = (node.type as { (props: any): React.ReactNode })(node.props);
      return extractTextFromReactNode(rendered);
    }

    const props = node.props as { children?: React.ReactNode };
    return extractTextFromReactNode(props?.children);
  }

  return "";
}
export function calculateReadingTime(content: React.ReactNode): number {
  const text = extractTextFromReactNode(content);
  const words = text.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  const wordsPerMinute = 2000;
  const minutes = Math.ceil(wordCount / wordsPerMinute);

  return Math.max(1, minutes);
}
