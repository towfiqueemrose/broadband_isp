<?php

namespace App\Repositories\Contracts;

use App\Models\OfficeLocation;

interface OfficeLocationRepository
{
    public function active(): ?OfficeLocation;

    public function all(): \Illuminate\Support\Collection;

    public function create(array $data): OfficeLocation;

    public function update(OfficeLocation $location, array $data): OfficeLocation;

    public function delete(OfficeLocation $location): bool;
}
