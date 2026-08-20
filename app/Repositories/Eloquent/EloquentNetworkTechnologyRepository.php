<?php

namespace App\Repositories\Eloquent;

use App\Models\NetworkTechnology;
use App\Repositories\Contracts\NetworkTechnologyRepository;
use Illuminate\Support\Collection;

class EloquentNetworkTechnologyRepository implements NetworkTechnologyRepository
{
    public function allActive(): Collection
    {
        return NetworkTechnology::query()->active()->ordered()->get();
    }

    public function all(): Collection
    {
        return NetworkTechnology::query()->ordered()->get();
    }

    public function create(array $data): NetworkTechnology
    {
        return NetworkTechnology::create($data);
    }

    public function update(NetworkTechnology $tech, array $data): NetworkTechnology
    {
        $tech->update($data);

        return $tech;
    }

    public function delete(NetworkTechnology $tech): bool
    {
        return $tech->delete();
    }

    public function reorder(array $orderedIds): void
    {
        foreach ($orderedIds as $index => $id) {
            NetworkTechnology::where('id', $id)->update(['sort_order' => $index + 1]);
        }
    }
}
