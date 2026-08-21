import Reveal from '@/Components/UI/Reveal';
import Container from '@/Components/UI/Container';
import Icon from '@/Components/UI/Icon';
import SectionHeading from '@/Components/UI/SectionHeading';

export default function CoreValues({ values }) {
    return (
        <section className="py-8 sm:py-10 lg:py-12" aria-labelledby="core-values-heading">
            <Container>
                <SectionHeading
                    eyebrow="What We Stand For"
                    title="Core Values"
                    description="The principles that guide every decision we make"
                    align="center"
                    id="core-values-heading"
                />

                <div className="mt-14 grid items-stretch gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {values.map((value, index) => (
                        <Reveal key={value.title} delay={index * 80}>
                            <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-soft">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary-dark transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                                    <Icon name={value.icon} className="h-6 w-6" />
                                </div>
                                <h3 className="mt-5 text-xl font-bold text-foreground">{value.title}</h3>
                                <p className="mt-3 text-base leading-relaxed text-muted">
                                    {value.description}
                                </p>
                                <div className="mt-6 h-0.5 w-12 rounded-full bg-gradient-to-r from-primary to-accent opacity-60" />
                            </div>
                        </Reveal>
                    ))}
                </div>
            </Container>
        </section>
    );
}
