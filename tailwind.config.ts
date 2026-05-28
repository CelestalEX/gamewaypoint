import typography from "@tailwindcss/typography"

const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],

  theme: {
    extend: {}
  },

  plugins: [
    require("@tailwindcss/typography")
  ]
}

export default config