const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./src/app.html', './src/**/*.{svelte,js,ts}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      transitionProperty: {
        'height': 'height',
        'width': 'width',
      },
      colors: {
        'fire': '#e63900',
        'water': '#1a8cff',
        'plant': '#59b300',
        'electric': '#ffff00',
        'earth': '#996633',
        'wind': '#00cc99',
        'neutral': '#999999',
        'light': '#fffae6',
        'dark': '#330033',
      }
    },
  },
  variants: {
    extend: {
      ringColor: ['hover'],
      borderRadius: ['first', 'last'],
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ],
}
