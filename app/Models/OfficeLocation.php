<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OfficeLocation extends Model
{
    protected $fillable = [
        'name',
        'address',
        'phone',
        'email',
        'business_hours',
        'latitude',
        'longitude',
        'maps_embed_url',
        'maps_url',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'latitude' => 'decimal:7',
            'longitude' => 'decimal:7',
            'is_active' => 'boolean',
        ];
    }

    /**
     * Get the active head office location.
     */
    public static function active(): ?static
    {
        return static::where('is_active', true)->first();
    }
}
