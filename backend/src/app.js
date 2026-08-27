//app.ts
import express from "express";
import cookieParser from "cookie-parser"

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import cors from "cors";
import router from "./app/routes/index.js";

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://localhost:3000", "https://pro.shopnoporon.com"],
    origin: "*",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "api-status.html"));
});


export default app;
