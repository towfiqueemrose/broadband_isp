<?php

namespace App\Repositories\Contracts;

use Illuminate\Support\Collection;

interface FaqRepository
{
    public function recent(int $limit = 5): Collection;

    public function forHomepage(int $limit = 5): Collection;

    public function forContact(int $limit = 6): Collection;

    public function forFaqPage(): Collection;

    public function popular(int $limit = 6): Collection;

    public function search(string $query): Collection;

    public function all(): Collection;

    public function find(int $id): ?\App\Models\Faq;

    public function create(array $data): \App\Models\Faq;

    public function update(\App\Models\Faq $faq, array $data): \App\Models\Faq;

    public function delete(\App\Models\Faq $faq): bool;

    public function reorder(array $orderedIds): void;
}
