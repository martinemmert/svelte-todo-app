const cssnano = require("cssnano");

const purgecss = require("@fullhuman/postcss-purgecss")({
  content: ["./src/**/*.html", "./src/**/*.svelte"],

  whitelistPatterns: [/svelte-/],

  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
});

module.exports = ctx => ({
  map: ctx.options.map,
  plugins: [
    require("postcss-import"),
    require("tailwindcss"),
    require("postcss-preset-env")({
      stage: 1,
      // FIXME: remove deactivation when the fix is applied
      // https://github.com/jonathantneal/postcss-focus-within/issues/6
      features: {
        "focus-within-pseudo-class": false,
      },
    }),
    ...(ctx.env === "production" ? [purgecss, cssnano({ preset: "default" })] : []),
  ],
});
