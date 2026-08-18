import Button from '@/Components/UI/Button';
import Container from '@/Components/UI/Container';
import Icon from '@/Components/UI/Icon';
import Reveal from '@/Components/UI/Reveal';
import SectionHeading from '@/Components/UI/SectionHeading';
import { cn } from '@/Utils/cn';

const markers = [
    { name: 'Rangpur', top: '16%', left: '46%', status: 'coming' },
    { name: 'Sylhet', top: '34%', left: '72%', status: 'available' },
    { name: 'Rajshahi', top: '40%', left: '20%', status: 'coming' },
    { name: 'Dhaka', top: '52%', left: '46%', status: 'available' },
    { name: 'Khulna', top: '74%', left: '28%', status: 'coming' },
    { name: 'Chattogram', top: '70%', left: '64%', status: 'available' },
];

function CoverageMap() {
    return (
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border bg-surface shadow-card sm:aspect-[3/4]">
            <div
                className="absolute inset-0 opacity-40"
                style={{
                    backgroundImage: 'radial-gradient(var(--border) 1px, transparent 1px)',
                    backgroundSize: '22px 22px',
                }}
                aria-hidden="true"
            />

            <svg
                viewBox="0 0 320 380"
                className="absolute inset-0 h-full w-full"
                aria-hidden="true"
            >
                <defs>
                    <linearGradient id="coast-fade" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.06" />
                    </linearGradient>
                </defs>

                <path
                    d="M150 18c40 6 72 34 74 78 4 34 18 48 36 66 20 20 26 54 16 84-8 26-30 42-50 62-16 16-34 26-58 24-28-2-48-22-58-48-8-22-16-44-14-68-2-30 14-56 22-82 6-24-2-52 10-78 8-18 12-30 22-38z"
                    fill="url(#coast-fade)"
                    stroke="var(--primary)"
                    strokeWidth="2"
                    strokeOpacity="0.45"
                />

                <circle cx="150" cy="200" r="70" fill="var(--primary)" opacity="0.05" />
            </svg>

            {markers.map((marker) => (
                <div
                    key={marker.name}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ top: marker.top, left: marker.left }}
                >
                    {marker.status === 'available' ? (
                        <span className="absolute inset-0 animate-ping rounded-full bg-primary/30" />
                    ) : null}
                    <span
                        className={cn(
                            'relative block h-3.5 w-3.5 rounded-full ring-4',
                            marker.status === 'available'
                                ? 'bg-primary ring-primary/15'
                                : 'bg-muted ring-muted/15',
                        )}
                    />
                    <span className="absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-muted">
                        {marker.name}
                    </span>
                </div>
            ))}

            <div className="absolute bottom-4 left-4 flex items-center gap-4 rounded-full border border-border bg-surface/90 px-4 py-2 text-xs text-muted shadow-card backdrop-blur">
                <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-primary" /> Live now
                </span>
                <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-muted" /> Coming soon
                </span>
            </div>
        </div>
    );
}

export default function Coverage({ coverage }) {
    return (
        <section className="section bg-background" aria-labelledby="coverage-heading">
            <Container>
                <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
                    <div>
                        <Reveal>
                            <SectionHeading
                                align="left"
                                id="coverage-heading"
                                eyebrow="Coverage"
                                title="Growing across Bangladesh, one area at a time"
                                description="Fiber is live across major Dhaka and Chattogram zones — and expanding every month. Check if we're in your neighbourhood."
                            />
                        </Reveal>

                        <Reveal delay={100}>
                            <div className="mt-8 flex flex-wrap items-center gap-2.5">
                                {coverage.areas.map((area) => (
                                    <span
                                        key={area.slug}
                                        className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm text-foreground shadow-card"
                                    >
                                        <span
                                            className={cn(
                                                'h-2 w-2 rounded-full',
                                                area.status === 'available'
                                                    ? 'bg-success'
                                                    : 'bg-primary',
                                            )}
                                        />
                                        {area.name}
                                    </span>
                                ))}
                            </div>
                        </Reveal>

                        <Reveal delay={180}>
                            <div className="mt-10">
                                <Button href={route('coverage.index')} size="lg">
                                    Check your area
                                    <Icon name="arrow-right" className="h-4 w-4" />
                                </Button>
                            </div>
                        </Reveal>
                    </div>

                    <Reveal delay={120}>
                        <CoverageMap />
                    </Reveal>
                </div>
            </Container>
        </section>
    );
}
