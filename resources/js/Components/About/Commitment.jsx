import Reveal from '@/Components/UI/Reveal';
import Container from '@/Components/UI/Container';
import Icon from '@/Components/UI/Icon';
import SectionHeading from '@/Components/UI/SectionHeading';

export default function Commitment({ content }) {
    return (
        <section className="bg-gradient-to-b from-background via-background to-surface-2 py-16 sm:py-20 lg:py-10" aria-labelledby="commitment-heading">
            <Container>
                <div className="max-w-4xl mx-auto text-center">
                    <Reveal>
                        <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary-dark">
                            <span className="h-1.5 w-1.5 rounded-full bg-current" />
                            Our Promise
                        </span>
                    </Reveal>

                    <Reveal delay={80}>
                        <h2
                            id="commitment-heading"
                            className="mt-4 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl"
                        >
                            {content.title}
                        </h2>
                    </Reveal>

                    <Reveal delay={160}>
                        <p className="mt-5 text-base leading-relaxed text-muted sm:text-xl">
                            {content.description}
                        </p>
                    </Reveal>

                    <Reveal delay={240}>
                        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {content.points.map((point, index) => (
                                <div key={index} className="flex items-center justify-center gap-3">
                                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary-dark">
                                        <Icon name="check" className="h-5 w-5" />
                                    </div>
                                    <span className="font-medium text-foreground">{point}</span>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </Container>
        </section>
    );
}
