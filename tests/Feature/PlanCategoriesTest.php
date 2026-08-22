<?php

namespace Tests\Feature;

use App\Models\Plan;
use App\Models\PlanCategory;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class PlanCategoriesTest extends TestCase
{
    use RefreshDatabase;

    private function superAdmin(): User
    {
        return User::factory()->superAdmin()->create();
    }

    private function validPayload(array $overrides = []): array
    {
        return array_merge([
            'name' => 'Student',
            'slug' => 'student',
            'description' => 'Discounted plans for students.',
            'icon' => 'user',
            'is_active' => true,
            'sort_order' => 3,
        ], $overrides);
    }

    public function test_migration_backfills_default_categories(): void
    {
        $this->assertDatabaseHas('plan_categories', ['slug' => 'residential', 'name' => 'Home Internet']);
        $this->assertDatabaseHas('plan_categories', ['slug' => 'business', 'name' => 'Business Internet']);
    }

    public function test_admin_can_create_category(): void
    {
        $admin = $this->superAdmin();

        $this->actingAs($admin)
            ->post(route('admin.plan-categories.store'), $this->validPayload())
            ->assertRedirect(route('admin.plan-categories.index'))
            ->assertSessionHas('success');

        $this->assertDatabaseHas('plan_categories', [
            'slug' => 'student',
            'name' => 'Student',
            'is_active' => true,
        ]);
    }

    public function test_create_rejects_duplicate_slug(): void
    {
        $admin = $this->superAdmin();

        $this->actingAs($admin)
            ->post(route('admin.plan-categories.store'), $this->validPayload(['slug' => 'residential']))
            ->assertSessionHasErrors('slug');
    }

    public function test_update_keeps_slug_locked_but_saves_other_fields(): void
    {
        $admin = $this->superAdmin();
        $category = PlanCategory::query()->where('slug', 'residential')->firstOrFail();

        $this->actingAs($admin)
            ->put(route('admin.plan-categories.update', $category->id), $this->validPayload([
                'name' => 'Home Fiber',
                'slug' => 'renamed-slug',
                'description' => 'Updated description.',
                'sort_order' => 5,
            ]))
            ->assertRedirect(route('admin.plan-categories.index'));

        $this->assertDatabaseHas('plan_categories', [
            'id' => $category->id,
            'slug' => 'residential',
            'name' => 'Home Fiber',
            'description' => 'Updated description.',
            'sort_order' => 5,
        ]);
    }

    public function test_delete_is_blocked_while_plans_use_the_category(): void
    {
        $admin = $this->superAdmin();
        $category = PlanCategory::query()->where('slug', 'residential')->firstOrFail();

        Plan::query()->create([
            'name' => 'Test Plan',
            'slug' => 'test-plan',
            'type' => 'residential',
            'download_mbps' => 50,
            'upload_mbps' => 50,
            'price_monthly' => 1000,
            'billing_label' => 'per month',
            'is_active' => true,
            'sort_order' => 0,
        ]);

        $this->actingAs($admin)
            ->delete(route('admin.plan-categories.destroy', $category->id))
            ->assertRedirect(route('admin.plan-categories.index'))
            ->assertSessionHas('error');

        $this->assertDatabaseHas('plan_categories', ['id' => $category->id]);
    }

    public function test_delete_works_when_no_plans_use_the_category(): void
    {
        $admin = $this->superAdmin();
        $category = PlanCategory::create($this->validPayload());

        $this->actingAs($admin)
            ->delete(route('admin.plan-categories.destroy', $category->id))
            ->assertRedirect(route('admin.plan-categories.index'))
            ->assertSessionHas('success');

        $this->assertDatabaseMissing('plan_categories', ['id' => $category->id]);
    }

    public function test_index_lists_categories_with_usage_counts(): void
    {
        $admin = $this->superAdmin();

        Plan::query()->create([
            'name' => 'Test Plan',
            'slug' => 'test-plan',
            'type' => 'residential',
            'download_mbps' => 50,
            'upload_mbps' => 50,
            'price_monthly' => 1000,
            'billing_label' => 'per month',
            'is_active' => true,
            'sort_order' => 0,
        ]);

        $this->actingAs($admin)->get(route('admin.plan-categories.index'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Admin/PlanCategories/Index')
                ->has('categories', 2)
                ->where('usageCounts.residential', 1));
    }

    public function test_packages_page_shows_new_category_once_it_has_active_plans(): void
    {
        $this->seed();

        PlanCategory::create($this->validPayload());

        $this->get('/plans')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->has('categories', 2));

        Plan::query()->create([
            'name' => 'Student Starter',
            'slug' => 'student-starter',
            'type' => 'student',
            'download_mbps' => 25,
            'upload_mbps' => 25,
            'price_monthly' => 500,
            'billing_label' => 'per month',
            'is_active' => true,
            'sort_order' => 10,
        ]);

        $this->get('/plans')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->has('categories', 3)
                ->where('categories.2.type', 'student')
                ->where('categories.2.label', 'Student'));
    }

    public function test_admin_can_assign_plan_to_new_category(): void
    {
        $admin = $this->superAdmin();

        PlanCategory::create($this->validPayload());

        $this->actingAs($admin)
            ->post(route('admin.plans.store'), [
                'name' => 'Student Pro',
                'slug' => 'student-pro',
                'type' => 'student',
                'download_mbps' => 40,
                'price_monthly' => 700,
                'is_active' => true,
            ])
            ->assertRedirect(route('admin.plans.index'))
            ->assertSessionHas('success');

        $this->assertDatabaseHas('plans', ['slug' => 'student-pro', 'type' => 'student']);
    }

    public function test_plan_type_must_reference_existing_category(): void
    {
        $admin = $this->superAdmin();

        $this->actingAs($admin)
            ->post(route('admin.plans.store'), [
                'name' => 'Orphan Plan',
                'slug' => 'orphan-plan',
                'type' => 'nonexistent',
                'download_mbps' => 40,
                'price_monthly' => 700,
            ])
            ->assertSessionHasErrors('type');
    }
}
