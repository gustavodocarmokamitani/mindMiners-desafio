import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/brapi": {
        target: "https://brapi.dev/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/brapi/, ""),
        headers: {
          Authorization: "Bearer 3g7ayptvYQuBDDbXpfrFgB",
        },
      },
    },
  },
});
