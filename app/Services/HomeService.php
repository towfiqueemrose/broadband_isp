<?php

namespace App\Services;

class HomeService
{
    public function __construct(
        private readonly PlanService $plans,
        private readonly TestimonialService $testimonials,
        private readonly CoverageAreaService $coverage,
        private readonly FaqService $faqs,
    ) {
        //
    }

    /**
     * Assemble every prop needed by the homepage.
     *
     * @return array<string, mixed>
     */
    public function data(): array
    {
        return [
            'plans' => $this->plans->featured(3),
            'stats' => $this->stats(),
            'testimonials' => $this->testimonials->featured(3),
            'coverage' => $this->coverage->summary(),
            'faqs' => $this->faqs->forHome(5),
        ];
    }

    /**
     * Trust statistics, with the coverage figure derived from the database.
     *
     * @return array<int, array<string, mixed>>
     */
    private function stats(): array
    {
        $coverage = $this->coverage->summary();

        return array_map(function (array $stat) use ($coverage) {
            if (($stat['key'] ?? null) === 'coverage') {
                $stat['value'] = $coverage['available'];
            }

            return $stat;
        }, config('content.stats', []));
    }
}
