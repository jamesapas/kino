# Kino

A movie discovery and social platform where you can browse 104k+ films, rate them, get AI-powered recommendations from **Kino** (an autonomous film agent), and share your taste with friends through a social feed.

## Stack

- **Framework:** Next.js 16 (App Router, React 19)
- **Database & Auth:** Supabase (Postgres, Row Level Security, Google OAuth)
- **Catalog Source:** TMDB API
- **AI:** OpenAI (GPT-5.5 for chat, text-embedding-3-small for vectors)
- **Vector Search:** Pinecone (1536-dim, cosine similarity)
- **Styling:** Tailwind CSS v4
- **Hosting:** Vercel

## Features

- **Browse** — Netflix-style hero carousel + poster shelves (trending, top rated, genre, personalized picks)
- **Film Pages** — full details, star rating, "More like this" via vector similarity
- **Ask Kino** — AI agent with 5 tools that searches by metadata, mood/theme, and your rating history
- **Social Feed** — posts with film attachments, likes, comments, reposts, ranked by taste affinity
- **Profiles** — public profiles with usernames, follow graph, taste stats, AI-generated taste summary
- **Watchlist & Favorites** — save films to personal lists
- **Title Search** — trigram-indexed instant search with infinite scroll

## Getting Started

### Prerequisites

- Node.js 20+
- A Supabase project
- API keys for TMDB, OpenAI, and Pinecone

### Setup

1. Clone the repo and install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and fill in your keys:

   ```bash
   cp .env.example .env.local
   ```

   You'll need: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SECRET_KEY`, `TMDB_ACCESS_TOKEN`, `OPENAI_API_KEY`, `PINECONE_API_KEY`.

3. Set up the database (apply migrations via Supabase dashboard or CLI).

4. Seed the catalog:

   ```bash
   npm run pinecone:setup     # create the vector index
   npm run sync:movies        # sync films from TMDB
   npm run embed:movies       # generate embeddings
   ```

5. Start the dev server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

### Useful Commands

```bash
npm run dev              # start dev server
npm run build            # production build
npm run seed:test-user   # create a test account with sample ratings
npm run chat -- "..."    # talk to Kino from the terminal
npm run db:types         # regenerate TypeScript types from Supabase
npm run verify:catalog   # check Postgres ↔ Pinecone sync
```

## Project Structure

```
app/              → pages, components, server actions, API routes
lib/              → service layer (agent, movies, social, profiles, auth, supabase clients)
supabase/         → database migrations
scripts/          → CLI tools (sync, embed, seed, chat)
proxy.ts          → session refresh (Next 16's middleware equivalent)
```

## Test Account

**Email:** `test-user@cinema-brain.local`
**Password:** `cinema-brain-test-password`

Recreate with `npm run seed:test-user`.
