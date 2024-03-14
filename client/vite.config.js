import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      '/backend': {
        target: 'http://localhost:8080', // Update with your backend server URL
        secure: false,
      },
    },
  },
  plugins: [react()],
});
