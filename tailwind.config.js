/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors from the actual palette
        cream: {
          50: '#FAF3E3',
          100: '#FBEBD2', 
          200: '#F7D4B6',
          300: '#FFCFBB',
          400: '#EBD0BB',
        },
        coral: {
          100: '#FDD19C',
          200: '#FCA669', 
          300: '#D17D44',
        },
        sage: {
          100: '#C5E1E0',
          200: '#C5D9E7',
          300: '#83ABAD',
        },
        lavender: {
          100: '#EAE3EA',
          200: '#E4CEDB',
          300: '#E4CEDB',
        },
        yellow: '#FFE28A',
        terracotta: '#D17D44',
        pink: '#F48EAB',
      },
      fontFamily: {
        'bogart': ['Bogart', 'sans-serif'],
        'lato': ['Lato', 'sans-serif'],
      },
      fontSize: {
        'xs': '.75rem',
        'sm': '.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
      },
      spacing: {
        '18': '4.5rem',
        '20': '5rem',
        '24': '6rem',
        '28': '7rem',
        '32': '8rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'warm': '0 10px 25px -3px rgba(221, 125, 68, 0.1), 0 4px 6px -2px rgba(221, 125, 68, 0.05)',
      }
    },
  },
  plugins: [],
}