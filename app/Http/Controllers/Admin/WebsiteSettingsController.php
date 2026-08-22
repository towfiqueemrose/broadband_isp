<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateBrandSettingsRequest;
use App\Http\Requests\Admin\UpdateGeneralSettingsRequest;
use App\Http\Requests\Admin\UpdateThemeSettingsRequest;
use App\Models\Setting;
use App\Services\BrandService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class WebsiteSettingsController extends Controller
{
    public function brand(BrandService $brandService): Response
    {
        $brand = $brandService->data();

        return Inertia::render('Admin/Settings/Brand', [
            'brand' => [
                'name' => $brand['name'],
                'tagline' => $brand['tagline'],
                'description' => $brand['description'],
                'meta_title' => $brand['meta']['title'],
                'meta_description' => $brand['meta']['description'],
                'hotline' => $brand['contact']['hotline'],
                'phone' => $brand['contact']['phone'],
                'email' => $brand['contact']['email'],
                'address' => $brand['contact']['address'],
                'hours' => $brand['contact']['hours'],
                'socials' => $brand['socials'] ?? [],
                'logo' => $brand['logo'] ?? null,
                'favicon' => $brand['favicon'] ?? null,
            ],
        ]);
    }

    public function updateBrand(UpdateBrandSettingsRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        // Store in settings table for dynamic management
        Setting::set('brand_name', $validated['name']);
        Setting::set('brand_tagline', $validated['tagline'] ?? '');
        Setting::set('brand_description', $validated['description'] ?? '');
        Setting::set('brand_meta_title', $validated['meta_title'] ?? '');
        Setting::set('brand_meta_description', $validated['meta_description'] ?? '');
        Setting::set('brand_hotline', $validated['hotline'] ?? '');
        Setting::set('brand_phone', $validated['phone'] ?? '');
        Setting::set('brand_email', $validated['email'] ?? '');
        Setting::set('brand_address', $validated['address'] ?? '');
        Setting::set('brand_hours', $validated['hours'] ?? '');

        if (isset($validated['socials'])) {
            Setting::set('brand_socials', json_encode($validated['socials']));
        }

        // Logo upload
        if ($request->hasFile('logo')) {
            $old = Setting::get('brand_logo');
            if ($old && Storage::disk('public')->exists($old)) {
                Storage::disk('public')->delete($old);
            }
            $path = $request->file('logo')->store('brand', 'public');
            Setting::set('brand_logo', $path);
        }
        if ($request->input('remove_logo') === '1') {
            $old = Setting::get('brand_logo');
            if ($old && Storage::disk('public')->exists($old)) {
                Storage::disk('public')->delete($old);
            }
            Setting::set('brand_logo', null);
        }

        // Favicon upload
        if ($request->hasFile('favicon')) {
            $old = Setting::get('brand_favicon');
            if ($old && Storage::disk('public')->exists($old)) {
                Storage::disk('public')->delete($old);
            }
            $path = $request->file('favicon')->store('brand', 'public');
            Setting::set('brand_favicon', $path);
        }
        if ($request->input('remove_favicon') === '1') {
            $old = Setting::get('brand_favicon');
            if ($old && Storage::disk('public')->exists($old)) {
                Storage::disk('public')->delete($old);
            }
            Setting::set('brand_favicon', null);
        }

        return redirect()->route('admin.settings.brand')
            ->with('success', 'Brand settings updated successfully.');
    }

    public function theme(): Response
    {
        return Inertia::render('Admin/Settings/Theme', [
            'theme' => config('theme.colors', []),
        ]);
    }

    public function updateTheme(UpdateThemeSettingsRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        Setting::set('theme_primary', $validated['primary']);
        Setting::set('theme_secondary', $validated['secondary'] ?? '#1e1b4b');
        Setting::set('theme_accent', $validated['accent'] ?? '#22d3ee');

        return redirect()->route('admin.settings.theme')
            ->with('success', 'Theme colors updated successfully. Changes will appear after cache clear.');
    }

    public function general(): Response
    {
        return Inertia::render('Admin/Settings/General', [
            'settings' => [
                'background_image' => Setting::get('background_image'),
                'login_image' => Setting::get('login_image'),
                'live_chat_enabled' => Setting::get('live_chat_enabled', 'false'),
                'live_chat_provider' => Setting::get('live_chat_provider', ''),
                'live_chat_welcome' => Setting::get('live_chat_welcome', 'Hello! How can we help you?'),
            ],
        ]);
    }

    public function updateGeneral(UpdateGeneralSettingsRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        if ($request->hasFile('background_image')) {
            $old = Setting::get('background_image');
            if ($old && Storage::disk('public')->exists($old)) {
                Storage::disk('public')->delete($old);
            }
            $path = $request->file('background_image')->store('backgrounds', 'public');
            Setting::set('background_image', $path);
        }

        if ($request->input('remove_background') === '1') {
            $old = Setting::get('background_image');
            if ($old && Storage::disk('public')->exists($old)) {
                Storage::disk('public')->delete($old);
            }
            Setting::set('background_image', null);
        }

        if ($request->hasFile('login_image')) {
            $old = Setting::get('login_image');
            if ($old && Storage::disk('public')->exists($old)) {
                Storage::disk('public')->delete($old);
            }
            $path = $request->file('login_image')->store('login', 'public');
            Setting::set('login_image', $path);
        }

        if ($request->input('remove_login_image') === '1') {
            $old = Setting::get('login_image');
            if ($old && Storage::disk('public')->exists($old)) {
                Storage::disk('public')->delete($old);
            }
            Setting::set('login_image', null);
        }

        $enabled = $request->boolean('live_chat_enabled') ? 'true' : 'false';
        Setting::set('live_chat_enabled', $enabled);
        Setting::set('live_chat_provider', $request->input('live_chat_provider', ''));
        Setting::set('live_chat_welcome', $request->input('live_chat_welcome', ''));

        return redirect()->route('admin.settings.general')
            ->with('success', 'General settings updated successfully.');
    }
}
