import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const root = resolve(import.meta.dirname, "playstore/web");

export default defineConfig({
  root,
  base: "./",
  plugins: [tailwindcss(), viteReact()],
  resolve: {
    alias: { "@": resolve(import.meta.dirname, "src") },
  },
  build: {
    outDir: resolve(import.meta.dirname, "playstore/www"),
    emptyOutDir: true,
    assetsDir: "assets",
    sourcemap: false,
    cssMinify: true,
    cssCodeSplit: false,
    modulePreload: false,
    rollupOptions: {
      output: {
        format: "iife",
        inlineDynamicImports: true,
        entryFileNames: "assets/game.js",
        chunkFileNames: "assets/game.js",
        assetFileNames: "assets/[name][extname]",
      },
    },
  },
});
