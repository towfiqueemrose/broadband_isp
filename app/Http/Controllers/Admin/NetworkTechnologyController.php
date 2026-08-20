<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\Contracts\NetworkTechnologyRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class NetworkTechnologyController extends Controller
{
    public function __construct(
        private readonly NetworkTechnologyRepository $repo,
    ) {}

    public function index(): Response
    {
        return Inertia::render('Admin/NetworkTech/Index', [
            'items' => $this->repo->all(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/NetworkTech/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'icon' => 'nullable|string|max:100',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
            'sort_order' => 'nullable|integer|min:0',
        ]);

        $validated['is_active'] = $validated['is_active'] ?? true;

        $this->repo->create($validated);

        return redirect()->route('admin.network-tech.index')
            ->with('success', 'Network technology item created successfully.');
    }

    public function edit(int $id): Response
    {
        $item = $this->repo->all()->firstWhere('id', $id) ?? abort(404);

        return Inertia::render('Admin/NetworkTech/Edit', [
            'item' => $item,
        ]);
    }

    public function update(Request $request, int $id): RedirectResponse
    {
        $item = $this->repo->all()->firstWhere('id', $id) ?? abort(404);

        $validated = $request->validate([
            'icon' => 'nullable|string|max:100',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
            'sort_order' => 'nullable|integer|min:0',
        ]);

        $validated['is_active'] = $validated['is_active'] ?? true;

        $this->repo->update($item, $validated);

        return redirect()->route('admin.network-tech.index')
            ->with('success', 'Network technology item updated successfully.');
    }

    public function destroy(int $id): RedirectResponse
    {
        $item = $this->repo->all()->firstWhere('id', $id) ?? abort(404);
        $this->repo->delete($item);

        return redirect()->route('admin.network-tech.index')
            ->with('success', 'Network technology item deleted successfully.');
    }
}
