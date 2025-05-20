/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
      extend: {
        animation: {
          gradientMotion: 'gradientBG 15s ease infinite',
        },
        keyframes: {
          gradientBG: {
            '0%': { backgroundPosition: '0% 50%' },
            '50%': { backgroundPosition: '100% 50%' },
            '100%': { backgroundPosition: '0% 50%' },
          },
        },
        backgroundSize: {
          '200': '200% 200%',
          '400': '400% 400%',
        }
      },
    },
    plugins: [],
  }
  