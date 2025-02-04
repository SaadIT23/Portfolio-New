/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "15px",
      screens: {
        "2xl": "1400px",
      },
    },
    screens: {
      "sm": "300px",
      'md': '800px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1580px',
    },
    extend: {
      colors: {
        primary: "#1c1c22",
        accent: {
          DEFAULT: "#00ff99",
          hover: "#00e187",
        },
      },
      keyframes: {
        blink: {
          '0%, 100%': {
            'box-shadow': '0 4px 6px -1px rgba(0, 255, 153, 0.1)', // Accent color with normal shadow
          },
          '50%': {
            'box-shadow': '0 10px 15px -3px rgba(0, 255, 153, 0.3)', // More intense accent shadow in the middle
          },
        },
      },
      animation: {
        'blink-shadow': 'blink 1.5s infinite', // 2 seconds blinking effect, repeating infinitely
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}