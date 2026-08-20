<?php

namespace App\Repositories\Eloquent;

use App\Models\Service;
use App\Repositories\Contracts\ServiceRepository;
use Illuminate\Support\Collection;

class EloquentServiceRepository implements ServiceRepository
{
    public function allActive(): Collection
    {
        return Service::query()->active()->ordered()->get();
    }

    public function all(): Collection
    {
        return Service::query()->ordered()->get();
    }

    public function findBySlug(string $slug): ?Service
    {
        return Service::query()->where('slug', $slug)->first();
    }

    public function create(array $data): Service
    {
        return Service::create($data);
    }

    public function update(Service $service, array $data): Service
    {
        $service->update($data);

        return $service;
    }

    public function delete(Service $service): bool
    {
        return $service->delete();
    }

    public function reorder(array $orderedIds): void
    {
        foreach ($orderedIds as $index => $id) {
            Service::where('id', $id)->update(['sort_order' => $index + 1]);
        }
    }
}
