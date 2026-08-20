import Reveal from '@/Components/UI/Reveal';
import Container from '@/Components/UI/Container';
import Icon from '@/Components/UI/Icon';

export default function CompanyIdentity({ content }) {
    return (
        <section className="py-16 sm:py-20 lg:py-10" aria-labelledby="company-identity-heading">
            <Container>
                <div className="max-w-4xl mx-auto text-center">
                    <Reveal>
                        <h2
                            id="company-identity-heading"
                            className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl"
                        >
                            {content.title}
                        </h2>
                    </Reveal>

                    <Reveal delay={80}>
                        <p className="mt-5 text-base leading-relaxed text-muted sm:text-xl">
                            {content.description}
                        </p>
                    </Reveal>

                    <Reveal delay={160}>
                        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface p-6 text-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary-dark">
                                    <Icon name="zap" className="h-6 w-6" />
                                </div>
                                <span className="font-semibold text-foreground">Modern Technology</span>
                                <span className="text-sm text-muted">Cutting-edge fiber network</span>
                            </div>
                            <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface p-6 text-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary-dark">
                                    <Icon name="users" className="h-6 w-6" />
                                </div>
                                <span className="font-semibold text-foreground">Customer-First</span>
                                <span className="text-sm text-muted">Your experience matters</span>
                            </div>
                            <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface p-6 text-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary-dark">
                                    <Icon name="trending-up" className="h-6 w-6" />
                                </div>
                                <span className="font-semibold text-foreground">Continuous Growth</span>
                                <span className="text-sm text-muted">Always improving</span>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </Container>
        </section>
    );
}
