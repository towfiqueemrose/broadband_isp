import Button from '@/Components/UI/Button';
import Container from '@/Components/UI/Container';
import Icon from '@/Components/UI/Icon';
import Reveal from '@/Components/UI/Reveal';
import SectionHeading from '@/Components/UI/SectionHeading';

function OfficeMap({ office }) {
    if (!office.embedUrl) {
        return (
            <div className="flex h-full min-h-[320px] w-full flex-col items-center justify-center gap-3 rounded-3xl border border-border bg-surface p-8 text-center">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft text-primary-dark">
                    <Icon name="map-pin" className="h-7 w-7" />
                </span>
                <p className="max-w-xs text-sm leading-relaxed text-muted">
                    Our office map is being prepared. Use the directions button to find us — or give
                    us a call and we will guide you.
                </p>
            </div>
        );
    }

    return (
        <div className="relative h-full min-h-[320px] w-full overflow-hidden rounded-3xl border border-border bg-surface shadow-card">
            <iframe
                src={office.embedUrl}
                title={`Map showing the location of ${office.name}`}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0"
            />
        </div>
    );
}

export default function OfficeLocation({ office }) {
    return (
        <section className="bg-background" aria-labelledby="office-heading">
            <Container className="py-8 sm:py-10 lg:py-12">
                <Reveal>
                    <SectionHeading
                        id="office-heading"
                        eyebrow="Visit us"
                        title="Head office, Dhaka"
                        description="Drop by during business hours — our team is happy to walk you through packages, pricing and installation in person."
                    />
                </Reveal>

                <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-8">
                    <Reveal className="lg:col-span-5" delay={80}>
                        <div className="flex h-full flex-col rounded-3xl border border-border bg-surface p-7 shadow-card sm:p-8">
                            <h3 className="text-xl font-bold tracking-tight text-foreground">
                                {office.name}
                            </h3>

                            <ul className="mt-6 space-y-5 text-sm">
                                <li className="flex items-start gap-3.5">
                                    <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary-dark">
                                        <Icon name="map-pin" className="h-5 w-5" />
                                    </span>
                                    <span>
                                        <span className="block text-xs font-semibold uppercase tracking-wider text-muted">
                                            Address
                                        </span>
                                        <span className="mt-0.5 block leading-relaxed text-foreground">
                                            {office.address}
                                        </span>
                                    </span>
                                </li>
                                <li className="flex items-start gap-3.5">
                                    <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary-dark">
                                        <Icon name="clock" className="h-5 w-5" />
                                    </span>
                                    <span>
                                        <span className="block text-xs font-semibold uppercase tracking-wider text-muted">
                                            Business hours
                                        </span>
                                        <span className="mt-0.5 block leading-relaxed text-foreground">
                                            {office.hours}
                                        </span>
                                    </span>
                                </li>
                                <li className="flex items-start gap-3.5">
                                    <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary-dark">
                                        <Icon name="phone" className="h-5 w-5" />
                                    </span>
                                    <span>
                                        <span className="block text-xs font-semibold uppercase tracking-wider text-muted">
                                            Phone
                                        </span>
                                        <span className="mt-0.5 block leading-relaxed text-foreground">
                                            {office.phone}
                                        </span>
                                    </span>
                                </li>
                            </ul>

                            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-border pt-6">
                                <Button
                                    href={office.mapsUrl ?? '#'}
                                    external={!!office.mapsUrl}
                                    size="lg"
                                >
                                    <Icon name="navigation" className="h-4 w-4" />
                                    Get directions
                                </Button>
                                {office.mapsUrl ? (
                                    <Button
                                        href={office.mapsUrl}
                                        external
                                        variant="ghost"
                                        size="lg"
                                    >
                                        View on Google Maps
                                    </Button>
                                ) : null}
                            </div>
                        </div>
                    </Reveal>

                    <Reveal delay={160} className="lg:col-span-7">
                        <OfficeMap office={office} />
                    </Reveal>
                </div>
            </Container>
        </section>
    );
}