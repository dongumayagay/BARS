const daisyui = require("daisyui");
// const forms = require("@tailwindcss/forms");

const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  daisyui: {
    themes: [
      "dark",
      {
        mytheme: {
        
          "primary": "#fdba74",
          
          "secondary": "#fb923c",
                  
          "accent": "#6e6d6b",
                  
          "neutral": "#ffffff",
                  
          "base-100": "#fed7aa",
                  
          "info": "#53d3fd",
                  
          "success": "#16a34a",
                  
          "warning": "#fbbf24",
                  
          "error": "#b91c1c",
        },
      },
  ],
  },

  plugins: [daisyui]
};

module.exports = config;