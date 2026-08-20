<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class PromotionRequest extends FormRequest
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
            'details' => 'nullable|array',
            'details.*' => 'string|max:255',
            'cta_label' => 'nullable|string|max:255',
            'cta_url' => 'nullable|string|max:500',
            'image' => 'nullable|image|mimes:jpeg,jpg,png,webp|max:5120',
            'display_location' => 'required|string|max:100',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'is_active' => 'boolean',
            'sort_order' => 'nullable|integer|min:0',
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
            'display_location.required' => 'Please choose where this promotion should be displayed.',
            'display_location.max' => 'The display location is too long.',
            'end_date.after_or_equal' => 'The end date must be on or after the start date.',
            'image.image' => 'The image must be an image file.',
            'image.mimes' => 'The image must be a JPEG, JPG, PNG, or WebP file.',
            'image.max' => 'The image must not be larger than 5 MB.',
            'sort_order.integer' => 'The sort order must be a whole number.',
            'sort_order.min' => 'The sort order cannot be negative.',
        ];
    }
}
