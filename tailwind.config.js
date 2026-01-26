/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        dark: {
          bg: 'rgb(15 20 25 / <alpha-value>)',
          surface: 'rgb(26 31 46 / <alpha-value>)',
          card: 'rgb(35 41 54 / <alpha-value>)',
          border: 'rgb(45 53 72 / <alpha-value>)',
        },
        accent: {
          primary: 'rgb(99 102 241 / <alpha-value>)',
          secondary: 'rgb(139 92 246 / <alpha-value>)',
          tertiary: 'rgb(236 72 153 / <alpha-value>)',
          yellow: 'rgb(251 191 36 / <alpha-value>)',
          green: 'rgb(16 185 129 / <alpha-value>)',
          blue: 'rgb(59 130 246 / <alpha-value>)',
        },
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(99, 102, 241, 0.3)',
        'glow-md': '0 0 20px rgba(99, 102, 241, 0.4)',
        'glow-lg': '0 0 30px rgba(99, 102, 241, 0.5)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 25px -5px rgba(99, 102, 241, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}
