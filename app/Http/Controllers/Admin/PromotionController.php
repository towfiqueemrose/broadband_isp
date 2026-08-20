<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PromotionRequest;
use App\Repositories\Contracts\PromotionRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
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

    public function store(PromotionRequest $request): RedirectResponse
    {
        $validated = $request->validated();

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

    public function update(PromotionRequest $request, int $id): RedirectResponse
    {
        $promotion = $this->repo->all()->firstWhere('id', $id) ?? abort(404);

        $validated = $request->validated();

        if ($request->hasFile('image')) {
            if ($promotion->image && Storage::disk('public')->exists($promotion->image)) {
                Storage::disk('public')->delete($promotion->image);
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

        if ($promotion->image && Storage::disk('public')->exists($promotion->image)) {
            Storage::disk('public')->delete($promotion->image);
        }

        $this->repo->delete($promotion);

        return redirect()->route('admin.promotions.index')
            ->with('success', 'Promotion deleted successfully.');
    }
}
