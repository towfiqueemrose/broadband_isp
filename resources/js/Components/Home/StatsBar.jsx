import { useCountUp } from '@/Hooks/useCountUp';
import { useInView } from '@/Hooks/useInView';
import { formatNumber } from '@/Utils/format';

function StatItem({ stat, start }) {
    const value = useCountUp(stat.value, { decimals: stat.decimals ?? 0, start });

    return (
        <div className="flex flex-col items-center justify-center gap-1.5 bg-surface px-6 py-10 text-center">
            <span className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {formatNumber(value, stat.decimals ?? 0)}
                <span className="text-primary">{stat.suffix}</span>
            </span>
            <span className="text-sm text-muted">{stat.label}</span>
        </div>
    );
}

export default function StatsBar({ stats }) {
    const { ref, inView } = useInView({ threshold: 0.3 });

    return (
        <section className="border-y border-border bg-background" aria-label="NexaLink at a glance">
            <div
                ref={ref}
                className="container-page grid grid-cols-2 gap-px overflow-hidden bg-border lg:grid-cols-4"
            >
                {stats.map((stat) => (
                    <StatItem key={stat.key} stat={stat} start={inView} />
                ))}
            </div>
        </section>
    );
}
