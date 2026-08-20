<?php

namespace App\Repositories\Contracts;

use App\Models\NetworkTechnology;

interface NetworkTechnologyRepository
{
    public function allActive(): \Illuminate\Support\Collection;

    public function all(): \Illuminate\Support\Collection;

    public function create(array $data): NetworkTechnology;

    public function update(NetworkTechnology $tech, array $data): NetworkTechnology;

    public function delete(NetworkTechnology $tech): bool;

    public function reorder(array $orderedIds): void;
}
