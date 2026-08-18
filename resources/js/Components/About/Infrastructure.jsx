import Reveal from '@/Components/UI/Reveal';
import Container from '@/Components/UI/Container';
import Icon from '@/Components/UI/Icon';
import SectionHeading from '@/Components/UI/SectionHeading';

export default function Infrastructure({ content }) {
    return (
        <section className="bg-surface-2 py-16 sm:py-20 lg:py-24" aria-labelledby="infrastructure-heading">
            <Container>
                <SectionHeading
                    eyebrow={content.eyebrow || "Technology"}
                    title={content.title}
                    description={content.description}
                    align="center"
                    id="infrastructure-heading"
                />

                <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-2">
                    {content.points.map((point, index) => (
                        <Reveal key={point.title} delay={index * 80}>
                            <div className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-8 transition-all duration-300 hover:border-primary/30">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-soft to-accent/20 text-primary-dark">
                                    <Icon name={point.icon} className="h-7 w-7" />
                                </div>
                                <h3 className="mt-6 text-xl font-bold text-foreground">{point.title}</h3>
                                <p className="mt-3 text-base leading-relaxed text-muted">
                                    {point.description}
                                </p>
                                <div className="mt-6 flex items-center gap-3 text-sm text-muted">
                                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <Icon name="check" className="h-4 w-4" />
                                    </span>
                                    <span>Premium technology</span>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>

                <Reveal delay={200} className="mt-16">
                    <div className="relative aspect-[2/1] w-full overflow-hidden rounded-3xl border border-border bg-gradient-to-r from-primary-soft via-surface-2 to-primary-soft">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative">
                                <div className="absolute -inset-60 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl" />
                                <div className="relative grid grid-cols-3 gap-8">
                                    <div className="flex flex-col items-center gap-2 text-center">
                                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
                                            <Icon name="server-stack" className="h-8 w-8 text-white" />
                                        </div>
                                        <span className="text-sm font-medium text-white/90">Fiber Core</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 text-center">
                                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
                                            <Icon name="activity" className="h-8 w-8 text-white" />
                                        </div>
                                        <span className="text-sm font-medium text-white/90">Network Flow</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 text-center">
                                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
                                            <Icon name="globe" className="h-8 w-8 text-white" />
                                        </div>
                                        <span className="text-sm font-medium text-white/90">Global Connect</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                    </div>
                </Reveal>
            </Container>
        </section>
    );
}
