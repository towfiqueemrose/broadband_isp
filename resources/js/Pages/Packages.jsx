import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import Container from '@/Components/UI/Container';
import PackageHero from '@/Components/Packages/PackageHero';
import PackageCategories from '@/Components/Packages/PackageCategories';
import PackageGrid from '@/Components/Packages/PackageGrid';
import PackageComparison from '@/Components/Packages/PackageComparison';
import PackageRecommendation from '@/Components/Packages/PackageRecommendation';

export default function Packages() {
    const { categories, byCategory, plans, comparison, content } = usePage().props;
    const [activeType, setActiveType] = useState('all');

    const visiblePlans =
        activeType === 'all' ? plans : byCategory[activeType] ?? [];
    const comparisonPlans = activeType === 'all' ? comparison : visiblePlans;

    const onCategoryChange = (type) => {
        setActiveType(type);
    };

    return (
        <PublicLayout>
            <Head title="Internet Packages" />

            <PackageHero content={content.hero} />

            <section
                className="bg-background pb-8 sm:pb-10 lg:pb-12"
                aria-labelledby="packages-list-heading"
            >
                <Container>
                    <div className="mb-6">
                        <h2 id="packages-list-heading" className="sr-only">
                            Available packages
                        </h2>
                        <PackageCategories
                            categories={categories}
                            activeType={activeType}
                            allCount={plans?.length ?? 0}
                            onChange={onCategoryChange}
                            gridId="packages-grid"
                        />
                    </div>

                    <PackageGrid
                        key={activeType}
                        id="packages-grid"
                        plans={visiblePlans}
                        categories={categories}
                        activeType={activeType}
                    />
                </Container>
            </section>

            <PackageComparison plans={comparisonPlans} content={content.comparison} />

            <PackageRecommendation
                recommendations={content.recommendations}
                plans={comparison}
            />
        </PublicLayout>
    );
}