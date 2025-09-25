import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../slices/authSlice.js';
import userReducer from '../slices/userSlice.js';
import projectReducer from '../slices/projectSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    projects: projectReducer, 
  },
});
