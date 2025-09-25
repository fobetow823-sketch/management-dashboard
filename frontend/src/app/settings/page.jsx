// ///////////
// "use client";

// import React, { useState } from "react";
// import {
//   Box,
//   CssBaseline,
//   Container,
//   Typography,
//   Grid,
//   Paper,
//   Toolbar,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
// } from "@mui/material";
// import Sidebar from "@/components/Sidebar";
// import Header from "@/components/Header";
// import LockResetIcon from "@mui/icons-material/LockReset";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import axios from "axios";

// export default function SettingsPage() {
//   const [open, setOpen] = useState(true);
//   const [resetDialogOpen, setResetDialogOpen] = useState(false);
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);

//   const options = [
//     {
//       icon: <LockResetIcon sx={{ fontSize: 40, color: "#38A169" }} />,
//       title: "Reset Password",
//       description: "Change your account password securely.",
//       action: () => setResetDialogOpen(true),
//       color: "#38A169",
//     },
//     {
//       icon: <DeleteForeverIcon sx={{ fontSize: 40, color: "#E53E3E" }} />,
//       title: "Delete Account",
//       description: "Permanently remove your account and data.",
//       action: () => setDeleteDialogOpen(true),
//       color: "#E53E3E",
//     },
//   ];

//   const handleSendResetEmail = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, { email });
//       alert(res.data.message);
//       setResetDialogOpen(false);
//       setEmail("");
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || "Error sending reset email");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box sx={{ display: "flex", fontFamily: "'Poppins', sans-serif" }}>
//       <CssBaseline />
//       <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');`}</style>

//       <Header open={open} setOpen={setOpen} />
//       <Sidebar open={open} />

//       <Box component="main" sx={{ flexGrow: 1, bgcolor: "#F8F9FA", minHeight: "100vh", transition: "all 0.3s ease", width: "100%", ml: 0, p: 4 }}>
//         <Toolbar />
//         <Container maxWidth="lg" sx={{ mt: 4 }}>
//           <Typography variant="h3" align="center" gutterBottom sx={{ color: "#0b0c0cff", fontWeight: "bold", mb: 3 }}>
//             Settings
//           </Typography>

//           <Grid container spacing={4}>
//             {options.map(({ icon, title, description, action, color }, index) => (
//               <Grid item xs={12} sm={6} key={index}>
//                 <Paper
//                   elevation={3}
//                   sx={{ display: "flex", alignItems: "center", gap: 2, p: 3, borderRadius: 2, boxShadow: `0 6px 20px ${color}40`, height: "100%", backgroundColor: "#fff", cursor: "pointer", "&:hover": { transform: "scale(1.03)", transition: "0.3s" } }}
//                   onClick={action}
//                 >
//                   <Box sx={{ bgcolor: `${color}20`, borderRadius: 2, p: 1.5, display: "flex", alignItems: "center", justifyContent: "center", width: 60, height: 60, flexShrink: 0 }}>
//                     {icon}
//                   </Box>
//                   <Box>
//                     <Typography variant="h6" sx={{ fontWeight: "600", color }}>{title}</Typography>
//                     <Typography variant="body2" sx={{ color: "#555", mt: 0.5 }}>{description}</Typography>
//                   </Box>
//                 </Paper>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>

//         {/* Reset Password Dialog */}
//         <Dialog open={resetDialogOpen} onClose={() => setResetDialogOpen(false)}>
//           <DialogTitle>Reset Password</DialogTitle>
//           <DialogContent>
//             <TextField
//               autoFocus
//               margin="dense"
//               label="Email Address"
//               type="email"
//               fullWidth
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setResetDialogOpen(false)}>Cancel</Button>
//             <Button variant="contained" color="success" onClick={handleSendResetEmail} disabled={loading}>
//               {loading ? "Sending..." : "Send Email"}
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* Delete Account Dialog */}
//         <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
//           <DialogTitle>Delete Account</DialogTitle>
//           <DialogContent>
//             <Typography>Are you sure you want to delete your account? This action cannot be undone.</Typography>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
//             <Button variant="contained" color="error">Delete</Button>
//           </DialogActions>
//         </Dialog>
//       </Box>
//     </Box>
//   );
// }


"use client";

import React, { useState } from "react";
import {
  Box,
  CssBaseline,
  Container,
  Typography,
  Grid,
  Paper,
  Toolbar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import LockResetIcon from "@mui/icons-material/LockReset";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import axios from "axios";

export default function SettingsPage() {
  const [open, setOpen] = useState(true);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  const options = [
    {
      icon: <LockResetIcon sx={{ fontSize: 40, color: "#38A169" }} />,
      title: "Reset Password",
      description: "Change your account password securely.",
      action: () => setResetDialogOpen(true),
      color: "#38A169",
    },
    {
      icon: <DeleteForeverIcon sx={{ fontSize: 40, color: "#E53E3E" }} />,
      title: "Delete Account",
      description: "Permanently remove your account and data.",
      action: () => setDeleteDialogOpen(true),
      color: "#E53E3E",
    },
  ];

  // Send reset password email
  const handleSendResetEmail = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, { email });
      setSnackbar({ open: true, message: res.data.message, severity: "success" });
      setResetDialogOpen(false);
      setEmail("");
    } catch (err) {
      setSnackbar({ open: true, message: err.response?.data?.message || "Error sending reset email", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Delete account
  const handleDeleteAccount = async () => {
    if (!email || !password) {
      setSnackbar({ open: true, message: "Please fill in both email and password", severity: "error" });
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token"); // get JWT token
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/users/delete`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { email, password }, // DELETE body
      });

      setSnackbar({ open: true, message: res.data.message, severity: "success" });
      setDeleteDialogOpen(false);
      setEmail("");
      setPassword("");
        
      localStorage.clear();

      // Optional: redirect after deletion
      setTimeout(() => window.location.href = "/", 1500);
    } catch (err) {
      setSnackbar({ open: true, message: err.response?.data?.message || "Error deleting account", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", fontFamily: "'Poppins', sans-serif" }}>
      <CssBaseline />
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');`}</style>

      <Header open={open} setOpen={setOpen} />
      <Sidebar open={open} />

      <Box component="main" sx={{ flexGrow: 1, bgcolor: "#F8F9FA", minHeight: "100vh", transition: "all 0.3s ease", width: "100%", ml: 0, p: 4 }}>
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Typography variant="h3" align="center" gutterBottom sx={{ color: "#0b0c0cff", fontWeight: "bold", mb: 3 }}>
            Settings
          </Typography>

          <Grid container spacing={4}>
            {options.map(({ icon, title, description, action, color }, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Paper
                  elevation={3}
                  sx={{ display: "flex", alignItems: "center", gap: 2, p: 3, borderRadius: 2, boxShadow: `0 6px 20px ${color}40`, height: "100%", backgroundColor: "#fff", cursor: "pointer", "&:hover": { transform: "scale(1.03)", transition: "0.3s" } }}
                  onClick={action}
                >
                  <Box sx={{ bgcolor: `${color}20`, borderRadius: 2, p: 1.5, display: "flex", alignItems: "center", justifyContent: "center", width: 60, height: 60, flexShrink: 0 }}>
                    {icon}
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: "600", color }}>{title}</Typography>
                    <Typography variant="body2" sx={{ color: "#555", mt: 0.5 }}>{description}</Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Reset Password Dialog */}
        <Dialog open={resetDialogOpen} onClose={() => setResetDialogOpen(false)}>
          <DialogTitle>Reset Password</DialogTitle>
          <DialogContent>
            <TextField autoFocus margin="dense" label="Email Address" type="email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setResetDialogOpen(false)}>Cancel</Button>
            <Button variant="contained" color="success" onClick={handleSendResetEmail} disabled={loading}>
              {loading ? "Sending..." : "Send Email"}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Account Dialog */}
        <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
          <DialogTitle>Delete Account</DialogTitle>
          <DialogContent>
            <Typography>To delete your account, please confirm your email and password:</Typography>
            <TextField margin="dense" label="Email" type="email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField margin="dense" label="Password" type="password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="contained" color="error" onClick={handleDeleteAccount} disabled={loading}>
              {loading ? "Deleting..." : "Delete"}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar */}
        <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}
