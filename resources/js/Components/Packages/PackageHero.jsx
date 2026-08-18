import Container from '@/Components/UI/Container';
import Reveal from '@/Components/UI/Reveal';

export default function PackageHero({ content }) {
    return (
        <section className="relative overflow-hidden" aria-labelledby="packages-hero-heading">
            <div className="absolute inset-0" aria-hidden="true">
                <div className="absolute inset-0 bg-[radial-gradient(50%_55%_at_18%_0%,var(--primary-soft),transparent_60%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(40%_45%_at_90%_10%,var(--primary-soft),transparent_55%)]" />
                <div
                    className="absolute inset-0 opacity-40"
                    style={{
                        backgroundImage: 'radial-gradient(var(--border) 1px, transparent 1px)',
                        backgroundSize: '30px 30px',
                    }}
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
            </div>

            <Container className="relative pb-5 pt-8 text-center sm:pb-6 sm:pt-10 lg:pt-12">
                <Reveal>
                    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground backdrop-blur">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {content.eyebrow}
                    </span>
                </Reveal>

                <Reveal delay={80}>
                    <h1
                        id="packages-hero-heading"
                        className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem]"
                    >
                        {content.title}
                    </h1>
                </Reveal>

                <Reveal delay={160}>
                    <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                        {content.description}
                    </p>
                </Reveal>
            </Container>
        </section>
    );
}