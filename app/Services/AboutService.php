<?php

namespace App\Services;

class AboutService
{
    /**
     * Assemble every prop needed by the about page.
     *
     * @return array<string, mixed>
     */
    public function data(): array
    {
        return [
            'content' => $this->getAboutContent(),
            'statistics' => $this->getStatistics(),
        ];
    }

    /**
     * Get all about page content from config.
     *
     * @return array<string, mixed>
     */
    private function getAboutContent(): array
    {
        return config('content.about', []);
    }

    /**
     * Get statistics for the about page.
     *
     * @return array<int, array<string, mixed>>
     */
    private function getStatistics(): array
    {
        return config('content.about.statistics', []);
    }
}
