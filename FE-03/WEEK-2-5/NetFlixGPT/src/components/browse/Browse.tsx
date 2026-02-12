import Header from "../header/Header";
import {
    getNowPlayingMovies,
    getPopularMovies,
    getTopRatedMovies,
    getUpcomingMovies,
} from "../../lib/tmdb";
import { useEffect, useState } from "react";
import MovieRow from "../movie-row/MovieRow";
import type { Movie } from "../../types/movie";
import HeroMovie from "../hero-movie/HeroMovie";

const Browse = () => {
    const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
    const [popular, setPopular] = useState<Movie[]>([]);
    const [topRated, setTopRated] = useState<Movie[]>([]);
    const [upcoming, setUpcoming] = useState<Movie[]>([]);

    const [heroMovieIndex, setHeroMovieIndex] = useState(0);

    useEffect(() => {
        if (nowPlaying.length === 0) return;

        const interval = setInterval(() => {
            setHeroMovieIndex((prev) => prev + (1 % nowPlaying.length));
        }, 20000);

        return () => clearInterval(interval);
    }, [nowPlaying]);

    const heroMovie = nowPlaying[heroMovieIndex];

    useEffect(() => {
        getNowPlayingMovies().then((data) => setNowPlaying(data.results ?? []));
        getPopularMovies().then((data) => setPopular(data.results ?? []));
        getTopRatedMovies().then((data) => setTopRated(data.results ?? []));
        getUpcomingMovies().then((data) => setUpcoming(data.results ?? []));
    }, []);

    return (
        <div className="pt-1 min-h-screen text-white bg-black">
            <Header />

            {heroMovie && <HeroMovie movie={heroMovie} />}

            {/* <RecommendedMovieContainer /> */}
            <div className="relative z-20 -mt-15 space-y-8">
                <MovieRow title="Now Playing" movies={nowPlaying} />
                <MovieRow title="Popular" movies={popular} />
                <MovieRow title="Top Rated" movies={topRated} />
                <MovieRow title="Upcoming" movies={upcoming} />
            </div>
        </div>
    );
};

export default Browse;
