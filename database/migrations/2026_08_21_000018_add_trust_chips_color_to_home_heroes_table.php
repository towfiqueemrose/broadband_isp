<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('home_heroes', function (Blueprint $table) {
            $table->string('trust_chips_color', 7)->nullable()->after('description_text_color');
        });
    }

    public function down(): void
    {
        Schema::table('home_heroes', function (Blueprint $table) {
            $table->dropColumn('trust_chips_color');
        });
    }
};
