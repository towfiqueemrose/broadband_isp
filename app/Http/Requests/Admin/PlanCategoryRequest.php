<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PlanCategoryRequest extends FormRequest
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
                Rule::unique('plan_categories', 'slug')->ignore($this->route('plan_category')),
            ],
            'description' => 'nullable|string|max:500',
            'icon' => 'nullable|string|max:100',
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
            'name.required' => 'Please give this category a name.',
            'name.max' => 'The category name is too long — please keep it under 255 characters.',
            'slug.required' => 'Please add a slug for this category.',
            'slug.unique' => 'That slug is already in use — please choose a different one.',
            'slug.regex' => 'The slug may only contain lowercase letters, numbers, and dashes.',
            'description.max' => 'The description must be under 500 characters.',
            'sort_order.integer' => 'The sort order must be a whole number.',
            'sort_order.min' => 'The sort order cannot be negative.',
        ];
    }
}
