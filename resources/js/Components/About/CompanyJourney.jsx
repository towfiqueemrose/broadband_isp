import Reveal from '@/Components/UI/Reveal';
import Container from '@/Components/UI/Container';
import Icon from '@/Components/UI/Icon';
import SectionHeading from '@/Components/UI/SectionHeading';

export default function CompanyJourney({ content }) {
    return (
        <section className="bg-surface-2 py-16 sm:py-20 lg:py-24" aria-labelledby="journey-heading">
            <Container>
                <SectionHeading
                    eyebrow={content.eyebrow || "Our Growth"}
                    title={content.title}
                    description={content.description}
                    align="center"
                    id="journey-heading"
                />

                <div className="mt-16">
                    <div className="relative">
                        <div className="absolute left-0 top-8 h-full w-0.5 bg-gradient-to-b from-primary to-accent rounded-full" />
                        
                        <div className="relative space-y-12">
                            {content.milestones.map((milestone, index) => (
                                <Reveal key={`${milestone.year}-${milestone.title}`} delay={index * 100}>
                                    <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-4 lg:gap-12">
                                        <div className="relative z-10 flex items-center justify-center sm:justify-end">
                                            <div className="relative flex items-center justify-center">
                                                <div className="absolute -inset-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-xl" />
                                                <span className="relative z-10 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-sm">
                                                    {milestone.year}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <div className="sm:col-span-3">
                                            <h3 className="text-xl font-bold text-foreground">{milestone.title}</h3>
                                            <p className="mt-2 text-base leading-relaxed text-muted">
                                                {milestone.description}
                                            </p>
                                            <div className="mt-4 flex items-center gap-3 text-sm text-muted">
                                                <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                                    <Icon name="clock" className="h-4 w-4" />
                                                </span>
                                                <span>Milestone {index + 1}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
