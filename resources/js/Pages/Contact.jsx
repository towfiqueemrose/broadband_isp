import { Head, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import ContactFaq from '@/Components/Contact/ContactFaq';
import ContactForm from '@/Components/Contact/ContactForm';
import ContactInformation from '@/Components/Contact/ContactInformation';
import OfficeLocation from '@/Components/Contact/OfficeLocation';
import SalesTeam from '@/Components/Contact/SalesTeam';

export default function Contact({ content, information, faqs, prefill, salesTeam }) {
    const { brand } = usePage().props;

    return (
        <PublicLayout>
            <Head>
                <title>{`Contact Us - ${brand.name}`}</title>
                <meta
                    name="description"
                    content={`Reach ${brand.name} by phone, email, WhatsApp or live chat — plus a head office in Dhaka and 24/7 customer support.`}
                />
            </Head>
            <ContactInformation items={information} />
            <ContactForm content={content.form} prefill={prefill} />
            <SalesTeam members={salesTeam} />
            <ContactFaq faqs={faqs} />
            <OfficeLocation office={content.office} />
        </PublicLayout>
    );
}
