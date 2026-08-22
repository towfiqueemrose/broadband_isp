import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME
    || document.querySelector('meta[name="app-name"]')?.content;

const primaryColor =
    getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#4702bd';

createInertiaApp({
    title: (title) =>
        !title || title.includes(appName)
            ? title
            : [title, appName].filter(Boolean).join(' — '),
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: primaryColor,
    },
});
