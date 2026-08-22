<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBrandSettingsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
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
            'logo' => 'nullable|file|image|mimes:jpeg,png,webp,svg|max:2048',
            'favicon' => 'nullable|file|image|mimes:jpeg,png,webp,svg|max:512',
            'remove_logo' => 'nullable|string',
            'remove_favicon' => 'nullable|string',
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Please give your brand a name.',
            'name.max' => 'The brand name is too long — please keep it under 255 characters.',
            'tagline.max' => 'The tagline is too long — please keep it under 500 characters.',
            'description.max' => 'The description is too long — please keep it under 1000 characters.',
            'email.email' => 'That email address does not look valid.',
        ];
    }
}
