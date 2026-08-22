<?php

namespace App\Repositories\Contracts;

use App\Models\PlanCategory;
use Illuminate\Support\Collection;

interface PlanCategoryRepository
{
    public function all(): Collection;

    public function activeOrdered(): Collection;

    public function find(int $id): ?PlanCategory;

    public function create(array $data): PlanCategory;

    public function update(PlanCategory $category, array $data): PlanCategory;

    public function delete(PlanCategory $category): bool;
}
