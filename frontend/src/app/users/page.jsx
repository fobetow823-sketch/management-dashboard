

// // "use client";

// // import React, { useEffect, useState } from "react";
// // import {
// //   Box,
// //   Typography,
// //   Paper,
// //   Button,
// //   Table,
// //   TableHead,
// //   TableRow,
// //   TableCell,
// //   TableBody,
// //   Card,
// //   CardContent,
// //   Toolbar,
// // } from "@mui/material";
// // import Sidebar from "@/components/Sidebar";
// // import Header from "@/components/Header";

// // const drawerWidth = 200;
// // const headerHeight = 64; // adjust if your header height is different

// // export default function UsersPage() {
// //   const [role, setRole] = useState("USER"); // default
// //   const [users, setUsers] = useState([]);
// //   const [projects, setProjects] = useState([]);

// //   useEffect(() => {
// //     const userData = localStorage.getItem("user");
// //     if (userData) {
// //       try {
// //         const parsed = JSON.parse(userData);
// //         if (parsed?.role) {
// //           setRole(parsed.role.toUpperCase());
// //         }
// //       } catch (err) {
// //         console.error("Invalid user object in localStorage");
// //       }
// //     }

// //     setUsers([
// //       { id: 1, name: "Alice", role: "USER" },
// //       { id: 2, name: "Bob", role: "USER" },
// //     ]);
// //     setProjects([
// //       { id: 101, name: "Dashboard Revamp", manager: "Alice" },
// //       { id: 102, name: "API Integration", manager: "Bob" },
// //     ]);
// //   }, []);

// //   const renderContent = () => {
// //     if (role === "MANAGER") {
// //       return (
// //         <Box p={3}>
// //           <Typography variant="h5" fontWeight="bold" mb={2}>
// //             Manager Dashboard
// //           </Typography>
// //           <Box display="flex" gap={3}>
// //             <Card sx={{ flex: 1 }}>
// //               <CardContent>
// //                 <Typography variant="h6">Assigned Users</Typography>
// //                 <Typography variant="h4">{users.length}</Typography>
// //               </CardContent>
// //             </Card>
// //             <Card sx={{ flex: 1 }}>
// //               <CardContent>
// //                 <Typography variant="h6">Assigned Projects</Typography>
// //                 <Typography variant="h4">{projects.length}</Typography>
// //               </CardContent>
// //             </Card>
// //           </Box>
// //         </Box>
// //       );
// //     }

// //     if (role === "ADMIN") {
// //       return (
// //         <Box p={3}>
// //           <Typography variant="h5" fontWeight="bold" mb={2}>
// //             Admin - Manage Users
// //           </Typography>

// //           <Button
// //             variant="contained"
// //             color="primary"
// //             sx={{ mb: 2 }}
// //             onClick={() => alert("Add User form goes here")}
// //           >
// //             + Add User
// //           </Button>

// //           <Paper>
// //             <Table>
// //               <TableHead>
// //                 <TableRow>
// //                   <TableCell>ID</TableCell>
// //                   <TableCell>Name</TableCell>
// //                   <TableCell>Role</TableCell>
// //                   <TableCell>Actions</TableCell>
// //                 </TableRow>
// //               </TableHead>
// //               <TableBody>
// //                 {users.map((u) => (
// //                   <TableRow key={u.id}>
// //                     <TableCell>{u.id}</TableCell>
// //                     <TableCell>{u.name}</TableCell>
// //                     <TableCell>{u.role}</TableCell>
// //                     <TableCell>
// //                       <Button size="small" onClick={() => alert("Edit user")}>
// //                         Edit
// //                       </Button>
// //                       <Button
// //                         size="small"
// //                         color="error"
// //                         onClick={() => alert("Delete user")}
// //                       >
// //                         Delete
// //                       </Button>
// //                     </TableCell>
// //                   </TableRow>
// //                 ))}
// //               </TableBody>
// //             </Table>
// //           </Paper>
// //         </Box>
// //       );
// //     }

// //     // USER VIEW
// //     return (
// //       <Box   sx={{
// //     flexGrow: 1,
// //     bgcolor: "#F8F9FA",
// //     minHeight: "100vh",
// //     transition: "all 0.3s ease",
// //     width: "100%",   // Always full width
// //     ml: 0,           // No margin for sidebar
// //   }}>
// //         <Typography variant="h5" fontWeight="bold" mb={2}>
// //           My Profile
// //         </Typography>
// //         <Paper sx={{ p: 3 }}>
// //           <Typography variant="body1">
// //             <strong>Name:</strong> John Doe
// //           </Typography>
// //           <Typography variant="body1">
// //             <strong>Email:</strong> john@example.com
// //           </Typography>
// //           <Typography variant="body1">
// //             <strong>Role:</strong> User
// //           </Typography>
// //         </Paper>
// //       </Box>
// //     );
// //   };




// //   return (
// //     <Box sx={{ display: "flex", minHeight: "100vh" }}>
// //   {/* Sidebar (left) */}
// //   <Sidebar />

// //   {/* Main Content (right) */}
// //   <Box sx={{ flexGrow: 1, bgcolor: "#F8F9FA" }}>
// //     <Header />
// //     <Toolbar /> {/* To of{/* optional, if Header uses MUI AppBar and Toolbar spacing */}
// //         {renderContent()}
// //       </Box>
// //     </Box>
// //   );
// // }


// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   Button,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Card,
//   CardContent,
//   Toolbar,
//   TextField,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// import Sidebar from "@/components/Sidebar";
// import Header from "@/components/Header";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// export default function UsersPage() {
//   const [role, setRole] = useState("USER");
//   const [users, setUsers] = useState([]);
//   const [projects, setProjects] = useState([]);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [editingUser, setEditingUser] = useState(null);
//   const [form, setForm] = useState({ name: "", email: "", password: "", role: "employee" });

//   // ✅ Fetch Users
//   const fetchUsers = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.get(`${API_BASE}/users`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUsers(res.data);
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Error fetching users");
//     }
//   };

//   // ✅ Delete User
//   const handleDelete = async (id) => {
//     if (!confirm("Are you sure you want to delete this user?")) return;
//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`${API_BASE}/users/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success("User deleted successfully ✅");
//       fetchUsers();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Error deleting user");
//     }
//   };

//   // ✅ Open Add/Edit Dialog
//   const handleOpenDialog = (user = null) => {
//     setEditingUser(user);
//     if (user) {
//       setForm({ name: user.name, email: user.email, role: user.role, password: "" });
//     } else {
//       setForm({ name: "", email: "", password: "", role: "employee" });
//     }
//     setOpenDialog(true);
//   };

//   // ✅ Save (Add or Update)
//   const handleSave = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       if (editingUser) {
//         await axios.put(`${API_BASE}/users/${editingUser._id}`, form, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         toast.success("User updated successfully 🎉");
//       } else {
//         await axios.post(`${API_BASE}/auth/register`, form, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         toast.success("User created successfully 🎉");
//       }

//       setOpenDialog(false);
//       fetchUsers();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Error saving user");
//     }
//   };

//   // ✅ Get Role from localStorage & fetch users
//   useEffect(() => {
//     const userData = localStorage.getItem("user");
//     if (userData) {
//       try {
//         const parsed = JSON.parse(userData);
//         if (parsed?.role) {
//           setRole(parsed.role.toUpperCase());
//         }
//       } catch {
//         toast.error("Invalid user data in localStorage");
//       }
//     }
//     fetchUsers();

//     // Dummy projects
//     setProjects([
//       { id: 101, name: "Dashboard Revamp", manager: "Alice" },
//       { id: 102, name: "API Integration", manager: "Bob" },
//     ]);
//   }, []);

//   // ✅ Render by role
//   const renderContent = () => {
//     if (role === "MANAGER") {
//       return (
//         <Box p={3}>
//           <Typography variant="h5" fontWeight="bold" mb={2}>
//             Manager Dashboard
//           </Typography>
//           <Box display="flex" gap={3}>
//             <Card sx={{ flex: 1 }}>
//               <CardContent>
//                 <Typography variant="h6">Assigned Users</Typography>
//                 <Typography variant="h4">{users.length}</Typography>
//               </CardContent>
//             </Card>
//             <Card sx={{ flex: 1 }}>
//               <CardContent>
//                 <Typography variant="h6">Assigned Projects</Typography>
//                 <Typography variant="h4">{projects.length}</Typography>
//               </CardContent>
//             </Card>
//           </Box>
//         </Box>
//       );
//     }

//     if (role === "ADMIN") {
//       return (
//         <Box p={3}>
//           <Typography variant="h5" fontWeight="bold" mb={2}>
//             Admin - Manage Users
//           </Typography>

//           <Button
//             variant="contained"
//             color="primary"
//             sx={{ mb: 2 }}
//             onClick={() => handleOpenDialog()}
//           >
//             + Add User
//           </Button>

//           <Paper>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Name</TableCell>
//                   <TableCell>Email</TableCell>
//                   <TableCell>Role</TableCell>
//                   <TableCell>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {users.map((u) => (
//                   <TableRow key={u._id}>
//                     <TableCell>{u.name}</TableCell>
//                     <TableCell>{u.email}</TableCell>
//                     <TableCell>{u.role}</TableCell>
//                     <TableCell>
//                       <Button size="small" onClick={() => handleOpenDialog(u)}>
//                         Edit
//                       </Button>
//                       <Button
//                         size="small"
//                         color="error"
//                         onClick={() => handleDelete(u._id)}
//                       >
//                         Delete
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </Paper>

//           {/* Add/Edit Dialog */}
//           <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
//             <DialogTitle>{editingUser ? "Edit User" : "Add User"}</DialogTitle>
//             <DialogContent>
//               <TextField
//                 label="Name"
//                 fullWidth
//                 margin="normal"
//                 value={form.name}
//                 onChange={(e) => setForm({ ...form, name: e.target.value })}
//               />
//               <TextField
//                 label="Email"
//                 fullWidth
//                 margin="normal"
//                 value={form.email}
//                 onChange={(e) => setForm({ ...form, email: e.target.value })}
//               />
//               {!editingUser && (
//                 <TextField
//                   label="Password"
//                   type="password"
//                   fullWidth
//                   margin="normal"
//                   value={form.password}
//                   onChange={(e) => setForm({ ...form, password: e.target.value })}
//                 />
//               )}
//               <TextField
//                 label="Role"
//                 fullWidth
//                 margin="normal"
//                 value={form.role}
//                 onChange={(e) => setForm({ ...form, role: e.target.value })}
//               />
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
//               <Button onClick={handleSave} variant="contained" color="primary">
//                 Save
//               </Button>
//             </DialogActions>
//           </Dialog>
//         </Box>
//       );
//     }

//     // USER PROFILE
//     return (
//       <Box p={3}>
//         <Typography variant="h5" fontWeight="bold" mb={2}>
//           My Profile
//         </Typography>
//         <Paper sx={{ p: 3 }}>
//           <Typography variant="body1">
//             <strong>Name:</strong> {JSON.parse(localStorage.getItem("user"))?.name}
//           </Typography>
//           <Typography variant="body1">
//             <strong>Email:</strong> {JSON.parse(localStorage.getItem("user"))?.email}
//           </Typography>
//           <Typography variant="body1">
//             <strong>Role:</strong> {role}
//           </Typography>
//         </Paper>
//       </Box>
//     );
//   };

//   return (
//     <Box sx={{ display: "flex", minHeight: "100vh" }}>
//       <Sidebar />
//       <Box sx={{ flexGrow: 1, bgcolor: "#F8F9FA" }}>
//         <Header />
//         <Toolbar />
//         {renderContent()}
//       </Box>
//       {/* Toast Notifications */}
//       <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
//     </Box>
//   );
// }


"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Card,
  CardContent,
  Toolbar,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function UsersPage() {
  const [role, setRole] = useState("USER");
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "employee" });
  const [currentUser, setCurrentUser] = useState(null);

  // ✅ Fetch Users
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_BASE}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error fetching users");
    }
  };

  // ✅ Delete User
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE}/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("User deleted successfully ✅");
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error deleting user");
    }
  };

  // ✅ Open Add/Edit Dialog
  const handleOpenDialog = (user = null) => {
    setEditingUser(user);
    if (user) {
      setForm({ name: user.name, email: user.email, role: user.role, password: "" });
    } else {
      setForm({ name: "", email: "", password: "", role: "employee" });
    }
    setOpenDialog(true);
  };

  // ✅ Save (Add or Update)
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      if (editingUser) {
        await axios.put(`${API_BASE}/users/${editingUser._id}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("User updated successfully 🎉");
      } else {
        await axios.post(`${API_BASE}/auth/register`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("User created successfully 🎉");
      }

      setOpenDialog(false);
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error saving user");
    }
  };

  // ✅ Get Role & User Info from localStorage & fetch users
 useEffect(() => {
  const userData = localStorage.getItem("user");
  if (userData) {
    try {
      const parsed = JSON.parse(userData);
      setCurrentUser(parsed);

      if (parsed?.role) {
        const r = parsed.role.toUpperCase();
        setRole(r);

        if (r === "ADMIN") {
          fetchUsers();   // ✅ only admins fetch users
        } else if (r === "MANAGER") {
          setProjects([
            { id: 101, name: "Dashboard Revamp", manager: "Alice" },
            { id: 102, name: "API Integration", manager: "Bob" },
          ]);
        }
        // Employees don’t fetch users/projects → they just see profile
      }
    } catch {
      toast.error("Invalid user data in localStorage");
    }
  }
}, []);


  // ✅ Render by role
  const renderContent = () => {
    if (role === "MANAGER") {
      return (
        <Box p={3}>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Manager Dashboard
          </Typography>
          <Box display="flex" gap={3}>
            <Card sx={{ flex: 1 }}>
              <CardContent>
                <Typography variant="h6">Assigned Users</Typography>
                <Typography variant="h4">{users.length}</Typography>
              </CardContent>
            </Card>
            <Card sx={{ flex: 1 }}>
              <CardContent>
                <Typography variant="h6">Assigned Projects</Typography>
                <Typography variant="h4">{projects.length}</Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
      );
    }

    if (role === "ADMIN") {
      return (
        <Box p={3}>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Admin - Manage Users
          </Typography>

          <Button
            variant="contained"
            color="primary"
            sx={{ mb: 2 }}
            onClick={() => handleOpenDialog()}
          >
            + Add User
          </Button>

          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((u) => (
                  <TableRow key={u._id}>
                    <TableCell>{u.name}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>{u.role}</TableCell>
                    <TableCell>
                      <Button size="small" onClick={() => handleOpenDialog(u)}>
                        Edit
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => handleDelete(u._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>

          {/* Add/Edit Dialog */}
          <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle>{editingUser ? "Edit User" : "Add User"}</DialogTitle>
            <DialogContent>
              <TextField
                label="Name"
                fullWidth
                margin="normal"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              {!editingUser && (
                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              )}
              <TextField
                label="Role"
                fullWidth
                margin="normal"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
              <Button onClick={handleSave} variant="contained" color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      );
    }

    // USER PROFILE
    return (
      <Box p={3}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          My User Profile
        </Typography>
        <Paper sx={{ p: 3 }}>
          <Typography variant="body1">
            <strong>Name:</strong> {currentUser?.name}
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> {currentUser?.email}
          </Typography>
          <Typography variant="body1">
            <strong>Role:</strong> {role}
          </Typography>
        </Paper>
      </Box>
    );
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, bgcolor: "#F8F9FA" }}>
        <Header />
        <Toolbar />
        {renderContent()}
      </Box>
      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </Box>
  );
}
