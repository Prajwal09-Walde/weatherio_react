/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{html,js,jsx}"];
export const theme = {
  extend: {
    width: {
      "150": "9.375rem",
      "512": "32rem",
      "100": "6.25rem",
      "300": "18.75rem",
    },
    margin: {
      "20px": "1.25rem",
    },
    padding: {
      "20px": "1.25rem"
    },
    letterspacing: {
      "1": "0.063rem"
    }
  },
};
export const plugins = [];

