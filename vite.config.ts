import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
export default defineConfig((configEnv) => {
  const isDevelopment = configEnv.mode === "development";
  return {
    plugins: [
      react({
        babel: {
          presets: ["jotai/babel/preset"],
        },
      }),
    ],
    server: {
      port: 3000,
    },
    test: {
      globals: true,
      environment: "happy-dom",
      setupFiles: "./src/infrastructure/tests.setup.ts",
      coverage: {
        enabled: false,
        reporter: ["html"], // Choose the reporters you want
      },
    },
    resolve: {
      alias: {
        app: resolve(__dirname, "src", "app"),
        components: resolve(__dirname, "src", "components"),
        hooks: resolve(__dirname, "src", "hooks"),
        "@": resolve(__dirname, "./src"),
      },
    },
    css: {
      modules: {
        generateScopedName: isDevelopment
          ? "[name]__[local]__[hash:base64:5]"
          : "[hash:base64:5]",
      },
    },
  };
});
