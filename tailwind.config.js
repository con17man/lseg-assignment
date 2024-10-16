/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: {
          DEFAULT: '#0028F6',
        },
      },

      gridTemplateColumns: {
        'chat-msg-bot': '40px 1fr',
        'chat-msg-user': '1fr 40px',
      },
    },
  },
  plugins: [],
};
