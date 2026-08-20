<?php

namespace App\Repositories\Eloquent;

use App\Models\WhyChooseUsItem;
use App\Repositories\Contracts\WhyChooseUsRepository;
use Illuminate\Support\Collection;

class EloquentWhyChooseUsRepository implements WhyChooseUsRepository
{
    public function allActive(): Collection
    {
        return WhyChooseUsItem::query()->active()->ordered()->get();
    }

    public function all(): Collection
    {
        return WhyChooseUsItem::query()->ordered()->get();
    }

    public function create(array $data): WhyChooseUsItem
    {
        return WhyChooseUsItem::create($data);
    }

    public function update(WhyChooseUsItem $item, array $data): WhyChooseUsItem
    {
        $item->update($data);

        return $item;
    }

    public function delete(WhyChooseUsItem $item): bool
    {
        return $item->delete();
    }

    public function reorder(array $orderedIds): void
    {
        foreach ($orderedIds as $index => $id) {
            WhyChooseUsItem::where('id', $id)->update(['sort_order' => $index + 1]);
        }
    }
}
