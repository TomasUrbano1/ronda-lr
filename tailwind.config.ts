import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B35',         // Naranja PedidosYa
        'primary-dark': '#E55A2B',
        'primary-light': '#FF8A00',
        accent: '#00D4AA',
        background: '#FAFAFA',
        surface: '#FFFFFF',
        text: {
          primary: '#2D2D2D',
          secondary: '#666666',
          muted: '#999999',
        },
      },
      boxShadow: {
        card: '0 8px 24px rgba(0,0,0,0.08)',
        elevated: '0 12px 32px rgba(0,0,0,0.12)',
        button: '0 4px 16px rgba(255,107,53,0.4)',
      },
      borderRadius: {
        xl: '16px',
        '2xl': '24px',
        full: '9999px',
      },
    },
  },
  plugins: [],
}

export default config