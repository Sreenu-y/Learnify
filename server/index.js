import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import userRouter from "./routes/user.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import courseRouter from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import purchaseCourse from "./routes/purchaseCourse.route.js";

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

// api's
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/purchase", purchaseCourse);

app.listen(PORT, () => {
  console.log(`Server is Listening to the PORT: ${PORT}`);
});
