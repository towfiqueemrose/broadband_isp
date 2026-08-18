<?php

namespace App\Repositories\Eloquent;

use App\Models\Faq;
use App\Repositories\Contracts\FaqRepository;
use Illuminate\Support\Collection;

class EloquentFaqRepository implements FaqRepository
{
    public function recent(int $limit = 5): Collection
    {
        return Faq::query()
            ->active()
            ->ordered()
            ->limit($limit)
            ->get();
    }
}
