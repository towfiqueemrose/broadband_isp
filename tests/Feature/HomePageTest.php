<?php

namespace Tests\Feature;

use App\Models\Plan;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class HomePageTest extends TestCase
{
    use RefreshDatabase;

    public function test_home_page_renders_with_all_sections_data(): void
    {
        $this->seed();

        $this->get('/')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Home')
                ->has('plans', 3)
                ->has('testimonials', 3)
                ->has('faqs', 5));
    }

    public function test_home_page_orders_featured_plans_by_sort_order(): void
    {
        $this->seed();

        Plan::query()->create([
            'name' => 'Priority Plan',
            'slug' => 'priority-plan',
            'type' => 'residential',
            'download_mbps' => 75,
            'upload_mbps' => 75,
            'price_monthly' => 1600,
            'billing_label' => 'per month',
            'description' => 'A test plan.',
            'features' => ['One feature'],
            'is_active' => true,
            'sort_order' => 0,
        ]);

        $this->get('/')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->where('plans.0.name', 'Priority Plan'));
    }

    public function test_stub_pages_render(): void
    {
        $this->get('/coverage')->assertOk()
            ->assertInertia(fn (Assert $page) => $page->component('Stub'));

        $this->get('/faq')->assertOk()
            ->assertInertia(fn (Assert $page) => $page->component('Stub'));

        $this->get('/terms')->assertOk()
            ->assertInertia(fn (Assert $page) => $page->component('Stub'));

        $this->get('/privacy')->assertOk()
            ->assertInertia(fn (Assert $page) => $page->component('Stub'));
    }
}
