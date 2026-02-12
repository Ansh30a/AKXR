import express, { type Request, type Response } from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const app = express();
const PORT = 5000;

app.use(
    cors({
        origin: ["http://localhost:5173", "https://anshxr-netflixgpt.web.app/"],
    }),
);
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

app.post("/api/suggest", async (req: Request, res: Response) => {
    try {
        const { query } = req.body;

        if (!query) {
            return res.status(400).json({ error: `Query required.` });
        }
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
        });
        const prompt = `Return ONLY a valid JSON array of 8 real movie titles based on:"${query}"No explanation.No markdown.Only JSON.`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        res.json({ movies: text });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: `Something went wrong.` });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}.`);
});
