<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PageCtaRequest;
use App\Models\PageCta;
use App\Repositories\Contracts\PageCtaRepository;
use Illuminate\Http\RedirectResponse;
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

    public function update(PageCtaRequest $request, int $id): RedirectResponse
    {
        $cta = PageCta::find($id) ?? abort(404);

        $validated = $request->validated();

        $validated['is_active'] = $validated['is_active'] ?? true;

        $this->repo->update($cta, $validated);

        return redirect()->route('admin.page-ctas.index')
            ->with('success', 'CTA updated successfully.');
    }
}
