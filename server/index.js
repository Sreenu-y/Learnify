import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import userRouter from "./routes/user.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config({});
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

//default middlewares

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/v1/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is Listening to the PORT: ${PORT}`);
});
