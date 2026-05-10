import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const root = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@browsepilot/shared": resolve(root, "../../packages/shared/src")
    }
  },
  build: {
    emptyOutDir: true,
    rollupOptions: {
      input: {
        sidepanel: resolve(root, "src/sidepanel/index.html"),
        background: resolve(root, "src/background.ts"),
        contentScript: resolve(root, "src/contentScript.ts")
      },
      output: {
        entryFileNames: "assets/[name].js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: "assets/[name][extname]"
      }
    }
  }
});
