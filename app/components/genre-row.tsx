"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { CarouselRow } from "@/app/components/carousel-row";
import type { MovieCard } from "@/lib/movies/images";

export type GenreOption = {
  id: number;
  name: string;
  icon: string;
};

export const GENRE_OPTIONS: GenreOption[] = [
  { id: 28, name: "Action", icon: "lucide:flame" },
  { id: 12, name: "Adventure", icon: "lucide:compass" },
  { id: 16, name: "Animation", icon: "lucide:sparkles" },
  { id: 35, name: "Comedy", icon: "lucide:laugh" },
  { id: 80, name: "Crime", icon: "lucide:shield-alert" },
  { id: 99, name: "Documentary", icon: "lucide:file-text" },
  { id: 18, name: "Drama", icon: "lucide:theater" },
  { id: 10751, name: "Family", icon: "lucide:heart" },
  { id: 14, name: "Fantasy", icon: "lucide:wand-2" },
  { id: 36, name: "History", icon: "lucide:landmark" },
  { id: 27, name: "Horror", icon: "lucide:ghost" },
  { id: 10402, name: "Music", icon: "lucide:music" },
  { id: 9648, name: "Mystery", icon: "lucide:search" },
  { id: 10749, name: "Romance", icon: "lucide:heart-handshake" },
  { id: 878, name: "Science Fiction", icon: "lucide:atom" },
  { id: 53, name: "Thriller", icon: "lucide:skull" },
  { id: 10752, name: "War", icon: "lucide:crosshair" },
  { id: 37, name: "Western", icon: "lucide:sun" },
];

function RowSkeleton() {
  return (
    <div className="flex gap-3 overflow-hidden pt-1 pb-4 sm:gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="w-[8rem] shrink-0 sm:w-[12.5rem] lg:w-[14rem]">
          <div className="skeleton aspect-[2/3] w-full rounded-lg bg-ink-raised ring-1 ring-ink-line" />
          <div className="mt-2 space-y-1 sm:mt-2.5">
            <div className="skeleton h-3.5 w-3/4 rounded sm:h-4" />
            <div className="skeleton h-3 w-1/2 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function CategoryCarouselRow({
  initialGenreId = 28,
  initialMovies = [],
  ratingsById = {},
}: {
  initialGenreId?: number;
  initialMovies?: MovieCard[];
  ratingsById?: Record<number, number>;
}) {
  const [selectedGenreId, setSelectedGenreId] = useState<number>(initialGenreId);
  const [movies, setMovies] = useState<MovieCard[]>(initialMovies);
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const movieCacheRef = useRef<Map<number, MovieCard[]>>(
    new Map([[initialGenreId, initialMovies]]),
  );

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleGenreSelect = async (genreId: number) => {
    setSelectedGenreId(genreId);
    setIsOpen(false);

    // Instant switch if category was previously fetched
    if (movieCacheRef.current.has(genreId)) {
      setMovies(movieCacheRef.current.get(genreId)!);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/movies/by-genre?genreId=${genreId}`);
      if (res.ok) {
        const data = await res.json();
        const fetchedMovies = data.movies ?? [];
        movieCacheRef.current.set(genreId, fetchedMovies);
        setMovies(fetchedMovies);
      }
    } catch (error) {
      console.error("Failed to load category movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const selectedGenre =
    GENRE_OPTIONS.find((g) => g.id === selectedGenreId) ?? GENRE_OPTIONS[0];

  return (
    <div className="relative">
      <div className="mb-3 flex items-center justify-between gap-3">
        {/* Category Selector Trigger */}
        <div ref={containerRef} className="relative inline-block text-left z-30">
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            className="group flex items-center gap-1.5 text-base font-bold tracking-tight text-bone transition-colors hover:text-white sm:text-lg focus:outline-none"
          >
            <span>{selectedGenre.name}</span>
            <Icon
              icon="lucide:chevron-down"
              className={`size-4 text-bone-muted transition-transform duration-200 group-hover:text-bone ${
                isOpen ? "rotate-180 text-bone" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu Overlay */}
          {isOpen && (
            <div className="absolute left-0 mt-2.5 max-h-80 w-60 overflow-y-auto rounded-2xl border border-ink-line bg-ink-raised/95 p-1.5 shadow-2xl backdrop-blur-xl transition-all origin-top-left animate-in fade-in-0 slide-in-from-top-2 duration-200 [scrollbar-width:thin] [scrollbar-color:#1a232c_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-ink-line [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-bone-dim/40">
              {GENRE_OPTIONS.map((genre) => {
                const isSelected = genre.id === selectedGenreId;
                return (
                  <button
                    key={genre.id}
                    type="button"
                    onClick={() => handleGenreSelect(genre.id)}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      isSelected
                        ? "bg-accent/15 text-accent font-semibold"
                        : "text-bone hover:bg-ink-line hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        icon={genre.icon}
                        className={`size-4 ${
                          isSelected ? "text-accent" : "text-bone-muted"
                        }`}
                      />
                      <span>{genre.name}</span>
                    </div>
                    {isSelected && (
                      <Icon icon="lucide:check" className="size-4 text-accent" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <RowSkeleton />
      ) : (
        <CarouselRow title="" movies={movies} ratings={ratingsById} />
      )}
    </div>
  );
}
