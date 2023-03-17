const plugin = require('tailwindcss/plugin')
  const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      // fontFamily: {
      //   body: ["Sofia"],
      //   heading: ["Josefin Sans"],
      //   mainBody: ["Sofia"]
      // },
        colors: {
          cyan: colors.cyan,
        },
      spacing: {
        '96': '24rem',
        '128': '32rem',
      }
    },
    colors: {
      'primary': '#1B49BB',
      "error" : "#EB5769"
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp',),
    require('@tailwindcss/forms'),

    require('flowbite/plugin'),
    plugin(function ({addUtilities}){
      addUtilities({
        '.scrollbar-hide': {
          /* Firefox */
          'scrollbar-width': 'none',

          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      })
    })
  ],

}