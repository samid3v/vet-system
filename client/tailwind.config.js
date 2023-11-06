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
          
          "primary": "#8dc7d6",
                   
          "secondary": "#137776",
                   
          "accent": "#c4b5f4",
                   
          "neutral": "#272131",
                   
          "base-100": "#30415a",
                   
          "info": "#89a5e1",
                   
          "success": "#4ad98d",
                   
          "warning": "#d27614",
                   
          "error": "#ea7181",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}

