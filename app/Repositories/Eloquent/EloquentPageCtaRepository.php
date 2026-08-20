<?php

namespace App\Repositories\Eloquent;

use App\Models\PageCta;
use App\Repositories\Contracts\PageCtaRepository;
use Illuminate\Support\Collection;

class EloquentPageCtaRepository implements PageCtaRepository
{
    public function findBySlug(string $slug): ?PageCta
    {
        return PageCta::findBySlug($slug);
    }

    public function all(): Collection
    {
        return PageCta::all();
    }

    public function create(array $data): PageCta
    {
        return PageCta::create($data);
    }

    public function update(PageCta $cta, array $data): PageCta
    {
        $cta->update($data);

        return $cta;
    }

    public function delete(PageCta $cta): bool
    {
        return $cta->delete();
    }
}
