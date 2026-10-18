/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#FFF9EF',
          light: '#FFFCF7',
          warm: '#F7EFE3',
        },
        espresso: {
          DEFAULT: '#2B211D',
          muted: '#5A4C46',
          faint: 'rgba(43, 33, 29, 0.08)',
          border: 'rgba(43, 33, 29, 0.16)',
        },
        terracotta: {
          DEFAULT: '#E94B35',
          hover: '#D33822',
          light: '#FDEAE7',
        },
        riviera: {
          blue: '#397DD8',
          deep: '#1E4E8C',
          light: '#EBF3FC',
        },
        limoncello: {
          DEFAULT: '#F4E6A8',
          light: '#FBF6DB',
        },
        olive: {
          DEFAULT: '#697348',
          light: '#EDF1E4',
        },
      },
      fontFamily: {
        serif: ['Fraunces', 'Cormorant Garamond', 'Georgia', 'serif'],
        display: ['Fraunces', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.22em',
        tightest: '-0.035em',
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marquee-reverse 25s linear infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}
