<?php

namespace App\Repositories\Eloquent;

use App\Models\Page;
use App\Repositories\Contracts\PageRepository;
use Illuminate\Support\Collection;

class EloquentPageRepository implements PageRepository
{
    public function all(): Collection
    {
        return Page::query()->orderByDesc('updated_at')->get();
    }

    public function find(int $id): ?Page
    {
        return Page::find($id);
    }

    public function findBySlug(string $slug): ?Page
    {
        return Page::query()->bySlug($slug)->first();
    }

    public function findActiveBySlug(string $slug): ?Page
    {
        return Page::query()->active()->bySlug($slug)->first();
    }

    public function create(array $data): Page
    {
        return Page::create($data);
    }

    public function update(Page $page, array $data): Page
    {
        $page->update($data);

        return $page;
    }

    public function delete(Page $page): bool
    {
        return $page->delete();
    }
}
