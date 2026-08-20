<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PlanRequest;
use App\Repositories\Contracts\PlanRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PlanController extends Controller
{
    public function __construct(
        private readonly PlanRepository $repo,
    ) {}

    public function index(Request $request): Response
    {
        $type = $request->query('type', 'all');
        $plans = $type === 'all' ? $this->repo->all() : $this->repo->byType($type);

        return Inertia::render('Admin/Plans/Index', [
            'plans' => $plans,
            'currentType' => $type,
            'categories' => config('content.packages.categories', []),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Plans/Create', [
            'categories' => config('content.packages.categories', []),
        ]);
    }

    public function store(PlanRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $validated['upload_mbps'] = $validated['upload_mbps'] ?? $validated['download_mbps'];
        $validated['is_active'] = $validated['is_active'] ?? true;

        $this->repo->create($validated);

        return redirect()->route('admin.plans.index')
            ->with('success', 'Plan created successfully.');
    }

    public function edit(int $id): Response
    {
        $plan = $this->repo->find($id) ?? abort(404);

        return Inertia::render('Admin/Plans/Edit', [
            'plan' => $plan,
            'categories' => config('content.packages.categories', []),
        ]);
    }

    public function update(PlanRequest $request, int $id): RedirectResponse
    {
        $plan = $this->repo->find($id) ?? abort(404);

        $validated = $request->validated();

        $validated['is_active'] = $validated['is_active'] ?? true;

        $this->repo->update($plan, $validated);

        return redirect()->route('admin.plans.index')
            ->with('success', 'Plan updated successfully.');
    }

    public function destroy(int $id): RedirectResponse
    {
        $plan = $this->repo->find($id) ?? abort(404);
        $this->repo->delete($plan);

        return redirect()->route('admin.plans.index')
            ->with('success', 'Plan deleted successfully.');
    }
}
