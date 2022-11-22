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
                  
          "accent": "#f3f4f6",
                  
          "neutral": "#ffffff",
                  
          "base-100": "#fed7aa",
                  
          "info": "#3b82f6",
                  
          "success": "#65a30d",
                  
          "warning": "#fbbf24",
                  
          "error": "#b91c1c",
        },
      },
  ],
  },

  plugins: [forms, daisyui]
};

module.exports = config;