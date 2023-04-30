import type { Config } from "tailwindcss";

import baseConfig from "@o4s/tailwind-config";

export default {
  content: ["./src/**/*.tsx"],
  presets: [baseConfig],
} satisfies Config;
