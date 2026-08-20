<?php

namespace App\Repositories\Contracts;

use App\Models\TeamMember;

interface TeamMemberRepository
{
    public function allActive(): \Illuminate\Support\Collection;

    public function all(): \Illuminate\Support\Collection;

    public function byType(string $type): \Illuminate\Support\Collection;

    public function leadership(): \Illuminate\Support\Collection;

    public function sales(): \Illuminate\Support\Collection;

    public function general(): \Illuminate\Support\Collection;

    public function create(array $data): TeamMember;

    public function update(TeamMember $member, array $data): TeamMember;

    public function delete(TeamMember $member): bool;

    public function reorder(array $orderedIds): void;
}
