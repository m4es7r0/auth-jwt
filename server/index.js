import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import { errorMiddleware } from "./middlewares/error.middleware.js";
import { router } from "./router/index.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use("/auth", router);
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(process.env.PORT, () => {
      console.log(`server on ${process.env.PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};
start();
