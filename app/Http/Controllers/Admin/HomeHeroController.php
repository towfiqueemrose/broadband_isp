<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HomeHero;
use App\Repositories\Contracts\HomeHeroRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class HomeHeroController extends Controller
{
    public function __construct(
        private readonly HomeHeroRepository $heroRepo,
    ) {}

    public function index(): Response
    {
        $heroes = $this->heroRepo->all();

        return Inertia::render('Admin/HomeHero/Index', [
            'heroes' => $heroes,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/HomeHero/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'eyebrow_text' => 'nullable|string|max:255',
            'main_heading' => 'required|string|max:255',
            'highlighted_text' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'primary_cta_label' => 'nullable|string|max:255',
            'primary_cta_url' => 'nullable|string|max:500',
            'secondary_cta_label' => 'nullable|string|max:255',
            'secondary_cta_url' => 'nullable|string|max:500',
            'hero_image' => 'nullable|image|mimes:jpeg,jpg,png,webp|max:5120',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('hero_image')) {
            $validated['hero_image'] = $request->file('hero_image')->store('hero', 'public');
        }

        $validated['is_active'] = $validated['is_active'] ?? true;

        $this->heroRepo->create($validated);

        return redirect()->route('admin.home-hero.index')
            ->with('success', 'Hero section created successfully.');
    }

    public function edit(int $id): Response
    {
        $hero = $this->heroRepo->find($id) ?? abort(404);

        return Inertia::render('Admin/HomeHero/Edit', [
            'hero' => $hero,
        ]);
    }

    public function update(Request $request, int $id): RedirectResponse
    {
        $hero = $this->heroRepo->find($id) ?? abort(404);

        $validated = $request->validate([
            'eyebrow_text' => 'nullable|string|max:255',
            'main_heading' => 'required|string|max:255',
            'highlighted_text' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'primary_cta_label' => 'nullable|string|max:255',
            'primary_cta_url' => 'nullable|string|max:500',
            'secondary_cta_label' => 'nullable|string|max:255',
            'secondary_cta_url' => 'nullable|string|max:500',
            'hero_image' => 'nullable|image|mimes:jpeg,jpg,png,webp|max:5120',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('hero_image')) {
            if ($hero->hero_image && Storage::disk('public')->exists($hero->hero_image)) {
                Storage::disk('public')->delete($hero->hero_image);
            }
            $validated['hero_image'] = $request->file('hero_image')->store('hero', 'public');
        }

        $validated['is_active'] = $validated['is_active'] ?? true;

        $this->heroRepo->update($hero, $validated);

        return redirect()->route('admin.home-hero.index')
            ->with('success', 'Hero section updated successfully.');
    }

    public function destroy(int $id): RedirectResponse
    {
        $hero = $this->heroRepo->find($id) ?? abort(404);

        if ($hero->hero_image && Storage::disk('public')->exists($hero->hero_image)) {
            Storage::disk('public')->delete($hero->hero_image);
        }

        $this->heroRepo->delete($hero);

        return redirect()->route('admin.home-hero.index')
            ->with('success', 'Hero section deleted successfully.');
    }

    public function activate(int $id): RedirectResponse
    {
        $hero = $this->heroRepo->find($id) ?? abort(404);
        $this->heroRepo->update($hero, ['is_active' => true]);

        return redirect()->route('admin.home-hero.index')
            ->with('success', 'Hero section activated.');
    }

    public function deactivate(int $id): RedirectResponse
    {
        $hero = $this->heroRepo->find($id) ?? abort(404);
        $this->heroRepo->update($hero, ['is_active' => false]);

        return redirect()->route('admin.home-hero.index')
            ->with('success', 'Hero section deactivated.');
    }

    private function find(int $id): ?HomeHero
    {
        return $this->heroRepo->all()->firstWhere('id', $id);
    }
}
