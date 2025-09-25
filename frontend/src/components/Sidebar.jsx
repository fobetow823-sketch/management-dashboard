
////////////////////
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // ✅ get current path
import {
  Box,
  Paper,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
  Avatar,
} from "@mui/material";
import { useState,useEffect } from "react";

import DashboardIcon from "@mui/icons-material/Dashboard";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import BarChartIcon from "@mui/icons-material/BarChart";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SpaceDashboardRoundedIcon from "@mui/icons-material/SpaceDashboardRounded";
import ViewKanbanRoundedIcon from "@mui/icons-material/ViewKanbanRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";

const drawerWidth = 260;

// const menuItems = [
//   { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
//   { text: "Project", icon: <FlashOnIcon />, path: "/project" },
//   { text: "Users", icon: <AssignmentIndIcon />, path: "/users" },
//   { text: "Analytics", icon: <BarChartIcon />, path: "/analytics" },
//   { text: "Settings", icon: <CalendarTodayIcon />, path: "/settings" },
// ];
const menuItems = [
  { text: "Dashboard", icon: <SpaceDashboardRoundedIcon />, path: "/dashboard" },
  { text: "Project",   icon: <ViewKanbanRoundedIcon />,     path: "/projects" },
  { text: "Users",     icon: <GroupRoundedIcon />,          path: "/users" },
  { text: "About", icon: <InsightsRoundedIcon />,       path: "/about" },
  { text: "Settings",  icon: <SettingsRoundedIcon />,       path: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname(); 
 const [role, setRole] = useState("");
const [hasMounted, setHasMounted] = useState(false);

useEffect(() => {
  const userData = localStorage.getItem("user");
  if (userData) {
    try {
      const user = JSON.parse(userData);
      if (user?.role) {
        setRole(user.role.toUpperCase());
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
    }
  }
  setHasMounted(true);
}, []);

if (!hasMounted) return null;


  return (
    <Box sx={{ width: drawerWidth, ml: 2 }}>
      <Paper
  elevation={8}
  sx={{
    borderRadius: 4,
    p: 2,
    bgcolor: "#fff",
    minHeight: "100%",
    display: "flex",
    flexDirection: "column",
  }}
>
  {/* Logo Section */}
  <Box sx={{ mb: 3, display: "flex", alignItems: "center" }}>
    <Box
      sx={{
        width: 28,
        height: 28,
        background: "linear-gradient(to right, #4FD1C5, #2c9c94)",
        borderRadius: 1,
        mr: 1.5,
      }}
    />
        <Typography fontSize="1.2rem" color=" #0c0e0dff">
            {role}
          </Typography>
       
  </Box>

  {/* Menu Section */}
  <Box sx={{ flexGrow: 1 }}>
    <Typography
      fontSize="0.8rem"
      color="gray"
      sx={{ mb: 1, textTransform: "uppercase", fontWeight: 600 }}
    >
      Main Menu
    </Typography>

    <List disablePadding>
      {menuItems.map((item) => {
        const isActive = pathname === item.path;
        return (
          <Link
            key={item.text}
            href={item.path}
            style={{ textDecoration: "none" }}
          >
            <ListItemButton
              sx={{
                mb: 1,
                borderRadius: 2,
                backgroundColor: isActive
                  ? "rgba(138, 92, 246, 0.1)"
                  : "transparent",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActive ? "#4FD1C5" : "#718096",
                  minWidth: "36px",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: "0.95rem",
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? "#4FD1C5" : "#2D3748",
                }}
              />
            </ListItemButton>
          </Link>
        );
      })}
    </List>
  </Box>

  
</Paper>

    </Box>
  );
}
