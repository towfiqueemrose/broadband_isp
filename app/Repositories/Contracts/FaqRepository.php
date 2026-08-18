<?php

namespace App\Repositories\Contracts;

use Illuminate\Support\Collection;

interface FaqRepository
{
    public function recent(int $limit = 5): Collection;
}
