import VideoBackground from "../video-background/VideoBackground";
import VideoTitle from "../video-title/VideoTitle";
import type { Movie } from "../../types/movie";
import { useEffect, useState } from "react";
import { getMovieVideos } from "../../lib/tmdb";

interface HeroMovieProps {
    movie: Movie;
}

const HeroMovie = ({ movie }: HeroMovieProps) => {
    const [trailerKey, setTrailerKey] = useState<string | null>(null);

    useEffect(() => {
        const fetchTrailer = async () => {
            const data = await getMovieVideos(movie.id);
            const trailer = data.results?.find(
                (vid: any) => vid.type === "Trailer" && vid.site === "YouTube",
            );
            if (trailer) {
                setTrailerKey(trailer.key);
            }
        };

        fetchTrailer();
    }, [movie.id]);

    return (
        <div className="relative h-[80vh] w-full">
            <VideoBackground
                trailerKey={trailerKey}
                backdropPath={movie.backdrop_path ?? undefined}
            />
            <VideoTitle title={movie.title} overview={movie.overview} />
        </div>
    );
};

export default HeroMovie;
