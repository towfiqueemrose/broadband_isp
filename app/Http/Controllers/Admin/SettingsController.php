<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SettingsController extends Controller
{
    public function edit()
    {
        return Inertia::render('Admin/Settings', [
            'settings' => [
                'background_image' => Setting::get('background_image'),
            ],
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'background_image' => 'nullable|image|mimes:jpeg,jpg,png,webp|max:5120',
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

        return redirect()->route('admin.settings.edit')->with('success', 'Settings updated successfully.');
    }
}
