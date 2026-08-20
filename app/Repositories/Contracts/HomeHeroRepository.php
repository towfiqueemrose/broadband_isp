<?php

namespace App\Repositories\Contracts;

use App\Models\HomeHero;

interface HomeHeroRepository
{
    public function active(): ?HomeHero;

    public function find(int $id): ?HomeHero;

    public function first(): ?HomeHero;

    public function all(): \Illuminate\Support\Collection;

    public function create(array $data): HomeHero;

    public function update(HomeHero $hero, array $data): HomeHero;

    public function delete(HomeHero $hero): bool;
}
