/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'system-ui', 'sans-serif'],
      },
      colors: {
        navy: '#000000',
        ink: '#333333',
        muted: '#676767',
        brand: '#e96c24',
        danger: '#c62828',
        accent: '#0173b4',
      },
    },
  },
  plugins: [],
}
