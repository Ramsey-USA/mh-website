module.exports = {
  plugins: {
    // Tailwind CSS - must be first in the pipeline
    tailwindcss: {},

    // Autoprefixer for browser compatibility
    autoprefixer: {
      // Specify browser support
      overrideBrowserslist: [
        "> 1%",
        "last 2 versions",
        "Firefox ESR",
        "not dead",
        "not IE 11",
      ],
      // Enable flexbox support
      flexbox: "no-2009",
      // Enable grid support
      grid: "autoplace",
    },
  },
};
