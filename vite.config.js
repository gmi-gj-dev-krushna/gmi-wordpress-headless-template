import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost/wordpress", // or wherever WP runs
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/wp-json/custom/v1"),
      },
    },
  },
});
