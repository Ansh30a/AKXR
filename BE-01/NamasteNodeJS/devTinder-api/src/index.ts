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

app.listen(5000, () => {
    console.log(`Server running on 5000.`);
});
