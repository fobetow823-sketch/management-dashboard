"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import createEmotionCache from "@/createEmotionCache";
import theme from "@/theme";

const clientSideEmotionCache = createEmotionCache();

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <CacheProvider value={clientSideEmotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  );
}
