/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cloud: '#F8F9FA',
        navy: '#1A2B3C',
        slateink: '#314456',
      },
      boxShadow: {
        soft: '0 10px 30px rgba(26,43,60,0.08)',
      },
    },
  },
  plugins: [],
}
