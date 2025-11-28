import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class', // BU SATIR HAYATİ ÖNEM TAŞIR
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'grid-slate-700/50': 'linear-gradient(to right, rgba(51, 65, 85, 0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(51, 65, 85, 0.5) 1px, transparent 1px)',
        'grid-gray-200': 'linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)',
      },
      backgroundSize: {
        'size-3rem': '3rem 3rem',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
