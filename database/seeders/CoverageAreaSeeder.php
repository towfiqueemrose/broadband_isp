<?php

namespace Database\Seeders;

use App\Models\CoverageArea;
use Illuminate\Database\Seeder;

class CoverageAreaSeeder extends Seeder
{
    public function run(): void
    {
        $areas = [
            ['name' => 'Dhanmondi', 'slug' => 'dhanmondi', 'type' => 'zone', 'status' => 'available', 'sort_order' => 1],
            ['name' => 'Gulshan', 'slug' => 'gulshan', 'type' => 'zone', 'status' => 'available', 'sort_order' => 2],
            ['name' => 'Banani', 'slug' => 'banani', 'type' => 'zone', 'status' => 'available', 'sort_order' => 3],
            ['name' => 'Uttara', 'slug' => 'uttara', 'type' => 'zone', 'status' => 'available', 'sort_order' => 4],
            ['name' => 'Mirpur', 'slug' => 'mirpur', 'type' => 'zone', 'status' => 'available', 'sort_order' => 5],
            ['name' => 'Motijheel', 'slug' => 'motijheel', 'type' => 'zone', 'status' => 'available', 'sort_order' => 6],
            ['name' => 'Badda', 'slug' => 'badda', 'type' => 'zone', 'status' => 'available', 'sort_order' => 7],
            ['name' => 'Agrabad', 'slug' => 'agrabad', 'type' => 'zone', 'status' => 'available', 'sort_order' => 8],
            ['name' => 'GEC Circle', 'slug' => 'gec-circle', 'type' => 'zone', 'status' => 'available', 'sort_order' => 9],
            ['name' => 'Zindabazar', 'slug' => 'zindabazar', 'type' => 'zone', 'status' => 'available', 'sort_order' => 10],
            ['name' => 'Sonadanga', 'slug' => 'sonadanga', 'type' => 'zone', 'status' => 'coming_soon', 'launch_date' => 'November 2026', 'sort_order' => 11],
            ['name' => 'College Gate', 'slug' => 'college-gate', 'type' => 'zone', 'status' => 'coming_soon', 'launch_date' => 'December 2026', 'sort_order' => 12],
        ];

        foreach ($areas as $area) {
            CoverageArea::query()->updateOrCreate(['slug' => $area['slug']], $area);
        }
    }
}
