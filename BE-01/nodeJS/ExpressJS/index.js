import express from "express";

const PORT = 8000;
const app = express();

app.get("/", (req, res) => {
    return res.send(`Hello from Home.`);
});

app.get("/about", (req, res) => {
    return res.send(`Hello ${req.query.name} from About.`);
});

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});
