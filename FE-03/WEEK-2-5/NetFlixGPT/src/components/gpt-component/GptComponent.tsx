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

    const fetchCombined = async (): Promise<void> => {
      try {
        setLoading(true);

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

        setMovies(tmdbResults.filter(Boolean));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCombined();
  }, [query]);

  return (
    <div className="pt-28 px-10 min-h-screen bg-black text-white">
      <h1 className="text-2xl mb-6">
        Results for: {query}
      </h1>

      {loading && <p>Loading AI recommendations...</p>}

      <div className="grid grid-cols-5 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-neutral-900 p-3 rounded">
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded mb-2"
              />
            )}
            <h2 className="text-sm font-semibold">
              {movie.title}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GptComponent;
