<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Plan;
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

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:plans,slug',
            'type' => 'required|in:residential,business',
            'download_mbps' => 'required|integer|min:1',
            'upload_mbps' => 'nullable|integer|min:0',
            'price_monthly' => 'required|integer|min:0',
            'installation_fee' => 'nullable|integer|min:0',
            'original_price' => 'nullable|integer|min:0',
            'promo_price' => 'nullable|integer|min:0',
            'promo_label' => 'nullable|string|max:255',
            'promo_description' => 'nullable|string|max:500',
            'promo_ends_at' => 'nullable|date',
            'billing_label' => 'nullable|string|max:100',
            'description' => 'nullable|string',
            'features' => 'nullable|array',
            'features.*' => 'string|max:500',
            'attributes' => 'nullable|array',
            'badge' => 'nullable|string|max:255',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            'sort_order' => 'nullable|integer|min:0',
        ]);

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

    public function update(Request $request, int $id): RedirectResponse
    {
        $plan = $this->repo->find($id) ?? abort(404);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:plans,slug,' . $id,
            'type' => 'required|in:residential,business',
            'download_mbps' => 'required|integer|min:1',
            'upload_mbps' => 'nullable|integer|min:0',
            'price_monthly' => 'required|integer|min:0',
            'installation_fee' => 'nullable|integer|min:0',
            'original_price' => 'nullable|integer|min:0',
            'promo_price' => 'nullable|integer|min:0',
            'promo_label' => 'nullable|string|max:255',
            'promo_description' => 'nullable|string|max:500',
            'promo_ends_at' => 'nullable|date',
            'billing_label' => 'nullable|string|max:100',
            'description' => 'nullable|string',
            'features' => 'nullable|array',
            'features.*' => 'string|max:500',
            'attributes' => 'nullable|array',
            'badge' => 'nullable|string|max:255',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            'sort_order' => 'nullable|integer|min:0',
        ]);

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
