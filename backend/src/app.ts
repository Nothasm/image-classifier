import cors from "cors";
import express from "express";
import { ImageRouter } from "./routes/image";
import "./db";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.send("OK"));

app.use("/image", ImageRouter)

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log("err :", err);
    if (err.statusCode) return res.status(err.statusCode).send({ error: err.message });

    res.status(500).send({ error: err.message });
});

export { app };