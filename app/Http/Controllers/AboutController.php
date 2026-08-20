<?php

namespace App\Http\Controllers;

use App\Services\AboutService;
use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    public function index(AboutService $about): Response
    {
        return Inertia::render('About', $about->data());
    }
}
