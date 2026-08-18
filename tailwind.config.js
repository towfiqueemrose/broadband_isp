import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'Noto Sans Bengali', ...defaultTheme.fontFamily.sans],
            },

            colors: {
                primary: {
                    DEFAULT: 'var(--primary)',
                    dark: 'var(--primary-dark)',
                    light: 'var(--primary-light)',
                    soft: 'var(--primary-soft)',
                    foreground: 'var(--primary-foreground)',
                },
                secondary: 'var(--secondary)',
                accent: 'var(--accent)',
                background: 'var(--background)',
                surface: 'var(--surface)',
                'surface-2': 'var(--surface-2)',
                ink: 'var(--ink)',
                foreground: 'var(--foreground)',
                muted: 'var(--muted)',
                border: 'var(--border)',
                success: 'var(--success)',
                warning: 'var(--warning)',
                error: 'var(--error)',
                ring: 'var(--ring)',
            },

            boxShadow: {
                card: '0 1px 2px 0 rgb(16 14 34 / 0.04), 0 1px 3px 0 rgb(16 14 34 / 0.06)',
                'card-hover': '0 12px 32px -8px rgb(16 14 34 / 0.14)',
                soft: '0 4px 24px -6px rgb(16 14 34 / 0.08)',
                lift: '0 16px 40px -12px rgb(16 14 34 / 0.18)',
            },

            borderRadius: {
                '4xl': '2rem',
            },

            letterSpacing: {
                tightest: '-0.045em',
            },

            maxWidth: {
                '8xl': '88rem',
            },
        },
    },

    plugins: [forms],
};
