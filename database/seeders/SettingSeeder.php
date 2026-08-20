<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        // Brand settings
        Setting::set('brand_name', 'NexaLink');
        Setting::set('brand_tagline', 'Fiber-fast internet, built for everything you do.');
        Setting::set('brand_description', 'NexaLink delivers premium fiber-optic broadband with symmetric speeds, rock-solid reliability and 24/7 local support for homes and businesses across Bangladesh.');
        Setting::set('brand_meta_title', 'Premium Fiber Internet for Home & Business');
        Setting::set('brand_meta_description', 'Fast, reliable fiber-optic broadband from NexaLink. Symmetric speeds, 99.9% uptime and 24/7 local support across Bangladesh.');
        Setting::set('brand_hotline', '+880 9600-123456');
        Setting::set('brand_phone', '+880 1711-123456');
        Setting::set('brand_email', 'hello@nexalink.net');
        Setting::set('brand_address', 'Level 6, Tech Tower, Banani, Dhaka 1213, Bangladesh');
        Setting::set('brand_hours', '24/7 support · Sales 10am – 10pm');
        Setting::set('brand_socials', json_encode([
            'facebook' => 'https://facebook.com/nexalink',
            'twitter' => 'https://x.com/nexalink',
            'linkedin' => 'https://linkedin.com/company/nexalink',
            'youtube' => 'https://youtube.com/@nexalink',
            'instagram' => 'https://instagram.com/nexalink',
        ]));

        // Theme settings
        Setting::set('theme_primary', '#4702bd');
        Setting::set('theme_secondary', '#1e1b4b');
        Setting::set('theme_accent', '#22d3ee');

        // Live chat settings
        Setting::set('live_chat_enabled', 'true');
        Setting::set('live_chat_welcome', 'Hello! Welcome to NexaLink. How can we help you today?');
    }
}
