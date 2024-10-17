import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDb } from "./db/db.js";
const app = express();
import userRouter from "./router/user.router.js";

const port = 4000;
dotenv.config(); // Adjust path if necessary

<<<<<<< HEAD
const corsOptions = {
  origin: "https://doctor-appiontment-app-omega.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Apply CORS middleware
app.use(cors(corsOptions));
=======
app.use(
  cors({
    origin: "https://doctor-appiontment-app-omega.vercel.app",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
>>>>>>> 395adcabfdca68ec28aba07c9ac86142eccea4d4

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
