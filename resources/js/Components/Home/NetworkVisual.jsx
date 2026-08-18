import { usePage } from '@inertiajs/react';
import Icon from '@/Components/UI/Icon';

const nodes = [
    { x: 70, y: 100, tone: 'primary' },
    { x: 160, y: 55, tone: 'accent' },
    { x: 255, y: 80, tone: 'primary' },
    { x: 330, y: 150, tone: 'accent' },
    { x: 295, y: 245, tone: 'primary' },
    { x: 175, y: 235, tone: 'accent' },
    { x: 85, y: 205, tone: 'primary' },
    { x: 230, y: 150, tone: 'primary' },
];

const links = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 6],
    [6, 0],
    [1, 7],
    [2, 7],
    [7, 4],
    [7, 5],
    [0, 7],
];

const toneStyles = {
    primary: 'var(--primary)',
    accent: 'var(--accent)',
};

export default function NetworkVisual() {
    const { brand } = usePage().props;

    return (
        <div className="relative">
            <div className="relative overflow-hidden rounded-3xl border border-border bg-surface/70 shadow-lift backdrop-blur">
                <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
                    <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-error" />
                        <span className="h-2.5 w-2.5 rounded-full bg-warning" />
                        <span className="h-2.5 w-2.5 rounded-full bg-success" />
                    </div>
                    <span className="text-xs font-medium text-muted">{brand.name} Core · Live</span>
                </div>

                <div className="relative px-6 pb-10 pt-8">
                    <svg viewBox="0 0 400 320" className="h-auto w-full" aria-hidden="true">
                        <defs>
                            <radialGradient id="hero-glow" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.14" />
                                <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                            </radialGradient>
                        </defs>

                        <circle cx="200" cy="160" r="150" fill="url(#hero-glow)" />

                        {links.map(([a, b], i) => (
                            <line
                                key={`${a}-${b}`}
                                x1={nodes[a].x}
                                y1={nodes[a].y}
                                x2={nodes[b].x}
                                y2={nodes[b].y}
                                stroke="var(--border)"
                                strokeWidth="1.5"
                                strokeDasharray={i % 3 === 0 ? '5 6' : undefined}
                            />
                        ))}

                        {nodes.map((node, i) => (
                            <g key={`node-${i}`}>
                                {node.tone === 'primary' ? (
                                    <circle
                                        cx={node.x}
                                        cy={node.y}
                                        r="13"
                                        fill="var(--primary)"
                                        opacity="0.12"
                                    />
                                ) : null}
                                <circle
                                    cx={node.x}
                                    cy={node.y}
                                    r={node.tone === 'primary' ? 5 : 4}
                                    fill={toneStyles[node.tone]}
                                    stroke="var(--surface)"
                                    strokeWidth="2"
                                />
                            </g>
                        ))}
                    </svg>

                    <div className="absolute left-4 top-1/3 flex items-center gap-2.5 rounded-xl border border-border bg-surface/85 px-3.5 py-2.5 shadow-lift backdrop-blur">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary-soft text-primary-dark">
                            <Icon name="bolt" className="h-4 w-4" />
                        </span>
                        <div>
                            <div className="text-sm font-bold leading-none text-foreground">
                                100 Mbps
                            </div>
                            <div className="mt-1 text-[11px] text-muted">Download speed</div>
                        </div>
                    </div>

                    <div className="absolute bottom-8 right-4 flex items-center gap-2.5 rounded-xl border border-border bg-surface/85 px-3.5 py-2.5 shadow-lift backdrop-blur">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-success/10 text-success">
                            <Icon name="activity" className="h-4 w-4" />
                        </span>
                        <div>
                            <div className="text-sm font-bold leading-none text-foreground">8 ms</div>
                            <div className="mt-1 text-[11px] text-muted">Ping</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
