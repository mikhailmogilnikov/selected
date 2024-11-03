import type { Config } from 'tailwindcss';

const config: Omit<Config, 'content'> = {
  theme: {
    extend: {
      colors: {
        transparent: 'hsla(0, 0%, 0%, 0)',
        background: 'hsla(var(--color-background), <alpha-value>)',
        foreground: 'hsla(var(--color-foreground), <alpha-value>)',
        divider: 'hsla(var(--color-divider), <alpha-value>)',
        focus: 'hsla(var(--color-focus), <alpha-value>)',
        default: {
          DEFAULT: 'hsla(var(--color-default), <alpha-value>)',
          foreground: 'hsla(var(--color-default-foreground), <alpha-value>)',
        },
        primary: {
          DEFAULT: 'hsla(var(--color-primary), <alpha-value>)',
          foreground: 'hsla(var(--color-primary-foreground), <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'hsla(var(--color-secondary), <alpha-value>)',
          foreground: 'hsla(var(--color-secondary-foreground), <alpha-value>)',
        },
        success: {
          DEFAULT: 'hsla(var(--color-success), <alpha-value>)',
          foreground: 'hsla(var(--color-success-foreground), <alpha-value>)',
        },
        warning: {
          DEFAULT: 'hsla(var(--color-warning), <alpha-value>)',
          foreground: 'hsla(var(--color-warning-foreground), <alpha-value>)',
        },
        danger: {
          DEFAULT: 'hsla(var(--color-danger), <alpha-value>)',
          foreground: 'hsla(var(--color-danger-foreground), <alpha-value>)',
        },
      },
      gap: {
        sm: '0.25rem',
        base: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '2.5rem',
        '3xl': '3rem',
        '4xl': '3.5rem',
        '5xl': '4rem',
      },
    },
    darkMode: 'class',
  },
  plugins: [],
};

export default config;
