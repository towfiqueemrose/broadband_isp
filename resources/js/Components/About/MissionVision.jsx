import Reveal from '@/Components/UI/Reveal';
import Container from '@/Components/UI/Container';
import Icon from '@/Components/UI/Icon';

export default function MissionVision({ mission, vision }) {
    return (
        <section className="bg-surface-2 py-16 sm:py-20 lg:py-24" aria-label="Mission and Vision">
            <Container>
                <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                    <Reveal>
                        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-8 lg:p-10">
                            <div className="absolute top-6 left-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary-dark">
                                <Icon name="target" className="h-6 w-6" />
                            </div>
                            <h3 className="mt-2 text-xl font-bold leading-tight text-foreground sm:text-2xl">
                                {mission.title}
                            </h3>
                            <p className="mt-4 text-base leading-relaxed text-muted">
                                {mission.description}
                            </p>
                            <div className="mt-6 h-0.5 w-16 rounded-full bg-gradient-to-r from-primary to-accent" />
                        </div>
                    </Reveal>

                    <Reveal delay={100}>
                        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-8 lg:p-10">
                            <div className="absolute top-6 left-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary-dark">
                                <Icon name="eye" className="h-6 w-6" />
                            </div>
                            <h3 className="mt-2 text-xl font-bold leading-tight text-foreground sm:text-2xl">
                                {vision.title}
                            </h3>
                            <p className="mt-4 text-base leading-relaxed text-muted">
                                {vision.description}
                            </p>
                            <div className="mt-6 h-0.5 w-16 rounded-full bg-gradient-to-r from-primary to-accent" />
                        </div>
                    </Reveal>
                </div>
            </Container>
        </section>
    );
}
