import http from "http";
import fs from "fs";

const PORT = 9000;

const app = http.createServer((req, res) => {
    // console.log(`New request received.`, req);
    const log = `${Date.now()}: ${req.method} ${req.url} New request received from ${req.headers.host} \n`;
    // console.log(req.headers.host);

    fs.appendFile("log.txt", log, (_err, _data) => {
        switch (req.url) {
            case "/":
                res.end(`Home.`);
                break;
            case "/about":
                res.end(`About.`);
                break;
            default:
                res.end(`404: Not Found.`);
                break;
        }
        // res.end(`Thanks for connecting.`);
    });
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
