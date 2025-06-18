/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Business Brand Colors
        'steel-blue': '#1E3D58',
        'emerald-green': '#007F5F',
        'gold': '#B8860B',
        'luxe-cream': '#F5E6D3',
        // Keep some amber variations for compatibility
        amber: {
          100: '#F5E6D3', // Luxe cream for light text
          200: '#F5E6D3',
          300: '#E6D7C3',
          400: '#B8860B', // Gold
          500: '#B8860B', // Gold
          600: '#9A7209',
        },
      },
    },
  },
  plugins: [],
};