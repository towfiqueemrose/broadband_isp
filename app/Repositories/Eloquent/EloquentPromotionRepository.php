<?php

namespace App\Repositories\Eloquent;

use App\Models\Promotion;
use App\Repositories\Contracts\PromotionRepository;
use Illuminate\Support\Collection;

class EloquentPromotionRepository implements PromotionRepository
{
    public function activeFor(string $location): Collection
    {
        return Promotion::query()
            ->active()
            ->forLocation($location)
            ->ordered()
            ->get();
    }

    public function all(): Collection
    {
        return Promotion::query()->ordered()->get();
    }

    public function create(array $data): Promotion
    {
        return Promotion::create($data);
    }

    public function update(Promotion $promotion, array $data): Promotion
    {
        $promotion->update($data);

        return $promotion;
    }

    public function delete(Promotion $promotion): bool
    {
        return $promotion->delete();
    }

    public function reorder(array $orderedIds): void
    {
        foreach ($orderedIds as $index => $id) {
            Promotion::where('id', $id)->update(['sort_order' => $index + 1]);
        }
    }
}
