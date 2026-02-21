import express, { type Request, type Response } from "express";
import cors from "cors";
import Groq from "groq-sdk";

// Initialize Groq client
// Render will supply GROQ_API_KEY from environment variables
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const app = express();
const PORT = 5000;

app.use(
    cors({
        origin: ["http://localhost:5173", "https://anshxr-netflixgpt.web.app"],
    }),
);
app.use(express.json());

app.post("/api/suggest", async (req: Request, res: Response) => {
    try {
        const { query } = req.body;

        if (!query) {
            return res.status(400).json({ error: `Query required.` });
        }

        const prompt = `Return ONLY a valid JSON array of 8 real movie titles based on: "${query}". No explanation. No markdown. Only JSON.`;

        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.5,
        });

        const text = completion.choices[0]?.message?.content || "[]";

        res.json({ movies: text });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: `Something went wrong.` });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}.`);
});
