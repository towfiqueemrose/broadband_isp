import Reveal from '@/Components/UI/Reveal';
import Container from '@/Components/UI/Container';
import Icon from '@/Components/UI/Icon';
import SectionHeading from '@/Components/UI/SectionHeading';

export default function ValueFlow({ content }) {
    return (
        <section className="py-16 sm:py-20 lg:py-10" aria-labelledby="value-flow-heading">
            <Container>
                <SectionHeading
                    eyebrow={content.eyebrow || "Our Promise"}
                    title={content.title}
                    description={content.description}
                    align="center"
                    id="value-flow-heading"
                />

                <div className="mt-16">
                    <div className="relative">
                        <div className="absolute left-8 top-0 h-full w-0.5 bg-gradient-to-b from-primary to-accent rounded-full" />
                        
                        <div className="relative space-y-8">
                            {content.steps.map((step, index) => (
                                <Reveal key={step.title} delay={index * 100}>
                                    <div className="relative flex items-center gap-8">
                                        <div className="relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-soft to-accent/20 text-primary-dark">
                                            <Icon name={step.icon} className="h-7 w-7" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                                            <p className="mt-2 text-base leading-relaxed text-muted">
                                                {step.description}
                                            </p>
                                        </div>
                                        {index < content.steps.length - 1 && (
                                            <div className="absolute left-10 top-16 h-8 w-0.5 bg-gradient-to-b from-primary to-accent" />
                                        )}
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
