import Container from '@/Components/UI/Container';
import Icon from '@/Components/UI/Icon';
import Reveal from '@/Components/UI/Reveal';
import SectionHeading from '@/Components/UI/SectionHeading';
import { cn } from '@/Utils/cn';

export default function ContactInformation({ items }) {
    const visible = items.filter((item) => item.value);

    if (visible.length === 0) {
        return null;
    }

    return (
        <section className="bg-background" aria-labelledby="information-heading">
            <Container className="py-8 sm:py-10 lg:py-12">
                <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                    <div className="lg:col-span-4">
                        <div className="lg:sticky lg:top-32">
                            <Reveal>
                                <SectionHeading
                                    align="left"
                                    id="information-heading"
                                    eyebrow="Contact information"
                                    title="The direct details"
                                    description="Prefer to skip the form? Reach us directly on any of these — every line goes straight to a person, not a queue."
                                />
                            </Reveal>
                        </div>
                    </div>

                    <div className="lg:col-span-8">
                        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border shadow-card sm:grid-cols-2">
                            {visible.map((item, index) => {
                                const external = item.href?.startsWith('http');

                                return (
                                    <Reveal key={item.key} delay={index * 50}>
                                        <a
                                            href={item.href ?? undefined}
                                            {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                                            className={cn(
                                                'flex h-full items-start gap-4 bg-background p-6 transition-colors duration-200',
                                                item.href && 'hover:bg-primary-soft',
                                            )}
                                        >
                                            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary-dark">
                                                <Icon name={item.icon} className="h-5 w-5" />
                                            </span>
                                            <span className="min-w-0">
                                                <span className="block text-xs font-semibold uppercase tracking-wider text-muted">
                                                    {item.label}
                                                </span>
                                                <span className="mt-1 block break-words text-base font-semibold text-foreground">
                                                    {item.value}
                                                </span>
                                            </span>
                                        </a>
                                    </Reveal>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}