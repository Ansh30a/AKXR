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
// import RecommendedMovieContainer from "../RecommendedMovieContainer/RecommendedMovieContainer";

const Browse = () => {
    const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
    const [popular, setPopular] = useState<Movie[]>([]);
    const [topRated, setTopRated] = useState<Movie[]>([]);
    const [upcoming, setUpcoming] = useState<Movie[]>([]);

    const heroMovie = nowPlaying[0];

    useEffect(() => {
        getNowPlayingMovies().then((data) =>
            setNowPlaying(data.results ?? [])
        );
        getPopularMovies().then((data) =>
            setPopular(data.results ?? [])
        );
        getTopRatedMovies().then((data) =>
            setTopRated(data.results ?? [])
        );
        getUpcomingMovies().then((data) =>
            setUpcoming(data.results ?? [])
        );
    }, []);

    return (
        <div className="pt-15 bg-black min-h-screen text-white">
            <Header />

            {heroMovie && <HeroMovie movie={heroMovie} />}

            {/* <RecommendedMovieContainer /> */}

            <MovieRow title="Now Playing" movies={nowPlaying} />
            <MovieRow title="Popular" movies={popular} />
            <MovieRow title="Top Rated" movies={topRated} />
            <MovieRow title="Upcoming" movies={upcoming} />
        </div>
    );
};

export default Browse;
