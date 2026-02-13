import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchTitles } from "../../lib/gemini";
import type { Movie } from "../../types/movie";

const GptComponent: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query: string | null = searchParams.get("query");

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async (): Promise<void> => {
      try {
        setLoading(true);
        setMovies([]);

        const geminiTitles = await fetchTitles(query);

        const tmdbResults = await Promise.all(
          geminiTitles.map(async (title: string) => {
            const res = await fetch(
              `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
                title
              )}&api_key=${import.meta.env.VITE_TMDB_API_KEY}`
            );
            const data = await res.json();
            return data.results?.[0];
          })
        );

        const validMovies = tmdbResults.filter(
          (movie): movie is Movie => Boolean(movie)
        );

        setMovies(validMovies.slice(0, 10));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  return (
    <div className="relative min-h-screen text-white pt-28 px-10">

      <div className="fixed inset-0 -z-10">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/e49aba81-ee7c-4f19-baef-7c54bbab003e/web/IN-en-20260202-TRIFECTA-perspective_04f5de39-b518-493c-9a8d-6aef11af0457_large.jpg"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      </div>

      <h1 className="text-4xl font-bold mb-12">
        Results for{" "}
        <span className="text-red-500 capitalize">{query}</span>
      </h1>

      {loading && (
        <div className="flex flex-col items-center gap-6">
          <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-neutral-400 animate-pulse">
            AI is curating your watchlist...
          </p>
        </div>
      )}

      {!loading && movies.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {movies.map((movie: Movie) => (
            <div
              key={movie.id}
              className="group relative rounded-xl overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              {movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-67.5 object-cover rounded-xl"
                />
              )}

              <div className="absolute bottom-0 left-0 w-full bg-linear-to-t from-black via-black/70 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-sm font-medium">
                  {movie.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && movies.length === 0 && query && (
        <div className="text-neutral-400 text-center mt-20">
          No results found.
        </div>
      )}
    </div>
  );
};

export default GptComponent;
