<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
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

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'designation' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,jpg,png,webp|max:2048',
            'phone' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:255',
            'whatsapp' => 'nullable|string|max:50',
            'social_links' => 'nullable|array',
            'social_links.*' => 'string|max:500',
            'team_type' => 'required|in:leadership,general,sales',
            'is_active' => 'boolean',
            'sort_order' => 'nullable|integer|min:0',
        ]);

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

    public function update(Request $request, int $id): RedirectResponse
    {
        $member = $this->repo->all()->firstWhere('id', $id) ?? abort(404);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'designation' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,jpg,png,webp|max:2048',
            'phone' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:255',
            'whatsapp' => 'nullable|string|max:50',
            'social_links' => 'nullable|array',
            'social_links.*' => 'string|max:500',
            'team_type' => 'required|in:leadership,general,sales',
            'is_active' => 'boolean',
            'sort_order' => 'nullable|integer|min:0',
        ]);

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
