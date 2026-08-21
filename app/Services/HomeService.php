<?php

namespace App\Services;

use App\Repositories\Contracts\HomeHeroRepository;
use App\Repositories\Contracts\WhyChooseUsRepository;
use App\Repositories\Contracts\ServiceRepository;
use App\Repositories\Contracts\PromotionRepository;
use App\Repositories\Contracts\PageCtaRepository;

class HomeService
{
    public function __construct(
        private readonly PlanService $plans,
        private readonly TestimonialService $testimonials,
        private readonly FaqService $faqs,
        private readonly HomeHeroRepository $heroRepo,
        private readonly WhyChooseUsRepository $whyRepo,
        private readonly ServiceRepository $serviceRepo,
        private readonly PromotionRepository $promoRepo,
        private readonly PageCtaRepository $ctaRepo,
    ) {}

    /**
     * Assemble every prop needed by the homepage.
     *
     * @return array<string, mixed>
     */
    public function data(): array
    {
        return [
            'hero' => $this->hero(),
            'plans' => $this->plans->featured(3),
            'whyChooseUs' => $this->whyChooseUs(),
            'services' => $this->services(),
            'promotion' => $this->promotion(),
            'testimonials' => $this->testimonials->featured(3),
            'faqs' => $this->faqs->forHome(5),
            'finalCta' => $this->ctaRepo->findBySlug('homepage-final'),
        ];
    }

    public function hero(): ?array
    {
        $hero = $this->heroRepo->active();

        if (!$hero) {
            return null;
        }

        return [
            'eyebrowText' => $hero->eyebrow_text,
            'mainHeading' => $hero->main_heading,
            'highlightedText' => $hero->highlighted_text,
            'description' => $hero->description,
            'primaryCtaLabel' => $hero->primary_cta_label,
            'primaryCtaUrl' => $hero->primary_cta_url,
            'secondaryCtaLabel' => $hero->secondary_cta_label,
            'secondaryCtaUrl' => $hero->secondary_cta_url,
            'heroImage' => $hero->hero_image,
            'heroImageOpacity' => $hero->image_opacity ?? 40,
            'eyebrowTextColor' => $hero->eyebrow_text_color,
            'mainHeadingTextColor' => $hero->main_heading_text_color,
            'highlightedTextColor' => $hero->highlighted_text_color,
            'descriptionTextColor' => $hero->description_text_color,
            'trustChipsColor' => $hero->trust_chips_color,
        ];
    }

    public function whyChooseUs(): array
    {
        $items = $this->whyRepo->allActive();

        if ($items->isEmpty()) {
            return config('content.whyChooseUs', []);
        }

        return $items->map(fn ($item) => [
            'icon' => $item->icon,
            'title' => $item->title,
            'description' => $item->description,
        ])->all();
    }

    public function services(): array
    {
        $services = $this->serviceRepo->allActive();

        if ($services->isEmpty()) {
            return config('content.services', []);
        }

        return $services->map(fn ($s) => [
            'icon' => $s->icon,
            'title' => $s->title,
            'description' => $s->description,
            'linkUrl' => $s->link_url,
        ])->all();
    }

    public function promotion(): ?array
    {
        $promo = $this->promoRepo->activeFor('homepage')->first();

        if (!$promo) {
            return null;
        }

        return [
            'eyebrow' => $promo->eyebrow,
            'title' => $promo->title,
            'description' => $promo->description,
            'details' => $promo->details ?? [],
            'cta' => [
                'label' => $promo->cta_label,
                'url' => $promo->cta_url,
            ],
        ];
    }

}
