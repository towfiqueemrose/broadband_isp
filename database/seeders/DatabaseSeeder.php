<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RbacSeeder::class,
            PlanSeeder::class,
            TestimonialSeeder::class,
            CoverageAreaSeeder::class,
            FaqSeeder::class,
            CmsContentSeeder::class,
            OfficeLocationSeeder::class,
            SettingSeeder::class,
        ]);

        \App\Models\User::query()->updateOrCreate(
            ['email' => 'test@example.com'],
            ['name' => 'Test User', 'password' => 'password'],
        );
    }
}
