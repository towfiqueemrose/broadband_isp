<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CompanyJourney;
use App\Models\CompanyMission;
use App\Models\CompanyVision;
use App\Repositories\Contracts\CompanyContentRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class CompanyContentController extends Controller
{
    public function __construct(
        private readonly CompanyContentRepository $repo,
    ) {}

    // Mission
    public function missionIndex(): Response
    {
        return Inertia::render('Admin/Company/Mission', [
            'missions' => $this->repo->allMissions(),
        ]);
    }

    public function missionCreate(): Response
    {
        return Inertia::render('Admin/Company/MissionCreate');
    }

    public function missionStore(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,jpg,png,webp|max:5120',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('about/mission', 'public');
        }

        $validated['is_active'] = $validated['is_active'] ?? true;

        $this->repo->createMission($validated);

        return redirect()->route('admin.company.mission.index')
            ->with('success', 'Mission created successfully.');
    }

    public function missionEdit(int $id): Response
    {
        $mission = $this->repo->allMissions()->firstWhere('id', $id) ?? abort(404);

        return Inertia::render('Admin/Company/MissionEdit', [
            'mission' => $mission,
        ]);
    }

    public function missionUpdate(Request $request, int $id): RedirectResponse
    {
        $mission = $this->repo->allMissions()->firstWhere('id', $id) ?? abort(404);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,jpg,png,webp|max:5120',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            if ($mission->image && Storage::disk('public')->exists($mission->image)) {
                Storage::disk('public')->delete($mission->image);
            }
            $validated['image'] = $request->file('image')->store('about/mission', 'public');
        }

        $validated['is_active'] = $validated['is_active'] ?? true;

        $this->repo->updateMission($mission, $validated);

        return redirect()->route('admin.company.mission.index')
            ->with('success', 'Mission updated successfully.');
    }

    public function missionDestroy(int $id): RedirectResponse
    {
        $mission = $this->repo->allMissions()->firstWhere('id', $id) ?? abort(404);

        if ($mission->image && Storage::disk('public')->exists($mission->image)) {
            Storage::disk('public')->delete($mission->image);
        }

        $this->repo->deleteMission($mission);

        return redirect()->route('admin.company.mission.index')
            ->with('success', 'Mission deleted successfully.');
    }

    // Vision
    public function visionIndex(): Response
    {
        return Inertia::render('Admin/Company/Vision', [
            'visions' => $this->repo->allVisions(),
        ]);
    }

    public function visionCreate(): Response
    {
        return Inertia::render('Admin/Company/VisionCreate');
    }

    public function visionStore(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,jpg,png,webp|max:5120',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('about/vision', 'public');
        }

        $validated['is_active'] = $validated['is_active'] ?? true;

        $this->repo->createVision($validated);

        return redirect()->route('admin.company.vision.index')
            ->with('success', 'Vision created successfully.');
    }

    public function visionEdit(int $id): Response
    {
        $vision = $this->repo->allVisions()->firstWhere('id', $id) ?? abort(404);

        return Inertia::render('Admin/Company/VisionEdit', [
            'vision' => $vision,
        ]);
    }

    public function visionUpdate(Request $request, int $id): RedirectResponse
    {
        $vision = $this->repo->allVisions()->firstWhere('id', $id) ?? abort(404);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,jpg,png,webp|max:5120',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            if ($vision->image && Storage::disk('public')->exists($vision->image)) {
                Storage::disk('public')->delete($vision->image);
            }
            $validated['image'] = $request->file('image')->store('about/vision', 'public');
        }

        $validated['is_active'] = $validated['is_active'] ?? true;

        $this->repo->updateVision($vision, $validated);

        return redirect()->route('admin.company.vision.index')
            ->with('success', 'Vision updated successfully.');
    }

    public function visionDestroy(int $id): RedirectResponse
    {
        $vision = $this->repo->allVisions()->firstWhere('id', $id) ?? abort(404);

        if ($vision->image && Storage::disk('public')->exists($vision->image)) {
            Storage::disk('public')->delete($vision->image);
        }

        $this->repo->deleteVision($vision);

        return redirect()->route('admin.company.vision.index')
            ->with('success', 'Vision deleted successfully.');
    }

    // Journey Milestones
    public function journeyIndex(): Response
    {
        return Inertia::render('Admin/Company/Journey', [
            'milestones' => $this->repo->allJourney(),
        ]);
    }

    public function journeyCreate(): Response
    {
        return Inertia::render('Admin/Company/JourneyCreate');
    }

    public function journeyStore(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'year' => 'required|string|max:20',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
            'sort_order' => 'nullable|integer|min:0',
        ]);

        $validated['is_active'] = $validated['is_active'] ?? true;

        $this->repo->createJourney($validated);

        return redirect()->route('admin.company.journey.index')
            ->with('success', 'Milestone created successfully.');
    }

    public function journeyEdit(int $id): Response
    {
        $milestone = $this->repo->allJourney()->firstWhere('id', $id) ?? abort(404);

        return Inertia::render('Admin/Company/JourneyEdit', [
            'milestone' => $milestone,
        ]);
    }

    public function journeyUpdate(Request $request, int $id): RedirectResponse
    {
        $milestone = $this->repo->allJourney()->firstWhere('id', $id) ?? abort(404);

        $validated = $request->validate([
            'year' => 'required|string|max:20',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
            'sort_order' => 'nullable|integer|min:0',
        ]);

        $validated['is_active'] = $validated['is_active'] ?? true;

        $this->repo->updateJourney($milestone, $validated);

        return redirect()->route('admin.company.journey.index')
            ->with('success', 'Milestone updated successfully.');
    }

    public function journeyDestroy(int $id): RedirectResponse
    {
        $milestone = $this->repo->allJourney()->firstWhere('id', $id) ?? abort(404);
        $this->repo->deleteJourney($milestone);

        return redirect()->route('admin.company.journey.index')
            ->with('success', 'Milestone deleted successfully.');
    }

    // About Page Settings (hero, brand story, etc.)
    public function aboutSettings(): Response
    {
        return Inertia::render('Admin/Company/AboutSettings', [
            'aboutHero' => config('content.about.hero', []),
            'brandStory' => config('content.about.brandStory', []),
            'companyIdentity' => config('content.about.companyIdentity', []),
            'infrastructure' => config('content.about.infrastructure', []),
            'valueFlow' => config('content.about.valueFlow', []),
            'commitment' => config('content.about.commitment', []),
        ]);
    }
}
