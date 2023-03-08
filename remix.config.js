/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  cacheDirectory: "./node_modules/.cache/remix",
  ignoredRouteFiles: ["**/.*", "**/*.css", "**/*.test.{js,jsx,ts,tsx}"],
  future: {
    //   // v2_routeConvention: true,
    // unstable_dev: true,
    unstable_tailwind: true,
    unstable_postcss: true,
  },
};
