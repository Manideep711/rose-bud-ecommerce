/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        brand: {
          50: '#fdf8f9', 100: '#faeff1', 200: '#f6dce2',
          300: '#efbecc', 400: '#e394aa', 500: '#d36988',
          600: '#bd456b', 700: '#9f3151', 800: '#852b47',
          900: '#71273e', 950: '#3f1120',
        },
        accent: { light: '#fde68a', DEFAULT: '#f59e0b', dark: '#d97706' },
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
    },
  },
  plugins: [],
};
