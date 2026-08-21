<?php

namespace Database\Seeders;

use App\Models\CompanyJourney;
use App\Models\CompanyMission;
use App\Models\CompanyVision;
use App\Models\CoreValue;
use App\Models\Faq;
use App\Models\HomeHero;
use App\Models\PageCta;
use App\Models\Promotion;
use App\Models\Service;
use App\Models\TeamMember;
use App\Models\WhyChooseUsItem;
use Illuminate\Database\Seeder;

class CmsContentSeeder extends Seeder
{
    public function run(): void
    {
        $this->seedHero();
        $this->seedWhyChooseUs();
        $this->seedServices();
        $this->seedPromotions();
        $this->seedPageCtas();
        $this->seedMission();
        $this->seedVision();
        $this->seedCoreValues();
        $this->seedJourney();
        $this->seedTeam();
        $this->seedFaqDisplayLocations();
    }

    private function seedHero(): void
    {
        HomeHero::firstOrCreate(
            ['is_active' => true],
            [
                'eyebrow_text' => 'Fiber-optic broadband · Now serving Dhaka',
                'main_heading' => 'Internet at the speed',
                'highlighted_text' => 'of your ambition.',
                'description' => 'NexaLink brings true fiber to your doorstep — symmetric speeds, 99.9% uptime and support that actually answers. Home or business, we keep you connected.',
                'primary_cta_label' => 'Get Connected',
                'primary_cta_url' => '/contact',
                'secondary_cta_label' => 'Explore Plans',
                'secondary_cta_url' => '/plans',
                'is_active' => true,
            ]
        );
    }

    private function seedWhyChooseUs(): void
    {
        $items = [
            ['icon' => 'bolt', 'title' => 'True fiber speeds', 'description' => 'Fiber-optic connections deliver the speed you pay for — consistently, even during peak hours.', 'sort_order' => 1],
            ['icon' => 'shield-check', 'title' => 'Rock-solid reliability', 'description' => 'Redundant routing and enterprise-grade hardware keep your connection stable around the clock.', 'sort_order' => 2],
            ['icon' => 'activity', 'title' => 'Low latency, always', 'description' => 'Optimised peering and low ping make video calls, gaming and remote work feel instant.', 'sort_order' => 3],
            ['icon' => 'headset', 'title' => '24/7 human support', 'description' => 'Real local engineers on call day and night — by phone, chat or email, in English and Bengali.', 'sort_order' => 4],
        ];

        foreach ($items as $item) {
            WhyChooseUsItem::firstOrCreate(
                ['title' => $item['title']],
                ['icon' => $item['icon'], 'description' => $item['description'], 'sort_order' => $item['sort_order']]
            );
        }
    }

    private function seedServices(): void
    {
        $services = [
            ['icon' => 'home', 'title' => 'Home Broadband', 'slug' => 'home-broadband', 'description' => 'Symmetric fiber for streaming, gaming and remote work across every device in your home.', 'sort_order' => 1],
            ['icon' => 'briefcase', 'title' => 'Business Internet', 'slug' => 'business-internet', 'description' => 'Dedicated bandwidth, static IPs and SLA-backed uptime for growing teams.', 'sort_order' => 2],
            ['icon' => 'server-stack', 'title' => 'Enterprise Connectivity', 'slug' => 'enterprise-connectivity', 'description' => 'High-capacity circuits and redundant paths for mission-critical operations.', 'sort_order' => 3],
            ['icon' => 'wifi', 'title' => 'Managed WiFi', 'slug' => 'managed-wifi', 'description' => 'Seamless whole-home and office coverage with professional access points.', 'sort_order' => 4],
            ['icon' => 'headset', 'title' => '24/7 Support', 'slug' => 'support', 'description' => 'A local support team that answers fast and resolves faster.', 'sort_order' => 5],
            ['icon' => 'sparkles', 'title' => 'Custom Solutions', 'slug' => 'custom-solutions', 'description' => 'Tailored connectivity for campuses, events and multi-site networks.', 'sort_order' => 6],
        ];

        foreach ($services as $service) {
            Service::firstOrCreate(
                ['slug' => $service['slug']],
                ['icon' => $service['icon'], 'title' => $service['title'], 'description' => $service['description'], 'sort_order' => $service['sort_order']]
            );
        }
    }

    private function seedPromotions(): void
    {
        Promotion::firstOrCreate(
            ['title' => 'Free installation & your first month on us'],
            [
                'eyebrow' => 'Limited-time offer',
                'description' => 'Join NexaLink this month and enjoy free professional installation, a free dual-band WiFi router, and your first month of service at no cost.',
                'details' => ['Free installation', 'Free WiFi router', 'First month free', 'Setup within 48 hours'],
                'cta_label' => 'Claim this offer',
                'cta_url' => '/contact',
                'display_location' => 'homepage',
                'is_active' => true,
                'sort_order' => 1,
            ]
        );
    }

    private function seedPageCtas(): void
    {
        PageCta::firstOrCreate(
            ['slug' => 'homepage-final'],
            [
                'title' => 'Ready for internet that just works?',
                'description' => 'Join thousands of customers enjoying fast, reliable fiber with support that actually answers. Most connections go live within 48 hours.',
                'primary_label' => 'Get connected today',
                'primary_url' => '/contact',
                'secondary_label' => 'Browse packages',
                'secondary_url' => '/plans',
                'bg_style' => 'primary',
                'is_active' => true,
            ]
        );

        PageCta::firstOrCreate(
            ['slug' => 'about-final'],
            [
                'title' => 'Ready to experience the difference?',
                'description' => 'Join thousands of satisfied customers who trust NexaLink for their internet connectivity needs.',
                'primary_label' => 'Explore our packages',
                'primary_url' => '/plans',
                'secondary_label' => 'Check coverage',
                'secondary_url' => '/coverage',
                'bg_style' => 'primary',
                'is_active' => true,
            ]
        );
    }

    private function seedMission(): void
    {
        CompanyMission::firstOrCreate(
            ['is_active' => true],
            [
                'title' => 'Our Mission',
                'description' => 'To deliver premium fiber-optic broadband that empowers individuals, businesses, and communities with reliable, high-speed connectivity they can depend on every day.',
            ]
        );
    }

    private function seedVision(): void
    {
        CompanyVision::firstOrCreate(
            ['is_active' => true],
            [
                'title' => 'Our Vision',
                'description' => 'To be the most trusted and forward-thinking internet service provider, setting the standard for connectivity, innovation, and customer experience across Bangladesh.',
            ]
        );
    }

    private function seedCoreValues(): void
    {
        $values = [
            ['icon' => 'zap', 'title' => 'Reliability', 'description' => 'We build redundant systems and maintain rigorous standards to ensure your connection stays up, even when others fail.', 'sort_order' => 1],
            ['icon' => 'trending-up', 'title' => 'Innovation', 'description' => 'We continuously invest in new technologies and better ways to serve our customers, staying ahead of the connectivity curve.', 'sort_order' => 2],
            ['icon' => 'heart', 'title' => 'Customer Focus', 'description' => 'Every decision we make considers our customers first. From support to infrastructure, we put your experience at the center.', 'sort_order' => 3],
            ['icon' => 'eye', 'title' => 'Transparency', 'description' => 'No hidden fees, no false promises. We communicate honestly about our services, speeds, and any issues that may arise.', 'sort_order' => 4],
            ['icon' => 'arrow-up-circle', 'title' => 'Continuous Improvement', 'description' => 'We never settle. Whether it is network performance, customer service, or new features, we always strive to be better.', 'sort_order' => 5],
        ];

        foreach ($values as $value) {
            CoreValue::firstOrCreate(
                ['title' => $value['title']],
                ['icon' => $value['icon'], 'description' => $value['description'], 'sort_order' => $value['sort_order']]
            );
        }
    }

    private function seedJourney(): void
    {
        $milestones = [
            ['year' => '2018', 'title' => 'Founded', 'description' => 'Started with a vision to provide better internet to our community', 'sort_order' => 1],
            ['year' => '2020', 'title' => 'First City', 'description' => 'Launched service in Dhaka with our initial fiber network', 'sort_order' => 2],
            ['year' => '2022', 'title' => 'Expansion', 'description' => 'Extended coverage to Chattogram and Sylhet', 'sort_order' => 3],
            ['year' => '2024', 'title' => '48K+ Customers', 'description' => 'Grew to serve over 48,000 happy customers', 'sort_order' => 4],
            ['year' => '2025', 'title' => 'Future Ready', 'description' => 'Continuing to expand with new technologies and better service', 'sort_order' => 5],
        ];

        foreach ($milestones as $m) {
            CompanyJourney::firstOrCreate(
                ['year' => $m['year'], 'title' => $m['title']],
                ['description' => $m['description'], 'sort_order' => $m['sort_order']]
            );
        }
    }

    private function seedTeam(): void
    {
        $team = [
            ['name' => 'Ahmed Khan', 'designation' => 'Chief Executive Officer', 'description' => 'Visionary leader with 15+ years in telecommunications, driving our strategic growth.', 'team_type' => 'leadership', 'sort_order' => 1],
            ['name' => 'Sarah Rahman', 'designation' => 'Chief Technology Officer', 'description' => 'Network architecture expert ensuring our infrastructure remains cutting-edge.', 'team_type' => 'leadership', 'sort_order' => 2],
            ['name' => 'Michael Islam', 'designation' => 'Director of Customer Experience', 'description' => 'Customer advocate focused on delivering exceptional support and service quality.', 'team_type' => 'leadership', 'sort_order' => 3],
            ['name' => 'Rahim Uddin', 'designation' => 'Home Connections', 'description' => 'Helps you choose the right home package, schedule installation and sort out any paperwork.', 'phone' => '+880 1711-111001', 'email' => 'rahim@nexalink.net', 'whatsapp' => '+880 1711-111001', 'team_type' => 'sales', 'sort_order' => 1],
            ['name' => 'Nusrat Jahan', 'designation' => 'Business & Enterprise', 'description' => 'Dedicated connectivity for offices, campuses and growing teams — from quotes to deployment.', 'phone' => '+880 1711-111002', 'email' => 'nusrat@nexalink.net', 'whatsapp' => '+880 1711-111002', 'team_type' => 'sales', 'sort_order' => 2],
            ['name' => 'Tanvir Ahmed', 'designation' => 'Coverage & Relocation', 'description' => 'Checks your area, plans fiber runs and helps you move your connection to a new address.', 'phone' => '+880 1711-111003', 'email' => 'tanvir@nexalink.net', 'whatsapp' => '+880 1711-111003', 'team_type' => 'sales', 'sort_order' => 3],
        ];

        foreach ($team as $member) {
            TeamMember::firstOrCreate(
                ['name' => $member['name']],
                [
                    'designation' => $member['designation'],
                    'description' => $member['description'] ?? null,
                    'phone' => $member['phone'] ?? null,
                    'email' => $member['email'] ?? null,
                    'whatsapp' => $member['whatsapp'] ?? null,
                    'team_type' => $member['team_type'],
                    'sort_order' => $member['sort_order'],
                ]
            );
        }
    }

    private function seedFaqDisplayLocations(): void
    {
        // Update existing FAQs to have display_location = 'all'
        Faq::query()->whereNull('display_location')->update(['display_location' => 'all']);
    }
}
