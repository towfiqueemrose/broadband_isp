<?php

namespace Tests\Feature\Auth;

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RbacTest extends TestCase
{
    use RefreshDatabase;

    public function test_super_admin_can_access_every_admin_module(): void
    {
        $admin = User::factory()->superAdmin()->create();

        $response = $this->actingAs($admin)->get('/admin');

        $response->assertStatus(200);
        $this->assertTrue($admin->isSuperAdmin());
        $this->assertTrue($admin->hasPermission('plans.manage'));
        $this->assertTrue($admin->can('rbac.manage'));
    }

    public function test_user_without_role_cannot_access_admin_panel(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/admin');

        $response->assertForbidden();
    }

    public function test_guest_is_blocked_from_admin_panel(): void
    {
        $this->get('/admin')->assertRedirect(route('login', absolute: false));
    }

    public function test_restricted_role_is_limited_to_assigned_permissions(): void
    {
        $editor = User::factory()->withRole(['plans.manage'])->create();

        $this->actingAs($editor)->get(route('admin.plans.index'))->assertOk();
        $this->actingAs($editor)->get(route('admin.roles.index'))->assertForbidden();
        $this->actingAs($editor)->get(route('admin.settings.general'))->assertForbidden();
    }

    public function test_role_with_no_permissions_sees_dashboard_only(): void
    {
        $viewer = User::factory()->withRole([])->create();

        $this->actingAs($viewer)->get('/admin')->assertOk();
        $this->actingAs($viewer)->get(route('admin.plans.index'))->assertForbidden();
    }

    public function test_system_role_cannot_be_edited_or_deleted(): void
    {
        $admin = User::factory()->superAdmin()->create();
        $role = Role::query()->where('name', config('rbac.super_admin_role'))->firstOrFail();

        $this->actingAs($admin)->get(route('admin.roles.edit', $role->id))
            ->assertRedirect(route('admin.roles.index'));

        $this->actingAs($admin)->delete(route('admin.roles.destroy', $role->id))
            ->assertSessionHas('error');
    }

    public function test_role_in_use_cannot_be_deleted(): void
    {
        $admin = User::factory()->superAdmin()->create();
        $editor = User::factory()->withRole(['plans.manage'])->create();
        $role = $editor->role;

        $this->actingAs($admin)->delete(route('admin.roles.destroy', $role->id))
            ->assertSessionHas('error');

        $this->assertDatabaseHas('roles', ['id' => $role->id]);
    }

    public function test_roles_can_be_created_with_permissions(): void
    {
        $admin = User::factory()->superAdmin()->create();

        $response = $this->actingAs($admin)->post(route('admin.roles.store'), [
            'name' => 'content-editor',
            'label' => 'Content Editor',
            'description' => 'Manages CMS content.',
            'permissions' => ['plans.manage', 'faqs.manage'],
        ]);

        $response->assertRedirect(route('admin.roles.index'));

        $role = Role::query()->where('name', 'content-editor')->firstOrFail();
        $this->assertSame(['plans.manage', 'faqs.manage'], $role->permissions);
    }

    public function test_invalid_permissions_are_rejected(): void
    {
        $admin = User::factory()->superAdmin()->create();

        $this->actingAs($admin)->post(route('admin.roles.store'), [
            'name' => 'hacker',
            'label' => 'Hacker',
            'permissions' => ['not-a-permission'],
        ])->assertSessionHasErrors('permissions.0');
    }

    public function test_users_can_be_created_from_the_panel(): void
    {
        $admin = User::factory()->superAdmin()->create();
        $role = Role::query()->create(['name' => 'support', 'label' => 'Support']);

        $response = $this->actingAs($admin)->post(route('admin.users.store'), [
            'name' => 'Support Agent',
            'email' => 'support@example.com',
            'password' => 'sup3r-secret!',
            'password_confirmation' => 'sup3r-secret!',
            'role_id' => $role->id,
        ]);

        $response->assertRedirect(route('admin.users.index'));

        $user = User::query()->where('email', 'support@example.com')->firstOrFail();
        $this->assertTrue($user->isAdmin());
        $this->assertSame($role->id, $user->role_id);
    }

    public function test_user_cannot_change_own_role(): void
    {
        $admin = User::factory()->superAdmin()->create();
        $otherRole = Role::query()->create(['name' => 'viewer', 'label' => 'Viewer']);

        $response = $this->actingAs($admin)->put(route('admin.users.update', $admin->id), [
            'name' => $admin->name,
            'email' => $admin->email,
            'role_id' => $otherRole->id,
        ]);

        $response->assertRedirect(route('admin.users.index'));
        $this->assertTrue($admin->fresh()->isSuperAdmin());
    }

    public function test_last_super_admin_cannot_be_deleted(): void
    {
        $admin = User::factory()->superAdmin()->create();

        $this->actingAs($admin)->delete(route('admin.users.destroy', $admin->id))
            ->assertSessionHas('error');

        $this->assertDatabaseHas('users', ['id' => $admin->id]);
    }
}
