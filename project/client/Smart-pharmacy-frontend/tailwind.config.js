/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          50: '#E1F5EE',
          100: '#9FE1CB',
          400: '#1D9E75',
          600: '#0F6E56',
          800: '#085041',
        },
        blue: {
          50: '#E6F1FB',
          100: '#B5D4F4',
          200: '#85B7EB',
          400: '#378ADD',
          800: '#0C447C',
        },
        amber: {
          50: '#FAEEDA',
          100: '#FAC775',
          400: '#BA7517',
          800: '#633806',
        },
        coral: {
          50: '#FAECE7',
          100: '#F5C4B3',
          400: '#D85A30',
          800: '#712B13',
        },
        gray: {
          50: '#F1EFE8',
          100: '#D3D1C7',
          400: '#888780',
        },
        purple: {
          50: '#EEEDFE',
          400: '#7F77DD',
        },
        'bg-primary': '#ffffff',
        'bg-secondary': '#f8f8f6',
        'bg-tertiary': '#f1efea',
        'text-primary': '#1a1a18',
        'text-secondary': '#666660',
        'text-hint': '#999992',
        'border-light': 'rgba(0,0,0,0.08)',
        'border-medium': 'rgba(0,0,0,0.14)',
      },
      borderRadius: {
        'sm': '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      boxShadow: {
        'sm': '0 1px 3px rgba(0,0,0,0.06)',
        'md': '0 4px 16px rgba(0,0,0,0.08)',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      scrollbar: {
        thin: '4px',
      },
    },
  },
  plugins: [],
}
