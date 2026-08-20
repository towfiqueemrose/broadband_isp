<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\FaqRequest;
use App\Repositories\Contracts\FaqRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FaqAdminController extends Controller
{
    public function __construct(
        private readonly FaqRepository $repo,
    ) {}

    public function index(Request $request): Response
    {
        $location = $request->query('location', 'all');

        return Inertia::render('Admin/Faqs/Index', [
            'faqs' => $this->repo->all(),
            'currentLocation' => $location,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Faqs/Create');
    }

    public function store(FaqRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $validated['is_active'] = $validated['is_active'] ?? true;

        $this->repo->create($validated);

        return redirect()->route('admin.faqs.index')
            ->with('success', 'FAQ created successfully.');
    }

    public function edit(int $id): Response
    {
        $faq = $this->repo->find($id) ?? abort(404);

        return Inertia::render('Admin/Faqs/Edit', [
            'faq' => $faq,
        ]);
    }

    public function update(FaqRequest $request, int $id): RedirectResponse
    {
        $faq = $this->repo->find($id) ?? abort(404);

        $validated = $request->validated();

        $validated['is_active'] = $validated['is_active'] ?? true;

        $this->repo->update($faq, $validated);

        return redirect()->route('admin.faqs.index')
            ->with('success', 'FAQ updated successfully.');
    }

    public function destroy(int $id): RedirectResponse
    {
        $faq = $this->repo->find($id) ?? abort(404);
        $this->repo->delete($faq);

        return redirect()->route('admin.faqs.index')
            ->with('success', 'FAQ deleted successfully.');
    }
}
