<?php

namespace App\Http\Controllers;

use App\Services\FaqService;
use Inertia\Inertia;
use Inertia\Response;

class FaqController extends Controller
{
    public function __construct(
        private readonly FaqService $faqService,
    ) {}

    public function index(): Response
    {
        $data = $this->faqService->faqPageData();

        return Inertia::render('FAQ/Index', $data);
    }
}
