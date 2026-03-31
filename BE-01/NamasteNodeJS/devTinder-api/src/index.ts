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

app.post("/user", (req, res) => {
    console.log(`Save data in the DB.`);
    
    res.send(`Data saved successfully.`);
});

app.post("/user", (req, res) => {
    res.send({ firstName: "Anshuman", age: 21 });
});

app.listen(5000, () => {
    console.log(`Server running on 5000.`);
});
