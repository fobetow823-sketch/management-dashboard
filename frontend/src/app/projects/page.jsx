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
//   Toolbar,
//   TextField,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
// } from "@mui/material";
// import Sidebar from "@/components/Sidebar";
// import Header from "@/components/Header";
// import { toast, ToastContainer } from "react-toastify";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   createProject,
//   assignProjectToManagers,
//   assignProjectToEmployees,
//   updateProjectStatus,
//   getAllProjectsStatus,
// } from "../../slices/projectSlice";

// export default function ProjectsPage() {
//   const dispatch = useDispatch();
//   const { projects, assignments, loading, error } = useSelector(
//     (state) => state.projects
//   );

//   const [role, setRole] = useState("USER");
//   const [currentUser, setCurrentUser] = useState(null);

//   // Form states
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [hoursAssigned, setHoursAssigned] = useState("");
//   const [projectId, setProjectId] = useState("");
//   const [ids, setIds] = useState("");
//   const [status, setStatus] = useState("");
//   const [hoursWorked, setHoursWorked] = useState("");
//   const [assignmentId, setAssignmentId] = useState("");

//   // ✅ Load user role
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
//             dispatch(getAllProjectsStatus());
//           }
//         }
//       } catch {
//         toast.error("Invalid user data in localStorage");
//       }
//     }
//   }, [dispatch]);

//   // ✅ Handlers
//   const handleCreateProject = async () => {
//     try {
//       await dispatch(
//         createProject({ title, description, hoursAssigned })
//       ).unwrap();
//       toast.success("Project created successfully 🎉");
//       setTitle("");
//       setDescription("");
//       setHoursAssigned("");
//     } catch (err) {
//       toast.error(err || "Failed to create project");
//     }
//   };

// //   const handleAssignManagers = async () => {
// //     try {
// //       const managerIds = ids.split(",").map((id) => id.trim());
// //       await dispatch(assignProjectToManagers({ projectId, managerIds })).unwrap();
// //       toast.success("Managers assigned successfully ✅");
// //       setIds("");
// //     } catch (err) {
// //       toast.error(err || "Failed to assign managers");
// //     }
// //   };
// const handleAssignManagers = async () => {
//   try {
//     // From your form inputs:
//     // title = project title input
//     // ids = manager names input (comma separated names)
//     const managerNames = ids.split(",").map((name) => name.trim());

//     await dispatch(assignProjectToManagers({ title, managerNames })).unwrap();
//     toast.success("Managers assigned successfully ✅");
//     setIds("");   // clear manager names input
//     setTitle(""); // optionally clear project title input
//   } catch (err) {
//     toast.error(err || "Failed to assign managers");
//   }
// };

   

// //   const handleAssignEmployees = async () => {
// //     try {
// //       const employeeIds = ids.split(",").map((id) => id.trim());
// //       await dispatch(assignProjectToEmployees({ projectId, employeeIds })).unwrap();
// //       toast.success("Employees assigned successfully ✅");
// //       setIds("");
// //     } catch (err) {
// //       toast.error(err || "Failed to assign employees");
// //     }
// //   };

// const handleAssignEmployees = async () => {
//   try {
//     const employeeNames = ids.split(",").map((name) => name.trim());

//     await dispatch(assignProjectToEmployees({ title, employeeNames })).unwrap();
//     toast.success("Employees assigned successfully ✅");
//     setIds("");
//     setTitle("");
//   } catch (err) {
//     toast.error(err || "Failed to assign employees");
//   }
// };



// //   const handleUpdateStatus = async () => {
// //     try {
// //       await dispatch(
// //         updateProjectStatus({ assignmentId, status, hoursWorked })
// //       ).unwrap();
// //       toast.success("Project status updated 🎉");
// //       setStatus("");
// //       setHoursWorked("");
// //     } catch (err) {
// //       toast.error(err || "Failed to update status");
// //     }
// //   };

// const handleUpdateStatus = async () => {
//   try {
//     await dispatch(
//       updateProjectStatus({ title, status, hoursWorked })
//     ).unwrap();
//     toast.success("Project status updated 🎉");
//     setTitle("");
//     setStatus("");
//     setHoursWorked("");
//   } catch (err) {
//     toast.error(err || "Failed to update status");
//   }
// };







//   // ✅ Role-based render
//   const renderContent = () => {
//     if (loading) return <Typography>Loading...</Typography>;
//     if (error) return <Typography color="error">{error}</Typography>;

//     if (role === "ADMIN") {
//       return (
//         <Box p={3}>
//           <Typography variant="h5" fontWeight="bold" mb={2}>
//             Admin - Manage Projects
//           </Typography>

//           {/* Create Project */}
//           <Paper sx={{ p: 3, mb: 3 }}>
//             <Typography variant="h6">Create New Project</Typography>
//             <TextField
//               label="Title"
//               fullWidth
//               margin="normal"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//             />
//             <TextField
//               label="Description"
//               fullWidth
//               margin="normal"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             />
//             <TextField
//               label="Hours Assigned"
//               type="number"
//               fullWidth
//               margin="normal"
//               value={hoursAssigned}
//               onChange={(e) => setHoursAssigned(e.target.value)}
//             />
//             <Button
//               variant="contained"
//               onClick={handleCreateProject}
//               disabled={loading}
//             >
//               Create
//             </Button>
//           </Paper>

//           {/* Assign Managers */}
//           <Paper sx={{ p: 3, mb: 3 }}>
//             <Typography variant="h6">Assign  Project to Managers</Typography>
//             <TextField
//               label="Project title"
//               fullWidth
//               margin="normal"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//             />
//             <TextField
//               label="Manager's (comma separated)"
//               fullWidth
//               margin="normal"
//               value={ids}
//               onChange={(e) => setIds(e.target.value)}
//             />
//             <Button
//               variant="contained"
//               onClick={handleAssignManagers}
//               disabled={loading}
//             >
//               Assign
//             </Button>
//           </Paper>

//           {/* All Project Status */}
//           <Paper sx={{ p: 3 }}>
//             <Typography variant="h6" mb={2}>
//               All Project Status
//             </Typography>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Project</TableCell>
//                   <TableCell>Employee</TableCell>
//                   <TableCell>Status</TableCell>
//                   <TableCell>Hours Worked</TableCell>
//                   <TableCell>Assigned By</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {assignments.map((a) => (
//                   <TableRow key={a._id}>
//                     <TableCell>{a.projectId?.title}</TableCell>
//                     <TableCell>{a.employeeId?.name}</TableCell>
//                     <TableCell>{a.status}</TableCell>
//                     <TableCell>{a.hoursWorked}</TableCell>
//                     <TableCell>{a.assignedBy?.name}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </Paper>
//         </Box>
//       );
//     }

//     if (role === "MANAGER") {
//       return (
//         <Box p={3}>
//           <Typography variant="h5" fontWeight="bold" mb={2}>
//             Manager - Assign Project to Employees
//           </Typography>
//           <Paper sx={{ p: 3 }}>
//             <TextField
//               label="Project Title"
//               fullWidth
//               margin="normal"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//             />
//             <TextField
//               label="Employee Name's (comma separated)"
//               fullWidth
//               margin="normal"
//               value={ids}
//               onChange={(e) => setIds(e.target.value)}
//             />
//             <Button
//               variant="contained"
//               onClick={handleAssignEmployees}
//               disabled={loading}
//             >
//               Assign
//             </Button>
//           </Paper>
//         </Box>
//       );
//     }

//     if (role === "EMPLOYEE") {
//       return (
//         <Box p={3}>
//           <Typography variant="h5" fontWeight="bold" mb={2}>
//             Employee - Update Project Status
//           </Typography>
//           <Paper sx={{ p: 3 }}>
//             <TextField
//               label="Project Title"
//               fullWidth
//               margin="normal"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//             />
//             <FormControl fullWidth margin="normal">
//               <InputLabel>Status</InputLabel>
//               <Select
//                 value={status}
//                 onChange={(e) => setStatus(e.target.value)}
//               >
//                 <MenuItem value="in-progress">In Progress</MenuItem>
//                 <MenuItem value="completed">Completed</MenuItem>
//                 <MenuItem value="pending">Pending</MenuItem>
//               </Select>
//             </FormControl>
//             <TextField
//               label="Hours Worked"
//               type="number"
//               fullWidth
//               margin="normal"
//               value={hoursWorked}
//               onChange={(e) => setHoursWorked(e.target.value)}
//             />
//             <Button
//               variant="contained"
//               onClick={handleUpdateStatus}
//               disabled={loading}
//             >
//               Update
//             </Button>
//           </Paper>
//         </Box>
//       );
//     }

//     return (
//       <Box p={3}>
//         <Typography variant="h6">
//           Welcome {currentUser?.name}, you don’t have access to projects.
//         </Typography>
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


////////////////
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
  Toolbar,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
} from "@mui/material";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  createProject,
  assignProjectToManagers,
  assignProjectToEmployees,
  updateProjectStatus,
  getAllProjectsStatus,
} from "../../slices/projectSlice";

export default function ProjectsPage() {
  const dispatch = useDispatch();
  const { assignments, loading, error } = useSelector(
    (state) => state.projects
  );

  const [role, setRole] = useState("USER");
  const [currentUser, setCurrentUser] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [hoursAssigned, setHoursAssigned] = useState("");
  const [ids, setIds] = useState("");
  const [status, setStatus] = useState("");
  const [hoursWorked, setHoursWorked] = useState("");

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
            dispatch(getAllProjectsStatus());
          }
        }
      } catch {
        toast.error("Invalid user data in localStorage");
      }
    }
  }, [dispatch]);

  // Handlers
  const handleCreateProject = async () => {
    try {
      await dispatch(
        createProject({ title, description, hoursAssigned })
      ).unwrap();
      toast.success("Project created successfully 🎉");
      setTitle("");
      setDescription("");
      setHoursAssigned("");
    } catch (err) {
      toast.error(err || "Failed to create project");
    }
  };

  const handleAssignManagers = async () => {
    try {
      const managerNames = ids.split(",").map((name) => name.trim());
      await dispatch(assignProjectToManagers({ title, managerNames })).unwrap();
      toast.success("Managers assigned successfully ✅");
      setIds("");
      setTitle("");
    } catch (err) {
      toast.error(err || "Failed to assign managers");
    }
  };

  const handleAssignEmployees = async () => {
    try {
      const employeeNames = ids.split(",").map((name) => name.trim());
      await dispatch(assignProjectToEmployees({ title, employeeNames })).unwrap();
      toast.success("Employees assigned successfully ✅");
      setIds("");
      setTitle("");
    } catch (err) {
      toast.error(err || "Failed to assign employees");
    }
  };

  const handleUpdateStatus = async () => {
    try {
      await dispatch(
        updateProjectStatus({ title, status, hoursWorked })
      ).unwrap();
      toast.success("Project status updated 🎉");
      setTitle("");
      setStatus("");
      setHoursWorked("");
    } catch (err) {
      toast.error(err || "Failed to update status");
    }
  };

  // Styles
  const paperStyle = { p: 4, mb: 4, borderRadius: 3, boxShadow: "0 6px 20px rgba(0,0,0,0.05)" };
  const inputStyle = { mb: 2, "& .MuiOutlinedInput-root": { borderRadius: 2 } };
  const buttonStyle = { textTransform: "none", borderRadius: 2, fontWeight: 600 };

  const renderContent = () => {
    if (loading) return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress color="primary" />
      </Box>
    );

    if (error) return <Typography color="error">{error}</Typography>;

    if (role === "ADMIN") {
      return (
        <Box p={3}>
          <Typography variant="h4" fontWeight="700" mb={4} color="#2C7A7B">
            Admin - Manage Projects
          </Typography>

          {/* Create Project */}
          <Paper sx={paperStyle}>
            <Typography variant="h6" mb={2} color="#2C7A7B">Create New Project</Typography>
            <TextField label="Title" fullWidth margin="dense" value={title} onChange={(e) => setTitle(e.target.value)} sx={inputStyle} />
            <TextField label="Description" fullWidth margin="dense" value={description} onChange={(e) => setDescription(e.target.value)} sx={inputStyle} />
            <TextField label="Hours Assigned" type="number" fullWidth margin="dense" value={hoursAssigned} onChange={(e) => setHoursAssigned(e.target.value)} sx={inputStyle} />
            <Button variant="contained" color="success" onClick={handleCreateProject} sx={buttonStyle} disabled={loading}>Create</Button>
          </Paper>

          {/* Assign Managers */}
          <Paper sx={paperStyle}>
            <Typography variant="h6" mb={2} color="#2C7A7B">Assign Project to Managers</Typography>
            <TextField label="Project Title" fullWidth margin="dense" value={title} onChange={(e) => setTitle(e.target.value)} sx={inputStyle} />
            <TextField label="Manager Names (comma separated)" fullWidth margin="dense" value={ids} onChange={(e) => setIds(e.target.value)} sx={inputStyle} />
            <Button variant="contained" color="primary" onClick={handleAssignManagers} sx={buttonStyle} disabled={loading}>Assign</Button>
          </Paper>

          {/* Project Status Table */}
          <Paper sx={paperStyle}>
            <Typography variant="h6" mb={3} color="#2C7A7B">All Project Status</Typography>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{ bgcolor: "#E0F7F6" }}>
                  <TableCell>Project</TableCell>
                  <TableCell>Employee</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Hours Worked</TableCell>
                  <TableCell>Assigned By</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {assignments.map((a) => (
                  <TableRow key={a._id} sx={{ "&:hover": { bgcolor: "#F1FAFA" } }}>
                    <TableCell>{a.projectId?.title}</TableCell>
                    <TableCell>{a.employeeId?.name}</TableCell>
                    <TableCell sx={{ textTransform: "capitalize" }}>{a.status}</TableCell>
                    <TableCell>{a.hoursWorked}</TableCell>
                    <TableCell>{a.assignedBy?.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Box>
      );
    }

    if (role === "MANAGER") {
      return (
        <Box p={3}>
          <Typography variant="h4" fontWeight="700" mb={4} color="#2C7A7B">
            Manager - Assign Project to Employees
          </Typography>
          <Paper sx={paperStyle}>
            <TextField label="Project Title" fullWidth margin="dense" value={title} onChange={(e) => setTitle(e.target.value)} sx={inputStyle} />
            <TextField label="Employee Names (comma separated)" fullWidth margin="dense" value={ids} onChange={(e) => setIds(e.target.value)} sx={inputStyle} />
            <Button variant="contained" color="primary" onClick={handleAssignEmployees} sx={buttonStyle} disabled={loading}>Assign</Button>
          </Paper>
        </Box>
      );
    }

    if (role === "EMPLOYEE") {
      return (
        <Box p={3}>
          <Typography variant="h4" fontWeight="700" mb={4} color="#2C7A7B">
            Employee - Update Project Status
          </Typography>
          <Paper sx={paperStyle}>
            <TextField label="Project Title" fullWidth margin="dense" value={title} onChange={(e) => setTitle(e.target.value)} sx={inputStyle} />
            <FormControl fullWidth margin="dense" sx={inputStyle}>
              <InputLabel>Status</InputLabel>
              <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                <MenuItem value="in-progress">In Progress</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
              </Select>
            </FormControl>
            <TextField label="Hours Worked" type="number" fullWidth margin="dense" value={hoursWorked} onChange={(e) => setHoursWorked(e.target.value)} sx={inputStyle} />
            <Button variant="contained" color="success" onClick={handleUpdateStatus} sx={buttonStyle} disabled={loading}>Update</Button>
          </Paper>
        </Box>
      );
    }

    return (
      <Box p={3}>
        <Typography variant="h6">Welcome {currentUser?.name}, you don’t have access to projects.</Typography>
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
