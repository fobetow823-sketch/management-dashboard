import express from "express";
import { createProject, assignProjectToManagers } from "../controllers/projectController.js"
import { verifyToken } from '../middleware/authMiddleware.js'
import { roleMiddleware } from '../middleware/roleMiddleware.js'

const router = express.Router();

// Create a new project (Admin only)
router.post("/create", verifyToken, roleMiddleware(["admin"]), createProject);

// Assign project to managers (Admin only)
router.post("/assign-to-managers", verifyToken, roleMiddleware(["admin"]), assignProjectToManagers);

export default router;
