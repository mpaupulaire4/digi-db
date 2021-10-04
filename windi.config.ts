import defaultTheme  from 'windicss/defaultTheme'
import { defineConfig }  from 'windicss/helpers'
import forms  from 'windicss/plugin/forms'

export default defineConfig({
  purge: ['./src/app.html', './src/**/*.{svelte,js,ts,css}'],
  darkMode: 'class', // or 'media' or 'class'
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
  extract: {
    include: ['src/**/*.{svelte,html,js,ts}'],
    exclude: ['node_modules', '.git'],
  },
  plugins: [
    forms,
  ],
})
