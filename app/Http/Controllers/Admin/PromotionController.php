<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\Contracts\PromotionRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PromotionController extends Controller
{
    public function __construct(
        private readonly PromotionRepository $repo,
    ) {}

    public function index(): Response
    {
        return Inertia::render('Admin/Promotions/Index', [
            'promotions' => $this->repo->all(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Promotions/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'eyebrow' => 'nullable|string|max:255',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'details' => 'nullable|array',
            'details.*' => 'string|max:255',
            'cta_label' => 'nullable|string|max:255',
            'cta_url' => 'nullable|string|max:500',
            'image' => 'nullable|image|mimes:jpeg,jpg,png,webp|max:5120',
            'display_location' => 'required|string|max:100',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'is_active' => 'boolean',
            'sort_order' => 'nullable|integer|min:0',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('promotions', 'public');
        }

        $validated['is_active'] = $validated['is_active'] ?? true;

        $this->repo->create($validated);

        return redirect()->route('admin.promotions.index')
            ->with('success', 'Promotion created successfully.');
    }

    public function edit(int $id): Response
    {
        $promotion = $this->repo->all()->firstWhere('id', $id) ?? abort(404);

        return Inertia::render('Admin/Promotions/Edit', [
            'promotion' => $promotion,
        ]);
    }

    public function update(Request $request, int $id): RedirectResponse
    {
        $promotion = $this->repo->all()->firstWhere('id', $id) ?? abort(404);

        $validated = $request->validate([
            'eyebrow' => 'nullable|string|max:255',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'details' => 'nullable|array',
            'details.*' => 'string|max:255',
            'cta_label' => 'nullable|string|max:255',
            'cta_url' => 'nullable|string|max:500',
            'image' => 'nullable|image|mimes:jpeg,jpg,png,webp|max:5120',
            'display_location' => 'required|string|max:100',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'is_active' => 'boolean',
            'sort_order' => 'nullable|integer|min:0',
        ]);

        if ($request->hasFile('image')) {
            if ($promotion->image && \Storage::disk('public')->exists($promotion->image)) {
                \Storage::disk('public')->delete($promotion->image);
            }
            $validated['image'] = $request->file('image')->store('promotions', 'public');
        }

        $validated['is_active'] = $validated['is_active'] ?? true;

        $this->repo->update($promotion, $validated);

        return redirect()->route('admin.promotions.index')
            ->with('success', 'Promotion updated successfully.');
    }

    public function destroy(int $id): RedirectResponse
    {
        $promotion = $this->repo->all()->firstWhere('id', $id) ?? abort(404);

        if ($promotion->image && \Storage::disk('public')->exists($promotion->image)) {
            \Storage::disk('public')->delete($promotion->image);
        }

        $this->repo->delete($promotion);

        return redirect()->route('admin.promotions.index')
            ->with('success', 'Promotion deleted successfully.');
    }
}
