<?php

namespace App\Services;

use App\Models\Setting;

class BrandService
{
    /**
     * Brand identity resolved from the settings table with config/brand.php
     * as fallback, so admin edits take effect without touching code.
     *
     * @return array<string, mixed>
     */
    public function data(): array
    {
        $brand = config('brand');

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

        $brand['logo'] = Setting::get('brand_logo');
        $brand['favicon'] = Setting::get('brand_favicon');

        $socials = Setting::get('brand_socials');
        if ($socials) {
            $brand['socials'] = json_decode($socials, true) ?? $brand['socials'];
        }

        return $brand;
    }

    /**
     * The live brand name.
     */
    public function name(): string
    {
        return $this->data()['name'];
    }

    /**
     * Override the runtime config with the DB-backed brand values and swap
     * every hardcoded occurrence of the default company name inside the
     * content config (fallback copy) with the live name. Must run once per
     * request, before controllers render, so all consumers stay in sync.
     */
    public function applyToConfig(): void
    {
        $defaultName = config('brand.name');
        $data = $this->data();

        config(['brand' => $data]);

        if ($defaultName && $defaultName !== $data['name']) {
            $content = config('content', []);

            array_walk_recursive($content, function (&$value) use ($defaultName, $data): void {
                if (is_string($value)) {
                    $value = str_replace($defaultName, $data['name'], $value);
                }
            });

            config(['content' => $content]);
        }
    }
}
