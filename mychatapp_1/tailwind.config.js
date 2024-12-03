/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
      extend: {
        colors:{
          'hitam' : '#000000',
          'putih' : '#ffffff',
          'oranye' : '#FF7700',
          'hijau' : '#09A425',
          'gray' : '#A1A1A1',
          'merah' : '#FF0000',
          'biru' : '#0077FF',
        },
        animation: {
          'fade-in': 'fadeIn 0.5s ease-in-out',
          'slide-in': 'slideIn 0.7s ease-in-out',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: 0 },
            '100%': { opacity: 1 },
          },
          slideIn: {
            '0%': { transform: 'translateY(20px)', opacity: 0 },
            '100%': { transform: 'translateY(0)', opacity: 1 },
          },
        },
      },
  },
  plugins: [],
};