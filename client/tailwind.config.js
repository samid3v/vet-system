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
          
          "primary": "#004c6b",
          
          "secondary": "#aabaf7",
                   
          "accent": "#f7a3f7",
                   
          "neutral": "#212b31",
                   
          "base-100": "#eff1f5",
                   
          "info": "#a3b5f5",
                   
          "success": "#158463",
                   
          "warning": "#eecb1b",
                   
          "error": "#eb5842",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}

