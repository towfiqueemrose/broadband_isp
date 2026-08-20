<?php

namespace App\Services;

use App\Models\ContactInquiry;
use App\Repositories\Contracts\ContactInquiryRepository;
use Illuminate\Http\Request;

class ContactService
{
    public function __construct(
        private readonly ContactInquiryRepository $inquiries,
        private readonly FaqService $faqs,
        private readonly PlanService $plans,
    ) {
        //
    }

    /**
     * Assemble every prop needed by the contact page.
     *
     * @return array<string, mixed>
     */
    public function pageData(Request $request): array
    {
        $content = config('content.contact', []);
        $content['office'] = $this->office($content['office'] ?? []);

        return [
            'content' => $content,
            'information' => $this->information(),
            'faqs' => $this->faqs->recent(6),
            'prefill' => $this->prefill($request),
        ];
    }

    /**
     * Persist a validated contact inquiry.
     *
     * @param  array<string, mixed>  $validated
     */
    public function store(array $validated): ContactInquiry
    {
        return $this->inquiries->create([
            ...$validated,
            'status' => 'new',
            'source' => 'website',
        ]);
    }

    /**
     * Reference contact details, resolved against the brand config where
     * possible so phones, emails and the address stay single-sourced.
     *
     * @return array<int, array<string, mixed>>
     */
    private function information(): array
    {
        $contact = config('brand.contact', []);

        return array_map(function (array $item) use ($contact) {
            if (isset($item['value_ref'])) {
                $item['value'] = $contact[$item['value_ref']] ?? null;
                unset($item['value_ref']);
            }

            $value = $item['value'] ?? null;
            $item['href'] = $value ? $this->informationHref($item, $value) : null;

            return $item;
        }, config('content.contact.information', []));
    }

    /**
     * Build a sensible destination (tel:, mailto:, maps, whatsapp) for an
     * information item based on its channel type.
     */
    private function informationHref(array $item, string $value): ?string
    {
        return match ($item['key'] ?? null) {
            'support', 'sales', 'emergency' => 'tel:'.preg_replace('/[^+\d]/', '', $value),
            'email', 'support_email' => "mailto:{$value}",
            'whatsapp' => $this->whatsAppLink($value),
            'address' => $this->officeMapsUrl(),
            default => null,
        };
    }

    /**
     * Head office details, with the map URLs derived from the configured
     * coordinates so the location stays centralised.
     *
     * @param  array<string, mixed>  $office
     * @return array<string, mixed>
     */
    private function office(array $office): array
    {
        $lat = $office['latitude'] ?? null;
        $lng = $office['longitude'] ?? null;

        if (! isset($office['embedUrl']) && $lat !== null && $lng !== null) {
            $office['embedUrl'] = "https://maps.google.com/maps?q={$lat},{$lng}&z=15&output=embed";
        }

        $office['mapsUrl'] ??= $this->officeMapsUrl();

        return $office;
    }

    /**
     * Package the plan passed via the ?plan= query parameter so the form can
     * pre-fill its subject (used by package CTAs across the site).
     *
     * @return array<string, mixed>|null
     */
    private function prefill(Request $request): ?array
    {
        $slug = $request->query('plan');

        if ($slug === null) {
            return null;
        }

        $plan = $this->plans->findBySlug($slug);

        if ($plan === null) {
            return null;
        }

        return ['plan' => ['slug' => $plan->slug, 'name' => $plan->name]];
    }

    private function whatsAppLink(string $phone): string
    {
        $digits = preg_replace('/[^0-9]/', '', $phone);

        return "https://wa.me/{$digits}";
    }

    private function officeMapsUrl(): ?string
    {
        $office = config('content.contact.office', []);
        $lat = $office['latitude'] ?? null;
        $lng = $office['longitude'] ?? null;

        if ($lat === null || $lng === null) {
            return null;
        }

        return "https://www.google.com/maps/dir/?api=1&destination={$lat},{$lng}";
    }
}