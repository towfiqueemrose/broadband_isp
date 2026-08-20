<?php

namespace App\Services;

use App\Http\Resources\FaqResource;
use App\Repositories\Contracts\FaqRepository;

class FaqService
{
    public function __construct(private readonly FaqRepository $faqs)
    {
        //
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function forHome(int $limit = 5): array
    {
        return $this->recent($limit);
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function recent(int $limit = 6): array
    {
        return FaqResource::collection($this->faqs->recent($limit))->resolve();
    }
}
