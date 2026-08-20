<?php

namespace App\Repositories\Contracts;

use App\Models\Service;

interface ServiceRepository
{
    public function allActive(): \Illuminate\Support\Collection;

    public function all(): \Illuminate\Support\Collection;

    public function findBySlug(string $slug): ?Service;

    public function create(array $data): Service;

    public function update(Service $service, array $data): Service;

    public function delete(Service $service): bool;

    public function reorder(array $orderedIds): void;
}
