<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CoreValueRequest;
use App\Repositories\Contracts\CoreValueRepository;
use Illuminate\Http\RedirectResponse;
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

    public function store(CoreValueRequest $request): RedirectResponse
    {
        $validated = $request->validated();

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

    public function update(CoreValueRequest $request, int $id): RedirectResponse
    {
        $value = $this->repo->all()->firstWhere('id', $id) ?? abort(404);

        $validated = $request->validated();

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
