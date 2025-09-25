
"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../slices/authSlice";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Paper,
  Stack,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // "error" | "success"
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Zod validation
    const result = loginSchema.safeParse(form);
   if (!result.success) {
  setSnackbar({
    open: true,
    message: result.error?.errors?.[0]?.message || "Invalid input",
    severity: "error",
  });
  return;
}


    // Dispatch login API
    dispatch(loginUser(form)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        const token = localStorage.getItem("token");
        if (token) {
          setSnackbar({
            open: true,
            message: "Login successful 🎉",
            severity: "success",
          });
          setTimeout(() => {
            router.push("/dashboard");
          }, 1200);
        }
      } else {
        setSnackbar({
          open: true,
          message: res.payload || "Login failed. Try again.",
          severity: "error",
        });
      }
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "skyblue",
        p: 2,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: 4,
          width: 400,
          borderRadius: 4,
          textAlign: "center",
        }}
      >
        {/* Logo */}
        <Box mb={2}>
          <Typography
            className="font-opensans-300"
            variant="h3"
            component="div"
            fontWeight="bold"
          >
            Dashboard Login
          </Typography>
        </Box>

        {/* Welcome message */}
        <Typography className="font-opensans-300" variant="h5" gutterBottom>
          Welcome Back
        </Typography>
        <Typography
          className="font-opensans-300"
          variant="body1"
          color="textSecondary"
          mb={3}
        >
          Let’s get started
        </Typography>

        {/* Form */}
        <Stack spacing={3} component="form" onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            required
            InputLabelProps={{
              sx: { fontSize: "1.1rem", fontFamily: "Open Sans" },
            }}
            InputProps={{
              sx: { fontSize: "1rem", fontFamily: "Open Sans" },
            }}
          />

          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            required
            InputLabelProps={{
              sx: { fontSize: "1.1rem", fontFamily: "Open Sans" },
            }}
            InputProps={{
              sx: { fontSize: "1rem", fontFamily: "Open Sans" },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box textAlign="right">
            <Link
              className="font-opensans-300"
              href="/forgot-password"
              underline="hover"
              variant="body2"
              sx={{ fontSize: "0.95rem" }}
            >
              Forgot Password?
            </Link>
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{
              fontSize: "1rem",
              fontWeight: "bold",
              textTransform: "none",
              borderRadius: 2,
              py: 1.2,
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Stack>

        {/* Sign up link */}
        <Typography className="font-opensans-300" variant="body1" mt={3}>
          Don’t have an account?{" "}
          <Link href="/register" underline="hover" sx={{ fontWeight: "bold" }}>
            Sign Up
          </Link>
        </Typography>
      </Paper>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
