const paths = require("../paths");

module.exports = {
  stories: ["../src/**/*.stories.js"],
  addons: ["@storybook/addon-actions", "@storybook/addon-links", "@storybook/addon-knobs"],
  webpackFinal: (config) => {
    const aliases = paths.reduce((prev, curr) => {
      prev[curr.find] = `${curr.replacement}/`;
      return prev;
    }, {});

    console.log(aliases);

    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        ...aliases,
      },
    };

    return config;
  },
};
