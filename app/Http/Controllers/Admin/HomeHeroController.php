<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\HomeHeroRequest;
use App\Models\HomeHero;
use App\Repositories\Contracts\HomeHeroRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
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

    public function store(HomeHeroRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        if ($request->hasFile('hero_image')) {
            $validated['hero_image'] = $request->file('hero_image')->store('hero', 'public');
        }

        $validated['image_opacity'] = $validated['image_opacity'] ?? 40;
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

    public function update(HomeHeroRequest $request, int $id): RedirectResponse
    {
        $hero = $this->heroRepo->find($id) ?? abort(404);

        $validated = $request->validated();

        if ($request->hasFile('hero_image')) {
            if ($hero->hero_image && Storage::disk('public')->exists($hero->hero_image)) {
                Storage::disk('public')->delete($hero->hero_image);
            }
            $validated['hero_image'] = $request->file('hero_image')->store('hero', 'public');
        } else {
            unset($validated['hero_image']);
        }

        $validated['image_opacity'] = $validated['image_opacity'] ?? 40;
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
