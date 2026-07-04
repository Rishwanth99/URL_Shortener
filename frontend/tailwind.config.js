/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#17202a',
        pine: '#106b5f',
        mist: '#f5f7fb'
      },
      boxShadow: {
        soft: '0 16px 40px rgba(25, 42, 62, 0.08)'
      }
    }
  },
  plugins: []
};

