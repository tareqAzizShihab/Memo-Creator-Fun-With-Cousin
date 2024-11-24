/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/*.jsx", "./src/components/*.jsx"],
  theme: {
    extend: {
      backgroundImage: {
        memo: "url('./src/Mamo.jpg')",
      },
    },
  },
  plugins: [],
};
