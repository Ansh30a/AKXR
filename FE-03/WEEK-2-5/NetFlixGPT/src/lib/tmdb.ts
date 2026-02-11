const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// const fetchFromTMDB = async (endpoint: string) => {
//     const res = await fetch(
//         `${BASE_URL}${endpoint}?api_key=${API_KEY}&page=1`
//     );
//     return res.json();
// };

// export const getNowPlayingMovies = () =>
//     fetchFromTMDB("/movie/now_playing");

// export const getPopularMovies = () =>
//     fetchFromTMDB("/movie/popular");

// export const getTopRatedMovies = () =>
//     fetchFromTMDB("/movie/top_rated");

// export const getUpcomingMovies = () =>
//     fetchFromTMDB("/movie/upcoming");

const fetchDataFromTMDB = async (endpoint: string) => {
    const data = await fetch(
        `${BASE_URL}${endpoint}?api_key=${API_KEY}&page=1`,
    );
    return data.json();
};

export const getNowPlayingMovies = () => {
    return fetchDataFromTMDB(`/movie/now_playing`);
};

export const getPopularMovies = () => {
    return fetchDataFromTMDB(`/movie/popular`);
};

export const getTopRatedMovies = () => {
    return fetchDataFromTMDB("/movie/top_rated");
};

export const getUpcomingMovies = () => {
    return fetchDataFromTMDB(`/movie/upcoming`);
};
