<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class StubPageController extends Controller
{
    /**
     * Render a lightweight branded placeholder page.
     */
    public function show(string $page): Response
    {
        $content = config("content.stubPages.{$page}");

        abort_unless(is_array($content), 404);

        return Inertia::render('Stub', [
            'page' => [
                'title' => $content['title'],
                'description' => $content['description'],
                'icon' => $content['icon'] ?? null,
                'cta' => $content['cta'] ?? null,
            ],
        ]);
    }
}
