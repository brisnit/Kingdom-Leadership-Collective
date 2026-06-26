"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export interface Track {
  id: string;
  title: string;
  summary: string;
  topics: string[];
}

interface TrackAccordionProps {
  tracks: Track[];
}

/**
 * Tabbed on desktop, accordion on mobile — same data, two responsive
 * presentations. Sharp corners, thin rules, no chrome.
 */
export function TrackAccordion({ tracks }: TrackAccordionProps) {
  const [active, setActive] = useState(tracks[0]?.id ?? "");

  return (
    <div>
      {/* Desktop: vertical tab rail + content panel */}
      <div className="hidden border-t border-line-dark md:grid md:grid-cols-[18rem_1fr]">
        <ul className="border-r border-line-dark">
          {tracks.map((track, i) => {
            const isActive = track.id === active;
            return (
              <li key={track.id}>
                <button
                  type="button"
                  onClick={() => setActive(track.id)}
                  aria-pressed={isActive}
                  className={cn(
                    "flex w-full items-center gap-5 border-b border-line-dark px-6 py-6 text-left transition-colors duration-300",
                    isActive
                      ? "bg-paper text-ink"
                      : "bg-transparent text-paper/70 hover:text-paper",
                  )}
                >
                  <span
                    className={cn(
                      "text-[0.7rem] font-medium tabular-nums tracking-wider2",
                      isActive ? "text-ink/40" : "text-paper/40",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-serif text-xl">{track.title}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="border-b border-line-dark px-10 py-10 lg:px-14 lg:py-12">
          {tracks.map((track) =>
            track.id === active ? (
              <div key={track.id} className="animate-fade-in-up">
                <h3 className="font-serif text-3xl text-paper">{track.title}</h3>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-paper/65">
                  {track.summary}
                </p>
                <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
                  {track.topics.map((topic) => (
                    <li
                      key={topic}
                      className="text-sm capitalize text-paper/80 before:mr-3 before:text-paper/30 before:content-['—']"
                    >
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null,
          )}
        </div>
      </div>

      {/* Mobile: stacked accordion */}
      <div className="border-t border-line-dark md:hidden">
        {tracks.map((track, i) => {
          const isOpen = track.id === active;
          return (
            <div key={track.id} className="border-b border-line-dark">
              <button
                type="button"
                onClick={() => setActive(isOpen ? "" : track.id)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 py-6 text-left"
              >
                <span className="flex items-baseline gap-4">
                  <span className="text-[0.7rem] font-medium tabular-nums tracking-wider2 text-paper/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-serif text-2xl text-paper">
                    {track.title}
                  </span>
                </span>
                <span
                  aria-hidden
                  className="relative h-4 w-4 shrink-0 text-paper"
                >
                  <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
                  <span
                    className={cn(
                      "absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current transition-transform duration-300",
                      isOpen && "scale-y-0",
                    )}
                  />
                </span>
              </button>
              <div
                className={cn(
                  "grid transition-all duration-500 ease-out",
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0",
                )}
              >
                <div className="overflow-hidden">
                  <p className="max-w-xl text-sm leading-relaxed text-paper/65">
                    {track.summary}
                  </p>
                  <ul className="mb-8 mt-6 flex flex-wrap gap-x-5 gap-y-2">
                    {track.topics.map((topic) => (
                      <li
                        key={topic}
                        className="text-sm capitalize text-paper/80 before:mr-2 before:text-paper/30 before:content-['—']"
                      >
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
