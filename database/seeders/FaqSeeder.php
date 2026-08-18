<?php

namespace Database\Seeders;

use App\Models\Faq;
use Illuminate\Database\Seeder;

class FaqSeeder extends Seeder
{
    public function run(): void
    {
        $faqs = [
            [
                'category' => 'Connection',
                'question' => 'How fast will my connection actually be?',
                'answer' => 'With fiber to the home you get the speed you subscribe to — symmetric, both download and upload. We run a speed test at installation and monitor quality continuously so you keep it over time.',
                'sort_order' => 1,
            ],
            [
                'category' => 'Setup',
                'question' => 'What equipment do I need?',
                'answer' => 'Nothing to buy. Every plan includes a modern dual-band WiFi router and professional installation by our technicians. Just tell us which room needs the strongest signal.',
                'sort_order' => 2,
            ],
            [
                'category' => 'Billing',
                'question' => 'Is there any data limit?',
                'answer' => 'No. All our plans come with truly unlimited data — no caps, no throttling, and no surprises on your bill.',
                'sort_order' => 3,
            ],
            [
                'category' => 'Billing',
                'question' => 'How do I pay my bill?',
                'answer' => 'You can pay via bKash, Nagad, bank transfer or our app. We also offer easy annual plans with meaningful savings if you prefer to pay once a year.',
                'sort_order' => 4,
            ],
            [
                'category' => 'Support',
                'question' => 'What happens during an outage?',
                'answer' => 'Our network is monitored 24/7 with automatic failover. If an issue does affect you, we resolve it as a priority and credit your account for any downtime — no arguing required.',
                'sort_order' => 5,
            ],
            [
                'category' => 'Business',
                'question' => 'Do you support business connections?',
                'answer' => 'Yes. Business plans include static IPs, a 99.9% uptime service-level agreement and a dedicated account manager who understands your setup.',
                'sort_order' => 6,
            ],
            [
                'category' => 'Moving',
                'question' => 'Can I move my connection to a new address?',
                'answer' => 'Of course. If your new address is in a covered area we will move your service usually within 48 hours, free of charge during the first year.',
                'sort_order' => 7,
            ],
            [
                'category' => 'Setup',
                'question' => 'How quickly can I get connected?',
                'answer' => 'In most covered areas we complete installation within 48 hours of confirmation. Our team will schedule a slot that suits you.',
                'sort_order' => 8,
            ],
        ];

        foreach ($faqs as $faq) {
            Faq::query()->create($faq);
        }
    }
}
