// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'], // Adjust based on your project
  theme: {
    extend: {
      backgroundImage: {
        'custom-main': 'radial-gradient(rgb(209, 0, 0) 0%, rgb(119, 0, 0) 80%, rgb(80, 5, 5) 100%)',
      },
      backgroundColor: {
        'custom-footer': 'rgb(120, 0, 0)',
        'custom-header': 'rgb(100, 0, 0)',
      }
    },
  },
  plugins: [],
};
