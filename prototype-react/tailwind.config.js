/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', 'system-ui', 'sans-serif'],
      },
      colors: {
        navy: '#1c3d59',
        ink: '#4a4842',
        muted: '#8a857c',
        brand: '#ff5c00',
        danger: '#b91c1c',
        accent: '#105d86',
      },
    },
  },
  plugins: [],
}
