<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PlanCategoryRequest;
use App\Repositories\Contracts\PlanCategoryRepository;
use App\Repositories\Contracts\PlanRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class PlanCategoryController extends Controller
{
    public function __construct(
        private readonly PlanCategoryRepository $repo,
        private readonly PlanRepository $plans,
    ) {}

    public function index(): Response
    {
        return Inertia::render('Admin/PlanCategories/Index', [
            'categories' => $this->repo->all(),
            'usageCounts' => $this->plans->countByType(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/PlanCategories/Create');
    }

    public function store(PlanCategoryRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $validated['is_active'] = $validated['is_active'] ?? true;
        $validated['icon'] = $validated['icon'] ?: 'layers';

        $this->repo->create($validated);

        return redirect()->route('admin.plan-categories.index')
            ->with('success', 'Category created successfully.');
    }

    public function edit(int $id): Response
    {
        $category = $this->repo->find($id) ?? abort(404);

        return Inertia::render('Admin/PlanCategories/Edit', [
            'category' => $category,
            'planCount' => $this->plans->countByType()->get($category->slug, 0),
        ]);
    }

    public function update(PlanCategoryRequest $request, int $id): RedirectResponse
    {
        $category = $this->repo->find($id) ?? abort(404);

        $validated = $request->validated();

        // The slug is the value plans reference via their `type` column, so it
        // is locked after creation to keep existing plans intact.
        unset($validated['slug']);

        $validated['is_active'] = $validated['is_active'] ?? true;
        $validated['icon'] = $validated['icon'] ?: 'layers';

        $this->repo->update($category, $validated);

        return redirect()->route('admin.plan-categories.index')
            ->with('success', 'Category updated successfully.');
    }

    public function destroy(int $id): RedirectResponse
    {
        $category = $this->repo->find($id) ?? abort(404);

        $planCount = (int) $this->plans->countByType()->get($category->slug, 0);

        if ($planCount > 0) {
            return redirect()->route('admin.plan-categories.index')
                ->with('error', "Cannot delete \"{$category->name}\" — {$planCount} "
                    .Str::plural('plan', $planCount).' use this category. Reassign them first.');
        }

        $this->repo->delete($category);

        return redirect()->route('admin.plan-categories.index')
            ->with('success', 'Category deleted successfully.');
    }
}
