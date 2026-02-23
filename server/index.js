import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import userRouter from "./routes/user.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import courseRouter from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import purchaseCourseRouter from "./routes/purchaseCourse.route.js";
import courseProgressRouter from "./routes/courseProgress.route.js";
import path from "path";

dotenv.config({});
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

const _dirname = path.resolve();
const allowedOrigins = [
  "https://learnify-neon-eight.vercel.app", //production
  "http://localhost:5173", // local dev
];
//default middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);
app.use(cookieParser());

// api's
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/purchase", purchaseCourseRouter);
app.use("/api/v1/progress", courseProgressRouter);

app.use(express.static(path.join(_dirname, "/client/dist")));

app.get("/{*path}", (_, res) => {
  res.sendFile(path.join(_dirname, "/client/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is Listening to the PORT: ${PORT}`);
});
