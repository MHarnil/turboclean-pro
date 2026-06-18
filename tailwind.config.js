/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e0f2fe',
          100: '#bae6fd',
          200: '#7dd3fc',
          300: '#38bdf8',
          400: '#0ea5e9',
          500: '#0284c7',
          600: '#0369a1',
          700: '#075985',
          800: '#0c4a6e',
          900: '#082f49',
        },
        accent: {
          50: '#fef3c7',
          100: '#fde68a',
          200: '#fcd34d',
          300: '#fbbf24',
          400: '#f59e0b',
          500: '#d97706',
          600: '#b45309',
        },
        dark: {
          900: '#050a14',
          800: '#0a1628',
          700: '#0f2040',
          600: '#152a52',
          500: '#1a3464',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'bounce-slow': 'bounce 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #050a14 0%, #0a1628 30%, #0f2040 60%, #082f49 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(2,132,199,0.15) 0%, rgba(8,47,73,0.3) 100%)',
        'cta-gradient': 'linear-gradient(135deg, #0ea5e9 0%, #0369a1 50%, #075985 100%)',
        'gold-gradient': 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
      },
      boxShadow: {
        'glow': '0 0 30px rgba(14, 165, 233, 0.4)',
        'glow-lg': '0 0 60px rgba(14, 165, 233, 0.3)',
        'card': '0 4px 24px rgba(0,0,0,0.4)',
        'gold': '0 4px 20px rgba(251,191,36,0.4)',
      }
    },
  },
  plugins: [],
}
