<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('plan_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('description')->nullable();
            $table->string('icon')->default('layers');
            $table->boolean('is_active')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();

            $table->index(['is_active', 'sort_order']);
        });

        // Backfill: categories previously defined in config/content.php.
        $defaults = [
            ['residential', 'Home Internet', 'Fiber for streaming, gaming, classes and remote work.', 'home', 1],
            ['business', 'Business Internet', 'SLA-backed connectivity with static IPs and priority support.', 'briefcase', 2],
        ];

        foreach ($defaults as [$slug, $name, $description, $icon, $sortOrder]) {
            DB::table('plan_categories')->updateOrInsert(
                ['slug' => $slug],
                [
                    'name' => $name,
                    'description' => $description,
                    'icon' => $icon,
                    'is_active' => true,
                    'sort_order' => $sortOrder,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
            );
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('plan_categories');
    }
};
