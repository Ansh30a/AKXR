import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { Movie } from "../../types/movie";

const GptComponent: React.FC = () => {
    const [searchParams] = useSearchParams();
    const query: string | null = searchParams.get("query");

    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        if (!query) return;

        const fetchMovies = async (): Promise<void> => {
            try {
                const res = await fetch(
                    `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${import.meta.env.VITE_TMDB_API_KEY}`,
                );

                const data = await res.json();
                setMovies(data.results || []);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMovies();
    }, [query]);

    return (
        <div className="pt-28 px-10 text-white min-h-screen bg-black">
            <h1 className="text-2xl mb-6">Search Results for: {query}</h1>

            <div className="grid grid-cols-5 gap-4">
                {movies.map((movie) => (
                    <div key={movie.id} className="bg-neutral-900 p-3 rounded">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className="rounded mb-2"
                        />
                        <h2 className="text-sm font-semibold">{movie.title}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GptComponent;
