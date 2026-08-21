<?php

namespace Database\Factories;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends Factory<User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }

    /**
     * Assign the super-admin role (full access).
     */
    public function superAdmin(): static
    {
        return $this->for(Role::query()->firstOrCreate(
            ['name' => config('rbac.super_admin_role')],
            ['label' => 'Super Admin', 'is_system' => true],
        ));
    }

    /**
     * Assign a role limited to the given permissions.
     *
     * @param  array<int, string>  $permissions
     */
    public function withRole(array $permissions = [], string $name = 'editor'): static
    {
        return $this->for(Role::query()->create([
            'name' => $name.'-'.Str::random(6),
            'label' => ucfirst($name),
            'permissions' => $permissions,
        ]));
    }
}
