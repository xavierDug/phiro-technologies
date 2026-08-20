import type { Config } from 'tailwindcss';

/**
 * Tailwind v4 is configured CSS-first via `@theme inline` in src/app/globals.css.
 * This file only supplies the content globs and the handful of keyframes that
 * registry components expect to find in JS config.
 */
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      keyframes: {
        blob: {
          '0%, 100%': { transform: 'translate(-50%, -50%) scale(1)' },
          '50%': { transform: 'translate(-48%, -52%) scale(1.1)' },
        },
      },
      animation: {
        blob: 'blob 20s infinite ease-in-out',
      },
    },
  },
  plugins: [],
};
export default config;
