"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Box, Container, Typography, TextField, Button, Snackbar, Alert } from "@mui/material";
import axios from "axios";

export default function ResetPasswordPage() {
  const router = useRouter();
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // "success" | "error"

  const handleReset = async () => {
    if (password !== confirmPassword) {
      setSnackbarMessage("Passwords do not match");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password/${token}`,
        { password }
      );
      setSnackbarMessage(res.data.message);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      setTimeout(() => {
        router.push("/login"); // redirect after showing snackbar
      }, 1500);
    } catch (err) {
      console.error(err);
      setSnackbarMessage(err.response?.data?.message || "Error resetting password");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", bgcolor: "#F8F9FA" }}>
      <Container
        maxWidth="sm"
        sx={{ bgcolor: "#fff", p: 4, borderRadius: 2, boxShadow: "0 6px 20px rgba(0,0,0,0.1)" }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Reset Password
        </Typography>

        <TextField
          label="New Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Button
          variant="contained"
          color="success"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleReset}
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </Button>
      </Container>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
