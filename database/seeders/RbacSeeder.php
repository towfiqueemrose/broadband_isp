<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RbacSeeder extends Seeder
{
    public function run(): void
    {
        $superAdmin = Role::query()->updateOrCreate(
            ['name' => config('rbac.super_admin_role')],
            [
                'label' => 'Super Admin',
                'description' => 'Full access to everything. Cannot be modified or deleted.',
                'is_system' => true,
                'permissions' => null,
            ],
        );

        User::query()->updateOrCreate(
            ['email' => 'admin@gmail.com'],
            [
                'name' => 'Admin',
                'password' => 'password',
                'role_id' => $superAdmin->id,
                'email_verified_at' => now(),
            ],
        );
    }
}
