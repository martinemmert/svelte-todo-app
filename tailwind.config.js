module.exports = {
  // plugins: [require("@tailwindcss/custom-forms")],
  theme: {
    spacing: {
      0: "0",
      px: "1px",
      1: "0.25rem", // 3px
      2: "0.5rem", // 6px
      4: "1rem", // 12px
      6: "1.5rem", // 18px
      8: "2rem", // 24px
      10: "2.5rem", // 30px
      12: "3rem", // 36px
      14: "3.5rem", // 42px
      16: "4rem", // 48px
      20: "5rem", // 60px
      24: "6rem", // 72px
    },
    fontFamily: {
      handwritten: ["ff-market-web"],
      serif: ["freight-text-pro", "serif"],
      sans: ["freight-sans-condensed-pro", "sans-serif"],
    },
    fontWeight: {
      book: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    fontSize: {
      small: "1.083333333rem",
      base: "1.416666667rem",
      lg: "2.1rem",
      xl: "3rem",
      "2xl": "4rem",
      "4xl": "6rem",
    },
    lineHeight: {
      none: "1",
      normal: "1.352941176",
    },
    extend: {
      colors: {
        gray: {
          100: "#F5F7FA",
          200: "#E4E7EB",
          300: "#CBD2D9",
          400: "#9AA5B1",
          500: "#A0AEC0",
          600: "#718096",
          700: "#4A5568",
          800: "#2D3748",
          900: "#1A202C",
        },
      },
      inset: {
        "1/2": "50%",
      },
    },
  },
  variants: {
    margin: ["responsive", "first", "last"],
    padding: ["responsive", "first", "last"],
    backgroundColor: [
      "responsive",
      "group-hover",
      "focus-within",
      "focus",
      "hover",
      "active",
      "visited",
      "disabled",
    ],
    border: [
      "responsive",
      "group-hover",
      "focus-within",
      "focus",
      "hover",
      "active",
      "visited",
      "disabled",
    ],
    opacity: ["hover", "focus", "active", "group-hover"],
    scale: ["responsive", "hover", "focus", "active", "group-hover"],
    textColor: [
      "responsive",
      "group-hover",
      "focus-within",
      "focus",
      "hover",
      "active",
      "visited",
      "disabled",
    ],
  },
};
