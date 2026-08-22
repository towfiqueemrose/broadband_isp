<?php

namespace App\Repositories\Eloquent;

use App\Models\PlanCategory;
use App\Repositories\Contracts\PlanCategoryRepository;
use Illuminate\Support\Collection;

class EloquentPlanCategoryRepository implements PlanCategoryRepository
{
    public function all(): Collection
    {
        return PlanCategory::query()->ordered()->get();
    }

    public function activeOrdered(): Collection
    {
        return PlanCategory::query()->active()->ordered()->get();
    }

    public function find(int $id): ?PlanCategory
    {
        return PlanCategory::find($id);
    }

    public function create(array $data): PlanCategory
    {
        return PlanCategory::create($data);
    }

    public function update(PlanCategory $category, array $data): PlanCategory
    {
        $category->update($data);

        return $category;
    }

    public function delete(PlanCategory $category): bool
    {
        return $category->delete();
    }
}
