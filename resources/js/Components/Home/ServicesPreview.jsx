import Container from '@/Components/UI/Container';
import Icon from '@/Components/UI/Icon';
import Reveal from '@/Components/UI/Reveal';
import SectionHeading from '@/Components/UI/SectionHeading';

export default function ServicesPreview({ services }) {
    return (
        <section className="section bg-surface" aria-labelledby="services-heading">
            <Container>
                <Reveal>
                    <SectionHeading
                        id="services-heading"
                        eyebrow="What we offer"
                        title="More than just home internet"
                        description="From single flats to enterprise campuses, one network powers it all."
                    />
                </Reveal>

                <div className="mt-16 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((service, index) => (
                        <Reveal key={service.title} delay={(index % 3) * 80} className="h-full">
                            <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-background p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-card-hover">
                                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary-dark transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                                    <Icon name={service.icon} className="h-6 w-6" />
                                </span>
                                <h3 className="mt-5 text-lg font-semibold text-foreground">
                                    {service.title}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-muted">
                                    {service.description}
                                </p>
                                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                                    Learn more
                                    <Icon
                                        name="arrow-right"
                                        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                                    />
                                </span>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </Container>
        </section>
    );
}
