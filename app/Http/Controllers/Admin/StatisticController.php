<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Statistic;
use App\Repositories\Contracts\StatisticRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StatisticController extends Controller
{
    public function __construct(
        private readonly StatisticRepository $repo,
    ) {}

    public function index(): Response
    {
        return Inertia::render('Admin/Statistics/Index', [
            'statistics' => $this->repo->all(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Statistics/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'label' => 'required|string|max:255',
            'value' => 'required|numeric',
            'suffix' => 'nullable|string|max:20',
            'decimals' => 'nullable|integer|min:0|max:2',
            'description' => 'nullable|string|max:500',
            'icon' => 'nullable|string|max:100',
            'display_location' => 'required|in:homepage,about,both',
            'is_active' => 'boolean',
            'sort_order' => 'nullable|integer|min:0',
        ]);

        $validated['is_active'] = $validated['is_active'] ?? true;
        $validated['decimals'] = $validated['decimals'] ?? 0;

        $this->repo->create($validated);

        return redirect()->route('admin.statistics.index')
            ->with('success', 'Statistic created successfully.');
    }

    public function edit(int $id): Response
    {
        $statistic = $this->repo->all()->firstWhere('id', $id) ?? abort(404);

        return Inertia::render('Admin/Statistics/Edit', [
            'statistic' => $statistic,
        ]);
    }

    public function update(Request $request, int $id): RedirectResponse
    {
        $statistic = $this->repo->all()->firstWhere('id', $id) ?? abort(404);

        $validated = $request->validate([
            'label' => 'required|string|max:255',
            'value' => 'required|numeric',
            'suffix' => 'nullable|string|max:20',
            'decimals' => 'nullable|integer|min:0|max:2',
            'description' => 'nullable|string|max:500',
            'icon' => 'nullable|string|max:100',
            'display_location' => 'required|in:homepage,about,both',
            'is_active' => 'boolean',
            'sort_order' => 'nullable|integer|min:0',
        ]);

        $validated['is_active'] = $validated['is_active'] ?? true;
        $validated['decimals'] = $validated['decimals'] ?? 0;

        $this->repo->update($statistic, $validated);

        return redirect()->route('admin.statistics.index')
            ->with('success', 'Statistic updated successfully.');
    }

    public function destroy(int $id): RedirectResponse
    {
        $statistic = $this->repo->all()->firstWhere('id', $id) ?? abort(404);
        $this->repo->delete($statistic);

        return redirect()->route('admin.statistics.index')
            ->with('success', 'Statistic deleted successfully.');
    }
}
