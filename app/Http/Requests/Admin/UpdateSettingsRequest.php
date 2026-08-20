<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSettingsRequest extends FormRequest
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
            'background_image' => 'nullable|image|mimes:jpeg,jpg,png,webp|max:5120',
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'background_image.image' => 'The background image must be an image file.',
            'background_image.mimes' => 'The background image must be a JPEG, JPG, PNG, or WebP file.',
            'background_image.max' => 'The background image must not be larger than 5 MB.',
        ];
    }
}
