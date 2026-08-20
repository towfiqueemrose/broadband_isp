<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ContactPageTest extends TestCase
{
    use RefreshDatabase;

    public function test_contact_page_renders_all_sections(): void
    {
        $this->seed();

        $this->get('/contact')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Contact')
                ->has('content.methods', 4)
                ->has('content.salesTeam', 3)
                ->has('content.form.subjects', 8)
                ->has('content.office')
                ->has('information', 8)
                ->has('faqs', 6)
                ->where('prefill', null));
    }

    public function test_contact_page_resolves_shared_brand_information(): void
    {
        $this->seed();

        $this->get('/contact')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->where('information.0.key', 'support')
                ->where('information.0.value', '+880 9600-123456')
                ->where('information.0.href', 'tel:+8809600123456')
                ->where('information.6.key', 'address')
                ->where('information.6.href', 'https://www.google.com/maps/dir/?api=1&destination=23.794,90.4066'));
    }

    public function test_contact_page_prefills_subject_from_plan_query(): void
    {
        $this->seed();

        $this->get('/contact?plan=pro-home')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->where('prefill.plan.slug', 'pro-home')
                ->has('prefill.plan.name'));
    }

    public function test_contact_page_handles_empty_catalogue(): void
    {
        $this->get('/contact')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Contact')
                ->has('faqs', 0)
                ->where('prefill', null));
    }

    public function test_contact_form_validates_required_fields(): void
    {
        $this->seed();

        $this->post('/contact', [])
            ->assertSessionHasErrors([
                'name',
                'phone',
                'email',
                'subject',
                'message',
            ]);
    }

    public function test_contact_form_stores_inquiry(): void
    {
        $this->seed();

        $this->withHeaders(['Referer' => '/contact'])
            ->post('/contact', [
                'name' => 'Rahim Uddin',
                'phone' => '+880 1711-123456',
                'email' => 'rahim@example.com',
                'subject' => 'sales',
                'message' => 'I would like a quote for a business connection.',
            ])
            ->assertRedirect('/contact')
            ->assertSessionHas('success');

        $this->assertDatabaseHas('contact_inquiries', [
            'name' => 'Rahim Uddin',
            'phone' => '+880 1711-123456',
            'email' => 'rahim@example.com',
            'subject' => 'sales',
            'message' => 'I would like a quote for a business connection.',
            'status' => 'new',
            'source' => 'website',
        ]);
    }
}