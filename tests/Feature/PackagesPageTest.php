<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class PackagesPageTest extends TestCase
{
    use RefreshDatabase;

    public function test_packages_page_renders_catalogue(): void
    {
        $this->seed();

        $this->get('/plans')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Packages')
                ->has('categories', 2)
                ->has('plans', 6)
                ->has('byCategory.residential', 4)
                ->has('byCategory.business', 2));
    }

    public function test_categories_carry_display_labels(): void
    {
        $this->seed();

        $this->get('/plans')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->where('categories.0.type', 'residential')
                ->where('categories.0.label', 'Home Internet')
                ->where('categories.1.type', 'business')
                ->where('categories.1.label', 'Business Internet'));
    }

    public function test_featured_plan_exposes_promotional_offer(): void
    {
        $this->seed();

        $this->get('/plans')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->where('plans.2.slug', 'pro-home')
                ->where('plans.2.isFeatured', true)
                ->where('plans.2.promo.originalPrice', 2200)
                ->where('plans.2.promo.price', 1900)
                ->where('plans.2.promo.label', 'This month only'));
    }

    public function test_regular_plan_has_no_promotional_offer(): void
    {
        $this->seed();

        $this->get('/plans')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->where('plans.0.slug', 'starter-home')
                ->missing('plans.0.promo'));
    }

    public function test_plans_expose_comparison_attributes(): void
    {
        $this->seed();

        $this->get('/plans')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->where('plans.0.attributes.static_ip', false)
                ->where('plans.4.attributes.static_ip', true)
                ->where('plans.4.attributes.sla', '99.9% SLA'));
    }

    public function test_packages_page_renders_content_blocks(): void
    {
        $this->seed();

        $this->get('/plans')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->where('content.hero.title', 'Choose the speed that fits your life')
                ->has('content.comparison.attributes', 5)
                ->has('content.recommendations', 6));
    }

    public function test_packages_page_handles_empty_catalogue(): void
    {
        $this->get('/plans')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Packages')
                ->has('plans', 0)
                ->has('categories', 0));
    }
}
