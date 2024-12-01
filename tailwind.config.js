module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'], // Adjust based on your project
  theme: {
    extend: {
      spacing: {
        '36': '9rem', // 150px
        '48': '12rem', // 200px
      },
      transformOrigin: {
        '3d': '50% 50%',
      },
      backgroundImage: {
        'custom-main': 'radial-gradient(rgb(209, 0, 0) 0%, rgb(119, 0, 0) 80%, rgb(80, 5, 5) 100%)',
        'custom-gradient': 'linear-gradient(136deg, rgb(250, 250, 250), rgb(184, 184, 184))',
      },
      backgroundColor: {
        'custom-footer': 'rgb(120, 0, 0)',
        'custom-header': 'rgb(100, 0, 0)',
      },
      boxShadow: {
        'custom-shadow': '0 1px 1px rgba(0, 0, 0, 0.25)',
      },
      animation: {
        "fall": 'fall 1s ease-out forwards', // Custom animation for falling
        "progress": 'progress 1s ease-out forwards', // Custom animation for falling
      },
      keyframes: {
        "fall": {
          '0%': {
            transform: 'translateY(-100px)', // Start from the top
            opacity: '0', // Start invisible
          },
          '100%': {
            transform: 'translateY(0)', // End at original position
            opacity: '1', // End visible
          },
        },
        "progress": {
          '0%': {
            transform: 'translateY(-50px)', // Start from the top
            opacity: '0', // Start invisible
          },
          '100%': {
            transform: 'translateY(0)', // End at original position
            opacity: '1', // End visible
          },
        }
      },
      transitionDelay: {
        200: '2ms',
        400: '4ms',
        600: '6ms',
      },
    },
  },
  plugins: [],
};
