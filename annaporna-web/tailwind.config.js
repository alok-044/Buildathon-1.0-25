/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      
        'brand-green': '#16A34A',       
        'brand-dark-green': '#14532D', 
        'brand-green-light': '#DCFCE7', 
        
        'brand-orange': '#EA580C',      
        'brand-orange-light': '#FFEDD5',
        'brand-orange-dark': '#9A3412', 
      },
      animation: {
        // Fade In (Page Transitions)
        fadeIn: 'fadeIn 0.5s ease-out forwards',
        // Slide & Fade (Menus/Dropdowns)
        'slide-down-fade': 'slideDownFade 0.3s ease-out forwards',
        'slide-up-fade': 'slideUpFade 0.3s ease-out forwards',
        // Pulse (Loading States)
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        // Spin Once (Refresh Icons)
        'spin-once': 'spinOnce 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        // Shine Effect (Text/Cards)
        shine: 'shine 3s linear infinite',
      },
      keyframes: {
        fadeIn: {
          'from': { opacity: '0', transform: 'translateY(10px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDownFade: {
          'from': { transform: 'translateY(-10%)', opacity: '0' },
          'to': { transform: 'translateY(0)', opacity: '1' },
        },
        slideUpFade: {
          'from': { transform: 'translateY(0)', opacity: '1' },
          'to': { transform: 'translateY(-10%)', opacity: '0' },
        },
        spinOnce: {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
        shine: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        }
      }
    },
  },
  plugins: [],
}