<?php

namespace App\Repositories\Contracts;

use Illuminate\Support\Collection;

interface TestimonialRepository
{
    public function featured(int $limit = 6): Collection;
}
