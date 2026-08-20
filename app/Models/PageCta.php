<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PageCta extends Model
{
    protected $fillable = [
        'slug',
        'eyebrow',
        'title',
        'description',
        'primary_label',
        'primary_url',
        'secondary_label',
        'secondary_url',
        'bg_style',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }

    /**
     * Find an active CTA by its slug.
     */
    public static function findBySlug(string $slug): ?static
    {
        return static::where('slug', $slug)->where('is_active', true)->first();
    }
}
