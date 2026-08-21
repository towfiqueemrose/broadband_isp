import { Head, Link, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Container from '@/Components/UI/Container';
import Reveal from '@/Components/UI/Reveal';
import LegalContent from '@/Components/Legal/LegalContent';

export default function Show({ page }) {
    const { brand } = usePage().props;

    const metaTitle = page.meta_title
        ? `${page.meta_title} - ${brand.name}`
        : `${page.title} - ${brand.name}`;

    const metaDescription = page.meta_description || `${page.title} for ${brand.name}`;

    return (
        <PublicLayout>
            <Head>
                <title>{metaTitle}</title>
                <meta name="description" content={metaDescription} />
            </Head>

            {/* Hero */}
            <section className="bg-background py-12 sm:py-16 lg:py-20">
                <Container>
                    <Reveal>
                        <div className="mx-auto max-w-3xl text-center">
                            <nav className="mb-6 text-sm text-muted">
                                <Link href={route('home')} className="hover:text-primary transition-colors">
                                    Home
                                </Link>
                                <span className="mx-2 text-border">/</span>
                                <span className="text-foreground font-medium">{page.title}</span>
                            </nav>

                            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                                {page.title}
                            </h1>

                            <p className="mt-4 text-base text-muted sm:text-lg">
                                Learn about our policies regarding your data and privacy.
                            </p>

                            <p className="mt-3 text-sm text-muted">
                                Last updated:{' '}
                                <time dateTime={page.updated_at}>
                                    {new Date(page.updated_at).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </time>
                            </p>
                        </div>
                    </Reveal>
                </Container>
            </section>

            {/* Content */}
            <section className="bg-background pb-16 sm:pb-20 lg:pb-24">
                <Container>
                    <Reveal delay={100}>
                        <LegalContent html={page.content} />
                    </Reveal>
                </Container>
            </section>
        </PublicLayout>
    );
}
