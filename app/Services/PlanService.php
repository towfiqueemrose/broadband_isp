<?php

namespace App\Services;

use App\Http\Resources\PlanResource;
use App\Models\Plan;
use App\Repositories\Contracts\PlanRepository;

class PlanService
{
    public function __construct(private readonly PlanRepository $plans)
    {
        //
    }

    /**
     * Featured plans shown on the homepage.
     *
     * @return array<int, array<string, mixed>>
     */
    public function featured(int $limit = 3): array
    {
        return PlanResource::collection($this->plans->featuredPlans($limit))->resolve();
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function all(): array
    {
        return PlanResource::collection($this->plans->allActive())->resolve();
    }

    /**
     * Plans belonging to a single category.
     *
     * @return array<int, array<string, mixed>>
     */
    public function byType(string $type): array
    {
        return PlanResource::collection($this->plans->byType($type))->resolve();
    }

    /**
     * Package categories present in the catalogue, enriched with config labels.
     *
     * @return array<int, array<string, mixed>>
     */
    public function categories(): array
    {
        $labels = config('content.packages.categories', []);

        return $this->plans->categories()
            ->map(fn (string $type): array => [
                'type' => $type,
                'label' => $labels[$type]['label'] ?? ucfirst($type),
                'description' => $labels[$type]['description'] ?? null,
                'icon' => $labels[$type]['icon'] ?? 'layers',
            ])
            ->values()
            ->all();
    }

    /**
     * Plans ready for side-by-side comparison.
     *
     * @return array<int, array<string, mixed>>
     */
    public function comparison(): array
    {
        return PlanResource::collection($this->plans->comparisonData())->resolve();
    }

    /**
     * Everything the packages page needs, grouped by category.
     *
     * @return array<string, mixed>
     */
    public function forPackagesPage(): array
    {
        $byCategory = [];

        $categories = array_map(function (array $category) use (&$byCategory): array {
            $plans = $this->byType($category['type']);
            $byCategory[$category['type']] = $plans;
            $category['count'] = count($plans);

            return $category;
        }, $this->categories());

        return [
            'categories' => $categories,
            'byCategory' => $byCategory,
            'plans' => $this->all(),
            'comparison' => $this->comparison(),
            'content' => [
                'hero' => config('content.packages.hero', []),
                'comparison' => config('content.packages.comparison', []),
                'recommendations' => config('content.packages.recommendations', []),
            ],
        ];
    }

    public function findBySlug(string $slug): ?Plan
    {
        return $this->plans->findBySlug($slug);
    }
}
