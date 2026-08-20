<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateThemeSettingsRequest extends FormRequest
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
            'primary' => 'required|string|max:20',
            'secondary' => 'nullable|string|max:20',
            'accent' => 'nullable|string|max:20',
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'primary.required' => 'Please add a primary color.',
            'primary.max' => 'The primary color is too long — please keep it under 20 characters.',
            'secondary.max' => 'The secondary color is too long — please keep it under 20 characters.',
            'accent.max' => 'The accent color is too long — please keep it under 20 characters.',
        ];
    }
}
