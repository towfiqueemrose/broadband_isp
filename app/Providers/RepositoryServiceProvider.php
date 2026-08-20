<?php

namespace App\Providers;

use App\Repositories\Contracts\CompanyContentRepository;
use App\Repositories\Contracts\ContactInquiryRepository;
use App\Repositories\Contracts\CoreValueRepository;
use App\Repositories\Contracts\CoverageAreaRepository;
use App\Repositories\Contracts\FaqRepository;
use App\Repositories\Contracts\HomeHeroRepository;
use App\Repositories\Contracts\NetworkTechnologyRepository;
use App\Repositories\Contracts\OfficeLocationRepository;
use App\Repositories\Contracts\PageCtaRepository;
use App\Repositories\Contracts\PlanRepository;
use App\Repositories\Contracts\PromotionRepository;
use App\Repositories\Contracts\ServiceRepository;
use App\Repositories\Contracts\StatisticRepository;
use App\Repositories\Contracts\TeamMemberRepository;
use App\Repositories\Contracts\TestimonialRepository;
use App\Repositories\Contracts\WhyChooseUsRepository;
use App\Repositories\Eloquent\EloquentCompanyContentRepository;
use App\Repositories\Eloquent\EloquentContactInquiryRepository;
use App\Repositories\Eloquent\EloquentCoreValueRepository;
use App\Repositories\Eloquent\EloquentCoverageAreaRepository;
use App\Repositories\Eloquent\EloquentFaqRepository;
use App\Repositories\Eloquent\EloquentHomeHeroRepository;
use App\Repositories\Eloquent\EloquentNetworkTechnologyRepository;
use App\Repositories\Eloquent\EloquentOfficeLocationRepository;
use App\Repositories\Eloquent\EloquentPageCtaRepository;
use App\Repositories\Eloquent\EloquentPlanRepository;
use App\Repositories\Eloquent\EloquentPromotionRepository;
use App\Repositories\Eloquent\EloquentServiceRepository;
use App\Repositories\Eloquent\EloquentStatisticRepository;
use App\Repositories\Eloquent\EloquentTeamMemberRepository;
use App\Repositories\Eloquent\EloquentTestimonialRepository;
use App\Repositories\Eloquent\EloquentWhyChooseUsRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Bind repository contracts to their Eloquent implementations.
     */
    public function register(): void
    {
        $this->app->bind(PlanRepository::class, EloquentPlanRepository::class);
        $this->app->bind(TestimonialRepository::class, EloquentTestimonialRepository::class);
        $this->app->bind(CoverageAreaRepository::class, EloquentCoverageAreaRepository::class);
        $this->app->bind(FaqRepository::class, EloquentFaqRepository::class);
        $this->app->bind(ContactInquiryRepository::class, EloquentContactInquiryRepository::class);
        $this->app->bind(HomeHeroRepository::class, EloquentHomeHeroRepository::class);
        $this->app->bind(StatisticRepository::class, EloquentStatisticRepository::class);
        $this->app->bind(WhyChooseUsRepository::class, EloquentWhyChooseUsRepository::class);
        $this->app->bind(ServiceRepository::class, EloquentServiceRepository::class);
        $this->app->bind(PromotionRepository::class, EloquentPromotionRepository::class);
        $this->app->bind(NetworkTechnologyRepository::class, EloquentNetworkTechnologyRepository::class);
        $this->app->bind(PageCtaRepository::class, EloquentPageCtaRepository::class);
        $this->app->bind(CoreValueRepository::class, EloquentCoreValueRepository::class);
        $this->app->bind(TeamMemberRepository::class, EloquentTeamMemberRepository::class);
        $this->app->bind(OfficeLocationRepository::class, EloquentOfficeLocationRepository::class);
        $this->app->bind(CompanyContentRepository::class, EloquentCompanyContentRepository::class);
    }
}
