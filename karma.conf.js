// Karma configuration
module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine"],
    files: ["karma/*.js"],
    exclude: [],
    preprocessors: {
      "**/*.test.ts": ["typescript"],
    },
    reporters: ["spec", "kjhtml"],
    port: 9876,
    colors: true,

    logLevel: config.LOG_DISABLE,
    autoWatch: true,
    browsers: ["Chrome"],
    client: {
      clearContext: false,
    },

    singleRun: false,
    concurrency: Infinity,
  });
};
