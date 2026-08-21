import Reveal from '@/Components/UI/Reveal';
import { cn } from '@/Utils/cn';

export default function BrandStory({ content }) {
    return (
        <section className="relative overflow-hidden bg-transparent" aria-labelledby="brand-story-heading">
            <div className="container-page relative pt-4 pb-8 sm:pt-6 sm:pb-10 lg:pt-8 lg:pb-12">
                {/* Centered layout */}
                <div className="mx-auto max-w-3xl text-center">
                    <Reveal>
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-muted">
                            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                            {content.eyebrow}
                        </div>
                    </Reveal>

                    <Reveal delay={80}>
                        <h2
                            id="brand-story-heading"
                            className="text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]"
                        >
                            {content.title}
                        </h2>
                    </Reveal>

                    <Reveal delay={160}>
                        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                            {content.description}
                        </p>
                    </Reveal>

                    <Reveal delay={240}>
                        <blockquote className="relative mx-auto mt-10 max-w-xl">
                            <div className="absolute -left-4 -top-4 text-6xl font-black text-primary/15 select-none">&ldquo;</div>
                            <p className="relative text-xl font-semibold leading-relaxed text-foreground sm:text-2xl">
                                {content.highlight}
                            </p>
                            <div className="mt-4 flex items-center justify-center gap-2">
                                <span className="h-px w-8 bg-primary/30" />
                                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                                <span className="h-px w-8 bg-primary/30" />
                            </div>
                        </blockquote>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
