import Container from '@/Components/UI/Container';
import Icon from '@/Components/UI/Icon';
import Reveal from '@/Components/UI/Reveal';
import SectionHeading from '@/Components/UI/SectionHeading';

const layers = [
    { icon: 'server-stack', title: 'Core data center', subtitle: 'Direct peering & local caching' },
    { icon: 'globe', title: 'Fiber backbone', subtitle: 'Dedicated dark-fiber network' },
    { icon: 'home', title: 'Your connection', subtitle: 'Fiber right to your home' },
];

function NetworkStackVisual() {
    return (
        <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-transparent p-6 sm:p-8">
            <div
                className="absolute left-1/2 top-4 h-28 w-28 -translate-x-1/2 rounded-full bg-primary/25 blur-3xl"
                aria-hidden="true"
            />

            <div className="relative">
                {layers.map((layer, index) => (
                    <div key={layer.title}>
                        <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition-colors duration-300 hover:border-primary/40">
                            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                                <Icon name={layer.icon} className="h-5 w-5" />
                            </span>
                            <div>
                                <h4 className="text-sm font-semibold text-white">{layer.title}</h4>
                                <p className="mt-0.5 text-xs text-white/50">{layer.subtitle}</p>
                            </div>
                            <Icon name="check-circle" className="ml-auto h-5 w-5 shrink-0 text-success" />
                        </div>

                        {index < layers.length - 1 ? (
                            <div
                                className="mx-auto flex h-8 w-px items-center justify-center bg-white/15"
                                aria-hidden="true"
                            >
                                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            </div>
                        ) : null}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function NetworkTechnology({ points }) {
    return (
        <section className="bg-ink" aria-labelledby="network-heading">
            <div className="container-page section">
                <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
                    <Reveal className="order-2 lg:order-1">
                        <NetworkStackVisual />
                    </Reveal>

                    <div className="order-1 lg:order-2">
                        <SectionHeading
                            dark
                            align="left"
                            id="network-heading"
                            eyebrow="Network & Technology"
                            title="A network engineered for uptime, not excuses"
                            description="We run our own fiber backbone with redundant paths and round-the-clock monitoring — the modern infrastructure your life depends on."
                        />

                        <div className="mt-10 space-y-6">
                            {points.map((point, index) => (
                                <Reveal key={point.title} delay={index * 80}>
                                    <div className="flex gap-4">
                                        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 text-primary-light ring-1 ring-white/10">
                                            <Icon name={point.icon} className="h-5 w-5" />
                                        </span>
                                        <div>
                                            <h3 className="text-base font-semibold text-white">
                                                {point.title}
                                            </h3>
                                            <p className="mt-1 text-sm leading-relaxed text-white/60">
                                                {point.description}
                                            </p>
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
