<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\Contracts\CoreValueRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CoreValueController extends Controller
{
    public function __construct(
        private readonly CoreValueRepository $repo,
    ) {}

    public function index(): Response
    {
        return Inertia::render('Admin/CoreValues/Index', [
            'values' => $this->repo->all(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/CoreValues/Create');
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

        return redirect()->route('admin.core-values.index')
            ->with('success', 'Core value created successfully.');
    }

    public function edit(int $id): Response
    {
        $value = $this->repo->all()->firstWhere('id', $id) ?? abort(404);

        return Inertia::render('Admin/CoreValues/Edit', [
            'value' => $value,
        ]);
    }

    public function update(Request $request, int $id): RedirectResponse
    {
        $value = $this->repo->all()->firstWhere('id', $id) ?? abort(404);

        $validated = $request->validate([
            'icon' => 'nullable|string|max:100',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
            'sort_order' => 'nullable|integer|min:0',
        ]);

        $validated['is_active'] = $validated['is_active'] ?? true;

        $this->repo->update($value, $validated);

        return redirect()->route('admin.core-values.index')
            ->with('success', 'Core value updated successfully.');
    }

    public function destroy(int $id): RedirectResponse
    {
        $value = $this->repo->all()->firstWhere('id', $id) ?? abort(404);
        $this->repo->delete($value);

        return redirect()->route('admin.core-values.index')
            ->with('success', 'Core value deleted successfully.');
    }
}
