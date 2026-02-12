export const fetchTitles = async (query: string): Promise<string[]> => {
    const res = await fetch(`http://localhost:5000/api/suggest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
    });

    const data = await res.json();

    try {
        return JSON.parse(data.movies);
    } catch {
        return [];
    }
};
