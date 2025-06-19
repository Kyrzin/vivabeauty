module.exports = {
  content: ["./pages/*.{html,js}", "./index.html"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#D4A574", // warm-gold
          50: "#FBF8F4", // warm-gold-50
          100: "#F5E6D3", // warm-gold-100
          200: "#EFCFA7", // warm-gold-200
          300: "#E9B87B", // warm-gold-300
          400: "#D4A574", // warm-gold-400
          500: "#C19660", // warm-gold-500
          600: "#A67D4D", // warm-gold-600
          700: "#8B643A", // warm-gold-700
          800: "#704B27", // warm-gold-800
          900: "#553214", // warm-gold-900
        },
        secondary: {
          DEFAULT: "#F5E6D3", // champagne
          50: "#FEFCFA", // champagne-50
          100: "#F5E6D3", // champagne-100
          200: "#ECDCC7", // champagne-200
          300: "#E3D2BB", // champagne-300
          400: "#DAC8AF", // champagne-400
          500: "#D1BEA3", // champagne-500
          600: "#C8B497", // champagne-600
          700: "#BFAA8B", // champagne-700
          800: "#B6A07F", // champagne-800
          900: "#AD9673", // champagne-900
        },
        accent: {
          DEFAULT: "#E8B4B8", // muted-rose
          50: "#FDF9F9", // muted-rose-50
          100: "#F9ECED", // muted-rose-100
          200: "#F5DFE1", // muted-rose-200
          300: "#F1D2D5", // muted-rose-300
          400: "#EDC5C9", // muted-rose-400
          500: "#E8B4B8", // muted-rose-500
          600: "#E4A7AC", // muted-rose-600
          700: "#E09AA0", // muted-rose-700
          800: "#DC8D94", // muted-rose-800
          900: "#D88088", // muted-rose-900
        },
        background: "#FEFCFA", // warm-white
        surface: "#F9F6F2", // off-white
        text: {
          primary: "#2C2825", // rich-brown
          secondary: "#6B6560", // medium-brown
        },
        success: {
          DEFAULT: "#7BA05B", // natural-green
          50: "#F4F7F0", // natural-green-50
          100: "#E9F0E1", // natural-green-100
          200: "#DEE9D2", // natural-green-200
          300: "#D3E2C3", // natural-green-300
          400: "#C8DBB4", // natural-green-400
          500: "#7BA05B", // natural-green-500
          600: "#6F9052", // natural-green-600
          700: "#638049", // natural-green-700
          800: "#577040", // natural-green-800
          900: "#4B6037", // natural-green-900
        },
        warning: "#D4A574", // warm-gold (same as primary)
        error: {
          DEFAULT: "#C17B7B", // muted-red
          50: "#F9F3F3", // muted-red-50
          100: "#F3E7E7", // muted-red-100
          200: "#EDDBDB", // muted-red-200
          300: "#E7CFCF", // muted-red-300
          400: "#E1C3C3", // muted-red-400
          500: "#C17B7B", // muted-red-500
          600: "#B56F6F", // muted-red-600
          700: "#A96363", // muted-red-700
          800: "#9D5757", // muted-red-800
          900: "#914B4B", // muted-red-900
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        caption: ['Source Sans Pro', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'fluid-xs': 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',
        'fluid-sm': 'clamp(0.875rem, 0.8rem + 0.375vw, 1rem)',
        'fluid-base': 'clamp(1rem, 0.9rem + 0.5vw, 1.125rem)',
        'fluid-lg': 'clamp(1.125rem, 1rem + 0.625vw, 1.25rem)',
        'fluid-xl': 'clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)',
        'fluid-2xl': 'clamp(1.5rem, 1.3rem + 1vw, 1.875rem)',
        'fluid-3xl': 'clamp(1.875rem, 1.6rem + 1.375vw, 2.25rem)',
        'fluid-4xl': 'clamp(2.25rem, 1.9rem + 1.75vw, 3rem)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
      },
      boxShadow: {
        'warm': '0 4px 20px rgba(212, 165, 116, 0.15)',
        'warm-sm': '0 2px 8px rgba(212, 165, 116, 0.15)',
        'warm-lg': '0 8px 32px rgba(212, 165, 116, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 300ms ease-out',
        'slide-up': 'slideUp 300ms ease-out',
        'gentle-bounce': 'gentleBounce 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        gentleBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
      },
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}