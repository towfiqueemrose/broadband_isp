<?php

namespace App\Repositories\Eloquent;

use App\Models\TeamMember;
use App\Repositories\Contracts\TeamMemberRepository;
use Illuminate\Support\Collection;

class EloquentTeamMemberRepository implements TeamMemberRepository
{
    public function allActive(): Collection
    {
        return TeamMember::query()->active()->ordered()->get();
    }

    public function all(): Collection
    {
        return TeamMember::query()->ordered()->get();
    }

    public function byType(string $type): Collection
    {
        return TeamMember::query()->active()->byType($type)->ordered()->get();
    }

    public function leadership(): Collection
    {
        return TeamMember::query()->active()->leadership()->ordered()->get();
    }

    public function sales(): Collection
    {
        return TeamMember::query()->active()->sales()->ordered()->get();
    }

    public function general(): Collection
    {
        return TeamMember::query()->active()->general()->ordered()->get();
    }

    public function create(array $data): TeamMember
    {
        return TeamMember::create($data);
    }

    public function update(TeamMember $member, array $data): TeamMember
    {
        $member->update($data);

        return $member;
    }

    public function delete(TeamMember $member): bool
    {
        return $member->delete();
    }

    public function reorder(array $orderedIds): void
    {
        foreach ($orderedIds as $index => $id) {
            TeamMember::where('id', $id)->update(['sort_order' => $index + 1]);
        }
    }
}
