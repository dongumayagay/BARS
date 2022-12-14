const daisyui = require("daisyui");
const forms = require("@tailwindcss/forms");

const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  daisyui: {
    themes: [
      {
        mytheme: {
        
          "primary": "#fdba74",
          
          "secondary": "#fb923c",
                  
          "accent": "#44403c",
                  
          "neutral": "#ffffff",
                  
          "base-100": "#fed7aa",
                  
          "info": "#2563eb",
                  
          "success": "#16a34a",
                  
          "warning": "#fbbf24",
                  
          "error": "#b91c1c",
        },
      },
  ],
  },

  plugins: [forms, daisyui]
};

module.exports = config;