import express from "express";
import cors from "cors";

export const app = express();

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
