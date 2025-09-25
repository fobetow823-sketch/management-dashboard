// index.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import auth from "./routes/auth.js";
import dashboardRoutes from './routes/dashboardRoutes.js'
import userRoutes from "./routes/userRoutes.js"
import projectRoutes from "./routes/projectRoutes.js"
import employeeprojectRoutes from "./routes/employeeprojectRoutes.js"


// Load env variables
dotenv.config();

console.log("Loaded ENV TEST:", {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: process.env.EMAIL_PORT,
  EMAIL_USER: process.env.EMAIL_USER,
});


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

app.use("/api/auth", auth);

app.use("/api", dashboardRoutes);
app.use("/api/users", userRoutes);

app.use("/api/projects", projectRoutes);
app.use("/api/employee-projects", employeeprojectRoutes);

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

  import transporter from "./config/emailConfig.js";

transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP connection error:", error);
  } else {
    console.log("✅ SMTP server is ready to send emails");
  }
});
