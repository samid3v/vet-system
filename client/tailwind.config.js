/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          
          "primary": "#00d8a4",
                   
          "secondary": "#007d68",
                   
          "accent": "#00962d",
                   
          "neutral": "#191e1b",
                   
          "base-100": "#fff9fc",
                   
          "info": "#00b3ca",
                   
          "success": "#7eff00",
                   
          "warning": "#e05700",
                   
          "error": "#ff4780",
                   },
      },
    ],
  },
  plugins: [require("daisyui")],
}

