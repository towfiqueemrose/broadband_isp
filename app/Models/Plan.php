<?php

namespace App\Models;

use Database\Factories\PlanFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    /** @use HasFactory<PlanFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'slug',
        'type',
        'download_mbps',
        'upload_mbps',
        'price_monthly',
        'installation_fee',
        'original_price',
        'promo_price',
        'promo_label',
        'promo_description',
        'promo_ends_at',
        'billing_label',
        'description',
        'features',
        'attributes',
        'badge',
        'is_featured',
        'is_active',
        'sort_order',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'features' => 'array',
            'attributes' => 'array',
            'promo_ends_at' => 'date',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
        ];
    }

    /**
     * Whether the plan currently carries an active promotional offer.
     */
    public function hasPromo(): bool
    {
        return $this->original_price !== null
            && $this->original_price > ($this->promo_price ?? $this->price_monthly);
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    public function scopeFeatured(Builder $query): Builder
    {
        return $query->where('is_featured', true);
    }

    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('sort_order');
    }

    public function scopeResidential(Builder $query): Builder
    {
        return $query->where('type', 'residential');
    }

    public function scopeByType(Builder $query, string $type): Builder
    {
        return $query->where('type', $type);
    }
}
