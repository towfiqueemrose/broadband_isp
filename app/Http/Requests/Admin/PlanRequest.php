<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PlanRequest extends FormRequest
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
            'slug' => [
                'required',
                'string',
                'max:255',
                'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/',
                Rule::unique('plans', 'slug')->ignore($this->route('plan')),
            ],
            'type' => 'required|in:residential,business',
            'download_mbps' => 'required|integer|min:1',
            'upload_mbps' => 'nullable|integer|min:0',
            'price_monthly' => 'required|integer|min:0',
            'installation_fee' => 'nullable|integer|min:0',
            'original_price' => 'nullable|integer|min:0',
            'promo_price' => 'nullable|integer|min:0',
            'promo_label' => 'nullable|string|max:255',
            'promo_description' => 'nullable|string|max:500',
            'promo_ends_at' => 'nullable|date',
            'billing_label' => 'nullable|string|max:100',
            'description' => 'nullable|string',
            'features' => 'nullable|array',
            'features.*' => 'string|max:500',
            'attributes' => 'nullable|array',
            'badge' => 'nullable|string|max:255',
            'is_featured' => 'boolean',
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
            'name.required' => 'Please give this plan a name.',
            'name.max' => 'The plan name is too long — please keep it under 255 characters.',
            'slug.required' => 'Please add a slug for this plan.',
            'slug.unique' => 'That slug is already in use — please choose a different one.',
            'slug.regex' => 'The slug may only contain lowercase letters, numbers, and dashes.',
            'type.required' => 'Please choose a plan type.',
            'type.in' => 'The plan type must be either residential or business.',
            'download_mbps.required' => 'Please add a download speed.',
            'download_mbps.integer' => 'The download speed must be a whole number.',
            'download_mbps.min' => 'The download speed must be at least 1 Mbps.',
            'upload_mbps.integer' => 'The upload speed must be a whole number.',
            'upload_mbps.min' => 'The upload speed cannot be negative.',
            'price_monthly.required' => 'Please add a monthly price.',
            'price_monthly.integer' => 'The monthly price must be a whole number.',
            'price_monthly.min' => 'The monthly price cannot be negative.',
            'installation_fee.integer' => 'The installation fee must be a whole number.',
            'installation_fee.min' => 'The installation fee cannot be negative.',
            'original_price.integer' => 'The original price must be a whole number.',
            'original_price.min' => 'The original price cannot be negative.',
            'promo_price.integer' => 'The promo price must be a whole number.',
            'promo_price.min' => 'The promo price cannot be negative.',
            'promo_ends_at.date' => 'The promo end date is not valid.',
            'features.*.max' => 'Each feature must be under 500 characters.',
            'sort_order.integer' => 'The sort order must be a whole number.',
            'sort_order.min' => 'The sort order cannot be negative.',
        ];
    }
}
