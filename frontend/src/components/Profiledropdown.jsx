// "use client";

// import React, { useState } from "react";
// import {
//   Avatar,
//   Typography,
//   Box,
//   Menu,
//   MenuItem,
//   Divider,
//   ListItemIcon,
// } from "@mui/material";
// import HomeIcon from "@mui/icons-material/Home";
// import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
// import ExitToAppIcon from "@mui/icons-material/ExitToApp";

// export default function ProfileDropdown({ user }) {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <>
//       {/* Avatar that opens dropdown */}
//       <Avatar
//         sx={{ bgcolor: "#4FD1C5", width: 40, height: 40, cursor: "pointer" }}
//         src="/profile.png"
//         onClick={handleClick}
//       >
//         {user?.name ? user.name[0] : "U"}
//       </Avatar>

//       {/* Dropdown Menu */}
//       <Menu
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         PaperProps={{
//           sx: {
//             backgroundColor: "#0A2540", // same dark bg
//             color: "#fff", // white text
//             borderRadius: 2,
//             width: 220,
//             mt: 1.5,
//             "& .MuiMenuItem-root": {
//               "&:hover": {
//                 backgroundColor: "rgba(79, 209, 197, 0.1)",
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
//             sx={{ bgcolor: "#4FD1C5", width: 60, height: 60, mb: 1 }}
//             src="/profile.png"
//           >
//             {user?.name ? user.name[0] : "U"}
//           </Avatar>
//           <Typography variant="subtitle1" fontWeight="bold">
//             {user?.name || "Guest User"}
//           </Typography>
//           <Typography variant="caption" sx={{ color: "#A0AEC0" }}>
//             {user?.email || "No email available"}
//           </Typography>
//         </Box>

//         <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />

//         {/* Menu Options */}
//         <MenuItem onClick={handleClose}>
//           <ListItemIcon sx={{ color: "#4FD1C5" }}>
//             <HomeIcon fontSize="small" />
//           </ListItemIcon>
//           My Profile
//         </MenuItem>

//         <MenuItem onClick={handleClose}>
//           <ListItemIcon sx={{ color: "#4FD1C5" }}>
//             <AddAPhotoIcon fontSize="small" />
//           </ListItemIcon>
//           Add Profile Image
//         </MenuItem>

//         <MenuItem onClick={handleClose}>
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

import React, { useState } from "react";
import {
  Avatar,
  Typography,
  Box,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useRouter } from "next/navigation";

export default function ProfileDropdown({ user }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const router = useRouter(); // ✅ initialize router

  const handleLogout = () => {
    // Clear localStorage or just the user info
    localStorage.removeItem("user");

    // Close dropdown
    setAnchorEl(null);

    // Redirect to login
    router.push("/login");
  };





  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {/* Avatar that opens dropdown */}
      <Avatar
        sx={{
          bgcolor: "#4FD1C5",
          width: 40,
          height: 40,
          cursor: "pointer",
          color: "#fff",
        }}
        src="/profile.png"
        onClick={handleClick}
      >
        {user?.name ? user.name[0] : "U"}
      </Avatar>

      {/* Dropdown Menu */}
<Menu
  anchorEl={anchorEl}
  open={open}
  onClose={handleClose}
  PaperProps={{
    sx: {
      "&.MuiPaper-root": {
        backgroundColor: "rgba(255, 255, 255, 0.6) !important",
        backgroundImage: "none !important",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        color: "#000 !important",
        borderRadius: 2,
        width: 220,
        mt: 1.5,
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
      },
      "& .MuiMenuItem-root": {
        color: "#000 !important",
        "&:hover": {
          backgroundColor: "rgba(79, 209, 197, 0.15)",
        },
      },
    },
  }}
>


        {/* Profile Info */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 2,
          }}
        >
          <Avatar
            sx={{
              bgcolor: "#4FD1C5",
              width: 60,
              height: 60,
              mb: 1,
              color: "#fff",
            }}
            src="/profile.png"
          >
            {user?.name ? user.name[0] : "U"}
          </Avatar>
          <Typography variant="subtitle1" fontWeight="bold">
            {user?.name || "Guest User"}
          </Typography>
          <Typography variant="caption" sx={{ color: "#4A5568" }}>
            {user?.email || "No email available"}
          </Typography>
        </Box>

        <Divider sx={{ borderColor: "rgba(0,0,0,0.1)" }} />

        {/* Menu Options */}
        <MenuItem onClick={handleClose}>
          <ListItemIcon sx={{ color: "#4FD1C5" }}>
            <HomeIcon fontSize="small" />
          </ListItemIcon>
          My Profile
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <ListItemIcon sx={{ color: "#4FD1C5" }}>
            <AddAPhotoIcon fontSize="small" />
          </ListItemIcon>
          Add Profile Image
        </MenuItem>
  <MenuItem onClick={handleLogout}>
        <ListItemIcon sx={{ color: "red" }}>
          <ExitToAppIcon fontSize="small" />
        </ListItemIcon>
        <Typography color="red" fontSize="0.9rem">
          Logout
        </Typography>
      </MenuItem>
      </Menu>
    </>
  );
}
