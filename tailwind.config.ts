import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/preline/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        gold: '#FFD700',
      },
      fontFamily: {
        sans: 'var(--font-sans)',
        display: 'var(--font-display)',
      },
      animation: {
        blob: "blob 20s infinite ease-in-out",
      },
      keyframes: {
        blob: {
          '0%, 100%': { transform: 'translate(-50%, -50%) scale(1)' },
          '50%': { transform: 'translate(-48%, -52%) scale(1.1)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;