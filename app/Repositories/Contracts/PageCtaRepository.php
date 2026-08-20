<?php

namespace App\Repositories\Contracts;

use App\Models\PageCta;

interface PageCtaRepository
{
    public function findBySlug(string $slug): ?PageCta;

    public function all(): \Illuminate\Support\Collection;

    public function create(array $data): PageCta;

    public function update(PageCta $cta, array $data): PageCta;

    public function delete(PageCta $cta): bool;
}
