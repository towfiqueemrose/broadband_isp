<?php

namespace App\Repositories\Contracts;

use App\Models\WhyChooseUsItem;

interface WhyChooseUsRepository
{
    public function allActive(): \Illuminate\Support\Collection;

    public function all(): \Illuminate\Support\Collection;

    public function create(array $data): WhyChooseUsItem;

    public function update(WhyChooseUsItem $item, array $data): WhyChooseUsItem;

    public function delete(WhyChooseUsItem $item): bool;

    public function reorder(array $orderedIds): void;
}
