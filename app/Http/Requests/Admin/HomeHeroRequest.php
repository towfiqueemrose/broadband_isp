<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class HomeHeroRequest extends FormRequest
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
            'eyebrow_text' => 'nullable|string|max:255',
            'main_heading' => 'required|string|max:255',
            'highlighted_text' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'primary_cta_label' => 'nullable|string|max:255',
            'primary_cta_url' => 'nullable|string|max:500',
            'secondary_cta_label' => 'nullable|string|max:255',
            'secondary_cta_url' => 'nullable|string|max:500',
            'hero_image' => 'nullable|image|mimes:jpeg,jpg,png,webp|max:5120',
            'is_active' => 'boolean',
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'main_heading.required' => 'Please give this hero section a main heading.',
            'main_heading.max' => 'The main heading is too long — please keep it under 255 characters.',
            'hero_image.image' => 'The hero image must be an image file.',
            'hero_image.mimes' => 'The hero image must be a JPEG, JPG, PNG, or WebP file.',
            'hero_image.max' => 'The hero image must not be larger than 5 MB.',
            'is_active.boolean' => 'The active status must be true or false.',
        ];
    }
}
