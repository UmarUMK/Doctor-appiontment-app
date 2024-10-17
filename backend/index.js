import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDb } from "./db/db.js";
const app = express();
import userRouter from "./router/user.router.js";
import corsMiddleware from "./middlewares/corsMiddleware.js"


const port = 4000;
dotenv.config(); // Adjust path if necessary


// const corsOptions = {
//   origin: "https://doctor-appiontment-app-omega.vercel.app",
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// };

// Apply CORS middleware
app.use(cors());
app.use(corsMiddleware)
// app.use(
//   cors({
//     origin: "https://doctor-appiontment-app-omega.vercel.app",
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true,
//   })
// );


app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.post("/", (req, res) => {
  res.send("umar");
});

app.use("/user", userRouter);

connectDb();

app.listen(port, () => {
  console.log(`your server is running on ${port}`);
});
