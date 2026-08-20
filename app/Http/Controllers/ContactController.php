<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContactRequest;
use App\Services\ContactService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function index(ContactService $contact, Request $request): Response
    {
        return Inertia::render('Contact', $contact->pageData($request));
    }

    public function store(StoreContactRequest $request, ContactService $contact): RedirectResponse
    {
        $contact->store($request->validated());

        return Redirect::back()->with('success', 'Thanks for reaching out — we will get back to you shortly.');
    }
}
