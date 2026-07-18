"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

type RouteTarget = {
  prefetchHref: string;
};

type PointerCandidate = {
  anchor: HTMLAnchorElement;
  pointerId: number;
  x: number;
  y: number;
};

const TRANSITION_START_DELAY_MS = 24;
export const ROUTE_CARD_VIEW_TRANSITION_NAME = "route-card";

type ViewTransitionHandle = {
  finished: Promise<void>;
};

type DocumentWithViewTransitions = Document & {
  startViewTransition?: (callback: () => Promise<void> | void) => ViewTransitionHandle;
};

type PendingViewTransition = {
  resolve: () => void;
  timeoutId: number;
};

type ViewTransitionNavigationOptions = {
  href: string;
  scroll?: boolean;
  source?: HTMLElement;
};

type RouteTransitionContextValue = {
  navigateWithViewTransition: (options: ViewTransitionNavigationOptions) => boolean;
};

const RouteTransitionContext = createContext<RouteTransitionContextValue | null>(null);

export function useRouteViewTransition() {
  return useContext(RouteTransitionContext)?.navigateWithViewTransition;
}

function getAnchor(target: EventTarget | null) {
  return target instanceof Element ? target.closest<HTMLAnchorElement>("a[href]") : null;
}

function getInternalRoute(anchor: HTMLAnchorElement | null): RouteTarget | null {
  if (!anchor || anchor.target && anchor.target !== "_self" || anchor.hasAttribute("download")) {
    return null;
  }

  const rawHref = anchor.getAttribute("href");
  if (!rawHref || rawHref.startsWith("#") || rawHref.startsWith("mailto:") || rawHref.startsWith("tel:")) {
    return null;
  }

  const url = new URL(rawHref, window.location.href);

  if (url.origin !== window.location.origin) {
    return null;
  }

  const current = new URL(window.location.href);
  const isSameDocument =
    url.pathname === current.pathname &&
    url.search === current.search;

  if (isSameDocument) {
    return null;
  }

  return {
    prefetchHref: `${url.pathname}${url.search}`,
  };
}

function isPlainPrimaryClick(event: MouseEvent | PointerEvent) {
  return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}

export default function RouteTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const prefetchedRoutes = useRef(new Set<string>());
  const previousPathname = useRef(pathname);
  const pointerCandidate = useRef<PointerCandidate | null>(null);
  const lastNavigationStart = useRef(0);
  const pendingViewTransition = useRef<PendingViewTransition | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);

  const resolvePendingViewTransition = useCallback(() => {
    const pending = pendingViewTransition.current;

    if (!pending) {
      return;
    }

    window.clearTimeout(pending.timeoutId);
    pendingViewTransition.current = null;
    pending.resolve();
  }, []);

  const prefetchRoute = useCallback(
    (href: string) => {
      if (prefetchedRoutes.current.has(href)) {
        return;
      }

      prefetchedRoutes.current.add(href);
      router.prefetch(href);
    },
    [router],
  );

  const startNavigation = useCallback((route: RouteTarget) => {
    const now = Date.now();
    if (now - lastNavigationStart.current < 120) {
      return;
    }

    lastNavigationStart.current = now;
    prefetchRoute(route.prefetchHref);
    setIsNavigating(true);
  }, [prefetchRoute]);

  const scheduleNavigationStart = useCallback(
    (route: RouteTarget) => {
      window.setTimeout(() => startNavigation(route), TRANSITION_START_DELAY_MS);
    },
    [startNavigation],
  );

  const navigateWithViewTransition = useCallback(
    ({ href, scroll = true, source }: ViewTransitionNavigationOptions) => {
      const viewTransitionDocument = document as DocumentWithViewTransitions;
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!viewTransitionDocument.startViewTransition || prefersReducedMotion) {
        router.push(href, { scroll });
        return false;
      }

      resolvePendingViewTransition();

      if (source) {
        source.style.viewTransitionName = ROUTE_CARD_VIEW_TRANSITION_NAME;
      }

      document.documentElement.dataset.routeTransition = "detail";

      const transition = viewTransitionDocument.startViewTransition(() => (
        new Promise<void>((resolve) => {
          const timeoutId = window.setTimeout(resolvePendingViewTransition, 1600);
          pendingViewTransition.current = { resolve, timeoutId };
          router.push(href, { scroll });
        })
      ));

      transition.finished.finally(() => {
        if (source) {
          source.style.viewTransitionName = "";
        }

        delete document.documentElement.dataset.routeTransition;
      }).catch(() => {
        if (source) {
          source.style.viewTransitionName = "";
        }

        delete document.documentElement.dataset.routeTransition;
      });

      return true;
    },
    [resolvePendingViewTransition, router],
  );

  const routeTransitionContext = useMemo(
    () => ({ navigateWithViewTransition }),
    [navigateWithViewTransition],
  );

  useEffect(() => {
    const warmRoute = (event: Event) => {
      const route = getInternalRoute(getAnchor(event.target));

      if (route) {
        prefetchRoute(route.prefetchHref);
      }
    };

    const handlePointerOver = (event: PointerEvent) => {
      if (event.pointerType !== "touch") {
        warmRoute(event);
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (!isPlainPrimaryClick(event)) {
        return;
      }

      const anchor = getAnchor(event.target);
      const route = getInternalRoute(anchor);

      if (!anchor || !route) {
        return;
      }

      prefetchRoute(route.prefetchHref);
      pointerCandidate.current = {
        anchor,
        pointerId: event.pointerId,
        x: event.clientX,
        y: event.clientY,
      };
    };

    const handlePointerUp = (event: PointerEvent) => {
      const candidate = pointerCandidate.current;
      pointerCandidate.current = null;

      if (!candidate || candidate.pointerId !== event.pointerId) {
        return;
      }

      const movedX = Math.abs(event.clientX - candidate.x);
      const movedY = Math.abs(event.clientY - candidate.y);
      const route = getInternalRoute(candidate.anchor);

      if (route && movedX <= 10 && movedY <= 10) {
        scheduleNavigationStart(route);
      }
    };

    const clearPointerCandidate = (event: PointerEvent) => {
      if (pointerCandidate.current?.pointerId === event.pointerId) {
        pointerCandidate.current = null;
      }
    };

    const handleKeyboardClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.detail !== 0 || !isPlainPrimaryClick(event)) {
        return;
      }

      const route = getInternalRoute(getAnchor(event.target));

      if (route) {
        scheduleNavigationStart(route);
      }
    };

    document.addEventListener("pointerover", handlePointerOver, true);
    document.addEventListener("focusin", warmRoute, true);
    document.addEventListener("touchstart", warmRoute, { capture: true, passive: true });
    document.addEventListener("pointerdown", handlePointerDown, true);
    document.addEventListener("pointerup", handlePointerUp, true);
    document.addEventListener("pointercancel", clearPointerCandidate, true);
    document.addEventListener("click", handleKeyboardClick, true);

    return () => {
      document.removeEventListener("pointerover", handlePointerOver, true);
      document.removeEventListener("focusin", warmRoute, true);
      document.removeEventListener("touchstart", warmRoute, true);
      document.removeEventListener("pointerdown", handlePointerDown, true);
      document.removeEventListener("pointerup", handlePointerUp, true);
      document.removeEventListener("pointercancel", clearPointerCandidate, true);
      document.removeEventListener("click", handleKeyboardClick, true);
    };
  }, [prefetchRoute, scheduleNavigationStart]);

  useEffect(() => {
    if (previousPathname.current === pathname) {
      return;
    }

    previousPathname.current = pathname;
    resolvePendingViewTransition();
    const timer = window.setTimeout(() => setIsNavigating(false), 160);

    return () => window.clearTimeout(timer);
  }, [pathname, resolvePendingViewTransition]);

  useEffect(() => {
    if (!isNavigating) {
      return;
    }

    const timer = window.setTimeout(() => setIsNavigating(false), 1800);

    return () => window.clearTimeout(timer);
  }, [isNavigating]);

  return (
    <RouteTransitionContext.Provider value={routeTransitionContext}>
      <AnimatePresence>
        {isNavigating && (
          <motion.div
            aria-hidden="true"
            className="fixed left-0 top-0 z-[100] h-[3px] w-full origin-left bg-accent"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 0.82 }}
            exit={{ opacity: 0, scaleX: 1 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </AnimatePresence>

      {children}
    </RouteTransitionContext.Provider>
  );
}
