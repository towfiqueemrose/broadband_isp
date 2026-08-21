<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class ChangePasswordTest extends TestCase
{
    use RefreshDatabase;

    public function test_password_can_be_updated_with_valid_current_password(): void
    {
        $user = User::factory()->superAdmin()->create();

        $response = $this
            ->actingAs($user)
            ->from(route('admin.dashboard'))
            ->post(route('admin.account.password.update'), [
                'current_password' => 'password',
                'password' => 'new-secure-password',
                'password_confirmation' => 'new-secure-password',
            ]);

        $response->assertRedirect(route('admin.dashboard'));
        $response->assertSessionHas('success');

        $this->assertTrue(Hash::check('new-secure-password', $user->fresh()->password));
    }

    public function test_password_cannot_be_updated_with_wrong_current_password(): void
    {
        $user = User::factory()->superAdmin()->create();

        $response = $this
            ->actingAs($user)
            ->from(route('admin.dashboard'))
            ->post(route('admin.account.password.update'), [
                'current_password' => 'wrong-password',
                'password' => 'new-secure-password',
                'password_confirmation' => 'new-secure-password',
            ]);

        $response->assertSessionHasErrors('current_password');
        $this->assertTrue(Hash::check('password', $user->fresh()->password));
    }

    public function test_password_requires_confirmation_match(): void
    {
        $user = User::factory()->superAdmin()->create();

        $response = $this
            ->actingAs($user)
            ->post(route('admin.account.password.update'), [
                'current_password' => 'password',
                'password' => 'new-secure-password',
                'password_confirmation' => 'different-password',
            ]);

        $response->assertSessionHasErrors('password');
        $this->assertTrue(Hash::check('password', $user->fresh()->password));
    }

    public function test_password_must_be_at_least_eight_characters(): void
    {
        $user = User::factory()->superAdmin()->create();

        $response = $this
            ->actingAs($user)
            ->post(route('admin.account.password.update'), [
                'current_password' => 'password',
                'password' => 'short1A',
                'password_confirmation' => 'short1A',
            ]);

        $response->assertSessionHasErrors('password');
        $this->assertTrue(Hash::check('password', $user->fresh()->password));
    }

    public function test_guests_are_redirected_to_login(): void
    {
        $response = $this->post(route('admin.account.password.update'), [
            'current_password' => 'password',
            'password' => 'new-secure-password',
            'password_confirmation' => 'new-secure-password',
        ]);

        $response->assertRedirect(route('login', absolute: false));
    }
}
