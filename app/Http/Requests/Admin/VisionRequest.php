<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class VisionRequest extends FormRequest
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
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,jpg,png,webp|max:5120',
            'is_active' => 'boolean',
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Please add a title.',
            'title.max' => 'The title is too long — please keep it under 255 characters.',
            'image.image' => 'The image must be an image file.',
            'image.mimes' => 'The image must be a JPEG, JPG, PNG, or WebP file.',
            'image.max' => 'The image must not be larger than 5 MB.',
        ];
    }
}
