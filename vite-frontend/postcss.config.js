// postcss.config.js
module.exports = {
  plugins: [
    // Only add tailwindcss in development
    process.env.NODE_ENV === 'development' && require('tailwindcss'),
  ].filter(Boolean), // Removes undefined values, so the list remains valid
};