import Reveal from '@/Components/UI/Reveal';
import Container from '@/Components/UI/Container';
import Icon from '@/Components/UI/Icon';

export default function BrandStory({ content }) {
    return (
        <section className="bg-background py-16 sm:py-20 lg:py-10" aria-labelledby="brand-story-heading">
            <Container>
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
                    <div>
                        <Reveal>
                            <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary-dark">
                                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                {content.eyebrow}
                            </span>
                        </Reveal>

                        <Reveal delay={80}>
                            <h2
                                id="brand-story-heading"
                                className="mt-4 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl"
                            >
                                {content.title}
                            </h2>
                        </Reveal>

                        <Reveal delay={160}>
                            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
                                {content.description}
                            </p>
                        </Reveal>

                        <Reveal delay={240}>
                            <blockquote className="mt-8 border-l-4 border-primary pl-6">
                                <p className="text-xl font-semibold leading-relaxed text-foreground sm:text-2xl">
                                    {content.highlight}
                                </p>
                            </blockquote>
                        </Reveal>
                    </div>

                    <Reveal delay={100} className="lg:pl-8">
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary-soft to-surface-2">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="relative">
                                    <div className="absolute -inset-40 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl" />
                                    <div className="relative flex items-center justify-center w-48 h-48 rounded-full bg-gradient-to-br from-primary/15 to-accent/15 border border-border/50">
                                        <Icon name="building-office" className="h-16 w-16 text-primary" />
                                    </div>
                                </div>
                            </div>
                            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-muted">
                                <span className="inline-flex items-center gap-1.5">
                                    <Icon name="fiber" className="h-4 w-4" />
                                    Fiber Network
                                </span>
                                <span className="inline-flex items-center gap-1.5">
                                    <Icon name="server" className="h-4 w-4" />
                                    Infrastructure
                                </span>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </Container>
        </section>
    );
}
