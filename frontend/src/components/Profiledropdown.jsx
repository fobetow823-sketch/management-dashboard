
// "use client";

// import React, { useState, useRef } from "react";
// import {
//   Avatar,
//   Typography,
//   Box,
//   Menu,
//   MenuItem,
//   Divider,
//   ListItemIcon,
//   CircularProgress,
// } from "@mui/material";
// import HomeIcon from "@mui/icons-material/Home";
// import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
// import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import { useRouter } from "next/navigation";

// export default function ProfileDropdown({ user }) {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [profileImage, setProfileImage] = useState(user?.profileImageUrl);
//   const [uploading, setUploading] = useState(false);
//   const router = useRouter();

//   // Hidden file input ref
//   const fileInputRef = useRef(null);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     setAnchorEl(null);
//     router.push("/login");
//   };

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   // Trigger hidden file input click
//   const handleAddProfileImageClick = () => {
//     fileInputRef.current?.click();
//     setAnchorEl(null); // close menu
//   };

//   // Upload selected file
//   const handleFileChange = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     setUploading(true);

//     try {
//       const formData = new FormData();
//       formData.append("profileImage", file);

//       // Assuming your token is saved in localStorage or get it from context/auth state
//       const token = localStorage.getItem("token");

//       const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";


//       const res = await fetch(`${API_URL}/users/profile-image`, {
//       method: "PUT",   
//         headers: {
//        Authorization: `Bearer ${token}`,
//       },
//        body: formData,
//       });


//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Failed to upload image");
//       }

    
//       setProfileImage(data.user.profileImageUrl);

//       alert("Profile image updated successfully!");
//     } catch (error) {
//       alert(error.message);
//     } finally {
//       setUploading(false);
      
//       event.target.value = "";
//     }
//   };

//   return (
//     <>
    
//       <input
//         type="file"
//         accept="image/*"
//         style={{ display: "none" }}
//         ref={fileInputRef}
//         onChange={handleFileChange}
//       />

    
//       <Avatar
//         sx={{
//           bgcolor: "#4FD1C5",
//           width: 40,
//           height: 40,
//           cursor: "pointer",
//           color: "#fff",
//         }}
//         src={profileImage}
//         onClick={handleClick}
//       >
//         {user?.name ? user.name[0] : "U"}
//       </Avatar>

//       {/* Dropdown Menu */}
//       <Menu
//         anchorEl={anchorEl}
//         open={Boolean(anchorEl)}
//         onClose={handleClose}
//         PaperProps={{
//           sx: {
//             "&.MuiPaper-root": {
//               backgroundColor: "rgba(255, 255, 255, 0.6) !important",
//               backgroundImage: "none !important",
//               backdropFilter: "blur(12px)",
//               WebkitBackdropFilter: "blur(12px)",
//               color: "#000 !important",
//               borderRadius: 2,
//               width: 220,
//               mt: 1.5,
//               boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
//             },
//             "& .MuiMenuItem-root": {
//               color: "#000 !important",
//               "&:hover": {
//                 backgroundColor: "rgba(79, 209, 197, 0.15)",
//               },
//             },
//           },
//         }}
//       >
//         {/* Profile Info */}
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             p: 2,
//           }}
//         >
//           <Avatar
//             sx={{
//               bgcolor: "#4FD1C5",
//               width: 60,
//               height: 60,
//               mb: 1,
//               color: "#fff",
//             }}
//             src={profileImage}
//           >
//             {user?.name ? user.name[0] : "U"}
//           </Avatar>
//           <Typography variant="subtitle1" fontWeight="bold">
//             {user?.name || "Guest User"}
//           </Typography>
//           <Typography variant="caption" sx={{ color: "#4A5568" }}>
//             {user?.email || "No email available"}
//           </Typography>
//         </Box>

//         <Divider sx={{ borderColor: "rgba(0,0,0,0.1)" }} />

//         {/* Menu Options */}
//         <MenuItem onClick={handleClose}>
//           <ListItemIcon sx={{ color: "#4FD1C5" }}>
//             <HomeIcon fontSize="small" />
//           </ListItemIcon>
//           My Profile
//         </MenuItem>

//         <MenuItem onClick={handleAddProfileImageClick} disabled={uploading}>
//           <ListItemIcon sx={{ color: "#4FD1C5" }}>
//             {uploading ? (
//               <CircularProgress size={20} />
//             ) : (
//               <AddAPhotoIcon fontSize="small" />
//             )}
//           </ListItemIcon>
//           {uploading ? "Uploading..." : "Add Profile Image"}
//         </MenuItem>

//         <MenuItem onClick={handleLogout}>
//           <ListItemIcon sx={{ color: "red" }}>
//             <ExitToAppIcon fontSize="small" />
//           </ListItemIcon>
//           <Typography color="red" fontSize="0.9rem">
//             Logout
//           </Typography>
//         </MenuItem>
//       </Menu>
//     </>
//   );
// }


"use client";

import React, { useState, useRef, useEffect } from "react";
import { Avatar, Typography, Box, Menu, MenuItem, Divider, ListItemIcon, CircularProgress } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import axios from "../utils/axios";
import { loadUserFromStorage } from '../slices/authSlice'

export default function ProfileDropdown() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, token } = useSelector((state) => state.auth);

  const [anchorEl, setAnchorEl] = useState(null);
  const [profileImage, setProfileImage] = useState(user?.profileImageUrl || "/profile.png");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Update profileImage when user changes
  useEffect(() => {
    setProfileImage(user?.profileImageUrl || "/profile.png");
  }, [user]);

  // Trigger hidden file input click
  const handleAddProfileImageClick = () => {
    fileInputRef.current?.click();
    setAnchorEl(null);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("profileImage", file);

      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

      const res = await fetch(`${API_URL}/users/profile-image`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to upload image");

      // Update avatar and localStorage
      setProfileImage(data.user.profileImageUrl);
      const updatedUser = { ...user, profileImageUrl: data.user.profileImageUrl };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      dispatch(loadUserFromStorage());

      alert("Profile image updated successfully!");
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAnchorEl(null);
    router.push("/login");
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      <Avatar
        sx={{ bgcolor: "#4FD1C5", width: 40, height: 40, cursor: "pointer", color: "#fff" }}
        src={profileImage}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        {user?.name ? user.name[0] : "U"}
      </Avatar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          sx: {
            "&.MuiPaper-root": {
              backgroundColor: "rgba(255,255,255,0.6)!important",
              backgroundImage: "none!important",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              color: "#000!important",
              borderRadius: 2,
              width: 220,
              mt: 1.5,
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            },
            "& .MuiMenuItem-root": { color: "#000!important", "&:hover": { backgroundColor: "rgba(79,209,197,0.15)" } },
          },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 2 }}>
          <Avatar sx={{ bgcolor: "#4FD1C5", width: 60, height: 60, mb: 1, color: "#fff" }} src={profileImage}>
            {user?.name ? user.name[0] : "U"}
          </Avatar>
          <Typography variant="subtitle1" fontWeight="bold">{user?.name || "Guest User"}</Typography>
          <Typography variant="caption" sx={{ color: "#4A5568" }}>{user?.email || "No email available"}</Typography>
        </Box>

        <Divider sx={{ borderColor: "rgba(0,0,0,0.1)" }} />

        <MenuItem onClick={() => setAnchorEl(null)}>
          <ListItemIcon sx={{ color: "#4FD1C5" }}><HomeIcon fontSize="small" /></ListItemIcon>
          My Profile
        </MenuItem>

        <MenuItem onClick={handleAddProfileImageClick} disabled={uploading}>
          <ListItemIcon sx={{ color: "#4FD1C5" }}>
            {uploading ? <CircularProgress size={20} /> : <AddAPhotoIcon fontSize="small" />}
          </ListItemIcon>
          {uploading ? "Uploading..." : "Add Profile Image"}
        </MenuItem>

        <MenuItem onClick={handleLogout}>
          <ListItemIcon sx={{ color: "red" }}><ExitToAppIcon fontSize="small" /></ListItemIcon>
          <Typography color="red" fontSize="0.9rem">Logout</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
