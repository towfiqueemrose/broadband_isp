<?php

namespace App\Repositories\Eloquent;

use App\Models\ContactInquiry;
use App\Repositories\Contracts\ContactInquiryRepository;

class EloquentContactInquiryRepository implements ContactInquiryRepository
{
    public function create(array $data): ContactInquiry
    {
        return ContactInquiry::query()->create($data);
    }

    public function all(): \Illuminate\Support\Collection
    {
        return ContactInquiry::query()->latest()->get();
    }

    public function find(int $id): ?ContactInquiry
    {
        return ContactInquiry::find($id);
    }

    public function updateStatus(ContactInquiry $inquiry, string $status): ContactInquiry
    {
        $inquiry->update(['status' => $status]);

        return $inquiry;
    }

    public function delete(ContactInquiry $inquiry): bool
    {
        return $inquiry->delete();
    }

    public function countByStatus(string $status): int
    {
        return ContactInquiry::where('status', $status)->count();
    }

    public function countTotal(): int
    {
        return ContactInquiry::count();
    }
}