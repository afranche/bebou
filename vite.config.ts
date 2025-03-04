// @ts-expect-error: Why is it angry even ?
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA as pwa } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [react(), tailwindcss(), pwa({ registerType: "autoUpdate" })],
  resolve: {
    alias: {
      // @ts-expect-error: Why is it angry even ?
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
});
