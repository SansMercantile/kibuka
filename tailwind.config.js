/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'kibuka-purple': '#aa00ff',
        'kibuka-magenta': '#ff00aa',
        'kibuka-cyan': '#00ffaa',
      },
    },
  },
  plugins: [],
}