
// // "use client";

// // import React, { useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { registerUser } from "../../slices/authSlice";
// // import { useRouter } from "next/navigation";
// // import {
// //   Box,
// //   Button,
// //   TextField,
// //   Typography,
// //   Link,
// //   Paper,
// //   Stack,
// //   InputAdornment,
// //   IconButton,
// //   Snackbar,
// //   Alert,
// // } from "@mui/material";
// // import { Visibility, VisibilityOff } from "@mui/icons-material";
// // import { z } from "zod";

// // const registerSchema = z.object({
// //   name: z.string().min(2, "Name must be at least 2 characters"),
// //   email: z.string().email("Invalid email address"),
// //   password: z.string().min(6, "Password must be at least 6 characters"),
// // });

// // export default function RegisterPage() {
// //   const dispatch = useDispatch();
// //   const router = useRouter();

// //   const { loading } = useSelector((state) => state.auth);

// //   const [form, setForm] = useState({ name: "", email: "", password: "" });
// //   const [showPassword, setShowPassword] = useState(false);

// //   // Snackbar state
// //   const [snackbar, setSnackbar] = useState({
// //     open: false,
// //     message: "",
// //     severity: "success", // "error" | "success"
// //   });

// //   const handleCloseSnackbar = () => {
// //     setSnackbar({ ...snackbar, open: false });
// //   };

// //   const handleChange = (e) => {
// //     setForm({ ...form, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();

// //     // Zod validation
// //     const result = registerSchema.safeParse(form);
// //     if (!result.success) {
// //       setSnackbar({
// //         open: true,
// //         message: result.error.errors[0].message,
// //         severity: "error",
// //       });
// //       return;
// //     }

// //     // Dispatch register API
// //     dispatch(registerUser(form)).then((res) => {
// //       if (res.meta.requestStatus === "fulfilled") {
// //         setSnackbar({
// //           open: true,
// //           message: "Registration successful! 🎉",
// //           severity: "success",
// //         });
// //         setTimeout(() => {
// //           router.push("/login");
// //         }, 1200);
// //       } else {
// //         setSnackbar({
// //           open: true,
// //           message: res.payload || "Registration failed. Try again.",
// //           severity: "error",
// //         });
// //       }
// //     });
// //   };

// //   return (
// //     <Box
// //       sx={{
// //         minHeight: "100vh",
// //         display: "flex",
// //         justifyContent: "center",
// //         alignItems: "center",
// //         background: "#c1f0c1", // Light green background
// //         p: 2,
// //       }}
// //     >
// //       <Paper
// //         elevation={8}
// //         sx={{
// //           p: 4,
// //           width: 400,
// //           borderRadius: 4,
// //           textAlign: "center",
// //         }}
// //       >
// //         {/* Logo */}
// //         <Box mb={2}>
// //           <Typography
// //             className="font-opensans-300"
// //             variant="h3"
// //             component="div"
// //             fontWeight="bold"
// //           >
// //             Create Account
// //           </Typography>
// //         </Box>

// //         {/* Welcome message */}
// //         <Typography className="font-opensans-300" variant="h5" gutterBottom>
// //           Join Us Today
// //         </Typography>
// //         <Typography
// //           className="font-opensans-300"
// //           variant="body1"
// //           color="textSecondary"
// //           mb={3}
// //         >
// //           Let's get you started
// //         </Typography>

// //         {/* Form */}
// //         <Stack spacing={3} component="form" onSubmit={handleSubmit}>
// //           <TextField
// //             label="Full Name"
// //             type="text"
// //             name="name"
// //             value={form.name}
// //             onChange={handleChange}
// //             fullWidth
// //             required
// //             InputLabelProps={{
// //               sx: { fontSize: "1.1rem", fontFamily: "Open Sans" },
// //             }}
// //             InputProps={{
// //               sx: { fontSize: "1rem", fontFamily: "Open Sans" },
// //             }}
// //           />

// //           <TextField
// //             label="Email"
// //             type="email"
// //             name="email"
// //             value={form.email}
// //             onChange={handleChange}
// //             fullWidth
// //             required
// //             InputLabelProps={{
// //               sx: { fontSize: "1.1rem", fontFamily: "Open Sans" },
// //             }}
// //             InputProps={{
// //               sx: { fontSize: "1rem", fontFamily: "Open Sans" },
// //             }}
// //           />

// //           <TextField
// //             label="Password"
// //             type={showPassword ? "text" : "password"}
// //             name="password"
// //             value={form.password}
// //             onChange={handleChange}
// //             fullWidth
// //             required
// //             InputLabelProps={{
// //               sx: { fontSize: "1.1rem", fontFamily: "Open Sans" },
// //             }}
// //             InputProps={{
// //               sx: { fontSize: "1rem", fontFamily: "Open Sans" },
// //               endAdornment: (
// //                 <InputAdornment position="end">
// //                   <IconButton
// //                     onClick={() => setShowPassword(!showPassword)}
// //                     edge="end"
// //                   >
// //                     {showPassword ? <VisibilityOff /> : <Visibility />}
// //                   </IconButton>
// //                 </InputAdornment>
// //               ),
// //             }}
// //           />

// //           <Button
// //             type="submit"
// //             variant="contained"
// //             color="primary"
// //             fullWidth
// //             disabled={loading}
// //             sx={{
// //               fontSize: "1rem",
// //               fontWeight: "bold",
// //               textTransform: "none",
// //               borderRadius: 2,
// //               py: 1.2,
// //               mt: 1,
// //             }}
// //           >
// //             {loading ? "Creating Account..." : "Register"}
// //           </Button>
// //         </Stack>

// //         {/* Login link */}
// //         <Typography className="font-opensans-300" variant="body1" mt={3}>
// //           Already have an account?{" "}
// //           <Link href="/login" underline="hover" sx={{ fontWeight: "bold" }}>
// //             Login
// //           </Link>
// //         </Typography>
// //       </Paper>

// //       {/* Snackbar */}
// //       <Snackbar
// //         open={snackbar.open}
// //         autoHideDuration={2500}
// //         onClose={handleCloseSnackbar}
// //         anchorOrigin={{ vertical: "top", horizontal: "center" }}
// //       >
// //         <Alert
// //           onClose={handleCloseSnackbar}
// //           severity={snackbar.severity}
// //           sx={{ width: "100%" }}
// //         >
// //           {snackbar.message}
// //         </Alert>
// //       </Snackbar>
// //     </Box>
// //   );
// // }


// "use client";

// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { registerUser } from "../../slices/authSlice";
// import { useRouter } from "next/navigation";
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   Link,
//   Paper,
//   Stack,
//   InputAdornment,
//   IconButton,
//   Snackbar,
//   Alert,
//   MenuItem,
// } from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { z } from "zod";

// // Validation schema including role
// const registerSchema = z.object({
//   name: z.string().min(2, "Name must be at least 2 characters"),
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
//   role: z.enum(["employee", "manager"], {
//     required_error: "Role is required",
//   }),
// });

// export default function RegisterPage() {
//   const dispatch = useDispatch();
//   const router = useRouter();
// const [errors, setErrors] = useState({});

//   const { loading } = useSelector((state) => state.auth);

//   const [form, setForm] = useState({ name: "", email: "", password: "", role: "employee" });
//   const [showPassword, setShowPassword] = useState(false);

//   // Snackbar state
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   const handleCloseSnackbar = () => {
//     setSnackbar({ ...snackbar, open: false });
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//    const result = registerSchema.safeParse(form);

// if (!result.success) {
//   const fieldErrors = {};
//   // ✅ result.error.format() gives a structured object
//   result.error.errors?.forEach((err) => {
//     if (err.path.length > 0) {
//       fieldErrors[err.path[0]] = err.message;
//     }
//   });
//   setErrors(fieldErrors);
//   return;
// }

// setErrors({});



//     // Dispatch register API
//     dispatch(registerUser(form)).then((res) => {
//       if (res.meta.requestStatus === "fulfilled") {
//         setSnackbar({
//           open: true,
//           message: "Registration successful! 🎉",
//           severity: "success",
//         });
//         setTimeout(() => {
//           router.push("/login");
//         }, 1200);
//       } else {
//         setSnackbar({
//           open: true,
//           message: res.payload || "Registration failed. Try again.",
//           severity: "error",
//         });
//       }
//     });
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         background: "#c1f0c1",
//         p: 2,
//       }}
//     >
//       <Paper
//         elevation={8}
//         sx={{
//           p: 4,
//           width: 400,
//           borderRadius: 4,
//           textAlign: "center",
//         }}
//       >
//         {/* Logo */}
//         <Box mb={2}>
//           <Typography
//             className="font-opensans-300"
//             variant="h3"
//             component="div"
//             fontWeight="bold"
//           >
//             Create Account
//           </Typography>
//         </Box>

//         {/* Welcome message */}
//         <Typography className="font-opensans-300" variant="h5" gutterBottom>
//           Join Us Today
//         </Typography>
//         <Typography
//           className="font-opensans-300"
//           variant="body1"
//           color="textSecondary"
//           mb={3}
//         >
//           Let's get you started
//         </Typography>

//         {/* Form */}
//         <Stack spacing={3} component="form" onSubmit={handleSubmit}>
//           <TextField
//             label="Full Name"
//             type="text"
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             fullWidth
//             required
//               error={!!errors.name}
//   helperText={errors.name}
//           />

//           <TextField
//             label="Email"
//             type="email"
//             name="email"
//             value={form.email}
//             onChange={handleChange}
//             fullWidth
//             required
//               error={!!errors.email}
//   helperText={errors.email}
//           />

//           <TextField
//             label="Password"
//             type={showPassword ? "text" : "password"}
//             name="password"
//             value={form.password}
//             onChange={handleChange}
//             fullWidth
//             required
//               error={!!errors.password}
//   helperText={errors.password}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     onClick={() => setShowPassword(!showPassword)}
//                     edge="end"
//                   >
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />

//           {/* Role Dropdown */}
//           <TextField
//             select
//             label="Role"
//             name="role"
//             value={form.role}
//             onChange={handleChange}
//             fullWidth
//             required
//               error={!!errors.role}
//   helperText={errors.role}
//           >
//             <MenuItem value="employee">Employee</MenuItem>
//             <MenuItem value="manager">Manager</MenuItem>
//           </TextField>

//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             fullWidth
//             disabled={loading}
//             sx={{
//               fontSize: "1rem",
//               fontWeight: "bold",
//               textTransform: "none",
//               borderRadius: 2,
//               py: 1.2,
//               mt: 1,
//                   backgroundColor: "#1976d2", // default blue
//     "&:hover": {
//       backgroundColor: "#c1f0c1", // match background green
//       color: "black"
//     },
//             }}
//           >
          
//             {loading ? "Creating Account..." : "Register"}
//           </Button>
//         </Stack>

//         {/* Login link */}
//         <Typography className="font-opensans-300" variant="body1" mt={3}>
//           Already have an account?{" "}
//           <Link href="/login" underline="hover" sx={{ fontWeight: "bold" }}>
//             Login
//           </Link>
//         </Typography>
//       </Paper>

//       {/* Snackbar */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={2500}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert
//           onClose={handleCloseSnackbar}
//           severity={snackbar.severity}
//           sx={{ width: "100%" ,
//                  fontSize: "1.3rem",   // larger text
//       p: 2,                 // more padding
//       borderRadius: 2,      // rounded
//           }}

//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// }


"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../slices/authSlice";
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
  MenuItem,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { z } from "zod";

// ✅ Validation schema including role
const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["employee", "manager"], { required_error: "Role is required" }),
});

export default function RegisterPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading } = useSelector((state) => state.auth);

  // Form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
  });
  const [showPassword, setShowPassword] = useState(false);

  // Errors state (default empty strings for helperText consistency)
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Clear error for a field when typing
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    const parsed = registerSchema.safeParse(form);

    if (!parsed.success) {
      const fe = parsed.error.flatten().fieldErrors;
      setErrors({
        name: fe.name?.[0] || "",
        email: fe.email?.[0] || "",
        password: fe.password?.[0] || "",
        role: fe.role?.[0] || "",
      });
      setSnackbar({
        open: true,
        message: "Please fix the highlighted fields.",
        severity: "error",
      });
      return;
    }

    setErrors({ name: "", email: "", password: "", role: "" });

    dispatch(registerUser(parsed.data)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        setSnackbar({
          open: true,
          message: "Registration successful! 🎉",
          severity: "success",
        });
        setTimeout(() => router.push("/login"), 1200);
      } else {
        setSnackbar({
          open: true,
          message: res.payload || "Registration failed. Try again.",
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
        background: "#c1f0c1",
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
            Create Account
          </Typography>
        </Box>

        {/* Welcome message */}
        <Typography className="font-opensans-300" variant="h5" gutterBottom>
          Join Us Today
        </Typography>
        <Typography
          className="font-opensans-300"
          variant="body1"
          color="textSecondary"
          mb={3}
        >
          Let's get you started
        </Typography>

        {/* Form */}
        <Stack spacing={3} component="form" onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.name}
            helperText={errors.name || " "}
          />

          <TextField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.email}
            helperText={errors.email || " "}
          />

          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.password}
            helperText={errors.password || " "}
            InputProps={{
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

          {/* Role Dropdown */}
          <TextField
            select
            label="Role"
            name="role"
            value={form.role}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.role}
            helperText={errors.role || " "}
          >
            <MenuItem value="employee">Employee</MenuItem>
            <MenuItem value="manager">Manager</MenuItem>
          </TextField>

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
              mt: 1,
              backgroundColor: "#1976d2", // default blue
              "&:hover": {
                backgroundColor: "#c1f0c1", // match background green
                color: "black",
              },
            }}
          >
            {loading ? "Creating Account..." : "Register"}
          </Button>
        </Stack>

        {/* Login link */}
        <Typography className="font-opensans-300" variant="body1" mt={3}>
          Already have an account?{" "}
          <Link href="/login" underline="hover" sx={{ fontWeight: "bold" }}>
            Login
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
          sx={{
            width: "100%",
            fontSize: "1.1rem",
            p: 2,
            borderRadius: 2,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
