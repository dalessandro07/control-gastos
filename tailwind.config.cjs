const withMT = require('@material-tailwind/react/utils/withMT')

module.exports = withMT({
  content: ['./index.html', './src/**/*.{react,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        dosis: ['Dosis', 'serif']
      },
      screens: {
        xs: '380px',
        xsm: '480px'
      }
    }
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('child', '& > *')
      addVariant('child-hover', '& > *:hover')
    }
  ]
})
