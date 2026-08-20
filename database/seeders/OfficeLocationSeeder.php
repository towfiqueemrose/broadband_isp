<?php

namespace Database\Seeders;

use App\Models\OfficeLocation;
use Illuminate\Database\Seeder;

class OfficeLocationSeeder extends Seeder
{
    public function run(): void
    {
        OfficeLocation::firstOrCreate(
            ['name' => 'NexaLink Head Office'],
            [
                'address' => 'Level 6, Tech Tower, Banani, Dhaka 1213, Bangladesh',
                'phone' => '+880 9600-123456',
                'email' => 'hello@nexalink.net',
                'business_hours' => 'Sales: 10am – 10pm · Support: 24/7',
                'latitude' => 23.7940,
                'longitude' => 90.4066,
                'maps_embed_url' => 'https://maps.google.com/maps?q=23.7940,90.4066&z=15&output=embed',
                'maps_url' => 'https://www.google.com/maps/dir/?api=1&destination=23.7940,90.4066',
                'is_active' => true,
            ]
        );

        OfficeLocation::firstOrCreate(
            ['name' => 'NexaLink Chattogram Office'],
            [
                'address' => '3rd Floor, Avenue Tower, GEC Circle, Chattogram 4000, Bangladesh',
                'phone' => '+880 9600-789012',
                'email' => 'chattogram@nexalink.net',
                'business_hours' => 'Sales: 10am – 8pm · Support: 24/7',
                'latitude' => 22.3569,
                'longitude' => 91.7832,
                'is_active' => false,
            ]
        );
    }
}
