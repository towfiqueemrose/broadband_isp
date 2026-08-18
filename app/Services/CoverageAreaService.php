<?php

namespace App\Services;

use App\Http\Resources\CoverageAreaResource;
use App\Repositories\Contracts\CoverageAreaRepository;

class CoverageAreaService
{
    public function __construct(private readonly CoverageAreaRepository $areas)
    {
        //
    }

    /**
     * @return array<string, mixed>
     */
    public function summary(int $featuredLimit = 6): array
    {
        return [
            'total' => $this->areas->countActive(),
            'available' => $this->areas->countAvailable(),
            'comingSoon' => $this->areas->countComingSoon(),
            'areas' => CoverageAreaResource::collection($this->areas->featured($featuredLimit))->resolve(),
        ];
    }
}
