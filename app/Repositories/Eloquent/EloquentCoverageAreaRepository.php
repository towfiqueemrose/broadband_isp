<?php

namespace App\Repositories\Eloquent;

use App\Models\CoverageArea;
use App\Repositories\Contracts\CoverageAreaRepository;
use Illuminate\Support\Collection;

class EloquentCoverageAreaRepository implements CoverageAreaRepository
{
    public function featured(int $limit = 6): Collection
    {
        return CoverageArea::query()
            ->active()
            ->ordered()
            ->limit($limit)
            ->get();
    }

    public function countActive(): int
    {
        return CoverageArea::query()->active()->count();
    }

    public function countAvailable(): int
    {
        return CoverageArea::query()->active()->available()->count();
    }

    public function countComingSoon(): int
    {
        return CoverageArea::query()->active()->comingSoon()->count();
    }
}
