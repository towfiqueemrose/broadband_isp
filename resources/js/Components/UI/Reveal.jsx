import { useEffect, useRef, useState } from 'react';
import { cn } from '@/Utils/cn';

export default function Reveal({ children, className, delay = 0, as: Tag = 'div' }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;

        if (!el) return undefined;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setVisible(true);

            return undefined;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 },
        );

        observer.observe(el);

        return () => observer.disconnect();
    }, []);

    return (
        <Tag
            ref={ref}
            className={cn(
                'transition-all duration-700 ease-out will-change-transform',
                visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
                className,
            )}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </Tag>
    );
}
