<?php

namespace App\Repositories\Eloquent;

use App\Models\Statistic;
use App\Repositories\Contracts\StatisticRepository;
use Illuminate\Support\Collection;

class EloquentStatisticRepository implements StatisticRepository
{
    public function allActive(): Collection
    {
        return Statistic::query()->active()->ordered()->get();
    }

    public function forHomepage(): Collection
    {
        return Statistic::query()->active()->ordered()->forHomepage()->get();
    }

    public function forAbout(): Collection
    {
        return Statistic::query()->active()->ordered()->forAbout()->get();
    }

    public function all(): Collection
    {
        return Statistic::query()->ordered()->get();
    }

    public function create(array $data): Statistic
    {
        return Statistic::create($data);
    }

    public function update(Statistic $statistic, array $data): Statistic
    {
        $statistic->update($data);

        return $statistic;
    }

    public function delete(Statistic $statistic): bool
    {
        return $statistic->delete();
    }

    public function reorder(array $orderedIds): void
    {
        foreach ($orderedIds as $index => $id) {
            Statistic::where('id', $id)->update(['sort_order' => $index + 1]);
        }
    }
}
