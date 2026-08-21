<?php

namespace App\Repositories\Contracts;

use Illuminate\Support\Collection;

interface PageRepository
{
    public function all(): Collection;

    public function find(int $id): ?\App\Models\Page;

    public function findBySlug(string $slug): ?\App\Models\Page;

    public function findActiveBySlug(string $slug): ?\App\Models\Page;

    public function create(array $data): \App\Models\Page;

    public function update(\App\Models\Page $page, array $data): \App\Models\Page;

    public function delete(\App\Models\Page $page): bool;
}
