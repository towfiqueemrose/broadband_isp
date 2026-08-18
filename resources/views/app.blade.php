<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="scroll-smooth">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="theme-color" content="{{ config('theme.colors.primary') }}">
        <meta name="description" content="{{ config('brand.meta.description') }}">

        <title inertia>{{ config('brand.name') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link rel="preconnect" href="https://fonts.bunny.net" crossorigin>
        <link href="https://fonts.bunny.net/css?family=inter:400,500,600,700,800|noto-sans-bengali:400,500,600,700&display=swap" rel="stylesheet" />

        <!-- Dynamic theme -->
        <style>
            :root {
                @foreach (config('theme.colors') as $key => $value)
                    --{{ $key }}: {{ $value }};
                @endforeach
            }
        </style>

        <!-- Favicon -->
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="bg-background font-sans text-foreground antialiased">
        @inertia
    </body>
</html>
