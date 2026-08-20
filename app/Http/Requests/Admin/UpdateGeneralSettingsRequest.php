<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateGeneralSettingsRequest extends FormRequest
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
            'background_image' => 'nullable|image|mimes:jpeg,jpg,png,webp|max:2048',
            'live_chat_enabled' => 'nullable',
            'live_chat_provider' => 'nullable|string|max:255',
            'live_chat_welcome' => 'nullable|string|max:500',
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
            'background_image.max' => 'The background image must not be larger than 2 MB.',
            'live_chat_provider.max' => 'The live chat provider name is too long.',
            'live_chat_welcome.max' => 'The welcome message is too long — please keep it under 500 characters.',
        ];
    }
}
