<?php

namespace App\Http\Controllers;

use App\Services\HomeService;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(HomeService $home): Response
    {
        return Inertia::render('Home', $home->data());
    }
}
