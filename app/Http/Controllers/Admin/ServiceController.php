<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ServiceRequest;
use App\Repositories\Contracts\ServiceRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    public function __construct(
        private readonly ServiceRepository $repo,
    ) {}

    public function index(): Response
    {
        return Inertia::render('Admin/Services/Index', [
            'services' => $this->repo->all(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Services/Create');
    }

    public function store(ServiceRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $validated['slug'] = $validated['slug'] ?? Str::slug($validated['title']);
        $validated['is_active'] = $validated['is_active'] ?? true;

        $this->repo->create($validated);

        return redirect()->route('admin.services.index')
            ->with('success', 'Service created successfully.');
    }

    public function edit(int $id): Response
    {
        $service = $this->repo->all()->firstWhere('id', $id) ?? abort(404);

        return Inertia::render('Admin/Services/Edit', [
            'service' => $service,
        ]);
    }

    public function update(ServiceRequest $request, int $id): RedirectResponse
    {
        $service = $this->repo->all()->firstWhere('id', $id) ?? abort(404);

        $validated = $request->validated();

        $validated['is_active'] = $validated['is_active'] ?? true;

        $this->repo->update($service, $validated);

        return redirect()->route('admin.services.index')
            ->with('success', 'Service updated successfully.');
    }

    public function destroy(int $id): RedirectResponse
    {
        $service = $this->repo->all()->firstWhere('id', $id) ?? abort(404);
        $this->repo->delete($service);

        return redirect()->route('admin.services.index')
            ->with('success', 'Service deleted successfully.');
    }
}
