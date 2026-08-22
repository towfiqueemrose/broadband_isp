<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="scroll-smooth">
    @php
        $brandName = app(App\Services\BrandService::class)->name();
        $brandDescription = str_replace(config('brand.name'), $brandName, config('brand.meta.description'));
    @endphp
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="theme-color" content="{{ config('theme.colors.primary') }}">
        <meta name="description" content="{{ $brandDescription }}">
        <meta name="app-name" content="{{ $brandName }}">

        <title inertia>{{ $brandName }}</title>

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
        @php
            $favicon = app(App\Services\BrandService::class)->data()['favicon'] ?? null;
        @endphp
        @if($favicon)
            <link rel="icon" type="image/svg+xml" href="{{ asset('storage/' . $favicon) }}" />
        @else
            <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        @endif

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
