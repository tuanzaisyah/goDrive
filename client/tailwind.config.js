/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      "main-color": "#726FB2",
      "main-color-alt": "#403D80",
      "black-color": "#111023",
      "white-color": "#FFFFFF",
      "white-color-alt": "#F8F8FC",
      "grey-color": "#E5E5E5",
      "grey-color-alt": "#AAB8C2",
      "yellow-color": "#E0CA88",
      "chat-color": "#CECDE4",
      "chat-color-alt": "#E2EDFD",
      "red-color": "#EA3D2E",
      "btn-color-green": "#D0FBE6",
      "btn-color-green-alt": "#0F9D58",
      "btn-color-red": "#F4C6C2",
      "btn-color-red-alt": "#DB4437",
      "btn-color-blue": "#E2EDFD",
      "btn-color-blue-alt": "#0E62EA",
    },
    fontFamily: {
      logo: ["Montserrat", "sans-serif"],
      text: ["Quicksand", "sans-serif"],
    },
    extend: {
      screens: {
        sm: "540px",
        md: "767px",
        lg: "1024px",
        xl: "1280px",
        xxl: "1536px",
        xxxl: "1879px",
      },
    },
  },
  plugins: [],
};
