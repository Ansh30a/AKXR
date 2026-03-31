import express from "express";

const app = express();

app.use(
    "/user",
    (req, res, next) => {
        // res.send(`response 1`);
        next();
    },
    (req, res) => {
        res.send(`response 2`);
    },
);

app.use("/admin", (req, res, next) => {
    const token = 1234;
    const isAdmin = token === 134;
    if (!isAdmin) {
        res.status(401).send(`No No`);
    } else {
        next();
    }
});

app.get("/admin/getAllData", (req, res) => {
    res.send(`Data`);
});

app.listen(5000, () => {
    console.log(`Server running on 5000.`);
});
