<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\TeamMemberRequest;
use App\Repositories\Contracts\TeamMemberRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class TeamMemberController extends Controller
{
    public function __construct(
        private readonly TeamMemberRepository $repo,
    ) {}

    public function index(Request $request): Response
    {
        $type = $request->query('type', 'all');
        $members = $type === 'all' ? $this->repo->all() : $this->repo->byType($type);

        return Inertia::render('Admin/Team/Index', [
            'members' => $members,
            'currentType' => $type,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Team/Create');
    }

    public function store(TeamMemberRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('team', 'public');
        }

        $validated['is_active'] = $validated['is_active'] ?? true;

        $this->repo->create($validated);

        return redirect()->route('admin.team.index')
            ->with('success', 'Team member created successfully.');
    }

    public function edit(int $id): Response
    {
        $member = $this->repo->all()->firstWhere('id', $id) ?? abort(404);

        return Inertia::render('Admin/Team/Edit', [
            'member' => $member,
        ]);
    }

    public function update(TeamMemberRequest $request, int $id): RedirectResponse
    {
        $member = $this->repo->all()->firstWhere('id', $id) ?? abort(404);

        $validated = $request->validated();

        if ($request->hasFile('image')) {
            if ($member->image && Storage::disk('public')->exists($member->image)) {
                Storage::disk('public')->delete($member->image);
            }
            $validated['image'] = $request->file('image')->store('team', 'public');
        }

        $validated['is_active'] = $validated['is_active'] ?? true;

        $this->repo->update($member, $validated);

        return redirect()->route('admin.team.index')
            ->with('success', 'Team member updated successfully.');
    }

    public function destroy(int $id): RedirectResponse
    {
        $member = $this->repo->all()->firstWhere('id', $id) ?? abort(404);

        if ($member->image && Storage::disk('public')->exists($member->image)) {
            Storage::disk('public')->delete($member->image);
        }

        $this->repo->delete($member);

        return redirect()->route('admin.team.index')
            ->with('success', 'Team member deleted successfully.');
    }
}
