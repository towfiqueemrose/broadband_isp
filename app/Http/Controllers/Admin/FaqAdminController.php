<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
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

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'question' => 'required|string|max:500',
            'answer' => 'required|string',
            'category' => 'nullable|string|max:255',
            'display_location' => 'required|in:all,homepage,contact,packages',
            'is_active' => 'boolean',
            'sort_order' => 'nullable|integer|min:0',
        ]);

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

    public function update(Request $request, int $id): RedirectResponse
    {
        $faq = $this->repo->find($id) ?? abort(404);

        $validated = $request->validate([
            'question' => 'required|string|max:500',
            'answer' => 'required|string',
            'category' => 'nullable|string|max:255',
            'display_location' => 'required|in:all,homepage,contact,packages',
            'is_active' => 'boolean',
            'sort_order' => 'nullable|integer|min:0',
        ]);

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
