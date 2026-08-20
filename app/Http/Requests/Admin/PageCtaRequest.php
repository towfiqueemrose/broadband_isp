<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class PageCtaRequest extends FormRequest
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
            'eyebrow' => 'nullable|string|max:255',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'primary_label' => 'nullable|string|max:255',
            'primary_url' => 'nullable|string|max:500',
            'secondary_label' => 'nullable|string|max:255',
            'secondary_url' => 'nullable|string|max:500',
            'bg_style' => 'nullable|in:primary,dark,gradient',
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
            'bg_style.in' => 'That background style is not valid.',
        ];
    }
}
