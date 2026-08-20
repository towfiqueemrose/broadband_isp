import Reveal from '@/Components/UI/Reveal';
import Container from '@/Components/UI/Container';
import SectionHeading from '@/Components/UI/SectionHeading';

export default function CompanyJourney({ content }) {
    return (
        <section className="py-16 sm:py-20 lg:py-14" aria-labelledby="journey-heading">
            <Container>
                <SectionHeading
                    eyebrow={content.eyebrow || 'Our Growth'}
                    title={content.title}
                    description={content.description}
                    align="center"
                    id="journey-heading"
                />

                {/* ── Desktop: horizontal connected timeline ── */}
                <div className="relative mt-16 hidden lg:block">
                    {/* horizontal rail */}
                    <div
                        className="absolute left-0 right-0 top-5 h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20"
                        aria-hidden="true"
                    />

                    <div className="relative grid items-stretch" style={{ gridTemplateColumns: `repeat(${content.milestones.length}, 1fr)` }}>
                        {content.milestones.map((milestone, index) => (
                            <Reveal key={`${milestone.year}-${milestone.title}`} delay={index * 100}>
                                <div className="flex h-full flex-col items-center text-center">
                                    {/* node */}
                                    <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-primary bg-background">
                                        <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                                    </div>

                                    {/* year */}
                                    <span className="mt-4 inline-flex rounded-full bg-primary-soft px-3 py-1 text-xs font-bold text-primary-dark">
                                        {milestone.year}
                                    </span>

                                    {/* card */}
                                    <div className="mt-4 flex w-full max-w-[220px] flex-1 flex-col rounded-2xl border border-border bg-surface p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-card-hover">
                                        <h3 className="text-sm font-bold leading-snug text-foreground">
                                            {milestone.title}
                                        </h3>
                                        <p className="mt-2 text-xs leading-relaxed text-muted">
                                            {milestone.description}
                                        </p>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>

                {/* ── Mobile: vertical connected timeline ── */}
                <div className="relative mt-14 lg:hidden">
                    {/* vertical rail */}
                    <div
                        className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-primary to-primary/20"
                        aria-hidden="true"
                    />

                    <div className="grid grid-cols-1 gap-6 items-stretch">
                        {content.milestones.map((milestone, index) => (
                            <Reveal key={`${milestone.year}-${milestone.title}`} delay={index * 80}>
                                <div className="relative flex gap-5">
                                    {/* node */}
                                    <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[3px] border-primary bg-background">
                                        <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                                    </div>

                                    {/* card */}
                                    <div className="flex-1 rounded-2xl border border-border bg-surface p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30">
                                        <span className="inline-flex rounded-full bg-primary-soft px-2.5 py-0.5 text-[11px] font-bold text-primary-dark">
                                            {milestone.year}
                                        </span>
                                        <h3 className="mt-2 text-base font-bold text-foreground">
                                            {milestone.title}
                                        </h3>
                                        <p className="mt-1.5 text-sm leading-relaxed text-muted">
                                            {milestone.description}
                                        </p>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}
