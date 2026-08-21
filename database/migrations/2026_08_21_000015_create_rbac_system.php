<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('label');
            $table->text('description')->nullable();
            $table->boolean('is_system')->default(false);
            $table->json('permissions')->nullable();
            $table->timestamps();
        });

        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('role_id')->nullable()->after('password')->constrained()->nullOnDelete();
        });

        // Backfill: existing admins receive the super-admin role.
        $superAdminId = DB::table('roles')->insertGetId([
            'name' => config('rbac.super_admin_role'),
            'label' => 'Super Admin',
            'description' => 'Full access to everything. Cannot be modified or deleted.',
            'is_system' => true,
            'permissions' => null,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('users')
            ->where('is_admin', true)
            ->update(['role_id' => $superAdminId]);

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('is_admin');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->boolean('is_admin')->default(false)->after('email_verified_at');
        });

        DB::table('users')
            ->whereNotNull('role_id')
            ->update(['is_admin' => true]);

        Schema::table('users', function (Blueprint $table) {
            $table->dropConstrainedForeignId('role_id');
        });

        Schema::dropIfExists('roles');
    }
};
