"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { useRouteViewTransition } from "./route-transition-provider";

type ViewTransitionLinkProps = ComponentProps<typeof Link> & {
  routeLayer?: boolean;
};

function isPlainPrimaryClick(event: MouseEvent<HTMLAnchorElement>) {
  return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}

export default function ViewTransitionLink({
  href,
  onClick,
  routeLayer = false,
  scroll,
  target,
  children,
  ...props
}: ViewTransitionLinkProps) {
  const navigateWithViewTransition = useRouteViewTransition();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (
      event.defaultPrevented ||
      routeLayer ||
      !navigateWithViewTransition ||
      !isPlainPrimaryClick(event) ||
      target && target !== "_self" ||
      typeof href !== "string" ||
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:")
    ) {
      return;
    }

    const url = new URL(href, window.location.href);

    if (url.origin !== window.location.origin) {
      return;
    }

    event.preventDefault();
    navigateWithViewTransition({
      href: `${url.pathname}${url.search}${url.hash}`,
      scroll,
      source: event.currentTarget,
    });
  };

  return (
    <Link href={href} onClick={handleClick} scroll={scroll} target={target} {...props}>
      {children}
    </Link>
  );
}
