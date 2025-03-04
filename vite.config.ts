import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  base: "/",
  server: {
    headers: {
      "x-frame-options": "DENY",
    },
    host: "127.0.0.1",
  },
});
