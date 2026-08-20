<?php

namespace App\Repositories\Eloquent;

use App\Models\CoreValue;
use App\Repositories\Contracts\CoreValueRepository;
use Illuminate\Support\Collection;

class EloquentCoreValueRepository implements CoreValueRepository
{
    public function allActive(): Collection
    {
        return CoreValue::query()->active()->ordered()->get();
    }

    public function all(): Collection
    {
        return CoreValue::query()->ordered()->get();
    }

    public function create(array $data): CoreValue
    {
        return CoreValue::create($data);
    }

    public function update(CoreValue $value, array $data): CoreValue
    {
        $value->update($data);

        return $value;
    }

    public function delete(CoreValue $value): bool
    {
        return $value->delete();
    }

    public function reorder(array $orderedIds): void
    {
        foreach ($orderedIds as $index => $id) {
            CoreValue::where('id', $id)->update(['sort_order' => $index + 1]);
        }
    }
}
