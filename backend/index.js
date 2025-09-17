// index.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import auth from "./routes/auth.js";
import dashboardRoutes from './routes/dashboardRoutes.js'
import userRoutes from "./routes/userRoutes.js"


// Load env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

app.use("/api/auth", auth);

app.use("/api", dashboardRoutes);
app.use("/api/users", userRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Backend API is running 🚀");
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {

  })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
