import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";

const page = (name) => fileURLToPath(new URL(name, import.meta.url));

export default defineConfig({
  plugins: [react()],
  build: {
    // Multi-page build: home + /philosophy.html + /founders-desk.html
    rollupOptions: {
      input: {
        main:       page("index.html"),
        philosophy: page("philosophy.html"),
        founders:   page("founders-desk.html"),
      },
    },
  },
});
