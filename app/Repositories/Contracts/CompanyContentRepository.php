<?php

namespace App\Repositories\Contracts;

use App\Models\CompanyJourney;
use App\Models\CompanyMission;
use App\Models\CompanyVision;

interface CompanyContentRepository
{
    // Mission
    public function activeMission(): ?CompanyMission;

    public function allMissions(): \Illuminate\Support\Collection;

    public function createMission(array $data): CompanyMission;

    public function updateMission(CompanyMission $mission, array $data): CompanyMission;

    public function deleteMission(CompanyMission $mission): bool;

    // Vision
    public function activeVision(): ?CompanyVision;

    public function allVisions(): \Illuminate\Support\Collection;

    public function createVision(array $data): CompanyVision;

    public function updateVision(CompanyVision $vision, array $data): CompanyVision;

    public function deleteVision(CompanyVision $vision): bool;

    // Journey
    public function activeJourney(): \Illuminate\Support\Collection;

    public function allJourney(): \Illuminate\Support\Collection;

    public function createJourney(array $data): CompanyJourney;

    public function updateJourney(CompanyJourney $milestone, array $data): CompanyJourney;

    public function deleteJourney(CompanyJourney $milestone): bool;

    public function reorderJourney(array $orderedIds): void;
}
