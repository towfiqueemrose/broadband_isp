<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PageCta;
use App\Repositories\Contracts\PageCtaRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PageCtaController extends Controller
{
    public function __construct(
        private readonly PageCtaRepository $repo,
    ) {}

    public function index(): Response
    {
        return Inertia::render('Admin/PageCtas/Index', [
            'ctas' => $this->repo->all(),
        ]);
    }

    public function edit(int $id): Response
    {
        $cta = PageCta::find($id) ?? abort(404);

        return Inertia::render('Admin/PageCtas/Edit', [
            'cta' => $cta,
        ]);
    }

    public function update(Request $request, int $id): RedirectResponse
    {
        $cta = PageCta::find($id) ?? abort(404);

        $validated = $request->validate([
            'eyebrow' => 'nullable|string|max:255',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'primary_label' => 'nullable|string|max:255',
            'primary_url' => 'nullable|string|max:500',
            'secondary_label' => 'nullable|string|max:255',
            'secondary_url' => 'nullable|string|max:500',
            'bg_style' => 'nullable|in:primary,dark,gradient',
            'is_active' => 'boolean',
        ]);

        $validated['is_active'] = $validated['is_active'] ?? true;

        $this->repo->update($cta, $validated);

        return redirect()->route('admin.page-ctas.index')
            ->with('success', 'CTA updated successfully.');
    }
}
