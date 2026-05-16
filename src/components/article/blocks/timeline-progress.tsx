"use client";

import { useRef, useState, useEffect } from "react";

interface TimelineMarker {
  label: string;
}

interface TimelineSection {
  id: string;
  markers: number[];
}

interface TimelineProgressProps {
  markers: TimelineMarker[];
  sections: TimelineSection[];
  children: React.ReactNode;
}

function ProgressSidebar({ markers, activeMarkers }: { markers: TimelineMarker[]; activeMarkers: number[] }) {
  const minActive = activeMarkers.length > 0 ? Math.min(...activeMarkers) : 0;
  const maxActive = activeMarkers.length > 0 ? Math.max(...activeMarkers) : 0;
  const hasActiveRange = activeMarkers.length > 0;

  return (
    <div className="hidden lg:flex flex-col items-start sticky top-24 h-fit">
      <div className="relative">
        {/* Vertical track line */}
        <div className="absolute left-[5px] top-[10px] bottom-[10px] w-[2px] bg-foreground/10 rounded-full" />

        {/* Active range highlight - always rendered for smooth transitions */}
        <div
          className="absolute left-[5px] w-[2px] rounded-full transition-all duration-500 ease-out bg-accent"
          style={{
            top: `${minActive * 32 + 10}px`,
            height: hasActiveRange ? `${(maxActive - minActive) * 32 + 12}px` : '0px',
            opacity: hasActiveRange ? 1 : 0,
          }}
        />

        {/* Markers */}
        {markers.map((marker, index) => {
          const isActive = activeMarkers.includes(index);
          const isInRange = activeMarkers.length >= 2 && index >= minActive && index <= maxActive;
          const isHighlighted = isActive || isInRange;
          const isEndpoint = isActive && (index === minActive || index === maxActive);

          return (
            <div key={marker.label} className="flex items-center gap-3 h-8 relative">
              {/* Marker dot */}
              <div
                className={`w-3 h-3 rounded-full border-2 z-10 transition-all duration-500 ease-out ${
                  isHighlighted
                    ? "bg-accent border-accent"
                    : "bg-background border-foreground/20"
                }`}
                style={{
                  transform: isEndpoint ? 'scale(1.25)' : isHighlighted ? 'scale(1.1)' : 'scale(1)',
                }}
              />
              {/* Marker label */}
              <span
                className={`text-xs font-condensed tracking-wider select-none transition-all duration-500 ease-out ${
                  isHighlighted ? "text-accent font-bold" : "text-foreground/30"
                }`}
                style={{
                  transform: isHighlighted ? 'translateX(2px)' : 'translateX(0)',
                }}
              >
                {marker.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function TimelineSection({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <div id={id} className="scroll-mt-8">
      {children}
    </div>
  );
}

export default function TimelineProgress({ markers, sections, children }: TimelineProgressProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMarkers, setActiveMarkers] = useState<number[]>([]);

  useEffect(() => {
    const lastSection = sections[sections.length - 1];

    const handleScroll = () => {
      // Check if we're at the bottom of the page
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const clientHeight = window.innerHeight;
      const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

      if (distanceFromBottom < 100 && lastSection) {
        setActiveMarkers(lastSection.markers);
        return;
      }

      const triggerLine = window.innerHeight * 0.35;

      // Find which section's top is closest to (but above) the trigger line
      let activeSection = sections[0];

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= triggerLine) {
            activeSection = section;
          }
        }
      }

      setActiveMarkers(activeSection?.markers ?? []);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sections]);

  return (
    <div ref={containerRef} className="relative flex gap-8">
      <ProgressSidebar markers={markers} activeMarkers={activeMarkers} />
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
