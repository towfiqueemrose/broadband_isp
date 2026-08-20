<?php

namespace App\Repositories\Eloquent;

use App\Models\HomeHero;
use App\Repositories\Contracts\HomeHeroRepository;
use Illuminate\Support\Collection;

class EloquentHomeHeroRepository implements HomeHeroRepository
{
    public function active(): ?HomeHero
    {
        return HomeHero::active();
    }

    public function find(int $id): ?HomeHero
    {
        return HomeHero::find($id);
    }

    public function first(): ?HomeHero
    {
        return HomeHero::first();
    }

    public function all(): Collection
    {
        return HomeHero::all();
    }

    public function create(array $data): HomeHero
    {
        return HomeHero::create($data);
    }

    public function update(HomeHero $hero, array $data): HomeHero
    {
        $hero->update($data);

        return $hero;
    }

    public function delete(HomeHero $hero): bool
    {
        return $hero->delete();
    }
}
