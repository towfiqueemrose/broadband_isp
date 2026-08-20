<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\OfficeLocationRequest;
use App\Repositories\Contracts\OfficeLocationRepository;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class OfficeLocationController extends Controller
{
    public function __construct(
        private readonly OfficeLocationRepository $repo,
    ) {}

    public function index(): Response
    {
        return Inertia::render('Admin/Locations/Index', [
            'locations' => $this->repo->all(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Locations/Create');
    }

    public function store(OfficeLocationRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $validated['is_active'] = $validated['is_active'] ?? true;

        $this->repo->create($validated);

        return redirect()->route('admin.locations.index')
            ->with('success', 'Location created successfully.');
    }

    public function edit(int $id): Response
    {
        $location = $this->repo->all()->firstWhere('id', $id) ?? abort(404);

        return Inertia::render('Admin/Locations/Edit', [
            'location' => $location,
        ]);
    }

    public function update(OfficeLocationRequest $request, int $id): RedirectResponse
    {
        $location = $this->repo->all()->firstWhere('id', $id) ?? abort(404);

        $validated = $request->validated();

        $validated['is_active'] = $validated['is_active'] ?? true;

        $this->repo->update($location, $validated);

        return redirect()->route('admin.locations.index')
            ->with('success', 'Location updated successfully.');
    }

    public function destroy(int $id): RedirectResponse
    {
        $location = $this->repo->all()->firstWhere('id', $id) ?? abort(404);
        $this->repo->delete($location);

        return redirect()->route('admin.locations.index')
            ->with('success', 'Location deleted successfully.');
    }
}
