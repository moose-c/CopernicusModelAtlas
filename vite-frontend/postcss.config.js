// postcss.config.js
module.exports = {
  plugins: [
    // Only add tailwindcss in development
    process.env.NODE_ENV === 'development' && require('tailwindcss'),
    // Other PostCSS plugins (like autoprefixer) should be added regardless of environment
    require('autoprefixer'),
  ].filter(Boolean), // Removes undefined values, so the list remains valid
};