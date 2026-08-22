<?php

namespace App\Repositories\Eloquent;

use App\Models\Plan;
use App\Repositories\Contracts\PlanRepository;
use Illuminate\Support\Collection;

class EloquentPlanRepository implements PlanRepository
{
    public function featuredPlans(int $limit = 3): Collection
    {
        return Plan::query()
            ->active()
            ->ordered()
            ->limit($limit)
            ->get();
    }

    public function allActive(): Collection
    {
        return Plan::query()
            ->active()
            ->ordered()
            ->get();
    }

    public function byType(string $type): Collection
    {
        return Plan::query()
            ->active()
            ->byType($type)
            ->ordered()
            ->get();
    }

    public function categories(): Collection
    {
        return Plan::query()
            ->active()
            ->ordered()
            ->get()
            ->pluck('type')
            ->unique()
            ->values();
    }

    public function countByType(): Collection
    {
        return Plan::query()
            ->selectRaw('type, count(*) as plans_count')
            ->groupBy('type')
            ->pluck('plans_count', 'type');
    }

    public function comparisonData(): Collection
    {
        return Plan::query()
            ->active()
            ->ordered()
            ->get();
    }

    public function findBySlug(string $slug): ?Plan
    {
        return Plan::query()
            ->active()
            ->where('slug', $slug)
            ->first();
    }

    public function all(): Collection
    {
        return Plan::query()->ordered()->get();
    }

    public function find(int $id): ?Plan
    {
        return Plan::find($id);
    }

    public function create(array $data): Plan
    {
        return Plan::create($data);
    }

    public function update(Plan $plan, array $data): Plan
    {
        $plan->update($data);

        return $plan;
    }

    public function delete(Plan $plan): bool
    {
        return $plan->delete();
    }
}
