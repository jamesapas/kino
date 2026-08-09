import { NextRequest, NextResponse } from "next/server";
import { getByGenreTMDB } from "@/lib/movies/catalog";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const genreIdStr = searchParams.get("genreId");
  const genreId = genreIdStr ? parseInt(genreIdStr, 10) : 28;

  if (isNaN(genreId)) {
    return NextResponse.json({ movies: [] }, { status: 400 });
  }

  try {
    const movies = await getByGenreTMDB(genreId, 20);
    return NextResponse.json(
      { movies },
      {
        headers: {
          "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
        },
      },
    );
  } catch {
    return NextResponse.json({ movies: [] }, { status: 500 });
  }
}
