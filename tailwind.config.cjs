const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./src/app.html', './src/**/*.{svelte,js,ts}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
