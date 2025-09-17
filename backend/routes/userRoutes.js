
import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { createUser, getUsers, updateUser, deleteUser } from "../controllers/userController.js";

const router = express.Router();

// CRUD for users (Admin only)
router.post("/", verifyToken, createUser);         // Create
router.get("/", verifyToken, getUsers);            // Read all
router.put("/:id", verifyToken, updateUser);       // Update
router.delete("/:id", verifyToken, deleteUser);    // Delete

export default router;


