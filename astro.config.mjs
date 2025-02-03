// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  base: '/apps/abbott/resistencia_bacteriana',
  outDir: 'apps/abbott/resistencia_bacteriana',
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react()],
});