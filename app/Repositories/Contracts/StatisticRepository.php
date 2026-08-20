<?php

namespace App\Repositories\Contracts;

use App\Models\Statistic;

interface StatisticRepository
{
    public function allActive(): \Illuminate\Support\Collection;

    public function forHomepage(): \Illuminate\Support\Collection;

    public function forAbout(): \Illuminate\Support\Collection;

    public function all(): \Illuminate\Support\Collection;

    public function create(array $data): Statistic;

    public function update(Statistic $statistic, array $data): Statistic;

    public function delete(Statistic $statistic): bool;

    public function reorder(array $orderedIds): void;
}
