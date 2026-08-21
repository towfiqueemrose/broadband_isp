<?php

namespace Database\Seeders;

use App\Models\Page;
use Illuminate\Database\Seeder;

class PageSeeder extends Seeder
{
    public function run(): void
    {
        $pages = [
            [
                'title' => 'Privacy Policy',
                'slug' => 'privacy',
                'content' => '<h2>1. Information We Collect</h2><p>We collect information you provide directly to us, such as when you fill out a contact form, subscribe to our services, or communicate with us. This may include your name, email address, phone number, and billing information.</p><h2>2. How We Use Your Information</h2><p>We use the information we collect to provide, maintain, and improve our services, process transactions, send technical notices and support messages, and respond to your comments and questions.</p><h2>3. Information Sharing</h2><p>We do not sell or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and providing our services.</p><h2>4. Data Security</h2><p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p><h2>5. Your Rights</h2><p>You have the right to access, correct, or delete your personal information. You may also opt out of certain communications from us.</p><h2>6. Contact Us</h2><p>If you have any questions about this Privacy Policy, please contact us through our contact page.</p>',
                'meta_title' => 'Privacy Policy',
                'meta_description' => 'Learn how NexaLink collects, uses, and protects your personal information.',
                'is_active' => true,
                'published_at' => now(),
            ],
            [
                'title' => 'Terms of Service',
                'slug' => 'terms',
                'content' => '<h2>1. Acceptance of Terms</h2><p>By accessing or using our services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p><h2>2. Description of Services</h2><p>We provide fiber-optic broadband internet services to residential and business customers. Service availability may vary by location.</p><h2>3. Account Registration</h2><p>You may be required to register for an account to access certain features. You are responsible for maintaining the confidentiality of your account credentials.</p><h2>4. Acceptable Use</h2><p>You agree to use our services only for lawful purposes and in accordance with these Terms. You may not use our services in any way that violates applicable laws or regulations.</p><h2>5. Payment Terms</h2><p>Service fees are due according to the billing cycle selected at the time of subscription. Late payments may result in service suspension.</p><h2>6. Service Availability</h2><p>We strive to maintain 99.9% uptime but do not guarantee uninterrupted service. Scheduled maintenance will be communicated in advance when possible.</p><h2>7. Limitation of Liability</h2><p>To the maximum extent permitted by law, NexaLink shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services.</p><h2>8. Contact Us</h2><p>For questions about these Terms of Service, please contact us through our contact page.</p>',
                'meta_title' => 'Terms of Service',
                'meta_description' => 'Read the terms and conditions for using NexaLink broadband services.',
                'is_active' => true,
                'published_at' => now(),
            ],
        ];

        foreach ($pages as $page) {
            Page::query()->updateOrCreate(['slug' => $page['slug']], $page);
        }
    }
}
