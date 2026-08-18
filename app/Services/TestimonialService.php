<?php

namespace App\Services;

use App\Http\Resources\TestimonialResource;
use App\Repositories\Contracts\TestimonialRepository;

class TestimonialService
{
    public function __construct(private readonly TestimonialRepository $testimonials)
    {
        //
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function featured(int $limit = 6): array
    {
        return TestimonialResource::collection($this->testimonials->featured($limit))->resolve();
    }
}
