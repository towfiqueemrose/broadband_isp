<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class TeamMemberRequest extends FormRequest
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
            'designation' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,jpg,png,webp|max:2048',
            'phone' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:255',
            'whatsapp' => 'nullable|string|max:50',
            'social_links' => 'nullable|array',
            'social_links.*' => 'string|max:500',
            'team_type' => 'required|in:leadership,general,sales',
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
            'name.required' => 'Please add a team member name.',
            'name.max' => 'The name is too long — please keep it under 255 characters.',
            'email.email' => 'That email address does not look valid.',
            'team_type.required' => 'Please choose a team type.',
            'team_type.in' => 'The team type must be leadership, general, or sales.',
            'image.image' => 'The image must be an image file.',
            'image.mimes' => 'The image must be a JPEG, JPG, PNG, or WebP file.',
            'image.max' => 'The image must not be larger than 2 MB.',
            'social_links.*.max' => 'Each social link must be under 500 characters.',
            'sort_order.integer' => 'The sort order must be a whole number.',
            'sort_order.min' => 'The sort order cannot be negative.',
        ];
    }
}
