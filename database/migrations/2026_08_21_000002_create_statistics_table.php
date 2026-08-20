<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('statistics', function (Blueprint $table) {
            $table->id();
            $table->string('label');
            $table->decimal('value', 10, 2);
            $table->string('suffix')->nullable();
            $table->unsignedTinyInteger('decimals')->default(0);
            $table->text('description')->nullable();
            $table->string('icon')->nullable();
            $table->string('display_location')->default('both')->index(); // homepage, about, both
            $table->boolean('is_active')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('statistics');
    }
};
