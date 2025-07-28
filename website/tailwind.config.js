/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,md,mdx}",
    "./docs/**/*.{md,mdx}",
  ],
  // Use data attribute for dark mode to match Docusaurus
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      // Custom colors matching the existing scrapbook theme
      colors: {
        'scrapbook': {
          'ideas': '#4f46e5',      // Indigo for Ideas
          'prompts': '#059669',    // Emerald for Prompts  
          'todos': '#dc2626',      // Red for Todos
          'tags': '#7c3aed',       // Purple for Tags
          'neutral': '#6b7280',    // Content text
          'background': '#fafafa', // Light background
          'surface': '#ffffff',    // Card backgrounds
          'border': '#e5e7eb',     // Subtle borders
        },
        'scrapbook-dark': {
          'background': '#1f2937',
          'surface': '#111827',
          'border': '#374151',
          'neutral': '#9ca3af',
        }
      },
      // Custom spacing scale (80% of default)
      spacing: {
        '0.5': '0.1rem',   // 2px * 0.8
        '1': '0.2rem',     // 4px * 0.8
        '1.5': '0.3rem',   // 6px * 0.8
        '2': '0.32rem',    // 8px * 0.8
        '2.5': '0.4rem',   // 10px * 0.8
        '3': '0.48rem',    // 12px * 0.8
        '3.5': '0.56rem',  // 14px * 0.8
        '4': '0.64rem',    // 16px * 0.8
        '5': '0.8rem',     // 20px * 0.8
        '6': '0.96rem',    // 24px * 0.8
        '7': '1.12rem',    // 28px * 0.8
        '8': '1.28rem',    // 32px * 0.8
        '9': '1.44rem',    // 36px * 0.8
        '10': '1.6rem',    // 40px * 0.8
        '11': '1.76rem',   // 44px * 0.8
        '12': '1.92rem',   // 48px * 0.8
        '14': '2.24rem',   // 56px * 0.8
        '16': '2.56rem',   // 64px * 0.8
        '20': '3.2rem',    // 80px * 0.8
        '24': '3.84rem',   // 96px * 0.8
        '28': '4.48rem',   // 112px * 0.8
        '32': '5.12rem',   // 128px * 0.8
      },
      // Custom font sizes (80% of default)
      fontSize: {
        'xs': ['0.64rem', { lineHeight: '0.8rem' }],    // 10px * 0.8
        'sm': ['0.72rem', { lineHeight: '0.96rem' }],   // 12px * 0.8
        'base': ['0.8rem', { lineHeight: '1.12rem' }],  // 14px * 0.8
        'lg': ['0.88rem', { lineHeight: '1.2rem' }],    // 16px * 0.8
        'xl': ['0.96rem', { lineHeight: '1.28rem' }],   // 18px * 0.8
        '2xl': ['1.2rem', { lineHeight: '1.6rem' }],    // 20px * 0.8
        '3xl': ['1.44rem', { lineHeight: '1.84rem' }],  // 24px * 0.8
        '4xl': ['1.76rem', { lineHeight: '2.24rem' }],  // 28px * 0.8
        '5xl': ['2.4rem', { lineHeight: '2.88rem' }],   // 36px * 0.8
        '6xl': ['3.2rem', { lineHeight: '3.84rem' }],   // 48px * 0.8
      },
      // Border radius (80% of default)
      borderRadius: {
        'sm': '1.6px',     // 2px * 0.8
        'DEFAULT': '3.2px', // 4px * 0.8
        'md': '4.8px',     // 6px * 0.8
        'lg': '6.4px',     // 8px * 0.8
        'xl': '9.6px',     // 12px * 0.8
        '2xl': '12.8px',   // 16px * 0.8
        '3xl': '19.2px',   // 24px * 0.8
        'full': '9999px',
      }
    },
  },
  plugins: [],
  // Disable Tailwind's preflight to avoid conflicts with Docusaurus
  corePlugins: {
    preflight: false,
  },
};