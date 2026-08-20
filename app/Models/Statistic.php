<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Statistic extends Model
{
    protected $fillable = [
        'label',
        'value',
        'suffix',
        'decimals',
        'description',
        'icon',
        'display_location',
        'is_active',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'value' => 'decimal:2',
            'decimals' => 'integer',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('sort_order');
    }

    public function scopeForHomepage(Builder $query): Builder
    {
        return $query->whereIn('display_location', ['homepage', 'both']);
    }

    public function scopeForAbout(Builder $query): Builder
    {
        return $query->whereIn('display_location', ['about', 'both']);
    }
}
