const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getMovieByTitle = async (
    title: string,
    year?: number
) => {
    const url =
        `${BASE_URL}?apikey=${OMDB_API_KEY}` +
        `&t=${encodeURIComponent(title)}` +
        (year ? `&y=${year}` : "");

    const res = await fetch(url);
    return res.json();
};