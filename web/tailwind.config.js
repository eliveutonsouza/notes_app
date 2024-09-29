/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F19674",
      },
      borderColor: {
        primary: "#F19674",
      },
    },
  },
  plugins: [],
};
