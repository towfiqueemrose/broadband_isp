<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactInquiry;
use App\Models\Plan;
use App\Models\TeamMember;
use App\Models\Faq;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'total_packages' => Plan::count(),
                'active_packages' => Plan::where('is_active', true)->count(),
                'total_inquiries' => ContactInquiry::count(),
                'new_inquiries' => ContactInquiry::where('status', 'new')->count(),
                'total_team' => TeamMember::where('is_active', true)->count(),
                'total_faqs' => Faq::where('is_active', true)->count(),
            ],
            'recent_inquiries' => ContactInquiry::latest()->limit(5)->get(['id', 'name', 'email', 'subject', 'status', 'created_at']),
        ]);
    }
}
