import { Head, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Hero from '@/Components/Home/Hero';
import StatsBar from '@/Components/Home/StatsBar';
import PackagePreview from '@/Components/Home/PackagePreview';
import WhyChooseUs from '@/Components/Home/WhyChooseUs';
import ServicesPreview from '@/Components/Home/ServicesPreview';
import Coverage from '@/Components/Home/Coverage';
import Promotion from '@/Components/Home/Promotion';
import NetworkTechnology from '@/Components/Home/NetworkTechnology';
import Testimonials from '@/Components/Home/Testimonials';
import FaqSection from '@/Components/Home/FaqSection';
import FinalCta from '@/Components/Home/FinalCta';

export default function Home({ hero, plans, stats, whyChooseUs, services, coverage, promotion, networkTech, testimonials, faqs, finalCta }) {
    const { brand, content } = usePage().props;

    return (
        <PublicLayout>
            <Head>
                <title>{brand.meta.title}</title>
                <meta name="description" content={brand.meta.description} />
            </Head>

            {hero ? <Hero hero={hero} /> : <Hero />}
            <StatsBar stats={stats} />
            <PackagePreview plans={plans} />
            <WhyChooseUs items={whyChooseUs} />
            <ServicesPreview services={services} />
            <Coverage coverage={coverage} />
            {promotion && <Promotion offer={promotion} />}
            <NetworkTechnology points={networkTech} />
            <Testimonials testimonials={testimonials} />
            <FaqSection faqs={faqs} />
            {finalCta ? <FinalCta cta={finalCta} /> : <FinalCta />}
        </PublicLayout>
    );
}
