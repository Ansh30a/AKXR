import VideoBackground from "../video-background/VideoBackground";
import VideoTitle from "../video-title/VideoTitle";
import type { Movie } from "../../types/movie";

interface HeroMovieProps {
    movie: Movie;
}

const HeroMovie = ({ movie }: HeroMovieProps) => {  
    return (
        <div className="relative h-[90vh] w-full">
            <VideoBackground backdropPath={movie.backdrop_path ?? undefined} />
            <VideoTitle title={movie.title} overview={movie.overview} />
        </div>
    );
};

export default HeroMovie;
