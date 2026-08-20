<?php

namespace App\Repositories\Eloquent;

use App\Models\CompanyJourney;
use App\Models\CompanyMission;
use App\Models\CompanyVision;
use App\Repositories\Contracts\CompanyContentRepository;
use Illuminate\Support\Collection;

class EloquentCompanyContentRepository implements CompanyContentRepository
{
    // Mission
    public function activeMission(): ?CompanyMission
    {
        return CompanyMission::active();
    }

    public function allMissions(): Collection
    {
        return CompanyMission::all();
    }

    public function createMission(array $data): CompanyMission
    {
        return CompanyMission::create($data);
    }

    public function updateMission(CompanyMission $mission, array $data): CompanyMission
    {
        $mission->update($data);

        return $mission;
    }

    public function deleteMission(CompanyMission $mission): bool
    {
        return $mission->delete();
    }

    // Vision
    public function activeVision(): ?CompanyVision
    {
        return CompanyVision::active();
    }

    public function allVisions(): Collection
    {
        return CompanyVision::all();
    }

    public function createVision(array $data): CompanyVision
    {
        return CompanyVision::create($data);
    }

    public function updateVision(CompanyVision $vision, array $data): CompanyVision
    {
        $vision->update($data);

        return $vision;
    }

    public function deleteVision(CompanyVision $vision): bool
    {
        return $vision->delete();
    }

    // Journey
    public function activeJourney(): Collection
    {
        return CompanyJourney::query()->active()->ordered()->get();
    }

    public function allJourney(): Collection
    {
        return CompanyJourney::query()->ordered()->get();
    }

    public function createJourney(array $data): CompanyJourney
    {
        return CompanyJourney::create($data);
    }

    public function updateJourney(CompanyJourney $milestone, array $data): CompanyJourney
    {
        $milestone->update($data);

        return $milestone;
    }

    public function deleteJourney(CompanyJourney $milestone): bool
    {
        return $milestone->delete();
    }

    public function reorderJourney(array $orderedIds): void
    {
        foreach ($orderedIds as $index => $id) {
            CompanyJourney::where('id', $id)->update(['sort_order' => $index + 1]);
        }
    }
}
