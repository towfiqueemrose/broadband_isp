<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HomeHero extends Model
{
    protected $fillable = [
        'eyebrow_text',
        'main_heading',
        'highlighted_text',
        'description',
        'primary_cta_label',
        'primary_cta_url',
        'secondary_cta_label',
        'secondary_cta_url',
        'hero_image',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }

    /**
     * Get the currently active hero section (singleton pattern).
     */
    public static function active(): ?static
    {
        return static::where('is_active', true)->first();
    }
}
