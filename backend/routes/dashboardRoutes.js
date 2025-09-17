import express from "express";
import { verifyToken } from '../middleware/authMiddleware.js'

const router = express.Router();

// Example protected route
router.get("/dashboard", verifyToken, (req, res) => {
  res.json({ message: "Welcome to your Management dashboard ", user: req.user });
});

export default router;
