<?php

namespace App\Repositories\Contracts;

use App\Models\ContactInquiry;

interface ContactInquiryRepository
{
    /**
     * Persist a new contact inquiry.
     *
     * @param  array<string, mixed>  $data
     */
    public function create(array $data): ContactInquiry;

    public function all(): \Illuminate\Support\Collection;

    public function find(int $id): ?ContactInquiry;

    public function updateStatus(ContactInquiry $inquiry, string $status): ContactInquiry;

    public function delete(ContactInquiry $inquiry): bool;

    public function countByStatus(string $status): int;

    public function countTotal(): int;
}