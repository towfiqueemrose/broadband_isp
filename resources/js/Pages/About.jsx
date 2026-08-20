import { Head, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import BrandStory from '@/Components/About/BrandStory';
import CompanyIdentity from '@/Components/About/CompanyIdentity';
import CoreValues from '@/Components/About/CoreValues';
import CompanyJourney from '@/Components/About/CompanyJourney';
import Team from '@/Components/About/Team';
import Commitment from '@/Components/About/Commitment';

export default function About({ content }) {
    const { brand } = usePage().props;

    return (
        <PublicLayout>
            <Head>
                <title>{`About Us - ${brand.name}`}</title>
                <meta name="description" content={`Learn about ${brand.name} - our story, mission, values, and commitment to providing premium fiber internet connectivity.`} />
            </Head>

            <BrandStory content={content.brandStory} />
            <CompanyIdentity content={content.companyIdentity} />
            <CoreValues values={content.coreValues} />
            <CompanyJourney content={content.journey} />
            <Team members={content.team} />
        </PublicLayout>
    );
}
