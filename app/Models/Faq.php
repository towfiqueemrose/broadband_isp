<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Faq extends Model
{
    /** @use HasFactory<Database\Factories\FaqFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'category',
        'question',
        'answer',
        'display_location',
        'is_popular',
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
            'is_popular' => 'boolean',
            'is_active' => 'boolean',
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
        return $query->where('display_location', 'homepage')
            ->orWhere('display_location', 'all');
    }

    public function scopeForContact(Builder $query): Builder
    {
        return $query->where('display_location', 'contact')
            ->orWhere('display_location', 'all');
    }

    public function scopeForFaqPage(Builder $query): Builder
    {
        return $query->where('display_location', 'faq-page')
            ->orWhere('display_location', 'all');
    }

    public function scopePopular(Builder $query): Builder
    {
        return $query->where('is_popular', true);
    }
}
