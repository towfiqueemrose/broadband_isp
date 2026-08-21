import Button from '@/Components/UI/Button';
import Icon from '@/Components/UI/Icon';
import Reveal from '@/Components/UI/Reveal';
import { cn } from '@/Utils/cn';

export default function WhyChooseUs({ items }) {
    return (
        <section className="relative overflow-hidden bg-transparent" aria-labelledby="why-heading">
            <div className="container-page relative pt-4 pb-8 sm:pt-6 sm:pb-10 lg:pt-8 lg:pb-12">
                <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
                    {/* Left — Heading */}
                    <div className="lg:col-span-5">
                        <div className="lg:sticky lg:-mt-16 lg:top-24">
                            <Reveal>
                                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-muted">
                                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                                    Why NexaLink
                                </div>
                            </Reveal>

                            <Reveal delay={80}>
                                <h2
                                    id="why-heading"
                                    className="text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]"
                                >
                                    Built different,{' '}
                                    because your connection matters
                                </h2>
                            </Reveal>

                            <Reveal delay={160}>
                                <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
                                    We obsess over the details most ISPs ignore — real speeds, real uptime and support that doesn&apos;t make you wait.
                                </p>
                            </Reveal>

                            <Reveal delay={240}>
                                <div className="mt-8">
                                    <Button href={route('about.index')} variant="primary" size="lg">
                                        More about us
                                        <Icon name="arrow-right" className="h-4 w-4" />
                                    </Button>
                                </div>
                            </Reveal>
                        </div>
                    </div>

                    {/* Right — Cards */}
                    <div className="grid items-stretch gap-4 sm:grid-cols-2 lg:col-span-7">
                        {items.map((item, index) => (
                            <Reveal
                                key={item.title}
                                delay={index * 100}
                                className={cn(
                                    'group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lift',
                                    index % 2 === 1 && 'sm:translate-y-8',
                                )}
                            >
                                {/* Top accent line */}
                                <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-primary/60 via-accent/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                {/* Number badge */}
                                <div className="mb-4 flex items-center justify-between">
                                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-sm font-bold text-primary-dark ring-1 ring-border transition-all duration-300 group-hover:scale-110">
                                        <Icon name={item.icon} className="h-5 w-5" />
                                    </span>
                                    <span className="text-4xl font-black text-border select-none transition-colors duration-300 group-hover:text-primary/10">
                                        0{index + 1}
                                    </span>
                                </div>

                                <h3 className="text-lg font-bold text-foreground transition-colors duration-200">
                                    {item.title}
                                </h3>
                                <p className="mt-2.5 text-sm leading-relaxed text-muted transition-colors duration-200">
                                    {item.description}
                                </p>

                                {/* Subtle glow on hover */}
                                <div className="pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-primary/8 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
