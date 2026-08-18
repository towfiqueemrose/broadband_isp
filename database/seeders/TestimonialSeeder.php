<?php

namespace Database\Seeders;

use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class TestimonialSeeder extends Seeder
{
    public function run(): void
    {
        $testimonials = [
            [
                'name' => 'Tanvir Ahmed',
                'role' => 'Software Engineer',
                'location' => 'Banani, Dhaka',
                'quote' => 'I switched from a 4G dongle and the difference is night and day. Video calls are crystal clear and downloads finish before I reach for my coffee.',
                'rating' => 5,
                'sort_order' => 1,
            ],
            [
                'name' => 'Nusrat Jahan',
                'role' => 'Freelance Designer',
                'location' => 'Dhanmondi, Dhaka',
                'quote' => 'Uploads are finally as fast as downloads, which changed how I deliver files to clients. Support is genuinely helpful — they even followed up after setup.',
                'rating' => 5,
                'sort_order' => 2,
            ],
            [
                'name' => 'Arif Chowdhury',
                'role' => 'Café Owner',
                'location' => 'Gulshan, Dhaka',
                'quote' => 'Our customers expect reliable WiFi and NexaLink delivers it every single day. We have not had a single dropped connection since we switched.',
                'rating' => 5,
                'sort_order' => 3,
            ],
            [
                'name' => 'Sadia Rahman',
                'role' => 'University Student',
                'location' => 'Uttara, Dhaka',
                'quote' => 'With three siblings studying online, 100 Mbps keeps us all going at once. Installation was quick and the router reached every room.',
                'rating' => 5,
                'sort_order' => 4,
            ],
            [
                'name' => 'Mahfuz Alam',
                'role' => 'Startup Founder',
                'location' => 'Agrabad, Chattogram',
                'quote' => 'We run our entire office on the Business Pro plan. Static IP, no throttling, and issues are solved within minutes. Exactly what a growing team needs.',
                'rating' => 5,
                'sort_order' => 5,
            ],
            [
                'name' => 'Rima Sultana',
                'role' => 'Content Creator',
                'location' => 'Mirpur, Dhaka',
                'quote' => 'Uploading 4K videos that used to take an hour now takes minutes. The speed is consistent, even in the evening when everyone is online.',
                'rating' => 5,
                'sort_order' => 6,
            ],
        ];

        foreach ($testimonials as $testimonial) {
            Testimonial::query()->create($testimonial);
        }
    }
}
