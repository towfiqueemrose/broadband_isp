<?php

namespace App\Services;

use App\Http\Resources\FaqResource;
use App\Repositories\Contracts\FaqRepository;

class FaqService
{
    public function __construct(private readonly FaqRepository $faqs) {}

    /**
     * @return array<int, array<string, mixed>>
     */
    public function forHome(int $limit = 5): array
    {
        return FaqResource::collection($this->faqs->forHomepage($limit))->resolve();
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function forContact(int $limit = 6): array
    {
        return FaqResource::collection($this->faqs->forContact($limit))->resolve();
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function recent(int $limit = 6): array
    {
        return FaqResource::collection($this->faqs->recent($limit))->resolve();
    }

    /**
     * Data for the dedicated /faq page.
     */
    public function faqPageData(): array
    {
        $allFaqs = FaqResource::collection($this->faqs->forFaqPage())->resolve();
        $popular = FaqResource::collection($this->faqs->popular(6))->resolve();

        $categories = collect($allFaqs)
            ->pluck('category')
            ->filter()
            ->unique()
            ->values()
            ->all();

        return [
            'faqs' => $allFaqs,
            'popular' => $popular,
            'categories' => $categories,
        ];
    }

    /**
     * Search FAQs for the dedicated FAQ page.
     */
    public function search(string $query): array
    {
        return FaqResource::collection($this->faqs->search($query))->resolve();
    }
}
