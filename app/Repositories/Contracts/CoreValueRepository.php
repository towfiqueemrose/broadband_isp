<?php

namespace App\Repositories\Contracts;

use App\Models\CoreValue;

interface CoreValueRepository
{
    public function allActive(): \Illuminate\Support\Collection;

    public function all(): \Illuminate\Support\Collection;

    public function create(array $data): CoreValue;

    public function update(CoreValue $value, array $data): CoreValue;

    public function delete(CoreValue $value): bool;

    public function reorder(array $orderedIds): void;
}
