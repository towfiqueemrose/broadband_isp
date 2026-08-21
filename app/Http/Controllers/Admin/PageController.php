<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdatePageRequest;
use App\Services\PageService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function __construct(
        private readonly PageService $pages,
    ) {}

    public function index(): Response
    {
        return Inertia::render('Admin/Pages/Index', [
            'pages' => $this->pages->all(),
        ]);
    }

    public function edit(int $id): Response
    {
        $page = $this->pages->find($id) ?? abort(404);

        return Inertia::render('Admin/Pages/Edit', [
            'page' => $page,
        ]);
    }

    public function update(UpdatePageRequest $request, int $id): RedirectResponse
    {
        $page = $this->pages->find($id) ?? abort(404);

        $validated = $request->validated();

        $validated['is_active'] = filter_var($validated['is_active'] ?? true, FILTER_VALIDATE_BOOLEAN);

        $this->pages->update($page, $validated);

        return redirect()->route('admin.pages.index')
            ->with('success', 'Page updated successfully.');
    }
}
