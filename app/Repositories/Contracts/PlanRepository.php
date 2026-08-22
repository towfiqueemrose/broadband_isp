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

    public function countByType(): Collection;

    public function comparisonData(): Collection;

    public function findBySlug(string $slug): ?Plan;

    public function all(): Collection;

    public function find(int $id): ?Plan;

    public function create(array $data): Plan;

    public function update(Plan $plan, array $data): Plan;

    public function delete(Plan $plan): bool;
}
