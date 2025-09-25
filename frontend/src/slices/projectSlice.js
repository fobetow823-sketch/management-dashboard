


// // /////////////////////////////////////////////////////////////////////////////////////////////


// // import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// // import axios from "axios";
// // import { toast } from "react-toastify";

// // const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// // // 🔑 Helper for Auth headers
// // const getAuthHeaders = () => {
// //   const token = localStorage.getItem("token");
// //   return { Authorization: `Bearer ${token}` };
// // };

// // // ========== THUNKS ==========

// // // ✅ Create Project (Admin/Manager)
// // export const createProject = createAsyncThunk(
// //   "projects/createProject",
// //   async (projectData, { rejectWithValue }) => {
// //     try {
// //       const res = await axios.post(`${API_BASE}/projects`, projectData, {
// //         headers: getAuthHeaders(),
// //       });
// //       toast.success("Project created successfully 🎉");
// //       return res.data;
// //     } catch (err) {
// //       toast.error(err.response?.data?.message || "Error creating project");
// //       return rejectWithValue(err.response?.data?.message || "Error creating project");
// //     }
// //   }
// // );

// // // ✅ Assign Managers
// // export const assignProjectToManagers = createAsyncThunk(
// //   "projects/assignProjectToManagers",
// //   async ({ projectId, managerIds }, { rejectWithValue }) => {
// //     try {
// //       const res = await axios.post(
// //         `${API_BASE}/projects/assign`,
// //         { projectId, managerIds },
// //         { headers: getAuthHeaders() }
// //       );
// //       toast.success("Managers assigned successfully 👨‍💼");
// //       return res.data;
// //     } catch (err) {
// //       toast.error(err.response?.data?.message || "Error assigning managers");
// //       return rejectWithValue(err.response?.data?.message || "Error assigning managers");
// //     }
// //   }
// // );

// // // ✅ Assign Employees
// // export const assignProjectToEmployees = createAsyncThunk(
// //   "projects/assignProjectToEmployees",
// //   async ({ projectId, employeeIds }, { rejectWithValue }) => {
// //     try {
// //       const res = await axios.post(
// //         `${API_BASE}/employee-projects/assign`,
// //         { projectId, employeeIds },
// //         { headers: getAuthHeaders() }
// //       );
// //       toast.success("Employees assigned successfully 👷‍♂️");
// //       return res.data; // assignments
// //     } catch (err) {
// //       toast.error(err.response?.data?.message || "Error assigning employees");
// //       return rejectWithValue(err.response?.data?.message || "Error assigning employees");
// //     }
// //   }
// // );

// // // ✅ Update Project Status
// // export const updateProjectStatus = createAsyncThunk(
// //   "projects/updateProjectStatus",
// //   async ({ assignmentId, status, hoursWorked }, { rejectWithValue }) => {
// //     try {
// //       const res = await axios.put(
// //         `${API_BASE}/employee-projects/status`,
// //         { assignmentId, status, hoursWorked },
// //         { headers: getAuthHeaders() }
// //       );
// //       toast.success("Project status updated ✅");
// //       return res.data;
// //     } catch (err) {
// //       toast.error(err.response?.data?.message || "Error updating status");
// //       return rejectWithValue(err.response?.data?.message || "Error updating status");
// //     }
// //   }
// // );

// // // ✅ Get All Project Status (Admin view)
// // export const getAllProjectsStatus = createAsyncThunk(
// //   "projects/getAllProjectsStatus",
// //   async (_, { rejectWithValue }) => {
// //     try {
// //       const res = await axios.get(`${API_BASE}/employee-projects/status`, {
// //         headers: getAuthHeaders(),
// //       });
// //       return res.data;
// //     } catch (err) {
// //       return rejectWithValue(err.response?.data?.message || "Error fetching project status");
// //     }
// //   }
// // );

// // // ========== SLICE ==========
// // const projectSlice = createSlice({
// //   name: "projects",
// //   initialState: {
// //     projects: [],
// //     assignments: [],
// //     loading: false,
// //     error: null,
// //   },
// //   reducers: {
// //     clearError: (state) => {
// //       state.error = null;
// //     },
// //   },
// //   extraReducers: (builder) => {
// //     // Create Project
// //     builder
// //       .addCase(createProject.pending, (state) => {
// //         state.loading = true;
// //       })
// //       .addCase(createProject.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.projects.push(action.payload.project);
// //       })
// //       .addCase(createProject.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload;
// //       });

// //     // Assign Managers
// //     builder
// //       .addCase(assignProjectToManagers.fulfilled, (state, action) => {
// //         const idx = state.projects.findIndex((p) => p._id === action.payload.project._id);
// //         if (idx >= 0) state.projects[idx] = action.payload.project;
// //       })
// //       .addCase(assignProjectToManagers.rejected, (state, action) => {
// //         state.error = action.payload;
// //       });

// //     // Assign Employees
// //     builder
// //       .addCase(assignProjectToEmployees.fulfilled, (state, action) => {
// //         state.assignments = [...state.assignments, ...action.payload.assignments];
// //       })
// //       .addCase(assignProjectToEmployees.rejected, (state, action) => {
// //         state.error = action.payload;
// //       });

// //     // Update Project Status
// //     builder
// //       .addCase(updateProjectStatus.fulfilled, (state, action) => {
// //         const idx = state.assignments.findIndex((a) => a._id === action.payload.assignment._id);
// //         if (idx >= 0) state.assignments[idx] = action.payload.assignment;
// //       })
// //       .addCase(updateProjectStatus.rejected, (state, action) => {
// //         state.error = action.payload;
// //       });

// //     // Get All Projects Status
// //     builder
// //       .addCase(getAllProjectsStatus.fulfilled, (state, action) => {
// //         state.assignments = action.payload;
// //       })
// //       .addCase(getAllProjectsStatus.rejected, (state, action) => {
// //         state.error = action.payload;
// //       });
// //   },
// // });

// // export const { clearError } = projectSlice.actions;
// // export default projectSlice.reducer;

// ////////////////////////////////////////////////

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // API URL
// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// // ---- Async thunks ----
// export const createProject = createAsyncThunk(
//   "projects/createProject",
//   async (data) => {
//     const res = await axios.post(`${API_URL}/projects/create`, data);
//     return res.data;
//   }
// );

// export const assignProjectToManagers = createAsyncThunk(
//   "projects/assignManagers",
//   async ({ projectId, managerIds }) => {
//     const res = await axios.post(`${API_URL}/projects/assign-to-managers`, {
//       projectId,
//       managerIds,
//     });
//     return res.data;
//   }
// );

// export const assignProjectToEmployees = createAsyncThunk(
//   "projects/assignEmployees",
//   async ({ projectId, employeeIds }) => {
//     const res = await axios.post(`${API_URL}/employee-projects/assign-to-employees`, {
//       projectId,
//       employeeIds,
//     });
//     return res.data;
//   }
// );

// export const updateProjectStatus = createAsyncThunk(
//   "projects/updateStatus",
//   async ({ assignmentId, status, hoursWorked }) => {
//     const res = await axios.put(`${API_URL}/employee-projects/update-status`, {
//       assignmentId,
//       status,
//       hoursWorked,
//     });
//     return res.data;
//   }
// );

// export const getAllProjectsStatus = createAsyncThunk(
//   "projects/getAllStatus",
//   async () => {
//     const res = await axios.get(`${API_URL}/employee-projects/reports`);
//     return res.data;
//   }
// );

// // ---- Slice ----
// const projectSlice = createSlice({
//   name: "projects",
//   initialState: {
//     projects: [],
//     assignments: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(createProject.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(createProject.fulfilled, (state, action) => {
//         state.loading = false;
//         state.projects.push(action.payload);
//       })
//       .addCase(createProject.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
//       // other cases (assignments, updates, etc.)
//       .addCase(getAllProjectsStatus.fulfilled, (state, action) => {
//         state.loading = false;
//         state.assignments = action.payload;
//       });
//   },
// });

// export default projectSlice.reducer;

/////////////////
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Base API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// ✅ Auth header helper
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

// ========== THUNKS ==========

// ✅ Create Project (Admin)
export const createProject = createAsyncThunk(
  "projects/createProject",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/projects/create`, data, {
        headers: getAuthHeaders(),
      });
      toast.success("Project created successfully ✅");
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create project ❌");
      return rejectWithValue(err.response?.data?.message || "Create project failed");
    }
  }
);

export const assignProjectToManagers = createAsyncThunk(
  "projects/assignManagers",
  async ({ title, managerNames }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_URL}/projects/assign-to-managers`,
        { title, managerNames }, // updated payload
        { headers: getAuthHeaders() }
      );
      toast.success("Assigned to managers ✅");
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to assign to managers ❌");
      return rejectWithValue(err.response?.data?.message || "Assign managers failed");
    }
  }
);


// // ✅ Assign Project to Employees (Manager)
// export const assignProjectToEmployees = createAsyncThunk(
//   "projects/assignEmployees",
//   async ({ projectId, employeeIds }, { rejectWithValue }) => {
//     try {
//       const res = await axios.post(
//         `${API_URL}/employee-projects/assign-to-employees`,
//         { projectId, employeeIds },
//         { headers: getAuthHeaders() }
//       );
//       toast.success("Assigned to employees ✅");
//       return res.data;
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to assign to employees ❌");
//       return rejectWithValue(err.response?.data?.message || "Assign employees failed");
//     }
//   }
// );
///////

// ✅ Assign Project to Employees (Manager)
export const assignProjectToEmployees = createAsyncThunk(
  "projects/assignEmployees",
  async ({ title, employeeNames }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_URL}/employee-projects/assign-to-employees`,
        { title, employeeNames },
        { headers: getAuthHeaders() }
      );
      toast.success("Assigned to employees ✅");
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to assign to employees ❌");
      return rejectWithValue(err.response?.data?.message || "Assign employees failed");
    }
  }
);


// // ✅ Update Project Status (Employee)
// export const updateProjectStatus = createAsyncThunk(
//   "projects/updateStatus",
//   async ({ assignmentId, status, hoursWorked }, { rejectWithValue }) => {
//     try {
//       const res = await axios.put(
//         `${API_URL}/employee-projects/update-status`,
//         { assignmentId, status, hoursWorked },
//         { headers: getAuthHeaders() }
//       );
//       toast.success("Project status updated ✅");
//       return res.data;
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to update status ❌");
//       return rejectWithValue(err.response?.data?.message || "Update status failed");
//     }
//   }
// );

export const updateProjectStatus = createAsyncThunk(
  "projects/updateStatus",
  async ({ title, status, hoursWorked }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${API_URL}/employee-projects/update-status`,
        { title, status, hoursWorked },
        { headers: getAuthHeaders() }
      );
      toast.success("Status updated ✅");
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status ❌");
      return rejectWithValue(err.response?.data?.message || "Update failed");
    }
  }
);



// ✅ Get All Project Assignment Statuses (Admin)
export const getAllProjectsStatus = createAsyncThunk(
  "projects/getAllStatus",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/employee-projects/reports`, {
        headers: getAuthHeaders(),
      });
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch reports ❌");
      return rejectWithValue(err.response?.data?.message || "Fetch reports failed");
    }
  }
);

// ========== SLICE ==========

const projectSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [],
    assignments: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearProjectError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔄 Create Project
      .addCase(createProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects.push(action.payload);
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔄 Assign to Managers
      .addCase(assignProjectToManagers.pending, (state) => {
        state.loading = true;
      })
      .addCase(assignProjectToManagers.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(assignProjectToManagers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔄 Assign to Employees
      .addCase(assignProjectToEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(assignProjectToEmployees.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(assignProjectToEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔄 Update Project Status
      .addCase(updateProjectStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProjectStatus.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateProjectStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔄 Get All Project Statuses
      .addCase(getAllProjectsStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProjectsStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.assignments = action.payload;
      })
      .addCase(getAllProjectsStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProjectError } = projectSlice.actions;
export default projectSlice.reducer;
