// // export default function AboutPage() {
// //   return (
// //     <div style={{ maxWidth: 800, margin: "2rem auto", padding: "0 1rem", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
// //       <h1 style={{ textAlign: "center", color: "#4FD1C5" }}>About Management Dashboard</h1>
      
// //       <p style={{ fontSize: "1.1rem", lineHeight: 1.6, color: "#333" }}>
// //         Welcome to the Management Dashboard — a powerful and intuitive platform designed to streamline project management, employee tracking, and organizational oversight.
// //       </p>
      
// //       <section style={{ marginTop: "2rem" }}>
// //         <h2 style={{ color: "#319795" }}>Key Features</h2>
// //         <ul style={{ lineHeight: 1.6, color: "#555" }}>
// //           <li>Role-based user management: Admins, managers, and employees have customized access and capabilities.</li>
// //           <li>Real-time project tracking and status updates.</li>
// //           <li>Employee assignment and workload management.</li>
// //           <li>Secure authentication and profile customization including profile image upload.</li>
// //           <li>Interactive analytics and reporting tools (coming soon).</li>
// //         </ul>
// //       </section>

// //       <section style={{ marginTop: "2rem" }}>
// //         <h2 style={{ color: "#319795" }}>Our Mission</h2>
// //         <p style={{ fontSize: "1.1rem", lineHeight: 1.6, color: "#333" }}>
// //           We aim to empower teams and organizations to collaborate efficiently, track progress transparently, and achieve goals faster by providing a seamless, user-friendly dashboard.
// //         </p>
// //       </section>

// //       <section style={{ marginTop: "2rem", fontSize: "0.9rem", color: "#666" }}>
// //         <p>© {new Date().getFullYear()} Management Dashboard. All rights reserved.</p>
// //       </section>
// //     </div>
// //   );
// // }

// "use client";

// import { Box, Typography, Grid, Paper } from "@mui/material";
// import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
// import TimelineIcon from "@mui/icons-material/Timeline";
// import GroupIcon from "@mui/icons-material/Group";
// import SecurityIcon from "@mui/icons-material/Security";
// import InsightsIcon from "@mui/icons-material/Insights";

// export default function AboutPage() {
//   const features = [
//     {
//       icon: <VerifiedUserIcon sx={{ fontSize: 40, color: "#4FD1C5" }} />,
//       title: "Role-Based User Management",
//       description:
//         "Admins, managers, and employees have customized access and capabilities.",
//     },
//     {
//       icon: <TimelineIcon sx={{ fontSize: 40, color: "#4FD1C5" }} />,
//       title: "Real-Time Project Tracking",
//       description: "Keep track of project progress and status updates instantly.",
//     },
//     {
//       icon: <GroupIcon sx={{ fontSize: 40, color: "#4FD1C5" }} />,
//       title: "Employee Assignment",
//       description: "Manage employee workload and assignments effectively.",
//     },
//     {
//       icon: <SecurityIcon sx={{ fontSize: 40, color: "#4FD1C5" }} />,
//       title: "Secure Authentication",
//       description: "Protect your data with secure login and profile customization.",
//     },
//     {
//       icon: <InsightsIcon sx={{ fontSize: 40, color: "#4FD1C5" }} />,
//       title: "Analytics & Reporting",
//       description: "Interactive analytics and reporting tools (coming soon).",
//     },
//   ];

//   return (
//     <Box sx={{ maxWidth: 900, mx: "auto", p: 3, fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
//       <Typography
//         variant="h3"
//         align="center"
//         gutterBottom
//         sx={{ color: "#4FD1C5", fontWeight: "bold" }}
//       >
//         About Management Dashboard
//       </Typography>

//       <Typography
//         variant="body1"
//         align="center"
//         sx={{ maxWidth: 600, mx: "auto", mb: 5, color: "#444", fontSize: "1.1rem" }}
//       >
//         Welcome to the Management Dashboard — a powerful and intuitive platform
//         designed to streamline project management, employee tracking, and
//         organizational oversight.
//       </Typography>

//       <Grid container spacing={3}>
//         {features.map(({ icon, title, description }, index) => (
//           <Grid item xs={12} sm={6} key={index}>
//             <Paper
//               elevation={3}
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 2,
//                 p: 2,
//                 borderRadius: 2,
//                 boxShadow: "0 4px 15px rgba(79, 209, 197, 0.3)",
//                 height: "100%",
//               }}
//             >
//               <Box
//                 sx={{
//                   bgcolor: "#E0F7F6",
//                   borderRadius: 2,
//                   p: 1.5,
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   width: 60,
//                   height: 60,
//                 }}
//               >
//                 {icon}
//               </Box>

//               <Box>
//                 <Typography variant="h6" sx={{ fontWeight: "600", color: "#2C7A7B" }}>
//                   {title}
//                 </Typography>
//                 <Typography variant="body2" sx={{ color: "#555", mt: 0.5 }}>
//                   {description}
//                 </Typography>
//               </Box>
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>

//       <Box sx={{ mt: 6, textAlign: "center", color: "#666", fontSize: "0.9rem" }}>
//         &copy; {new Date().getFullYear()} Management Dashboard. All rights reserved.
//       </Box>
//     </Box>
//   );
// }


"use client";

import React from "react";
import {
  Box,
  CssBaseline,
  Container,
  Typography,
  Grid,
  Paper,
  Toolbar,
} from "@mui/material";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import TimelineIcon from "@mui/icons-material/Timeline";
import GroupIcon from "@mui/icons-material/Group";
import SecurityIcon from "@mui/icons-material/Security";
import InsightsIcon from "@mui/icons-material/Insights";

const drawerWidth = 260;

export default function AboutPage() {
  const [open, setOpen] = React.useState(true);

  const features = [
    {
      icon: <VerifiedUserIcon sx={{ fontSize: 40, color: "#4FD1C5" }} />,
      title: "Role-Based User Management",
      description:
        "Admins, managers, and employees have customized access and capabilities.",
    },
    {
      icon: <TimelineIcon sx={{ fontSize: 40, color: "#4FD1C5" }} />,
      title: "Real-Time Project Tracking",
      description: "Keep track of project progress and status updates instantly.",
    },
    {
      icon: <GroupIcon sx={{ fontSize: 40, color: "#4FD1C5" }} />,
      title: "Employee Assignment",
      description: "Manage employee workload and assignments effectively.",
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40, color: "#4FD1C5" }} />,
      title: "Secure Authentication",
      description: "Protect your data with secure login and profile customization.",
    },
    {
      icon: <InsightsIcon sx={{ fontSize: 40, color: "#4FD1C5" }} />,
      title: "Analytics & Reporting",
      description: "Interactive analytics and reporting tools (coming soon).",
    },
  ];

  return (
    <Box sx={{ display: "flex", fontFamily: "'Poppins', sans-serif" }}>
      <CssBaseline />

      {/* Import font */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        `}
      </style>

      {/* HEADER */}
      <Header open={open} setOpen={setOpen} />

      {/* SIDEBAR */}
      <Sidebar open={open} />

      {/* MAIN CONTENT */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#F8F9FA",
          minHeight: "100vh",
          transition: "all 0.3s ease",
          width: "100%",
          ml: 0,
          p: 4,
        }}
      >
        <Toolbar />

        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{ color: "#0b0c0cff", fontWeight: "bold", mb: 3 }}
          >
            About Us
          </Typography>

          <Typography
            variant="body1"
            align="center"
            sx={{
              maxWidth: 700,
              mx: "auto",
              mb: 6,
              color: "#444",
              fontSize: "1.15rem",
              lineHeight: 1.6,
            }}
          >
            Welcome to the Management Dashboard — a powerful and intuitive
            platform designed to streamline project management, employee
            tracking, and organizational oversight. Our goal is to empower your
            team with clear visibility and control.
          </Typography>

          <Grid container spacing={4}>
            {features.map(({ icon, title, description }, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Paper
                  elevation={3}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    p: 3,
                    borderRadius: 2,
                    boxShadow: "0 6px 20px rgba(79, 209, 197, 0.25)",
                    height: "100%",
                    backgroundColor: "#fff",
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: "#E0F7F6",
                      borderRadius: 2,
                      p: 1.5,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 60,
                      height: 60,
                      flexShrink: 0,
                    }}
                  >
                    {icon}
                  </Box>

                  <Box>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "600", color: "#2C7A7B" }}
                    >
                      {title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#555", mt: 0.5 }}>
                      {description}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
