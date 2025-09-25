import express from "express";
import { 
  assignProjectToEmployees, 
  updateProjectStatus, 
  getAllProjectsStatus 
} from "../controllers/employeeProjectController.js";
import { verifyToken } from "../middleware/authMiddleware.js"
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Manager assigns project to employees
router.post("/assign-to-employees", verifyToken, roleMiddleware(["manager"]), assignProjectToEmployees);

// Employee updates project status and hours worked
router.put("/update-status", verifyToken, roleMiddleware(["employee"]), updateProjectStatus);

// Admin views all project assignments and status reports
router.get("/reports", verifyToken, roleMiddleware(["admin"]), getAllProjectsStatus);

export default router;
