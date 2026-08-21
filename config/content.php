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
        ['key' => 'customers', 'label' => 'Active customers', 'value' => 48000, 'suffix' => '+', 'decimals' => 0, 'icon' => 'users'],
        ['key' => 'uptime', 'label' => 'Network uptime', 'value' => 99.9, 'suffix' => '%', 'decimals' => 1, 'icon' => 'shield-check'],
        ['key' => 'coverage', 'label' => 'Coverage areas', 'value' => 0, 'suffix' => '+', 'decimals' => 0, 'icon' => 'globe'],
        ['key' => 'support', 'label' => 'Support availability', 'value' => 24, 'suffix' => '/7', 'decimals' => 0, 'icon' => 'headset'],
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

    'about' => [
        'hero' => [
            'eyebrow' => 'Our Story',
            'title' => 'Connecting communities with premium fiber internet',
            'description' => 'We build and maintain a modern fiber-optic network designed for speed, reliability, and exceptional customer experience.',
        ],
        'brandStory' => [
            'eyebrow' => 'Why We Exist',
            'title' => 'Born from the need for better connectivity',
            'description' => 'We founded NexaLink with a simple belief: everyone deserves fast, reliable internet without compromise. Our journey began when we experienced firsthand the frustration of slow speeds, unreliable connections, and poor customer support. We decided to build something different.',
            'highlight' => 'A fiber network built for the future, operated with transparency and care.',
        ],
        'companyIdentity' => [
            'title' => 'We are a modern connectivity provider',
            'description' => 'At our core, we are a technology company that happens to provide internet service. We combine cutting-edge infrastructure with a customer-first approach to deliver connectivity that works when you need it most.',
        ],
        'mission' => [
            'title' => 'Our Mission',
            'description' => 'To deliver premium fiber-optic broadband that empowers individuals, businesses, and communities with reliable, high-speed connectivity they can depend on every day.',
        ],
        'vision' => [
            'title' => 'Our Vision',
            'description' => 'To be the most trusted and forward-thinking internet service provider, setting the standard for connectivity, innovation, and customer experience across Bangladesh.',
        ],
        'coreValues' => [
            [
                'icon' => 'zap',
                'title' => 'Reliability',
                'description' => 'We build redundant systems and maintain rigorous standards to ensure your connection stays up, even when others fail.',
            ],
            [
                'icon' => 'trending-up',
                'title' => 'Innovation',
                'description' => 'We continuously invest in new technologies and better ways to serve our customers, staying ahead of the connectivity curve.',
            ],
            [
                'icon' => 'heart',
                'title' => 'Customer Focus',
                'description' => 'Every decision we make considers our customers first. From support to infrastructure, we put your experience at the center.',
            ],
            [
                'icon' => 'eye',
                'title' => 'Transparency',
                'description' => 'No hidden fees, no false promises. We communicate honestly about our services, speeds, and any issues that may arise.',
            ],
            [
                'icon' => 'arrow-up-circle',
                'title' => 'Continuous Improvement',
                'description' => 'We never settle. Whether it is network performance, customer service, or new features, we always strive to be better.',
            ],
        ],
        'statistics' => [
            ['key' => 'customers', 'label' => 'Active customers', 'value' => 48000, 'suffix' => '+', 'decimals' => 0],
            ['key' => 'uptime', 'label' => 'Network uptime', 'value' => 99.9, 'suffix' => '%', 'decimals' => 1],
            ['key' => 'coverage', 'label' => 'Coverage areas', 'value' => 15, 'suffix' => '+', 'decimals' => 0],
            ['key' => 'support', 'label' => 'Support availability', 'value' => 24, 'suffix' => '/7', 'decimals' => 0],
            ['key' => 'experience', 'label' => 'Years of experience', 'value' => 8, 'suffix' => '+', 'decimals' => 0],
        ],
        'infrastructure' => [
            'title' => 'Built on a foundation of premium technology',
            'description' => 'Our network is designed from the ground up for performance, reliability, and scalability.',
            'points' => [
                [
                    'icon' => 'server-stack',
                    'title' => 'Pure Fiber Optic',
                    'description' => 'End-to-end fiber connections deliver symmetric speeds and ultra-low latency for the best possible experience.',
                ],
                [
                    'icon' => 'refresh',
                    'title' => 'Redundant Architecture',
                    'description' => 'Multiple path routing ensures your connection stays active even if one route encounters issues.',
                ],
                [
                    'icon' => 'eye',
                    'title' => 'Proactive Monitoring',
                    'description' => '24/7 network monitoring with automatic alerts and rapid response to any anomalies.',
                ],
                [
                    'icon' => 'gauge',
                    'title' => 'Burst Capacity',
                    'description' => 'Built-in headroom means consistent speeds even during peak usage periods in your area.',
                ],
            ],
        ],
        'valueFlow' => [
            'title' => 'Why our approach matters to you',
            'description' => 'Every technical decision we make ultimately translates to a better experience for our customers.',
            'steps' => [
                [
                    'icon' => 'server-stack',
                    'title' => 'Premium Infrastructure',
                    'description' => 'Modern fiber-optic network built for speed and reliability',
                ],
                [
                    'icon' => 'wifi',
                    'title' => 'Reliable Connectivity',
                    'description' => 'Consistent performance that you can count on, every day',
                ],
                [
                    'icon' => 'smile',
                    'title' => 'Better Digital Experience',
                    'description' => 'Smooth streaming, fast downloads, and seamless online activities',
                ],
            ],
        ],
        'journey' => [
            'title' => 'Our growth journey',
            'description' => 'From humble beginnings to serving thousands across the region',
            'milestones' => [
                [
                    'year' => '2018',
                    'title' => 'Founded',
                    'description' => 'Started with a vision to provide better internet to our community',
                ],
                [
                    'year' => '2020',
                    'title' => 'First City',
                    'description' => 'Launched service in Dhaka with our initial fiber network',
                ],
                [
                    'year' => '2022',
                    'title' => 'Expansion',
                    'description' => 'Extended coverage to Chattogram and Sylhet',
                ],
                [
                    'year' => '2024',
                    'title' => '48K+ Customers',
                    'description' => 'Grew to serve over 48,000 happy customers',
                ],
                [
                    'year' => '2025',
                    'title' => 'Future Ready',
                    'description' => 'Continuing to expand with new technologies and better service',
                ],
            ],
        ],
        'team' => [
            [
                'name' => 'Ahmed Khan',
                'role' => 'Chief Executive Officer',
                'description' => 'Visionary leader with 15+ years in telecommunications, driving our strategic growth.',
                'image' => null,
            ],
            [
                'name' => 'Sarah Rahman',
                'role' => 'Chief Technology Officer',
                'description' => 'Network architecture expert ensuring our infrastructure remains cutting-edge.',
                'image' => null,
            ],
            [
                'name' => 'Michael Islam',
                'role' => 'Director of Customer Experience',
                'description' => 'Customer advocate focused on delivering exceptional support and service quality.',
                'image' => null,
            ],
        ],
        'commitment' => [
            'title' => 'Our commitment to you',
            'description' => 'We are not just another ISP. We are your partner in staying connected. Our promise is to provide reliable service, transparent communication, and continuous improvement in everything we do.',
            'points' => [
                'Reliable service you can depend on',
                'Transparent pricing with no hidden fees',
                '24/7 local support that actually helps',
                'Continuous investment in better infrastructure',
                'A commitment to the communities we serve',
            ],
        ],
        'cta' => [
            'title' => 'Ready to experience the difference?',
            'description' => 'Join thousands of satisfied customers who trust NexaLink for their internet connectivity needs.',
            'primary' => [
                'label' => 'Explore our packages',
                'route' => 'plans.index',
            ],
            'secondary' => [
                'label' => 'Check coverage',
                'route' => 'coverage.index',
            ],
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Contact Page Content
    |--------------------------------------------------------------------------
    |
    | Marketing copy and structured data for the contact page. Reference
    | phone numbers, emails and the address are kept single-sourced in
    | config/brand.php wherever possible — the ContactService resolves them.
    |
    */

    'contact' => [
        'information' => [
            ['key' => 'support', 'icon' => 'headset', 'label' => '24/7 support hotline', 'value_ref' => 'hotline'],
            ['key' => 'sales', 'icon' => 'phone', 'label' => 'Sales hotline', 'value' => '+880 1711-123456'],
            ['key' => 'email', 'icon' => 'mail', 'label' => 'General inquiries', 'value_ref' => 'email'],
            ['key' => 'support_email', 'icon' => 'chat', 'label' => 'Support email', 'value' => 'support@nexalink.net'],
            ['key' => 'whatsapp', 'icon' => 'whatsapp', 'label' => 'WhatsApp', 'value' => '+880 1711-123456'],
            ['key' => 'emergency', 'icon' => 'activity', 'label' => 'Priority outage line', 'value' => '+880 9600-999999'],
            ['key' => 'address', 'icon' => 'map-pin', 'label' => 'Head office', 'value_ref' => 'address'],
            ['key' => 'hours', 'icon' => 'clock', 'label' => 'Business hours', 'value_ref' => 'hours'],
        ],

        'form' => [
            'eyebrow' => 'Send a message',
            'title' => 'We reply fast, with a human',
            'description' => 'Tell us what you need and our team will get back to you — usually within a few hours during business hours.',
            'submit' => 'Send message',
            'submitting' => 'Sending…',
            'subjects' => [
                ['value' => 'general', 'label' => 'General inquiry'],
                ['value' => 'sales', 'label' => 'Sales & new connection'],
                ['value' => 'support', 'label' => 'Existing customer support'],
                ['value' => 'billing', 'label' => 'Billing & payment'],
                ['value' => 'business', 'label' => 'Business connectivity'],
                ['value' => 'coverage', 'label' => 'Coverage check'],
                ['value' => 'package', 'label' => 'Package inquiry'],
                ['value' => 'other', 'label' => 'Something else'],
            ],
        ],

        'salesTeam' => [
            [
                'name' => 'Rahim Uddin',
                'role' => 'Home Connections',
                'description' => 'Helps you choose the right home package, schedule installation and sort out any paperwork.',
                'phone' => '+880 1711-111001',
                'email' => 'rahim@nexalink.net',
                'whatsapp' => '+880 1711-111001',
                'image' => null,
            ],
            [
                'name' => 'Nusrat Jahan',
                'role' => 'Business & Enterprise',
                'description' => 'Dedicated connectivity for offices, campuses and growing teams — from quotes to deployment.',
                'phone' => '+880 1711-111002',
                'email' => 'nusrat@nexalink.net',
                'whatsapp' => '+880 1711-111002',
                'image' => null,
            ],
            [
                'name' => 'Tanvir Ahmed',
                'role' => 'Coverage & Relocation',
                'description' => 'Checks your area, plans fiber runs and helps you move your connection to a new address.',
                'phone' => '+880 1711-111003',
                'email' => 'tanvir@nexalink.net',
                'whatsapp' => '+880 1711-111003',
                'image' => null,
            ],
        ],

        'office' => [
            'name' => 'NexaLink Head Office',
            'address' => 'Level 6, Tech Tower, Banani, Dhaka 1213, Bangladesh',
            'hours' => 'Sales: 10am – 10pm · Support: 24/7',
            'phone' => '+880 9600-123456',
            'latitude' => 23.7940,
            'longitude' => 90.4066,
        ],

    ],

];
