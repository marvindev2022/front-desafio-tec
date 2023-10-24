/** @type {import('tailwindcss').Config} */
export default {
  content: ["/index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#123456",
        secondary: "#789abc",
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'], 
        'playpen-sans': ['Playpen Sans', 'cursive'],
      },spacing: {
        '39': '39px',
      },
      borderRadius: {
        '50': '50%',
      },
      inset: {
        '1': '1px',
        '5': '5px',
      },
      borderWidth: {
        '2': '2px',
      },
      colors: {
        'custom-black': '#000000',
      },
      
     
    },
  },
  plugins: [],
};