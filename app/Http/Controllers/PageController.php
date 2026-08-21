<?php

namespace App\Http\Controllers;

use App\Services\PageService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function __construct(
        private readonly PageService $pages,
    ) {}

    public function show(Request $request, string $slug = ''): Response
    {
        $slug = $slug ?: $request->path();
        $page = $this->pages->getPublicPage($slug);

        abort_unless($page, 404);

        return Inertia::render('Legal/Show', [
            'page' => $page,
        ]);
    }
}
