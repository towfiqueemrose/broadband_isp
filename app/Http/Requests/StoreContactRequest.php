<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreContactRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:20'],
            'email' => ['required', 'email', 'max:255'],
            'subject' => ['required', 'string', 'max:255'],
            'message' => ['required', 'string', 'max:5000'],
        ];
    }

    /**
     * Friendly, human-readable messages so raw framework errors never leak.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Please tell us your name.',
            'name.max' => 'Your name is too long — please keep it under 255 characters.',
            'phone.required' => 'Please add a phone number so we can reach you.',
            'phone.max' => 'That phone number looks too long — please double-check it.',
            'email.required' => 'Please add your email address.',
            'email.email' => 'That email address does not look valid.',
            'email.max' => 'That email address is too long.',
            'subject.required' => 'Please choose a subject so we can route your message.',
            'subject.max' => 'That subject is too long.',
            'message.required' => 'Please write us a short message.',
            'message.max' => 'Your message is too long — please keep it under 5,000 characters.',
        ];
    }
}