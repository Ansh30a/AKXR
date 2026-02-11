import type { Movie } from "../../types/movie";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w300";

interface MovieRowProps {
    title: string;
    movies: Movie[];
}

const MovieRow = ({ title, movies }: MovieRowProps) => {
    return (
        <div className="px-8 mb-8">
            <h2 className="text-xl font-semibold mb-3">{title}</h2>

            <div className="flex gap-4 overflow-x-scroll scrollbar-hide">
                {movies.map((movie) => (
                    <img
                        key={movie.id}
                        src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                        alt={movie.title}
                        className="w-40 rounded hover:scale-105 transition-transform duration-300 cursor-pointer"
                    />
                ))}
            </div>
        </div>
    );
};

export default MovieRow;
