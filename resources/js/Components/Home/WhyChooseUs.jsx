import Button from '@/Components/UI/Button';
import Container from '@/Components/UI/Container';
import Icon from '@/Components/UI/Icon';
import Reveal from '@/Components/UI/Reveal';
import SectionHeading from '@/Components/UI/SectionHeading';
import { cn } from '@/Utils/cn';

export default function WhyChooseUs({ items }) {
    return (
        <section className="bg-ink" aria-labelledby="why-heading">
            <div className="container-page section">
                <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
                    <div className="lg:col-span-5">
                        <div className="lg:sticky lg:top-32">
                            <SectionHeading
                                dark
                                align="left"
                                id="why-heading"
                                eyebrow="Why NexaLink"
                                title="Built different, because your connection matters"
                                description="We obsess over the details most ISPs ignore — real speeds, real uptime and support that doesn't make you wait."
                            />
                            <div className="mt-8">
                                <Button href={route('about.index')} variant="white">
                                    More about us
                                    <Icon name="arrow-right" className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="grid items-stretch gap-4 sm:grid-cols-2 lg:col-span-7">
                        {items.map((item, index) => (
                            <Reveal
                                key={item.title}
                                delay={index * 80}
                                className={cn(
                                    'rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors duration-300 hover:border-primary/40 hover:bg-white/[0.08]',
                                    index % 2 === 1 && 'sm:translate-y-8',
                                )}
                            >
                                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-soft">
                                    <Icon name={item.icon} className="h-5 w-5" />
                                </span>
                                <h3 className="mt-4 text-lg font-semibold text-white">
                                    {item.title}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-white/60">
                                    {item.description}
                                </p>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
