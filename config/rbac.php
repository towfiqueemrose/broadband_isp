<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Permission Catalog
    |--------------------------------------------------------------------------
    |
    | Fixed catalog of permissions enforced by gates and route middleware.
    | Roles pick subsets of these from the admin panel. The super-admin
    | role bypasses every check.
    |
    */

    'permissions' => [
        'hero.manage' => ['label' => 'Hero Section', 'group' => 'Homepage'],
        'why-choose-us.manage' => ['label' => 'Why Choose Us', 'group' => 'Homepage'],
        'services.manage' => ['label' => 'Services', 'group' => 'Homepage'],
        'promotions.manage' => ['label' => 'Promotions', 'group' => 'Homepage'],
        'page-ctas.manage' => ['label' => 'Final CTA', 'group' => 'Homepage'],

        'plans.manage' => ['label' => 'Internet Plans', 'group' => 'Packages'],

        'mission.manage' => ['label' => 'Mission', 'group' => 'About'],
        'vision.manage' => ['label' => 'Vision', 'group' => 'About'],
        'core-values.manage' => ['label' => 'Core Values', 'group' => 'About'],
        'journey.manage' => ['label' => 'Journey', 'group' => 'About'],
        'team.manage' => ['label' => 'Team Members', 'group' => 'About'],

        'inquiries.manage' => ['label' => 'Inquiries', 'group' => 'Contact & Support'],
        'faqs.manage' => ['label' => 'FAQs', 'group' => 'Contact & Support'],
        'locations.manage' => ['label' => 'Office Locations', 'group' => 'Contact & Support'],

        'settings.manage' => ['label' => 'Website Settings', 'group' => 'Settings'],

        'rbac.manage' => ['label' => 'Access Control (Roles & Users)', 'group' => 'Access Control'],
    ],

    'super_admin_role' => 'super-admin',
];
