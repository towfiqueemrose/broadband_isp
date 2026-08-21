<?php

namespace App\Services;

use App\Models\Page;
use App\Repositories\Contracts\PageRepository;

class PageService
{
    public function __construct(
        private readonly PageRepository $pages,
    ) {}

    /**
     * Get all pages for admin listing.
     */
    public function all()
    {
        return $this->pages->all();
    }

    /**
     * Get a page by ID for admin editing.
     */
    public function find(int $id): ?Page
    {
        return $this->pages->find($id);
    }

    /**
     * Get public page data by slug.
     *
     * @return array<string, mixed>|null
     */
    public function getPublicPage(string $slug): ?array
    {
        $page = $this->pages->findActiveBySlug($slug);

        if (! $page) {
            return null;
        }

        return [
            'title' => $page->title,
            'slug' => $page->slug,
            'content' => $page->content,
            'meta_title' => $page->meta_title,
            'meta_description' => $page->meta_description,
            'updated_at' => $page->updated_at->toIso8601String(),
        ];
    }

    /**
     * Create a new page.
     */
    public function create(array $data): Page
    {
        return $this->pages->create($data);
    }

    /**
     * Update an existing page.
     */
    public function update(Page $page, array $data): Page
    {
        return $this->pages->update($page, $data);
    }

    /**
     * Delete a page.
     */
    public function delete(Page $page): bool
    {
        return $this->pages->delete($page);
    }
}
