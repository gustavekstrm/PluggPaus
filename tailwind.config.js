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
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['Space Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        // Warm neubrutalist ramp – replaces the neutral gray scale site-wide so
        // every existing page inherits the retro-arcade palette. Luminance is kept
        // close to Tailwind's default gray so contrast is preserved.
        gray: {
          50: '#f5f1ea',
          100: '#ece4d8',
          200: '#dccfbe',
          300: '#c2b4a2',
          400: '#9c8e7e',
          500: '#786b5e',
          600: '#574d42',
          700: '#38302a',
          800: '#26201c',
          900: '#1c1713',
          950: '#141019',
        },
        dark: {
          bg: '#1a1613',
          surface: '#211b17',
          card: '#26201c',
          border: '#3b332d',
        },
        accent: {
          primary: '#e07a4f',
          secondary: '#e6b84c',
          tertiary: '#ef5a6f',
          yellow: 'rgb(251 191 36 / <alpha-value>)',
          green: 'rgb(16 185 129 / <alpha-value>)',
          blue: 'rgb(59 130 246 / <alpha-value>)',
        },
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(224, 122, 79, 0.3)',
        'glow-md': '0 0 20px rgba(224, 122, 79, 0.35)',
        'glow-lg': '0 0 30px rgba(224, 122, 79, 0.4)',
        'card': '4px 4px 0 var(--shadow, #000)',
        'card-hover': '8px 8px 0 var(--shadow, #000)',
      },
    },
  },
  plugins: [],
}
