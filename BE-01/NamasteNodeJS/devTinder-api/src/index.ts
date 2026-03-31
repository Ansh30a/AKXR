import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send(`Hello from the server.`);
});

app.get("/home", (req, res) => {
    res.send(`Hello from the server home.`);
});

app.get("/test", (req, res) => {
    res.send(`Hello from the server test.`);
});

app.listen(5000, () => {
    console.log(`Server running on 5000.`);
});
