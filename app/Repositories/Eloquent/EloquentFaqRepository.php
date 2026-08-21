<?php

namespace App\Repositories\Eloquent;

use App\Models\Faq;
use App\Repositories\Contracts\FaqRepository;
use Illuminate\Support\Collection;

class EloquentFaqRepository implements FaqRepository
{
    public function recent(int $limit = 5): Collection
    {
        return Faq::query()
            ->active()
            ->ordered()
            ->limit($limit)
            ->get();
    }

    public function forHomepage(int $limit = 5): Collection
    {
        return Faq::query()
            ->active()
            ->forHomepage()
            ->ordered()
            ->limit($limit)
            ->get();
    }

    public function forContact(int $limit = 6): Collection
    {
        return Faq::query()
            ->active()
            ->forContact()
            ->ordered()
            ->limit($limit)
            ->get();
    }

    public function forFaqPage(): Collection
    {
        return Faq::query()
            ->active()
            ->forFaqPage()
            ->ordered()
            ->get();
    }

    public function popular(int $limit = 6): Collection
    {
        return Faq::query()
            ->active()
            ->forFaqPage()
            ->popular()
            ->ordered()
            ->limit($limit)
            ->get();
    }

    public function search(string $query): Collection
    {
        return Faq::query()
            ->active()
            ->forFaqPage()
            ->ordered()
            ->where(function ($q) use ($query) {
                $q->where('question', 'like', "%{$query}%")
                  ->orWhere('answer', 'like', "%{$query}%")
                  ->orWhere('category', 'like', "%{$query}%");
            })
            ->get();
    }

    public function all(): Collection
    {
        return Faq::query()->ordered()->get();
    }

    public function find(int $id): ?Faq
    {
        return Faq::find($id);
    }

    public function create(array $data): Faq
    {
        return Faq::create($data);
    }

    public function update(Faq $faq, array $data): Faq
    {
        $faq->update($data);

        return $faq;
    }

    public function delete(Faq $faq): bool
    {
        return $faq->delete();
    }

    public function reorder(array $orderedIds): void
    {
        foreach ($orderedIds as $index => $id) {
            Faq::where('id', $id)->update(['sort_order' => $index + 1]);
        }
    }
}
