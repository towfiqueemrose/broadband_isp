<?php

namespace App\Http\Controllers;

use App\Services\PlanService;
use Inertia\Inertia;
use Inertia\Response;

class PlansController extends Controller
{
    public function index(PlanService $plans): Response
    {
        return Inertia::render('Packages', $plans->forPackagesPage());
    }
}
