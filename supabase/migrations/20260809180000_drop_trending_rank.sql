-- Drop trending_rank and trending_at columns + index since trending data
-- is now fetched live from TMDB API.

drop index if exists public.movies_trending_rank_idx;

alter table public.movies
  drop column if exists trending_rank,
  drop column if exists trending_at;
