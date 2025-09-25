// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { toast } from "react-toastify";

// const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// // 🔑 Helper to add token
// const getAuthHeaders = () => {
//   const token = localStorage.getItem("token");
//   return { Authorization: `Bearer ${token}` };
// };

// // ========== THUNKS ==========

// // ✅ Fetch all users (Admin)
// export const fetchUsers = createAsyncThunk("users/fetchUsers", async (_, { rejectWithValue }) => {
//   try {
//     const res = await axios.get(`${API_BASE}/users`, { headers: getAuthHeaders() });
//     return res.data;
//   } catch (err) {
//     return rejectWithValue(err.response?.data?.message || "Error fetching users");
//   }
// });

// // ✅ Fetch employees (Manager)
// export const fetchEmployees = createAsyncThunk("users/fetchEmployees", async (_, { rejectWithValue }) => {
//   try {
//     const res = await axios.get(`${API_BASE}/users/employees`, { headers: getAuthHeaders() });
//     return res.data;
//   } catch (err) {
//     return rejectWithValue(err.response?.data?.message || "Error fetching employees");
//   }
// });

// // ✅ Create user (Admin)
// export const createUser = createAsyncThunk("users/createUser", async (form, { rejectWithValue }) => {
//   try {
//     const res = await axios.post(`${API_BASE}/users`, form, { headers: getAuthHeaders() });
//     toast.success("User created successfully 🎉");
//     return res.data;
//   } catch (err) {
//     toast.error(err.response?.data?.message || "Error creating user");
//     return rejectWithValue(err.response?.data?.message || "Error creating user");
//   }
// });

// // ✅ Update user (Admin)
// export const updateUser = createAsyncThunk("users/updateUser", async ({ id, form }, { rejectWithValue }) => {
//   try {
//     const res = await axios.put(`${API_BASE}/users/${id}`, form, { headers: getAuthHeaders() });
//     toast.success("User updated successfully 🎉");
//     return res.data;
//   } catch (err) {
//     toast.error(err.response?.data?.message || "Error updating user");
//     return rejectWithValue(err.response?.data?.message || "Error updating user");
//   }
// });

// // ✅ Delete user (Admin)
// export const deleteUser = createAsyncThunk("users/deleteUser", async (id, { rejectWithValue }) => {
//   try {
//     await axios.delete(`${API_BASE}/users/${id}`, { headers: getAuthHeaders() });
//     toast.success("User deleted successfully ✅");
//     return id;
//   } catch (err) {
//     toast.error(err.response?.data?.message || "Error deleting user");
//     return rejectWithValue(err.response?.data?.message || "Error deleting user");
//   }
// });

// // ========== SLICE ==========

// const userSlice = createSlice({
//   name: "users",
//   initialState: {
//     users: [],
//     role: "USER",
//     currentUser: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     setCurrentUser: (state, action) => {
//       state.currentUser = action.payload;
//       if (action.payload?.role) {
//         state.role = action.payload.role.toUpperCase();
//       }
//     },
//     clearError: (state) => {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     // Fetch users
//     builder
//       .addCase(fetchUsers.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchUsers.fulfilled, (state, action) => {
//         state.loading = false;
//         state.users = action.payload;
//       })
//       .addCase(fetchUsers.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });

//     // Fetch employees
//     builder
//       .addCase(fetchEmployees.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchEmployees.fulfilled, (state, action) => {
//         state.loading = false;
//         state.users = action.payload;
//       })
//       .addCase(fetchEmployees.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });

//     // Create user
//     builder
//    .addCase(createUser.fulfilled, (state, action) => {
//   state.users.push(action.payload.user); // consistent
// });

//     // Update user
//     builder
//      .addCase(updateUser.fulfilled, (state, action) => {
//   const index = state.users.findIndex((u) => u._id === action.payload.user._id);
//   if (index >= 0) state.users[index] = action.payload.user;
// });

//     // Delete user
//     builder
//       .addCase(deleteUser.fulfilled, (state, action) => {
//         state.users = state.users.filter((u) => u._id !== action.payload);
//       });
//   },
// });

// export const { setCurrentUser, clearError } = userSlice.actions;
// export default userSlice.reducer;


//////////////////
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// 🔑 Helper to add token
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

// ========== THUNKS ==========


export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_BASE}/users`, {
        headers: getAuthHeaders(),
        params, // { page, limit, search, sortBy, sortOrder }
      });

      // Check if response is an array (API returns users array only)
      if (Array.isArray(res.data)) {
        return {
          users: res.data,
          total: res.data.length,
        };
      }
      
      // If API returns the correct shape already
      return res.data; 

    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Error fetching users");
    }
  }
);



// ✅ Fetch employees (Manager) with pagination, search, sort
export const fetchEmployees = createAsyncThunk(
  "users/fetchEmployees",
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_BASE}/users/employees`, {
        headers: getAuthHeaders(),
        params,
      });

      // If the API returns an array of employees directly
      if (Array.isArray(res.data)) {
        return {
          users: res.data,
          total: res.data.length,
        };
      }

      // If API returns the expected shape { users, total }
      return res.data;

    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Error fetching employees");
    }
  }
);




// ✅ Create user (Admin)
export const createUser = createAsyncThunk(
  "users/createUser",
  async (form, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_BASE}/users`, form, { headers: getAuthHeaders() });
      toast.success("User created successfully 🎉");
      return res.data; // { user, message }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error creating user");
      return rejectWithValue(err.response?.data?.message || "Error creating user");
    }
  }
);

// ✅ Update user (Admin)
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, form }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API_BASE}/users/${id}`, form, { headers: getAuthHeaders() });
      toast.success("User updated successfully 🎉");
      return res.data; // { user, message }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error updating user");
      return rejectWithValue(err.response?.data?.message || "Error updating user");
    }
  }
);

// ✅ Delete user (Admin)
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE}/users/${id}`, { headers: getAuthHeaders() });
      toast.success("User deleted successfully ✅");
      return id;
    } catch (err) {
      toast.error(err.response?.data?.message || "Error deleting user");
      return rejectWithValue(err.response?.data?.message || "Error deleting user");
    }
  }
);

// ========== SLICE ==========

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    total: 0,            // total users count for pagination
    role: "USER",
    currentUser: null,
    loading: false,
    error: null,
    page: 0,             // frontend page index
    rowsPerPage: 5,
    search: "",
    sortBy: "name",
    sortOrder: "asc",
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      if (action.payload?.role) {
        state.role = action.payload.role.toUpperCase();
      }
    },
    clearError: (state) => {
      state.error = null;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setRowsPerPage: (state, action) => {
      state.rowsPerPage = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setSort: (state, action) => {
      state.sortBy = action.payload.sortBy;
      state.sortOrder = action.payload.sortOrder;
    },
  },
  extraReducers: (builder) => {
    // Fetch users
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users || [];
        state.total = action.payload.total || 0;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch employees
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users || [];
        state.total = action.payload.total || 0;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Create user
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.users.unshift(action.payload.user); // add new user to top
      state.total += 1;
    });

    // Update user
    builder.addCase(updateUser.fulfilled, (state, action) => {
      const index = state.users.findIndex((u) => u._id === action.payload.user._id);
      if (index >= 0) state.users[index] = action.payload.user;
    });

    // Delete user
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.users = state.users.filter((u) => u._id !== action.payload);
      state.total -= 1;
    });
  },
});

export const {
  setCurrentUser,
  clearError,
  setPage,
  setRowsPerPage,
  setSearch,
  setSort,
} = userSlice.actions;

export default userSlice.reducer;
