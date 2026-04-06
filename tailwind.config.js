/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        gray: {
          950: '#000000',
        },
        forest: {
          300: '#79b876',
          400: '#5a9e57',
          800: '#1a3d1c',
          900: '#1a1a1a',
          950: '#000000',
        },
      },
    },
  },
  plugins: [],
}
