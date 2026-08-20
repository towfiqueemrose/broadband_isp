<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class WebsiteSettingsController extends Controller
{
    public function brand(): Response
    {
        return Inertia::render('Admin/Settings/Brand', [
            'brand' => [
                'name' => config('brand.name'),
                'tagline' => config('brand.tagline'),
                'description' => config('brand.description'),
                'meta_title' => config('brand.meta.title'),
                'meta_description' => config('brand.meta.description'),
                'hotline' => config('brand.contact.hotline'),
                'phone' => config('brand.contact.phone'),
                'email' => config('brand.contact.email'),
                'address' => config('brand.contact.address'),
                'hours' => config('brand.contact.hours'),
                'socials' => config('brand.socials', []),
            ],
        ]);
    }

    public function updateBrand(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'tagline' => 'nullable|string|max:500',
            'description' => 'nullable|string|max:1000',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'hotline' => 'nullable|string|max:50',
            'phone' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:255',
            'address' => 'nullable|string|max:500',
            'hours' => 'nullable|string|max:255',
            'socials' => 'nullable|array',
        ]);

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

        return redirect()->route('admin.settings.brand')
            ->with('success', 'Brand settings updated successfully. Changes will appear after config cache is cleared.');
    }

    public function theme(): Response
    {
        return Inertia::render('Admin/Settings/Theme', [
            'theme' => config('theme.colors', []),
        ]);
    }

    public function updateTheme(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'primary' => 'required|string|max:20',
            'secondary' => 'nullable|string|max:20',
            'accent' => 'nullable|string|max:20',
        ]);

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
                'live_chat_enabled' => Setting::get('live_chat_enabled', 'false'),
                'live_chat_provider' => Setting::get('live_chat_provider', ''),
                'live_chat_welcome' => Setting::get('live_chat_welcome', 'Hello! How can we help you?'),
            ],
        ]);
    }

    public function updateGeneral(Request $request): RedirectResponse
    {
        $request->validate([
            'background_image' => 'nullable|image|mimes:jpeg,jpg,png,webp|max:5120',
            'live_chat_enabled' => 'nullable|string|in:true,false',
            'live_chat_provider' => 'nullable|string|max:255',
            'live_chat_welcome' => 'nullable|string|max:500',
        ]);

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

        Setting::set('live_chat_enabled', $request->input('live_chat_enabled', 'false'));
        Setting::set('live_chat_provider', $request->input('live_chat_provider', ''));
        Setting::set('live_chat_welcome', $request->input('live_chat_welcome', ''));

        return redirect()->route('admin.settings.general')
            ->with('success', 'General settings updated successfully.');
    }
}
