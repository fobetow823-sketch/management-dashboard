
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
//   MenuItem,
// } from "@mui/material";
// import Sidebar from "@/components/Sidebar";
// import Header from "@/components/Header";
// import { toast, ToastContainer } from "react-toastify";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchUsers,
//   fetchEmployees,
//   createUser,
//   updateUser,
//   deleteUser,
// } from "../../slices/userSlice"

// export default function UsersPage() {
//   const dispatch = useDispatch();
//   const { users, loading, error } = useSelector((state) => state.users);

//   const [role, setRole] = useState("USER");
//   const [openDialog, setOpenDialog] = useState(false);
//   const [editingUser, setEditingUser] = useState(null);
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "employee",
//   });
//   const [currentUser, setCurrentUser] = useState(null);

//   // Pagination state
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   // Handle page change
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   // Handle rows per page change
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0); // Reset page to first
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
//       if (editingUser) {
//         await dispatch(updateUser({ id: editingUser._id, form })).unwrap();
//         toast.success("User updated successfully 🎉");
//       } else {
//         await dispatch(createUser(form)).unwrap();
//         toast.success("User created successfully 🎉");
//       }
//       setOpenDialog(false);
//     } catch (err) {
//       toast.error(err || "Error saving user");
//     }
//   };

//   // ✅ Delete User (Admin only)
//   const handleDelete = async (_id) => {
//     if (!confirm("Are you sure you want to delete this user?")) return;
//     try {
//       await dispatch(deleteUser(_id)).unwrap();
//       toast.success("User deleted successfully ✅");
//     } catch (err) {
//       toast.error(err || "Error deleting user");
//     }
//   };

//   // ✅ Load user role & fetch data
//   useEffect(() => {
//     const userData = localStorage.getItem("user");
//     if (userData) {
//       try {
//         const parsed = JSON.parse(userData);
//         setCurrentUser(parsed);

//         if (parsed?.role) {
//           const r = parsed.role.toUpperCase();
//           setRole(r);

//           if (r === "ADMIN") {
//             dispatch(fetchUsers());
//           } else if (r === "MANAGER") {
//             dispatch(fetchEmployees());
//           }
//         }
//       } catch {
//         toast.error("Invalid user data in localStorage");
//       }
//     }
//   }, [dispatch]);

//   // ✅ Render Content by Role
//   const renderContent = () => {
//     if (loading) return <Typography>Loading...</Typography>;
//     if (error) return <Typography color="error">{error}</Typography>;

//     if (role === "MANAGER") {
//       return (
//         <Box p={3}>
//           <Typography variant="h5" fontWeight="bold" mb={2}>
//             Manager Dashboard
//           </Typography>

//           <Box display="flex" gap={3} mb={3}>
//             <Card sx={{ flex: 1 }}>
//               <CardContent>
//                 <Typography variant="h6">Total Employees</Typography>
//                 <Typography variant="h4">{users.length}</Typography>
//               </CardContent>
//             </Card>
//           </Box>

//           {/* Employee List */}
//           <Paper>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Name</TableCell>
//                   <TableCell>Email</TableCell>
//                   <TableCell>Role</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {users.map((u) => (
//                   <TableRow key={u._id}>
//                     <TableCell>{u.name}</TableCell>
//                     <TableCell>{u.email}</TableCell>
//                     <TableCell>{u.role}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </Paper>
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

//               {/* Role Dropdown */}
//               <TextField
//                 select
//                 label="Role"
//                 fullWidth
//                 margin="normal"
//                 value={form.role}
//                 onChange={(e) => setForm({ ...form, role: e.target.value })}
//               >
//                 <MenuItem value="employee">Employee</MenuItem>
//                 <MenuItem value="manager">Manager</MenuItem>
//                 <MenuItem value="admin">Admin</MenuItem>
//               </TextField>
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

//     // USER PROFILE (Employee view)
//     return (
//       <Box p={3}>
//         <Typography variant="h5" fontWeight="bold" mb={2}>
//           My User Profile
//         </Typography>
//         <Paper sx={{ p: 3 }}>
//           <Typography variant="body1">
//             <strong>Name:</strong> {currentUser?.name}
//           </Typography>
//           <Typography variant="body1">
//             <strong>Email:</strong> {currentUser?.email}
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


// "use client";

// import React, { useEffect, useState, useCallback } from "react";
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
//   MenuItem,
//   TableSortLabel,
//   TablePagination,
//   CircularProgress,
// } from "@mui/material";
// import Sidebar from "@/components/Sidebar";
// import Header from "@/components/Header";
// import { toast, ToastContainer } from "react-toastify";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchUsers,
//   fetchEmployees,
//   createUser,
//   updateUser,
//   deleteUser,
//   setPage,
//   setRowsPerPage,
//   setSearch,
//   setSort,
// } from "../../slices/userSlice";

// // ---------- Debounce Hook ----------
// function useDebounce(value, delay) {
//   const [debouncedValue, setDebouncedValue] = useState(value);

//   useEffect(() => {
//     const handler = setTimeout(() => setDebouncedValue(value), delay);
//     return () => clearTimeout(handler);
//   }, [value, delay]);

//   return debouncedValue;
// }

// export default function UsersPage() {
//   const dispatch = useDispatch();
//   const {
//     users,
//     total,
//     loading,
//     error,
//     role: stateRole,
//     page,
//     rowsPerPage,
//     search: stateSearch,
//     sortBy,
//     sortOrder,
//   } = useSelector((state) => state.users);

//   const [role, setRole] = useState("USER");
//   const [openDialog, setOpenDialog] = useState(false);
//   const [editingUser, setEditingUser] = useState(null);
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "employee",
//   });
//   const [currentUser, setCurrentUser] = useState(null);

//   // Debounced search
//   const [search, setSearchInput] = useState("");
//   const debouncedSearch = useDebounce(search, 500);

//   // Load users function
//   const loadData = useCallback(() => {
//     const params = {
//       page: page + 1,
//       limit: rowsPerPage,
//       search: debouncedSearch,
//       sortBy,
//       sortOrder,
//     };
//     if (role === "ADMIN") dispatch(fetchUsers(params));
//     else if (role === "MANAGER") dispatch(fetchEmployees(params));
//   }, [dispatch, page, rowsPerPage, debouncedSearch, sortBy, sortOrder, role]);

//   // Load role from localStorage
//   useEffect(() => {
//     const userData = localStorage.getItem("user");
//     if (userData) {
//       try {
//         const parsed = JSON.parse(userData);
//         setCurrentUser(parsed);
//         const r = parsed?.role.toUpperCase();
//         setRole(r);
//       } catch {
//         toast.error("Invalid user data in localStorage");
//       }
//     }
//   }, []);

//   // // Trigger data fetch when dependencies change
//   // useEffect(() => {
//   //   dispatch(setSearch(debouncedSearch));
//   // }, [debouncedSearch, dispatch]);
//   ///////////////
//  useEffect(() => {
//   if (page !== 0) {
//     dispatch(setPage(0));
//   } else {
//     loadData();
//   }
// }, [debouncedSearch, dispatch, loadData, page]);



//   useEffect(() => {
//     if (role === "ADMIN" || role === "MANAGER") loadData();
//   }, [role, page, rowsPerPage, debouncedSearch, sortBy, sortOrder, loadData]);

//   // --------- Add/Edit User Dialog ---------
//   const handleOpenDialog = (user = null) => {
//     setEditingUser(user);
//     setForm(
//       user
//         ? { name: user.name, email: user.email, role: user.role, password: "" }
//         : { name: "", email: "", password: "", role: "employee" }
//     );
//     setOpenDialog(true);
//   };

//   const handleSave = async () => {
//     try {
//       if (editingUser) {
//         await dispatch(updateUser({ id: editingUser._id, form })).unwrap();
//         toast.success("User updated successfully 🎉");
//       } else {
//         await dispatch(createUser(form)).unwrap();
//         toast.success("User created successfully 🎉");
//       }
//       setOpenDialog(false);
//       loadData();
//     } catch (err) {
//       toast.error(err || "Error saving user");
//     }
//   };

//   const handleDelete = async (_id) => {
//     if (!confirm("Are you sure you want to delete this user?")) return;
//     try {
//       await dispatch(deleteUser(_id)).unwrap();
//       toast.success("User deleted successfully ✅");
//       loadData();
//     } catch (err) {
//       toast.error(err || "Error deleting user");
//     }
//   };

//   // --------- Table Helpers ---------
//   const handleChangePage = (event, newPage) => dispatch(setPage(newPage));
//   const handleChangeRowsPerPage = (event) => {
//     dispatch(setRowsPerPage(parseInt(event.target.value, 10)));
//     dispatch(setPage(0));
//   };
//   const handleSort = (column) => {
//     const newOrder = sortBy === column ? (sortOrder === "asc" ? "desc" : "asc") : "asc";
//     dispatch(setSort({ sortBy: column, sortOrder: newOrder }));
//   };

//   // --------- Render Table ---------
//   const renderTable = () => (
//     <Paper>
//       <TextField
//         label="Search"
//         fullWidth
//         margin="normal"
//         value={search}
//         onChange={(e) => setSearchInput(e.target.value)}
//       />
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>
//               <TableSortLabel active={sortBy === "name"} direction={sortOrder} onClick={() => handleSort("name")}>
//                 Name
//               </TableSortLabel>
//             </TableCell>
//             <TableCell>
//               <TableSortLabel active={sortBy === "email"} direction={sortOrder} onClick={() => handleSort("email")}>
//                 Email
//               </TableSortLabel>
//             </TableCell>
//             <TableCell>
//               <TableSortLabel active={sortBy === "role"} direction={sortOrder} onClick={() => handleSort("role")}>
//                 Role
//               </TableSortLabel>
//             </TableCell>
//             {role === "ADMIN" && <TableCell>Actions</TableCell>}
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {users.map((u) => (
//             <TableRow key={u._id}>
//               <TableCell>{u.name}</TableCell>
//               <TableCell>{u.email}</TableCell>
//               <TableCell>{u.role}</TableCell>
//               {role === "ADMIN" && (
//                 <TableCell>
//                   <Button size="small" onClick={() => handleOpenDialog(u)}>Edit</Button>
//                   <Button size="small" color="error" onClick={() => handleDelete(u._id)}>Delete</Button>
//                 </TableCell>
//               )}
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>

//       <TablePagination
//         component="div"
//         count={total || 0}
//         page={page}
//         onPageChange={handleChangePage}
//         rowsPerPage={rowsPerPage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//         rowsPerPageOptions={[5, 10, 20, 50]}
//       />
//     </Paper>
//   );

//   // --------- Render Content ---------
//   const renderContent = () => {
//     // if (loading) return <Typography>Loading...</Typography>;
// if (loading)
//   return (
//     <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
//       <CircularProgress />
//     </Box>
//   );


//     if (error) return <Typography color="error">{error}</Typography>;

//     if (role === "MANAGER") {
//       return (
//         <Box p={3}>
//           <Typography variant="h5" fontWeight="bold" mb={2}>Manager (View Employee Information)</Typography>
//           <Card sx={{ mb: 3 }}>
//             <CardContent>
//               <Typography variant="h6">Total Employees</Typography>
//               <Typography variant="h4">{total || 0}</Typography>
//             </CardContent>
//           </Card>
//           {renderTable()}
//         </Box>
//       );
//     }

//     if (role === "ADMIN") {
//       return (
//         <Box p={3}>
//           <Typography variant="h5" fontWeight="bold" mb={2}>Admin - Manage Users</Typography>
//           <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={() => handleOpenDialog()}>
//             + Add User
//           </Button>
//           {renderTable()}

//           {/* Add/Edit Dialog */}
//           <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
//             <DialogTitle>{editingUser ? "Edit User" : "Add User"}</DialogTitle>
//             <DialogContent>
//               <TextField label="Name" fullWidth margin="normal" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
//               <TextField label="Email" fullWidth margin="normal" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
//               {!editingUser && <TextField label="Password" type="password" fullWidth margin="normal" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />}
//               <TextField select label="Role" fullWidth margin="normal" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
//                 <MenuItem value="employee">Employee</MenuItem>
//                 <MenuItem value="manager">Manager</MenuItem>
//                 <MenuItem value="admin">Admin</MenuItem>
//               </TextField>
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
//               <Button onClick={handleSave} variant="contained" color="primary">Save</Button>
//             </DialogActions>
//           </Dialog>
//         </Box>
//       );
//     }

//     return (
//       <Box p={3}>
//         <Typography variant="h5" fontWeight="bold" mb={2}>My User Profile</Typography>
//         <Paper sx={{ p: 3 }}>
//           <Typography variant="body1"><strong>Name:</strong> {currentUser?.name}</Typography>
//           <Typography variant="body1"><strong>Email:</strong> {currentUser?.email}</Typography>
//           <Typography variant="body1"><strong>Role:</strong> {role}</Typography>
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
//       <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
//     </Box>
//   );
// }

/////////////////
"use client";

import React, { useEffect, useState, useCallback } from "react";
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
  MenuItem,
  TableSortLabel,
  TablePagination,
  CircularProgress,
} from "@mui/material";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  fetchEmployees,
  createUser,
  updateUser,
  deleteUser,
  setPage,
  setRowsPerPage,
  setSearch,
  setSort,
} from "../../slices/userSlice";

// ---------- Debounce Hook ----------
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export default function UsersPage() {
  const dispatch = useDispatch();
  const {
    users,
    total,
    loading,
    error,
    role: stateRole,
    page,
    rowsPerPage,
    search: stateSearch,
    sortBy,
    sortOrder,
  } = useSelector((state) => state.users);

  const [role, setRole] = useState("USER");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
  });
  const [currentUser, setCurrentUser] = useState(null);

  const [search, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const loadData = useCallback(() => {
    const params = {
      page: page + 1,
      limit: rowsPerPage,
      search: debouncedSearch,
      sortBy,
      sortOrder,
    };
    if (role === "ADMIN") dispatch(fetchUsers(params));
    else if (role === "MANAGER") dispatch(fetchEmployees(params));
  }, [dispatch, page, rowsPerPage, debouncedSearch, sortBy, sortOrder, role]);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        setCurrentUser(parsed);
        const r = parsed?.role.toUpperCase();
        setRole(r);
      } catch {
        toast.error("Invalid user data in localStorage");
      }
    }
  }, []);

  useEffect(() => {
    if (page !== 0) dispatch(setPage(0));
    else loadData();
  }, [debouncedSearch, dispatch, loadData, page]);

  useEffect(() => {
    if (role === "ADMIN" || role === "MANAGER") loadData();
  }, [role, page, rowsPerPage, debouncedSearch, sortBy, sortOrder, loadData]);

  const handleOpenDialog = (user = null) => {
    setEditingUser(user);
    setForm(
      user
        ? { name: user.name, email: user.email, role: user.role, password: "" }
        : { name: "", email: "", password: "", role: "employee" }
    );
    setOpenDialog(true);
  };

  const handleSave = async () => {
    try {
      if (editingUser) {
        await dispatch(updateUser({ id: editingUser._id, form })).unwrap();
        toast.success("User updated successfully 🎉");
      } else {
        await dispatch(createUser(form)).unwrap();
        toast.success("User created successfully 🎉");
      }
      setOpenDialog(false);
      loadData();
    } catch (err) {
      toast.error(err || "Error saving user");
    }
  };

  const handleDelete = async (_id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await dispatch(deleteUser(_id)).unwrap();
      toast.success("User deleted successfully ✅");
      loadData();
    } catch (err) {
      toast.error(err || "Error deleting user");
    }
  };

  const handleChangePage = (event, newPage) => dispatch(setPage(newPage));
  const handleChangeRowsPerPage = (event) => {
    dispatch(setRowsPerPage(parseInt(event.target.value, 10)));
    dispatch(setPage(0));
  };
  const handleSort = (column) => {
    const newOrder = sortBy === column ? (sortOrder === "asc" ? "desc" : "asc") : "asc";
    dispatch(setSort({ sortBy: column, sortOrder: newOrder }));
  };

  const renderTable = () => (
    <Paper sx={{ p: 2, borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
      <TextField
        label="Search Users"
        fullWidth
        margin="normal"
        value={search}
        onChange={(e) => setSearchInput(e.target.value)}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            fontSize: "0.95rem",
          },
        }}
      />
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: "#E0F7F6" }}>
            <TableCell>
              <TableSortLabel
                active={sortBy === "name"}
                direction={sortOrder}
                onClick={() => handleSort("name")}
              >
                Name
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortBy === "email"}
                direction={sortOrder}
                onClick={() => handleSort("email")}
              >
                Email
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortBy === "role"}
                direction={sortOrder}
                onClick={() => handleSort("role")}
              >
                Role
              </TableSortLabel>
            </TableCell>
            {role === "ADMIN" && <TableCell>Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((u) => (
            <TableRow key={u._id} sx={{ "&:hover": { bgcolor: "#F1FAFA" } }}>
              <TableCell sx={{ fontWeight: 500 }}>{u.name}</TableCell>
              <TableCell sx={{ color: "#555" }}>{u.email}</TableCell>
              <TableCell sx={{ textTransform: "capitalize" }}>{u.role}</TableCell>
              {role === "ADMIN" && (
                <TableCell>
                  <Button
                    size="small"
                    sx={{ mr: 1, textTransform: "none" }}
                    variant="outlined"
                    onClick={() => handleOpenDialog(u)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    variant="outlined"
                    onClick={() => handleDelete(u._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={total || 0}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 20, 50]}
        sx={{
          mt: 2,
          "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": { fontSize: "0.9rem" },
        }}
      />
    </Paper>
  );

  const renderContent = () => {
    if (loading)
      return (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
          <CircularProgress color="success" />
        </Box>
      );

    if (error) return <Typography color="error">{error}</Typography>;

    if (role === "MANAGER") {
      return (
        <Box p={3}>
          <Typography variant="h5" fontWeight="700" mb={3}>
            Manager Dashboard
          </Typography>
          <Card sx={{ mb: 4, borderRadius: 3, boxShadow: "0 6px 20px rgba(0,0,0,0.05)" }}>
            <CardContent>
              <Typography variant="subtitle1" color="#555">
                Total Employees
              </Typography>
              <Typography variant="h3" fontWeight="700" color="#2C7A7B">
                {total || 0}
              </Typography>
            </CardContent>
          </Card>
          {renderTable()}
        </Box>
      );
    }

    if (role === "ADMIN") {
      return (
        <Box p={3}>
          <Typography variant="h5" fontWeight="700" mb={3}>
            Admin Dashboard
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mb: 3, borderRadius: 2, textTransform: "none", fontWeight: 600 }}
            onClick={() => handleOpenDialog()}
          >
            + Add User
          </Button>
          {renderTable()}

          <Dialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            PaperProps={{ sx: { borderRadius: 3, p: 2 } }}
          >
            <DialogTitle sx={{ fontWeight: 700, color: "#2C7A7B" }}>
              {editingUser ? "Edit User" : "Add User"}
            </DialogTitle>
            <DialogContent>
              <TextField
                label="Name"
                fullWidth
                margin="dense"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Email"
                fullWidth
                margin="dense"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                sx={{ mb: 2 }}
              />
              {!editingUser && (
                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  margin="dense"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  sx={{ mb: 2 }}
                />
              )}
              <TextField
                select
                label="Role"
                fullWidth
                margin="dense"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                sx={{ mb: 2 }}
              >
                <MenuItem value="employee">Employee</MenuItem>
                <MenuItem value="manager">Manager</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </TextField>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
              <Button
                onClick={handleSave}
                variant="contained"
                color="primary"
                sx={{ textTransform: "none", fontWeight: 600 }}
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      );
    }

    return (
      <Box p={3}>
        <Typography variant="h5" fontWeight="700" mb={3}>
          My Profile
        </Typography>
        <Paper sx={{ p: 3, borderRadius: 3, boxShadow: "0 6px 20px rgba(0,0,0,0.05)" }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Name:</strong> {currentUser?.name}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Email:</strong> {currentUser?.email}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Role:</strong> {role}
          </Typography>
        </Paper>
      </Box>
    );
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", fontFamily: "'Poppins', sans-serif" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, bgcolor: "#F8F9FA" }}>
        <Header />
        <Toolbar />
        {renderContent()}
      </Box>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </Box>
  );
}
