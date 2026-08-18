<?php

namespace App\Repositories\Contracts;

use Illuminate\Support\Collection;

interface CoverageAreaRepository
{
    public function featured(int $limit = 6): Collection;

    public function countActive(): int;

    public function countAvailable(): int;

    public function countComingSoon(): int;
}
