<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('home_heroes', function (Blueprint $table) {
            $table->json('trust_chips')->nullable()->after('trust_chips_color');
        });
    }

    public function down(): void
    {
        Schema::table('home_heroes', function (Blueprint $table) {
            $table->dropColumn('trust_chips');
        });
    }
};
