<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('plans', function (Blueprint $table) {
            $table->unsignedInteger('installation_fee')->nullable()->after('price_monthly');
            $table->unsignedInteger('original_price')->nullable()->after('installation_fee');
            $table->unsignedInteger('promo_price')->nullable()->after('original_price');
            $table->string('promo_label')->nullable()->after('promo_price');
            $table->string('promo_description')->nullable()->after('promo_label');
            $table->date('promo_ends_at')->nullable()->after('promo_description');
            $table->json('attributes')->nullable()->after('features');
        });
    }

    public function down(): void
    {
        Schema::table('plans', function (Blueprint $table) {
            $table->dropColumn([
                'installation_fee',
                'original_price',
                'promo_price',
                'promo_label',
                'promo_description',
                'promo_ends_at',
                'attributes',
            ]);
        });
    }
};
