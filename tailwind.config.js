/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      colors: {
        sky: "#5BC0F8",
        // transparent: "transparent",
        // current: "currentColor",
        // white: "#ffffff",
        // black: "black",
        // gray: "gray",
        // productHeader: "#324d67",
        // bannerBackground: "#dcdcdc",
        // bannerParagraph: "#5f5f5f",
        // bannerButton: "#f02d34",
        // productBackground: "#ebebeb",
        // success: "#31a831",
      },
      gridTemplateColumns: {
        // 2: "repeat(auto-fit, minmax(4rem, 50%))",
        2: "repeat(auto-fit, minmax(25rem, 34rem))",
      },
      flexGrow: {
        3: "3",
      },
    },
  },

  // plugins: [],
};
