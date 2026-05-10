/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'bg-primary':   '#ffffff',
        'bg-secondary': '#f7f9f8',
        'bg-tertiary':  '#f1f4f3',
        'text-primary': '#1a2d27',
        'text-secondary':'#4a6660',
        'text-hint':    '#8fa89f',
        'border-light': '#e8eeed',
        'border-medium':'#d0d9d7',
        coral: {
          50:  '#fef4f1',
          100: '#fde4db',
          400: '#f07a5e',
          600: '#d95e40',
          800: '#7a2d1e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
      keyframes: {
        slideIn: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        slideIn: 'slideIn 0.2s ease',
      },
    },
  },
  plugins: [],
}
