<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PlanResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'type' => $this->type,
            'download' => $this->download_mbps,
            'upload' => $this->upload_mbps,
            'price' => $this->price_monthly,
            'installationFee' => $this->installation_fee,
            'billingLabel' => $this->billing_label,
            'description' => $this->description,
            'features' => $this->features ?? [],
            'attributes' => $this->attributes ?? [],
            'badge' => $this->badge,
            'isFeatured' => $this->is_featured,
            'promo' => $this->when($this->hasPromo(), [
                'originalPrice' => $this->original_price ?? $this->price_monthly,
                'price' => $this->promo_price,
                'label' => $this->promo_label,
                'description' => $this->promo_description,
                'endsAt' => $this->promo_ends_at?->toDateString(),
            ]),
        ];
    }
}
