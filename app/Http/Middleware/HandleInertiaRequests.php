<?php

namespace App\Http\Middleware;

use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'brand' => $this->brandData(),
            'theme' => $this->themeData(),
            'content' => config('content'),
            'settings' => [
                'background_image' => Setting::get('background_image'),
                'live_chat_enabled' => Setting::get('live_chat_enabled', 'false'),
                'live_chat_welcome' => Setting::get('live_chat_welcome', 'Hello! How can we help you?'),
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
        ];
    }

    private function brandData(): array
    {
        $brand = config('brand');

        // Override with DB values if set
        $brand['name'] = Setting::get('brand_name') ?? $brand['name'];
        $brand['tagline'] = Setting::get('brand_tagline') ?? $brand['tagline'];
        $brand['description'] = Setting::get('brand_description') ?? $brand['description'];

        if (Setting::get('brand_meta_title')) {
            $brand['meta']['title'] = Setting::get('brand_meta_title');
        }
        if (Setting::get('brand_meta_description')) {
            $brand['meta']['description'] = Setting::get('brand_meta_description');
        }

        $brand['contact']['hotline'] = Setting::get('brand_hotline') ?? $brand['contact']['hotline'];
        $brand['contact']['phone'] = Setting::get('brand_phone') ?? $brand['contact']['phone'];
        $brand['contact']['email'] = Setting::get('brand_email') ?? $brand['contact']['email'];
        $brand['contact']['address'] = Setting::get('brand_address') ?? $brand['contact']['address'];
        $brand['contact']['hours'] = Setting::get('brand_hours') ?? $brand['contact']['hours'];

        $socials = Setting::get('brand_socials');
        if ($socials) {
            $brand['socials'] = json_decode($socials, true) ?? $brand['socials'];
        }

        return $brand;
    }

    private function themeData(): array
    {
        $theme = config('theme');
        $primary = Setting::get('theme_primary');

        if ($primary) {
            $theme['colors']['primary'] = $primary;
            $theme['colors']['ring'] = $primary;
            $theme['colors']['primary-dark'] = $this->darkenHex($primary, 20);
            $theme['colors']['primary-light'] = $this->lightenHex($primary, 30);
            $theme['colors']['primary-soft'] = $this->tintHex($primary, 95);
        }

        $secondary = Setting::get('theme_secondary');
        if ($secondary) {
            $theme['colors']['secondary'] = $secondary;
        }

        $accent = Setting::get('theme_accent');
        if ($accent) {
            $theme['colors']['accent'] = $accent;
        }

        // Override config so that config('theme.colors') returns DB values
        // This ensures the CSS variables in app.blade.php use the live theme
        config(['theme.colors' => $theme['colors']]);

        return $theme;
    }

    private function darkenHex(string $hex, int $percent): string
    {
        return $this->adjustBrightness($hex, -$percent);
    }

    private function lightenHex(string $hex, int $percent): string
    {
        return $this->adjustBrightness($hex, $percent);
    }

    private function tintHex(string $hex, int $lightnessPercent): string
    {
        $hex = ltrim($hex, '#');
        $r = hexdec(substr($hex, 0, 2));
        $g = hexdec(substr($hex, 2, 2));
        $b = hexdec(substr($hex, 4, 2));

        // Blend each channel towards white
        $r = (int) round($r + (255 - $r) * ($lightnessPercent / 100));
        $g = (int) round($g + (255 - $g) * ($lightnessPercent / 100));
        $b = (int) round($b + (255 - $b) * ($lightnessPercent / 100));

        return sprintf('#%02x%02x%02x', $r, $g, $b);
    }

    private function adjustBrightness(string $hex, int $steps): string
    {
        $hex = ltrim($hex, '#');
        $r = max(0, min(255, (int) round(hexdec(substr($hex, 0, 2)) * (1 + $steps / 100))));
        $g = max(0, min(255, (int) round(hexdec(substr($hex, 2, 2)) * (1 + $steps / 100))));
        $b = max(0, min(255, (int) round(hexdec(substr($hex, 4, 2)) * (1 + $steps / 100))));

        return sprintf('#%02x%02x%02x', $r, $g, $b);
    }
}
