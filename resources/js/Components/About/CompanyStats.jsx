import { useCountUp } from '@/Hooks/useCountUp';
import { useInView } from '@/Hooks/useInView';
import { formatNumber } from '@/Utils/format';
import Reveal from '@/Components/UI/Reveal';
import Container from '@/Components/UI/Container';
import SectionHeading from '@/Components/UI/SectionHeading';

function StatItem({ stat, start }) {
    const value = useCountUp(stat.value, { decimals: stat.decimals ?? 0, start });

    return (
        <div className="flex flex-col items-center justify-center gap-4 bg-surface px-8 py-10 text-center transition-all duration-300 hover:shadow-soft hover:scale-105">
            <span className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {formatNumber(value, stat.decimals ?? 0)}
                <span className="text-primary">{stat.suffix}</span>
            </span>
            <span className="text-sm font-medium text-muted">{stat.label}</span>
        </div>
    );
}

export default function CompanyStats({ stats }) {
    const { ref, inView } = useInView({ threshold: 0.3 });

    return (
        <section
            className="border-y border-border bg-background py-16 sm:py-20 lg:py-10"
            aria-label="Company Statistics"
        >
            <Container>
                <Reveal>
                    <SectionHeading
                        eyebrow="By The Numbers"
                        title="Our Impact"
                        description="The scale of our commitment to better connectivity"
                        align="center"
                    />
                </Reveal>

                <div
                    ref={ref}
                    className="mt-14 grid grid-cols-2 gap-px overflow-hidden border border-border md:grid-cols-3 lg:grid-cols-5"
                >
                    {stats.map((stat) => (
                        <StatItem key={stat.key} stat={stat} start={inView} />
                    ))}
                </div>
            </Container>
        </section>
    );
}
