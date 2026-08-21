import { Head, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Hero from '@/Components/Home/Hero';
import PackagePreview from '@/Components/Home/PackagePreview';
import WhyChooseUs from '@/Components/Home/WhyChooseUs';
import ServicesPreview from '@/Components/Home/ServicesPreview';
import Promotion from '@/Components/Home/Promotion';
import FaqSection from '@/Components/Home/FaqSection';
import FinalCta from '@/Components/Home/FinalCta';

export default function Home({ hero, plans, whyChooseUs, services, promotion, testimonials, faqs, finalCta }) {
    const { brand, content } = usePage().props;

    return (
        <PublicLayout>
            <Head>
                <title>{brand.meta.title}</title>
                <meta name="description" content={brand.meta.description} />
            </Head>

            {hero ? <Hero hero={hero} /> : <Hero />}
            <PackagePreview plans={plans} />
            <WhyChooseUs items={whyChooseUs} />
            <ServicesPreview services={services} />
            {promotion && <Promotion offer={promotion} />}
            <FaqSection faqs={faqs} />
        </PublicLayout>
    );
}
