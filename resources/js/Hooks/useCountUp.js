import { useEffect, useState } from 'react';

export function useCountUp(target, { duration = 1400, decimals = 0, start = false } = {}) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (!start) return undefined;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setValue(target);

            return undefined;
        }

        let frame;

        const t0 = performance.now();

        const tick = (now) => {
            const progress = Math.min((now - t0) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);

            setValue(Number((target * eased).toFixed(decimals)));

            if (progress < 1) {
                frame = requestAnimationFrame(tick);
            }
        };

        frame = requestAnimationFrame(tick);

        return () => cancelAnimationFrame(frame);
    }, [start, target, duration, decimals]);

    return value;
}
