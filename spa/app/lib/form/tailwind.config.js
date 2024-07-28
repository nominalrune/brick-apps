/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    boxShadow:{
      'inset-vertical': `inset 0.75rem -0.25rem 1rem -1rem rgba(0, 0, 0, 0.5),
                            inset -0.75rem -0.25rem 1rem -1rem rgba(0, 0, 0, 0.5)`,
      'inset-horizontal': `inset 0.75rem -0.25rem 1rem -0.75rem rgba(0, 0, 0, 0.5), 
                            inset -0.75rem -0.25rem 1rem -0.75rem rgba(0, 0, 0, 0.5)`,
    },
    dropShadow: {
      "stroke-white": ["1px 0px 1px white"," -1px 0px 1px white", "0px 1px 1px white", "0px -1px 1px white"],
    },
    extend: {},
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
  important: "#rsf",
}

