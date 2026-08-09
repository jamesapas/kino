import Link from "next/link";

import { PosterCard } from "@/app/components/poster-card";
import { getRatingsByMovie } from "@/lib/movies/catalog";
import { getListMovies, type MovieList } from "@/lib/movies/lists";
import { createServerSupabase } from "@/lib/supabase/server";

/**
 * The watchlist and favorites shelves.
 *
 * One component for both: they differ only in which rows they read and what
 * the empty state says, rendered inside ProfileLayout.
 */
export async function MovieListPage({
  list,
  heading,
  note,
  empty,
}: {
  list: MovieList;
  heading: string;
  /** The line under the heading, once there's something to count. */
  note: (count: number) => string;
  signedOut?: { heading: string; body: string; reason: string };
  empty: { heading: string; body: string };
}) {
  const supabase = await createServerSupabase();

  const [movies, ratings] = await Promise.all([
    getListMovies(supabase, list),
    getRatingsByMovie(supabase),
  ]);

  return (
    <div>
      <header>
        <h1 className="text-2xl font-bold text-bone">{heading}</h1>
        <p className="meta mt-1">
          {movies.length === 0 ? "Nothing here yet" : note(movies.length)}
        </p>
      </header>

      {movies.length === 0 ? (
        <section className="mt-10">
          <h2 className="text-xl font-bold text-bone">{empty.heading}</h2>
          <p className="mt-2 max-w-md leading-relaxed text-bone-soft">{empty.body}</p>
          <Link href="/" className="btn btn-primary mt-6">
            Browse the catalog
          </Link>
        </section>
      ) : (
        // The overview's grid, down to the width override: a shelf of your
        // films should be the same shelf wherever you're standing.
        <div className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(7rem,1fr))] gap-4 sm:grid-cols-[repeat(auto-fill,minmax(8.5rem,1fr))] [&>article]:w-full">
          {movies.map((movie) => (
            <PosterCard
              key={movie.id}
              movie={movie}
              rating={ratings.get(movie.id) ?? null}
            />
          ))}
        </div>
      )}
    </div>
  );
}

