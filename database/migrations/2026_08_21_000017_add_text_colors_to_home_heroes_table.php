<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('home_heroes', function (Blueprint $table) {
            $table->string('eyebrow_text_color', 7)->nullable()->after('image_opacity');
            $table->string('main_heading_text_color', 7)->nullable()->after('eyebrow_text_color');
            $table->string('highlighted_text_color', 7)->nullable()->after('main_heading_text_color');
            $table->string('description_text_color', 7)->nullable()->after('highlighted_text_color');
        });
    }

    public function down(): void
    {
        Schema::table('home_heroes', function (Blueprint $table) {
            $table->dropColumn([
                'eyebrow_text_color',
                'main_heading_text_color',
                'highlighted_text_color',
                'description_text_color',
            ]);
        });
    }
};
