<?php

namespace App\Repositories\Eloquent;

use App\Models\OfficeLocation;
use App\Repositories\Contracts\OfficeLocationRepository;
use Illuminate\Support\Collection;

class EloquentOfficeLocationRepository implements OfficeLocationRepository
{
    public function active(): ?OfficeLocation
    {
        return OfficeLocation::active();
    }

    public function all(): Collection
    {
        return OfficeLocation::all();
    }

    public function create(array $data): OfficeLocation
    {
        return OfficeLocation::create($data);
    }

    public function update(OfficeLocation $location, array $data): OfficeLocation
    {
        $location->update($data);

        return $location;
    }

    public function delete(OfficeLocation $location): bool
    {
        return $location->delete();
    }
}
