<?php

namespace App\Repositories\Contracts;

use App\Models\Promotion;

interface PromotionRepository
{
    public function activeFor(string $location): \Illuminate\Support\Collection;

    public function all(): \Illuminate\Support\Collection;

    public function create(array $data): Promotion;

    public function update(Promotion $promotion, array $data): Promotion;

    public function delete(Promotion $promotion): bool;

    public function reorder(array $orderedIds): void;
}
