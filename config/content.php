<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Homepage Content
    |--------------------------------------------------------------------------
    |
    | Marketing copy for the homepage lives here so the presentation layer
    | stays clean and the content can later be migrated to the database
    | without touching any React component.
    |
    */

    'stats' => [
        ['key' => 'customers', 'label' => 'Active customers', 'value' => 48000, 'suffix' => '+', 'decimals' => 0],
        ['key' => 'uptime', 'label' => 'Network uptime', 'value' => 99.9, 'suffix' => '%', 'decimals' => 1],
        ['key' => 'coverage', 'label' => 'Coverage areas', 'value' => 0, 'suffix' => '+', 'decimals' => 0],
        ['key' => 'support', 'label' => 'Support availability', 'value' => 24, 'suffix' => '/7', 'decimals' => 0],
    ],

    'whyChooseUs' => [
        [
            'icon' => 'bolt',
            'title' => 'True fiber speeds',
            'description' => 'Fiber-optic connections deliver the speed you pay for — consistently, even during peak hours.',
        ],
        [
            'icon' => 'shield-check',
            'title' => 'Rock-solid reliability',
            'description' => 'Redundant routing and enterprise-grade hardware keep your connection stable around the clock.',
        ],
        [
            'icon' => 'activity',
            'title' => 'Low latency, always',
            'description' => 'Optimised peering and low ping make video calls, gaming and remote work feel instant.',
        ],
        [
            'icon' => 'headset',
            'title' => '24/7 human support',
            'description' => 'Real local engineers on call day and night — by phone, chat or email, in English and Bengali.',
        ],
    ],

    'services' => [
        ['icon' => 'home', 'title' => 'Home Broadband', 'description' => 'Symmetric fiber for streaming, gaming and remote work across every device in your home.'],
        ['icon' => 'briefcase', 'title' => 'Business Internet', 'description' => 'Dedicated bandwidth, static IPs and SLA-backed uptime for growing teams.'],
        ['icon' => 'server-stack', 'title' => 'Enterprise Connectivity', 'description' => 'High-capacity circuits and redundant paths for mission-critical operations.'],
        ['icon' => 'wifi', 'title' => 'Managed WiFi', 'description' => 'Seamless whole-home and office coverage with professional access points.'],
        ['icon' => 'headset', 'title' => '24/7 Support', 'description' => 'A local support team that answers fast and resolves faster.'],
        ['icon' => 'sparkles', 'title' => 'Custom Solutions', 'description' => 'Tailored connectivity for campuses, events and multi-site networks.'],
    ],

    'offer' => [
        'eyebrow' => 'Limited-time offer',
        'title' => 'Free installation & your first month on us',
        'description' => 'Join NexaLink this month and enjoy free professional installation, a free dual-band WiFi router, and your first month of service at no cost.',
        'details' => ['Free installation', 'Free WiFi router', 'First month free', 'Setup within 48 hours'],
        'cta' => [
            'label' => 'Claim this offer',
            'route' => 'contact.index',
        ],
    ],

    'techPoints' => [
        [
            'icon' => 'server-stack',
            'title' => 'Own fiber backbone',
            'description' => 'A dedicated fiber backbone connects our network directly to global internet exchanges.',
        ],
        [
            'icon' => 'refresh',
            'title' => 'Redundant routes',
            'description' => 'Automatic failover keeps traffic flowing even if a single route ever falters.',
        ],
        [
            'icon' => 'eye',
            'title' => '24/7 monitoring',
            'description' => 'Network health is watched in real time, with issues resolved before you notice them.',
        ],
        [
            'icon' => 'gauge',
            'title' => 'Burst headroom',
            'description' => 'Capacity above your plan means steady speeds, even at peak evening hours.',
        ],
    ],

    'packages' => [
        'hero' => [
            'eyebrow' => 'Internet Packages',
            'title' => 'Choose the speed that fits your life',
            'description' => 'Every plan is unlimited, symmetric and backed by our 24/7 local support team. Compare speeds, prices and benefits — then start small and upgrade whenever you like.',
        ],
        'categories' => [
            'residential' => [
                'label' => 'Home Internet',
                'description' => 'Fiber for streaming, gaming, classes and remote work.',
                'icon' => 'home',
            ],
            'business' => [
                'label' => 'Business Internet',
                'description' => 'SLA-backed connectivity with static IPs and priority support.',
                'icon' => 'briefcase',
            ],
        ],
        'comparison' => [
            'eyebrow' => 'Side by side',
            'title' => 'Compare packages',
            'description' => 'The details matter when you pick a plan. Check the important differences before you decide.',
            'attributes' => [
                ['key' => 'connection', 'label' => 'Connection', 'type' => 'text'],
                ['key' => 'support', 'label' => 'Support', 'type' => 'text'],
                ['key' => 'router', 'label' => 'Router', 'type' => 'text'],
                ['key' => 'static_ip', 'label' => 'Static IP', 'type' => 'boolean'],
                ['key' => 'sla', 'label' => 'Uptime guarantee', 'type' => 'text'],
            ],
        ],
        'recommendations' => [
            [
                'icon' => 'user',
                'title' => 'Browsing & social',
                'description' => 'Messaging, browsing and the occasional video call. 30 Mbps is more than enough.',
                'plan' => 'starter-home',
            ],
            [
                'icon' => 'users',
                'title' => 'Small family',
                'description' => 'A few devices streaming HD and taking online classes at the same time.',
                'plan' => 'plus-home',
            ],
            [
                'icon' => 'play',
                'title' => 'Streaming & gaming',
                'description' => '4K streaming, gaming and remote work without compromise.',
                'plan' => 'pro-home',
            ],
            [
                'icon' => 'home',
                'title' => 'Large household',
                'description' => 'Many devices and power users under one roof — everyone online at once.',
                'plan' => 'ultra-home',
            ],
            [
                'icon' => 'briefcase',
                'title' => 'Growing business',
                'description' => 'Reliable connectivity with a static IP and SLA-backed uptime.',
                'plan' => 'business-pro',
            ],
            [
                'icon' => 'server-stack',
                'title' => 'Offices & studios',
                'description' => 'High-capacity, redundant connectivity for teams and heavy uploads.',
                'plan' => 'business-enterprise',
            ],
        ],
    ],

    'stubPages' => [
        'about' => [
            'title' => 'About NexaLink',
            'description' => 'We are building Bangladesh’s most dependable fiber network — connecting homes, offices and communities with honest speeds and honest support.',
            'icon' => 'building-office',
            'cta' => ['label' => 'Get connected', 'route' => 'contact.index'],
        ],
        'coverage' => [
            'title' => 'Coverage & Availability',
            'description' => 'We are expanding across Dhaka, Chattogram and beyond. Check back soon for a full coverage map — or contact us to check your area.',
            'icon' => 'globe',
            'cta' => ['label' => 'Check availability', 'route' => 'contact.index'],
        ],
        'faq' => [
            'title' => 'Frequently Asked Questions',
            'description' => 'Answers to the questions we hear most are being gathered here. In the meantime, our support team is one call away.',
            'icon' => 'chat',
            'cta' => ['label' => 'Talk to support', 'route' => 'contact.index'],
        ],
        'contact' => [
            'title' => 'Contact Us',
            'description' => 'Our full contact page is being prepared. Until then, reach our team any time by phone or email — we answer fast.',
            'icon' => 'phone',
            'cta' => ['label' => 'Back to homepage', 'route' => 'home'],
        ],
        'terms' => [
            'title' => 'Terms of Service',
            'description' => 'Our terms of service are being finalised and will be published here shortly.',
            'icon' => 'document',
            'cta' => ['label' => 'Back to homepage', 'route' => 'home'],
        ],
        'privacy' => [
            'title' => 'Privacy Policy',
            'description' => 'Our privacy policy is being prepared and will be published here shortly.',
            'icon' => 'shield-check',
            'cta' => ['label' => 'Back to homepage', 'route' => 'home'],
        ],
    ],

];
