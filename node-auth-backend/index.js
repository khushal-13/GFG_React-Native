import express from 'express';
import appRouter from './src/route.js';
import dotenv from "dotenv";
import cors from "cors";


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", appRouter)

app.listen(5000, () => console.log("Server started at port 5000......"));