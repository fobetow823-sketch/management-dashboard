// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#9c27b0" },
    background: { default: "#f4f6f8" },
  },
  typography: {
    fontFamily: "Open Sans, Arial, sans-serif",
    // Extend default weights instead of removing them
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
});

export default theme;
