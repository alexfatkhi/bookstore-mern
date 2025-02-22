import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

import booksRoute from "./routes/booksRoute.js";

const app = express();

// Get PORT and MongoDB URI from .env
const PORT = process.env.PORT || 5000;
const mongoDBURL = process.env.MONGO_URI;

// Middleware
app.use(express.json());
app.use(cors());

// Test route
app.get("/", (req, res) => {
  console.log("Server is running...");
  res.status(200).send("Welcome to MERN Stack Tutorial");
});

// Use Books Route
app.use("/books", booksRoute);

// Connect to MongoDB
mongoose
  .connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1); // Exit the process if DB connection fails
  });
