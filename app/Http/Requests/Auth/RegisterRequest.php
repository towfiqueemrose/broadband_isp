<?php

namespace App\Http\Requests\Auth;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules;

class RegisterRequest extends FormRequest
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
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Please add your name.',
            'name.max' => 'Your name is too long — please keep it under 255 characters.',
            'email.required' => 'Please add your email address.',
            'email.email' => 'That email address does not look valid.',
            'email.unique' => 'An account with that email already exists.',
            'password.required' => 'Please choose a password.',
            'password.confirmed' => 'The password confirmation does not match.',
        ];
    }
}
