import Container from '@/Components/UI/Container';
import EmptyState from '@/Components/UI/EmptyState';
import Icon from '@/Components/UI/Icon';
import Reveal from '@/Components/UI/Reveal';
import SectionHeading from '@/Components/UI/SectionHeading';

export default function Testimonials({ testimonials }) {
    return (
        <section className="section bg-background" aria-labelledby="testimonials-heading">
            <Container>
                <Reveal>
                    <SectionHeading
                        id="testimonials-heading"
                        eyebrow="Customer stories"
                        title="Trusted by homes and businesses alike"
                        description="4.9/5 average rating from 2,400+ verified customers across Bangladesh."
                    />
                </Reveal>

                {testimonials.length === 0 ? (
                    <EmptyState
                        title="No stories yet"
                        description="Customer reviews are being collected. Check back soon."
                        className="mt-16"
                    />
                ) : (
                    <div className="mt-16 grid gap-5 md:grid-cols-3">
                        {testimonials.map((testimonial, index) => (
                            <Reveal
                                key={testimonial.id}
                                delay={(index % 3) * 100}
                                className="h-full"
                            >
                                <figure className="flex h-full flex-col rounded-2xl border border-border bg-surface p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
                                    <div className="flex items-center gap-1 text-warning">
                                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                                            <Icon key={i} name="star" className="h-4 w-4" />
                                        ))}
                                    </div>

                                    <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-foreground">
                                        “{testimonial.quote}”
                                    </blockquote>

                                    <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                                        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-sm font-bold text-primary-dark">
                                            {testimonial.name
                                                .split(' ')
                                                .map((part) => part[0])
                                                .slice(0, 2)
                                                .join('')}
                                        </span>
                                        <div>
                                            <div className="text-sm font-semibold text-foreground">
                                                {testimonial.name}
                                            </div>
                                            <div className="mt-0.5 text-xs text-muted">
                                                {[testimonial.role, testimonial.location]
                                                    .filter(Boolean)
                                                    .join(' · ')}
                                            </div>
                                        </div>
                                    </figcaption>
                                </figure>
                            </Reveal>
                        ))}
                    </div>
                )}
            </Container>
        </section>
    );
}
