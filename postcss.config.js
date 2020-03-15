const cssnano = require("cssnano");

const purgecss = require("@fullhuman/postcss-purgecss")({
  content: ["./src/**/*.html", "./src/**/*.svelte"],

  whitelistPatterns: [/svelte-/],

  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
});

module.exports = ctx => ({
  map: ctx.options.map,
  plugins: [
    require("postcss-import"),
    require("tailwindcss"),
    require("postcss-preset-env")({ stage: 1 }),
    ...(ctx.env === "production" ? [purgecss, cssnano({ preset: "default" })] : []),
  ],
});
