/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // Aqui se definen los archivos en el que se aplicaran tailwindCSS
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // Luego abre index.css y coloca las directivas de tailwind
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
