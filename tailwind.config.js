/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        custom1: "#F8F8F8",
        custom2: "#F2F0F2",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      borderRadius: {
        custom: "16px 16px 16px 4px",
        custom1: "16px 16px 4px 16px",
      },
      boxShadow: {
        custom:
          "rgba(50, 50, 93, 0.25) 0px 0px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
      },
    },
    
  },
  plugins: [ function ({ addUtilities }) {
    const newUtilities = {
      '.line-clamp-4': {
        display: '-webkit-box',
        '-webkit-line-clamp': '4',
        '-webkit-box-orient': 'vertical',
        overflow: 'hidden',
      },
    };

    addUtilities(newUtilities);
  },],
};
