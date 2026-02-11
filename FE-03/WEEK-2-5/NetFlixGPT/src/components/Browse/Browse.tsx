import Header from "../Header/Header";
import {
    getNowPlayingMovies,
    getPopularMovies,
    getTopRatedMovies,
    getUpcomingMovies,
} from "../../lib/tmdb";
import { useEffect, useState } from "react";
import MovieRow from "../MovieRow/MovieRow";
import type { Movie } from "../../types/movie";

const Browse = () => {
    const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
    const [popular, setPopular] = useState<Movie[]>([]);
    const [topRated, setTopRated] = useState<Movie[]>([]);
    const [upcoming, setUpcoming] = useState<Movie[]>([]);

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
        <div className="pt-20 bg-white min-h-screen text-white">
            <Header />

            <MovieRow title="Now Playing" movies={nowPlaying} />
            <MovieRow title="Popular" movies={popular} />
            <MovieRow title="Top Rated" movies={topRated} />
            <MovieRow title="Upcoming" movies={upcoming} />
        </div>
    );
};

export default Browse;
