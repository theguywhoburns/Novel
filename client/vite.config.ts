import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
//import basicSsl from '@vitejs/plugin-basic-ssl'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 80,
    watch: {
      usePolling: true,
    },
    
  },
});
