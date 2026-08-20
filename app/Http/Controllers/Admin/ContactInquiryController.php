<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateInquiryStatusRequest;
use App\Repositories\Contracts\ContactInquiryRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ContactInquiryController extends Controller
{
    public function __construct(
        private readonly ContactInquiryRepository $repo,
    ) {}

    public function index(Request $request): Response
    {
        $status = $request->query('status', 'all');
        $inquiries = $this->repo->all();

        if ($status !== 'all') {
            $inquiries = $inquiries->where('status', $status);
        }

        return Inertia::render('Admin/Inquiries/Index', [
            'inquiries' => $inquiries->values(),
            'currentStatus' => $status,
        ]);
    }

    public function show(int $id): Response
    {
        $inquiry = $this->repo->find($id) ?? abort(404);

        if ($inquiry->status === 'new') {
            $this->repo->updateStatus($inquiry, 'read');
            $inquiry->status = 'read';
        }

        return Inertia::render('Admin/Inquiries/Show', [
            'inquiry' => $inquiry,
        ]);
    }

    public function updateStatus(UpdateInquiryStatusRequest $request, int $id): RedirectResponse
    {
        $inquiry = $this->repo->find($id) ?? abort(404);

        $validated = $request->validated();

        $this->repo->updateStatus($inquiry, $validated['status']);

        return redirect()->back()
            ->with('success', 'Inquiry status updated.');
    }

    public function destroy(int $id): RedirectResponse
    {
        $inquiry = $this->repo->find($id) ?? abort(404);
        $this->repo->delete($inquiry);

        return redirect()->route('admin.inquiries.index')
            ->with('success', 'Inquiry deleted successfully.');
    }
}
