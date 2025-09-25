
import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { createUser, getUsers, updateUser,getEmployees,updateProfileImage,deleteAccount } from "../controllers/userController.js";

import upload from "../middleware/Upload.js";


const router = express.Router();

// Profile image upload (authenticated user)
router.put(
  "/profile-image",              
  verifyToken,                 
  upload.single("profileImage"), // Multer middleware to parse single file
  updateProfileImage            // Controller to upload image and update user
);


// CRUD for users (Admin only)
router.post("/", verifyToken, createUser);         // Create
router.get("/", verifyToken, getUsers);   
         // Read all
router.get("/employees", verifyToken, getEmployees); 
// TO fetch all employees


// DELETE account (requires JWT + email + password)
router.delete("/delete", verifyToken, deleteAccount);


router.put("/:id", verifyToken, updateUser);    
   // Update




export default router;


