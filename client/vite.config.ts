import { defineConfig } from "vite";
import path from "path";
import sitemap from "vite-plugin-sitemap";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  plugins: [
    sitemap({
      hostname: "https://www.ecoshieldpestbd.com",
      dynamicRoutes: [
        "/services",
        "/blog",
        "/portfolio",
        "/reviews",
        "/about",
        "/contact",
      ],
    }),
  ],
}));