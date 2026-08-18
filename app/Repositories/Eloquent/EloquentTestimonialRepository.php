<?php

namespace App\Repositories\Eloquent;

use App\Models\Testimonial;
use App\Repositories\Contracts\TestimonialRepository;
use Illuminate\Support\Collection;

class EloquentTestimonialRepository implements TestimonialRepository
{
    public function featured(int $limit = 6): Collection
    {
        return Testimonial::query()
            ->active()
            ->ordered()
            ->limit($limit)
            ->get();
    }
}
