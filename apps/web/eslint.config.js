import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { config } from "@config/eslint/react";
import tailwindCanonical from "eslint-plugin-tailwind-canonical-classes";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default [
  ...config,
  {
    plugins: {
      "tailwind-canonical-classes": tailwindCanonical,
    },
    rules: {
      "tailwind-canonical-classes/tailwind-canonical-classes": [
        "warn",
        { cssPath: resolve(__dirname, "src/main.css") },
      ],
    },
  },
];
