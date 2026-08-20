<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    protected $fillable = [
        'name',
        'designation',
        'description',
        'image',
        'phone',
        'email',
        'whatsapp',
        'social_links',
        'team_type',
        'is_active',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'social_links' => 'array',
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

    public function scopeByType(Builder $query, string $type): Builder
    {
        return $query->where('team_type', $type);
    }

    public function scopeLeadership(Builder $query): Builder
    {
        return $query->byType('leadership');
    }

    public function scopeSales(Builder $query): Builder
    {
        return $query->byType('sales');
    }

    public function scopeGeneral(Builder $query): Builder
    {
        return $query->byType('general');
    }
}
