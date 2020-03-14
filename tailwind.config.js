const { colors } = require("tailwindcss/defaultTheme");

module.exports = {
  plugins: [require("@tailwindcss/custom-forms")],
  theme: {
    extend: {
      spacing: {
        "0.5": "0.125rem"
      },
      inset: {
        "1/2": "50%"
      }
    }
  },
  variants: {
    backgroundColor: [
      "responsive",
      "group-hover",
      "focus-within",
      "focus",
      "hover",
      "active",
      "visited",
      "disabled"
    ],
    border: [
      "responsive",
      "group-hover",
      "focus-within",
      "focus",
      "hover",
      "active",
      "visited",
      "disabled"
    ],
    scale: ["responsive", "hover", "focus", "active", "group-hover"],
    textColor: [
      "responsive",
      "group-hover",
      "focus-within",
      "focus",
      "hover",
      "active",
      "visited",
      "disabled"
    ]
  }
};
