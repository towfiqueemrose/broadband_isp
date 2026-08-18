import { Head, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import AboutHero from '@/Components/About/AboutHero';
import BrandStory from '@/Components/About/BrandStory';
import CompanyIdentity from '@/Components/About/CompanyIdentity';
import MissionVision from '@/Components/About/MissionVision';
import CoreValues from '@/Components/About/CoreValues';
import CompanyStats from '@/Components/About/CompanyStats';
import Infrastructure from '@/Components/About/Infrastructure';
import ValueFlow from '@/Components/About/ValueFlow';
import CompanyJourney from '@/Components/About/CompanyJourney';
import Team from '@/Components/About/Team';
import Commitment from '@/Components/About/Commitment';
import AboutCTA from '@/Components/About/AboutCTA';

export default function About({ content, statistics }) {
    const { brand } = usePage().props;

    return (
        <PublicLayout>
            <Head>
                <title>About Us - {brand.name}</title>
                <meta name="description" content={`Learn about ${brand.name} - our story, mission, values, and commitment to providing premium fiber internet connectivity.`} />
            </Head>

            <AboutHero content={content.hero} />
            <BrandStory content={content.brandStory} />
            <CompanyIdentity content={content.companyIdentity} />
            <MissionVision mission={content.mission} vision={content.vision} />
            <CoreValues values={content.coreValues} />
            <CompanyStats stats={statistics} />
            <Infrastructure content={content.infrastructure} />
            <ValueFlow content={content.valueFlow} />
            <CompanyJourney content={content.journey} />
            <Team members={content.team} />
            <Commitment content={content.commitment} />
            <AboutCTA content={content.cta} />
        </PublicLayout>
    );
}
