import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import Button from '@/Components/UI/Button';
import Container from '@/Components/UI/Container';
import Icon from '@/Components/UI/Icon';
import PackageHero from '@/Components/Packages/PackageHero';
import PackageCategories from '@/Components/Packages/PackageCategories';
import PackageGrid from '@/Components/Packages/PackageGrid';
import PackageComparison from '@/Components/Packages/PackageComparison';
import PackageRecommendation from '@/Components/Packages/PackageRecommendation';

export default function Packages() {
    const { categories, byCategory, plans, comparison, content } = usePage().props;
    const { brand } = usePage().props;
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
                className="bg-background pb-16 sm:pb-20 lg:pb-24"
                aria-labelledby="packages-list-heading"
            >
                <Container>
                    <div className="mb-12">
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

            <section className="bg-ink" aria-labelledby="packages-cta-heading">
                <div className="container-page section">
                    <div className="flex flex-col items-center justify-between gap-8 rounded-3xl border border-white/10 bg-white/[0.04] px-8 py-10 text-center sm:px-12 lg:flex-row lg:text-left">
                        <div>
                            <h2
                                id="packages-cta-heading"
                                className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
                            >
                                Still deciding? Talk to a {brand.name} expert.
                            </h2>
                            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
                                Tell us how you use the internet and we'll recommend the right
                                speed for your home or business.
                            </p>
                        </div>
                        <Button href={route('contact.index')} variant="white" size="lg" className="shrink-0">
                            Get in touch
                            <Icon name="arrow-up-right" className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}