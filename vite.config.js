import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: "./index.js", // Specify your entry file
      output: {
        entryFileNames: "barba.js", // Rename output file
      },
    },
  },
});
