<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        // Super admins pass every check; everyone else falls through to gates.
        Gate::before(function (User $user) {
            return $user->isSuperAdmin() ? true : null;
        });

        foreach (config('rbac.permissions', []) as $name => $meta) {
            Gate::define($name, function (User $user) use ($name) {
                return $user->hasPermission($name);
            });
        }
    }
}
