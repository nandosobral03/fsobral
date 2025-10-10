import React from "react";

/**
 * Extracts text content from React elements recursively
 */
function extractTextFromReactNode(node: React.ReactNode): string {
  if (!node) return "";

  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(extractTextFromReactNode).join(" ");
  }

  if (React.isValidElement(node)) {
    // If it's a component, call it to get its rendered output
    if (typeof node.type === 'function') {
      const rendered = (node.type as any)(node.props);
      return extractTextFromReactNode(rendered);
    }

    // For regular elements, extract children
    const props = node.props as any;
    return extractTextFromReactNode(props?.children);
  }

  return "";
}

/**
 * Calculates reading time in minutes based on word count
 * Uses average reading speed of 225 words per minute
 */
export function calculateReadingTime(content: React.ReactNode): number {
  const text = extractTextFromReactNode(content);
  const words = text.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  // Average reading speed: 225 words per minute
  const wordsPerMinute = 225;
  const minutes = Math.ceil(wordCount / wordsPerMinute);

  // Minimum 1 minute
  return Math.max(1, minutes);
}
