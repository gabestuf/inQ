import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const build = true;
const url = build ? "https://gabestuf.com" : "http://localhost:3000";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
