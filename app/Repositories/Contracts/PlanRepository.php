<?php

namespace App\Repositories\Contracts;

use App\Models\Plan;
use Illuminate\Support\Collection;

interface PlanRepository
{
    public function featuredPlans(int $limit = 3): Collection;

    public function allActive(): Collection;

    public function byType(string $type): Collection;

    public function categories(): Collection;

    public function comparisonData(): Collection;

    public function findBySlug(string $slug): ?Plan;
}
