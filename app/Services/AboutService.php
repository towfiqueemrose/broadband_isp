<?php

namespace App\Services;

use App\Repositories\Contracts\CompanyContentRepository;
use App\Repositories\Contracts\CoreValueRepository;
use App\Repositories\Contracts\TeamMemberRepository;
use App\Repositories\Contracts\PageCtaRepository;
class AboutService
{
    public function __construct(
        private readonly CompanyContentRepository $companyContent,
        private readonly CoreValueRepository $coreValues,
        private readonly TeamMemberRepository $teamMembers,
        private readonly PageCtaRepository $ctaRepo,
    ) {}

    /**
     * Assemble every prop needed by the about page.
     *
     * @return array<string, mixed>
     */
    public function data(): array
    {
        return [
            'content' => $this->getAboutContent(),
        ];
    }

    /**
     * Get all about page content, falling back to config for sections not yet in DB.
     *
     * @return array<string, mixed>
     */
    private function getAboutContent(): array
    {
        $config = config('content.about', []);

        $config['mission'] = $this->missionContent();
        $config['vision'] = $this->visionContent();
        $config['coreValues'] = $this->coreValuesContent();
        $config['team'] = $this->teamContent();
        $config['journey'] = $this->journeyContent();

        $cta = $this->ctaRepo->findBySlug('about-final');
        if ($cta) {
            $config['cta'] = [
                'title' => $cta->title,
                'description' => $cta->description,
                'primary' => ['label' => $cta->primary_label, 'route' => $cta->primary_url],
                'secondary' => ['label' => $cta->secondary_label, 'route' => $cta->secondary_url],
            ];
        }

        return $config;
    }

    private function missionContent(): array
    {
        $mission = $this->companyContent->activeMission();

        if (!$mission) {
            return config('content.about.mission', [
                'title' => 'Our Mission',
                'description' => '',
            ]);
        }

        return [
            'title' => $mission->title,
            'description' => $mission->description,
            'image' => $mission->image,
        ];
    }

    private function visionContent(): array
    {
        $vision = $this->companyContent->activeVision();

        if (!$vision) {
            return config('content.about.vision', [
                'title' => 'Our Vision',
                'description' => '',
            ]);
        }

        return [
            'title' => $vision->title,
            'description' => $vision->description,
            'image' => $vision->image,
        ];
    }

    private function coreValuesContent(): array
    {
        $values = $this->coreValues->allActive();

        if ($values->isEmpty()) {
            return config('content.about.coreValues', []);
        }

        return $values->map(fn ($v) => [
            'icon' => $v->icon,
            'title' => $v->title,
            'description' => $v->description,
        ])->all();
    }

    private function teamContent(): array
    {
        $members = $this->teamMembers->leadership();

        if ($members->isEmpty()) {
            return config('content.about.team', []);
        }

        return $members->map(fn ($m) => [
            'name' => $m->name,
            'role' => $m->designation,
            'description' => $m->description,
            'image' => $m->image,
        ])->all();
    }

    private function journeyContent(): array
    {
        $milestones = $this->companyContent->activeJourney();
        $config = config('content.about.journey', []);

        if ($milestones->isEmpty()) {
            return $config;
        }

        return [
            'title' => $config['title'] ?? 'Our growth journey',
            'description' => $config['description'] ?? '',
            'milestones' => $milestones->map(fn ($m) => [
                'year' => $m->year,
                'title' => $m->title,
                'description' => $m->description,
            ])->all(),
        ];
    }
}
