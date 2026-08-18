import EmptyState from '@/Components/UI/EmptyState';
import Reveal from '@/Components/UI/Reveal';
import PackageCard from '@/Components/Packages/PackageCard';
import PackageCardSkeleton from '@/Components/Packages/PackageCardSkeleton';

export default function PackageGrid({ plans, categories, activeType, id }) {
    const categoryLabel = (type) =>
        categories.find((category) => category.type === type)?.label;

    if (plans === undefined) {
        return (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3" aria-hidden="true">
                {Array.from({ length: 3 }).map((_, index) => (
                    <PackageCardSkeleton key={index} />
                ))}
            </div>
        );
    }

    if (plans.length === 0) {
        return (
            <EmptyState
                icon="layers"
                title="No packages available right now"
                description="We're updating our packages. Check back soon or contact our team — we'll help you find the right connection."
                className="mt-10"
            />
        );
    }

    return (
        <div id={id} className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {plans.map((plan, index) => (
                <Reveal key={`${activeType}-${plan.id}`} delay={(index % 3) * 100} className="h-full">
                    <PackageCard plan={plan} categoryLabel={categoryLabel(plan.type)} />
                </Reveal>
            ))}
        </div>
    );
}