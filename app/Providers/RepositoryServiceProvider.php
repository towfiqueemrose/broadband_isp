<?php

namespace App\Providers;

use App\Repositories\Contracts\CoverageAreaRepository;
use App\Repositories\Contracts\FaqRepository;
use App\Repositories\Contracts\PlanRepository;
use App\Repositories\Contracts\TestimonialRepository;
use App\Repositories\Eloquent\EloquentCoverageAreaRepository;
use App\Repositories\Eloquent\EloquentFaqRepository;
use App\Repositories\Eloquent\EloquentPlanRepository;
use App\Repositories\Eloquent\EloquentTestimonialRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Bind repository contracts to their Eloquent implementations.
     */
    public function register(): void
    {
        $this->app->bind(PlanRepository::class, EloquentPlanRepository::class);
        $this->app->bind(TestimonialRepository::class, EloquentTestimonialRepository::class);
        $this->app->bind(CoverageAreaRepository::class, EloquentCoverageAreaRepository::class);
        $this->app->bind(FaqRepository::class, EloquentFaqRepository::class);
    }
}
