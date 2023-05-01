/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Screen sizes
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        lx: "1440px",
      },
      // Colors
      colors: {
        clVeryDarkGray: "hsl(0, 0%, 17%)",
        clDarkGray: "hsl(0, 0%, 59%)",
      },
    },
    plugins: [],
  },
}
