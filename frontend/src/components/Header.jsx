// // import React, { useState, useEffect } from "react";
// // import {
// //   AppBar,
// //   Toolbar,
// //   Typography,
// //   Box,
// //   IconButton,
// //   Drawer,
// //   Avatar,
// //   Divider,
// //   List,
// //   ListItem,
// //   ListItemIcon,
// //   ListItemText,
// // } from "@mui/material";
// // import MenuIcon from "@mui/icons-material/Menu";
// // import CloseIcon from "@mui/icons-material/Close";
// // import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
// // import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
// // import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// // import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// // import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
// // import HomeIcon from "@mui/icons-material/Home";
// // import ProfileDropdown from "./Profiledropdown";

// // const drawerWidth = 240;

// // export default function Header() {
// //   const [open, setOpen] = useState(false);
// //   const [profileOpen, setProfileOpen] = useState(false);
// //   const [user, setUser] = useState(null);

// //   // Load user data from localStorage
// //   useEffect(() => {
// //     const data = localStorage.getItem("user");
// //     if (data) {
// //       setUser(JSON.parse(data));
// //     }
// //   }, []);

// //   return (
// //     <>
// //       {/* Header */}
// //       <AppBar
// //         position="fixed"
// //         sx={{
// //           zIndex: 1201,
// //           backgroundColor: "#ffffff",
// //           color: "#2D3748",
// //           boxShadow:
// //             "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
// //           transition: "margin 0.3s ease, width 0.3s ease",
// //           width: open ? `calc(100% - ${drawerWidth}px)` : "100%",
// //           ml: open ? `${drawerWidth}px` : 0,
// //         }}
// //       >
// //         <Toolbar sx={{ justifyContent: "space-between" }}>
// //           {/* Left side */}
// //           <Box sx={{ display: "flex", alignItems: "center" }}>
// //             <IconButton
// //               color="inherit"
// //               edge="start"
// //               onClick={() => setOpen(!open)}
// //               sx={{ mr: 2 }}
// //             >
// //               {open ? <CloseIcon /> : <MenuIcon />}
// //             </IconButton>
// //             <Typography variant="h4" sx={{ fontWeight: 700, color: "#4FD1C5" }}>
// //               User Management
// //             </Typography>
// //           </Box>

// //           {/* Right side */}
// //           <Box sx={{ display: "flex", alignItems: "center" }}>
// //             <IconButton sx={{ color: "#4FD1C5", mx: 1 }}>
// //               <NotificationsNoneIcon />
// //             </IconButton>
// //             <IconButton sx={{ color: "#4FD1C5", mx: 1 }}>
// //               <SettingsOutlinedIcon />
// //             </IconButton>

// //             {/* Profile icon opens profile sidebar */}
// //             <IconButton onClick={() => setProfileOpen(true)}>
// //               <AccountCircleIcon sx={{ color: "#4FD1C5", fontSize: 35 }} />
// //             </IconButton>
// //           </Box>
// //         </Toolbar>
// //       </AppBar>

// //   <ProfileDropdown/>

// //     </>
// //   );
// // }


// //////////////
// "use client";

// import React, { useState, useEffect } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Box,
//   IconButton,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import CloseIcon from "@mui/icons-material/Close";
// import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
// import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
// import ProfileDropdown from "./ProfileDropdown"; // ✅ import dropdown

// const drawerWidth = 240;

// export default function Header() {
//   const [open, setOpen] = useState(false);
//   const [user, setUser] = useState(null);

//   // Load user data from localStorage
//   useEffect(() => {
//     const data = localStorage.getItem("user");
//     if (data) {
//       setUser(JSON.parse(data));
//     }
//   }, []);

//   return (
//     <>
//       {/* Header */}
//       <AppBar
//         position="fixed"
//         sx={{
//           zIndex: 1201,
//           backgroundColor: "#ffffff",
//           color: "#2D3748",
//           boxShadow:
//             "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
//           transition: "margin 0.3s ease, width 0.3s ease",
//           width: open ? `calc(100% - ${drawerWidth}px)` : "100%",
//           ml: open ? `${drawerWidth}px` : 0,
//         }}
//       >
//         <Toolbar sx={{ justifyContent: "space-between" }}>
//           {/* Left side */}
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <IconButton
//               color="inherit"
//               edge="start"
//               onClick={() => setOpen(!open)}
//               sx={{ mr: 2 }}
//             >
//               {open ? <CloseIcon /> : <MenuIcon />}
//             </IconButton>
//             <Typography variant="h4" sx={{ fontWeight: 700, color: "#4FD1C5" }}>
//               User Management
//             </Typography>
//           </Box>

//           {/* Right side */}
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//             <IconButton sx={{ color: "#4FD1C5" }}>
//               <NotificationsNoneIcon />
//             </IconButton>
//             <IconButton sx={{ color: "#4FD1C5" }}>
//               <SettingsOutlinedIcon />
//             </IconButton>

//             {/* ✅ Replace sidebar with dropdown */}
//             <ProfileDropdown user={user} />
//           </Box>
//         </Toolbar>
//       </AppBar>
//     </>
//   );
// }


////////////////////
"use client";

import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  drawerWidth
} from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ProfileDropdown from "../components/Profiledropdown";

export default function Header() {
  const [user, setUser] = useState(null);

  // Load user data from localStorage
  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      setUser(JSON.parse(data));
    }
  }, []);

  return (
//     <AppBar
//      position="fixed"
//   elevation={0} // remove default MUI shadow, we’ll use custom
//   sx={{
//     backgroundColor: "#ffffff",
//     color: "#2D3748",
//     boxShadow: "0 4px 15px rgba(0,0,0,0.25)", // stronger black shadow
//     width: "calc(100% - 40px)", // small margin on sides
//     ml: "10px",
//     mt: "6px", // push it down from top
//     borderRadius: "10px", // rounded like a card
//     zIndex: 1201,
//   }}
<AppBar
  position="fixed"
  elevation={0}
  sx={{
    backgroundColor: "#ffffff",
    color: "#2D3748",
    boxShadow: "0 4px 15px rgba(0,0,0,0.25)", // card-like shadow
    width: "calc(100% - 240px)", // sidebar width fixed at 240px
    ml: "240px", // start after sidebar
    mt: "5px", // floating look
    borderRadius: "12px",
    zIndex: 1201,
  }}
>
    
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Left side: Title */}
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, color: "#4FD1C5" }}
        >
        Management Dashboard
        </Typography>

        {/* Right side: Icons + Dropdown */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <IconButton sx={{ color: "#4FD1C5" }}>
            <NotificationsNoneIcon />
          </IconButton>
          <IconButton sx={{ color: "#4FD1C5" }}>
            <SettingsOutlinedIcon />
          </IconButton>
          <ProfileDropdown user={user} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
