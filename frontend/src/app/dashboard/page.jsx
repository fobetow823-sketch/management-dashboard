
"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  CssBaseline,
  Container,
  Snackbar,
  Alert,
  Typography,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Toolbar,
} from "@mui/material";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const drawerWidth = 260;

export default function DashboardPage() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [open, setOpen] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setOpenSnackbar(true);
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

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
      <Header setOpen={setOpen} open={open} />

      {/* SIDEBAR */}
      <Sidebar open={open} />

  <Box
  component="main"
  sx={{
    flexGrow: 1,
    bgcolor: "#F8F9FA",
    minHeight: "100vh",
    transition: "all 0.3s ease",
    width: "100%",   // Always full width
    ml: 0,           // No margin for sidebar
  }}
>
        <Toolbar />
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{ fontWeight: 700, color: "#2D3748", mb: 4 }}
          >
            Overview
          </Typography>


        
          {/* ==== STAT CARDS ==== */}
<Grid container spacing={3} sx={{ mb: 4 }}>
  {[
    {
      title: "Total Revenue",
      value: "$24,267",
      change: "+12% from last month",
      gradient: "linear-gradient(135deg, #4FD1C5 0%, #319795 100%)",
    },
    {
      title: "Projects",
      value: "48",
      change: "+4 this month",
      gradient: "linear-gradient(135deg, #F6AD55 0%, #ED8936 100%)",
    },
    {
      title: "Time Spent",
      value: "267h",
      change: "+32h from last week",
      gradient: "linear-gradient(135deg, #7c5535ff 0%, #19163aff 100%)",
    },
    {
      title: "Users",
      value: "24",
      change: "+2 this quarter",
      gradient: "linear-gradient(135deg, #7E69AB 0%, #553C9A 100%)",
    },
  ].map((card) => (
    <Grid item xs={12} sm={6} md={3} lg={3} key={card.title}>
      <Card
        sx={{
          borderRadius: 3,
          boxShadow:
            "0 8px 16px rgba(0,0,0,0.08)",
          background: card.gradient,
          color: "white",
          height: "100%",
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            {card.title}
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 700 }}>
            {card.value}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
            {card.change}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>

{/* ==== PROJECT SUMMARY ==== */}
<Grid container spacing={3} sx={{ mb: 4 }}>
  <Grid item xs={12}>
    <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
      <CardContent sx={{ p: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: 700, color: "#2D3748", mb: 3 }}
        >
          Project Summary
        </Typography>
        <Box
          sx={{
            minHeight: 300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6" sx={{ color: "#A0AEC0" }}>
            Project visualization will appear here
          </Typography>
        </Box>
      </CardContent>
    </Card>
  </Grid>
</Grid>

{/* ==== TASKS & PROGRESS ==== */}
<Grid container spacing={3}>
  {/* Tasks */}
  <Grid item xs={12} md={6}>
    <Card sx={{ borderRadius: 3, boxShadow: 3, height: "100%" }}>
      <CardContent sx={{ p: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: 700, color: "#2D3748", mb: 3 }}
        >
          Today's Tasks
        </Typography>
        {/* Your tasks content */}
      </CardContent>
    </Card>
  </Grid>

  {/* Progress */}
  <Grid item xs={12} md={6}>
    <Card sx={{ borderRadius: 3, boxShadow: 3, height: "100%" }}>
      <CardContent sx={{ p: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: 700, color: "#2D3748", mb: 3 }}
        >
          Progress
        </Typography>
        {/* Your progress content */}
      </CardContent>
    </Card>
  </Grid>
</Grid>

        </Container>
      </Box>

      {/* ==== SNACKBAR ==== */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: "200%", fontFamily: "'Poppins', sans-serif" }}
        >
          Welcome to Management Dashboard! 🎉
        </Alert>
      </Snackbar>
    </Box>
  );
}
