/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#050B16",
          text: "#E3D2B5",
          pos: "#008B8B",
          neg: "#E94B7D",
          line: "#F07CA3",
          neutral: "#A6A6A6"
        }
      }
    }
  },
  plugins: []
};
