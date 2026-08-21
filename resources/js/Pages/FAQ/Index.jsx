import { useState, useMemo, useCallback, useEffect } from 'react';
import { Head, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Container from '@/Components/UI/Container';
import Button from '@/Components/UI/Button';
import Icon from '@/Components/UI/Icon';
import Reveal from '@/Components/UI/Reveal';
import { cn } from '@/Utils/cn';

/* ─── Accordion Item ─── */
function AccordionItem({ faq, isOpen, onToggle }) {
    const buttonId = `faq-q-${faq.id}`;
    const panelId = `faq-a-${faq.id}`;

    return (
        <div
            className={cn(
                'rounded-2xl border bg-surface transition-all duration-200',
                isOpen ? 'border-primary/30 shadow-card' : 'border-border hover:border-border/80',
            )}
        >
            <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={onToggle}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
                <span className="text-base font-semibold text-foreground">{faq.question}</span>
                <span
                    className={cn(
                        'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300',
                        isOpen
                            ? 'rotate-180 border-primary bg-primary-soft text-primary-dark'
                            : 'border-border text-muted',
                    )}
                >
                    <Icon name="chevron-down" className="h-4 w-4" />
                </span>
            </button>

            <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className={cn(
                    'grid transition-[grid-template-rows] duration-300 ease-out',
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                )}
            >
                <div className="min-h-0 overflow-hidden">
                    <div className="px-6 pb-6 text-sm leading-relaxed text-muted whitespace-pre-line">
                        {faq.answer}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ─── Hero ─── */
function FAQHero() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pt-16 pb-12 sm:pt-20 sm:pb-16">
            <div className="absolute inset-0" aria-hidden="true">
                <div className="absolute -right-40 -top-40 h-[400px] w-[400px] rounded-full bg-primary/8 blur-3xl" />
                <div className="absolute -left-32 bottom-0 h-[300px] w-[300px] rounded-full bg-accent/5 blur-3xl" />
            </div>

            <Container className="relative">
                <Reveal>
                    <div className="mx-auto max-w-2xl text-center">
                        <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary-dark">
                            <Icon name="headset" className="h-3.5 w-3.5" />
                            Help Center
                        </span>
                        <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl">
                            How can we help you?
                        </h1>
                        <p className="mt-5 text-lg leading-relaxed text-muted">
                            Find answers to common questions about our internet services, packages, billing, and support.
                        </p>
                    </div>
                </Reveal>
            </Container>
        </section>
    );
}

/* ─── Search ─── */
function FAQSearch({ value, onChange, resultCount, totalCount }) {
    return (
        <Reveal delay={80}>
            <div className="mx-auto max-w-2xl">
                <div className="relative">
                    <Icon name="search" className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="Search for answers..."
                        className="w-full rounded-2xl border border-border bg-surface py-4 pl-12 pr-12 text-base text-foreground placeholder-muted transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                    />
                    {value && (
                        <button
                            type="button"
                            onClick={() => onChange('')}
                            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-lg p-1 text-muted hover:bg-surface-2 hover:text-foreground transition-colors"
                        >
                            <Icon name="x" className="h-4 w-4" />
                        </button>
                    )}
                </div>
                {value && (
                    <p className="mt-3 text-center text-sm text-muted">
                        Showing <span className="font-medium text-foreground">{resultCount}</span> result{resultCount !== 1 ? 's' : ''} for &ldquo;{value}&rdquo;
                    </p>
                )}
            </div>
        </Reveal>
    );
}

/* ─── Categories ─── */
function FAQCategories({ categories, active, onSelect }) {
    return (
        <Reveal delay={120}>
            <div className="flex flex-wrap justify-center gap-2">
                <button
                    type="button"
                    onClick={() => onSelect(null)}
                    className={cn(
                        'rounded-full px-5 py-2 text-sm font-medium transition-all duration-200',
                        active === null
                            ? 'bg-primary text-primary-foreground shadow-soft'
                            : 'bg-surface border border-border text-muted hover:border-primary/30 hover:text-foreground',
                    )}
                >
                    All Questions
                </button>
                {categories.map((cat) => (
                    <button
                        key={cat}
                        type="button"
                        onClick={() => onSelect(cat)}
                        className={cn(
                            'rounded-full px-5 py-2 text-sm font-medium transition-all duration-200',
                            active === cat
                                ? 'bg-primary text-primary-foreground shadow-soft'
                                : 'bg-surface border border-border text-muted hover:border-primary/30 hover:text-foreground',
                        )}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </Reveal>
    );
}

/* ─── Popular Questions ─── */
function PopularQuestions({ faqs, openIds, onToggle }) {
    if (!faqs || faqs.length === 0) return null;

    return (
        <section className="section" aria-labelledby="popular-heading">
            <Container>
                <Reveal>
                    <div className="mb-8 text-center">
                        <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent">
                            <Icon name="sparkles" className="h-3 w-3" />
                            Most Asked
                        </span>
                        <h2 id="popular-heading" className="text-2xl font-bold text-foreground">
                            Popular Questions
                        </h2>
                    </div>
                </Reveal>

                <div className="mx-auto max-w-3xl space-y-3">
                    {faqs.map((faq) => (
                        <Reveal key={faq.id} delay={60}>
                            <AccordionItem
                                faq={faq}
                                isOpen={openIds.has(faq.id)}
                                onToggle={() => onToggle(faq.id)}
                            />
                        </Reveal>
                    ))}
                </div>
            </Container>
        </section>
    );
}

/* ─── Empty State ─── */
function FAQEmptyState({ query, onClear }) {
    return (
        <Reveal>
            <div className="mx-auto max-w-md py-16 text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-2">
                    <Icon name="search" className="h-7 w-7 text-muted" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                    No results found
                </h3>
                <p className="mt-2 text-sm text-muted">
                    We couldn&apos;t find any questions matching &ldquo;{query}&rdquo;. Try a different search term or browse all questions.
                </p>
                <div className="mt-6 flex items-center justify-center gap-3">
                    <Button onClick={onClear} variant="outline" size="sm">
                        Clear Search
                    </Button>
                    <Button href={route('contact.index')} variant="primary" size="sm">
                        Contact Support
                    </Button>
                </div>
            </div>
        </Reveal>
    );
}

/* ─── FAQ List by Category ─── */
function FAQListByCategory({ faqs, activeCategory, openIds, onToggle }) {
    const grouped = useMemo(() => {
        const map = {};
        faqs.forEach((faq) => {
            const cat = faq.category || 'General';
            if (!map[cat]) map[cat] = [];
            map[cat].push(faq);
        });
        return map;
    }, [faqs]);

    const displayCategories = useMemo(() => {
        if (activeCategory) {
            return grouped[activeCategory] ? [{ name: activeCategory, items: grouped[activeCategory] }] : [];
        }
        return Object.entries(grouped).map(([name, items]) => ({ name, items }));
    }, [grouped, activeCategory]);

    const leftItems  = displayCategories.filter((_, i) => i % 2 === 0);
    const rightItems = displayCategories.filter((_, i) => i % 2 !== 0);
    const isSingleColumn = rightItems.length === 0;

    return (
        <div className={`flex flex-col gap-8 lg:flex-row lg:items-start ${isSingleColumn ? 'lg:justify-center' : ''}`}>
            {/* Left column */}
            <div className={`flex flex-col gap-8 ${isSingleColumn ? 'lg:w-1/2 mx-auto' : 'lg:flex-1'}`}>
                {leftItems.map(({ name, items }) => (
                    <Reveal key={name}>
                        <div>
                            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
                                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                                {name}
                            </h3>
                            <div className="space-y-2">
                                {items.map((faq) => (
                                    <AccordionItem
                                        key={faq.id}
                                        faq={faq}
                                        isOpen={openIds.has(faq.id)}
                                        onToggle={() => onToggle(faq.id)}
                                    />
                                ))}
                            </div>
                        </div>
                    </Reveal>
                ))}
            </div>

            {/* Right column — only render when it has content */}
            {!isSingleColumn && (
                <div className="flex flex-col gap-8 lg:flex-1">
                    {rightItems.map(({ name, items }) => (
                        <Reveal key={name}>
                            <div>
                                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
                                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                                    {name}
                                </h3>
                                <div className="space-y-2">
                                    {items.map((faq) => (
                                        <AccordionItem
                                            key={faq.id}
                                            faq={faq}
                                            isOpen={openIds.has(faq.id)}
                                            onToggle={() => onToggle(faq.id)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            )}
        </div>
    );
}

/* ─── Support CTA ─── */
function FAQSupportCTA() {
    return (
        <section className="section bg-surface" aria-labelledby="support-heading">
            <Container>
                <Reveal>
                    <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/5 via-surface to-accent/5 p-8 sm:p-12 text-center">
                        <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/8 blur-3xl" aria-hidden="true" />
                        <div className="absolute -left-16 -bottom-16 h-32 w-32 rounded-full bg-accent/5 blur-3xl" aria-hidden="true" />

                        <div className="relative">
                            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft">
                                <Icon name="headset" className="h-7 w-7 text-primary-dark" />
                            </div>
                            <h2 id="support-heading" className="text-2xl font-bold text-foreground sm:text-3xl">
                                Still need help?
                            </h2>
                            <p className="mx-auto mt-3 max-w-md text-muted">
                                Our support team is ready to assist you with any questions about our services.
                            </p>
                            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                                <Button href={route('contact.index')} variant="primary" size="lg">
                                    Contact Support
                                    <Icon name="arrow-right" className="h-4 w-4" />
                                </Button>
                                <Button href="tel:+8801700000000" variant="outline" size="lg">
                                    <Icon name="phone" className="h-4 w-4" />
                                    Call Us
                                </Button>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </Container>
        </section>
    );
}

/* ─── Main Page ─── */
export default function FAQIndex({ faqs = [], popular = [], categories = [] }) {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState(null);
    const [openIds, setOpenIds] = useState(new Set());

    // Sync category from URL
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const cat = params.get('category');
        if (cat && categories.includes(cat)) {
            setActiveCategory(cat);
        }
    }, []);

    const toggleFAQ = useCallback((id) => {
        setOpenIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    }, []);

    const filteredFaqs = useMemo(() => {
        let result = faqs;
        if (search.trim()) {
            const q = search.toLowerCase();
            result = result.filter(
                (faq) =>
                    faq.question.toLowerCase().includes(q) ||
                    faq.answer.toLowerCase().includes(q) ||
                    (faq.category && faq.category.toLowerCase().includes(q)),
            );
        }
        return result;
    }, [faqs, search]);

    const handleCategorySelect = useCallback((cat) => {
        setActiveCategory(cat);
        // Update URL without reload
        const url = new URL(window.location);
        if (cat) {
            url.searchParams.set('category', cat);
        } else {
            url.searchParams.delete('category');
        }
        window.history.replaceState({}, '', url);
    }, []);

    const handleClearSearch = useCallback(() => {
        setSearch('');
        setActiveCategory(null);
        setOpenIds(new Set());
    }, []);

    const isSearching = search.trim().length > 0;
    const showPopular = !isSearching && !activeCategory;

    return (
        <PublicLayout>
            <Head>
                <title>FAQ — Help Center</title>
                <meta name="description" content="Find answers to frequently asked questions about our internet services, packages, billing, technical support, and more." />
            </Head>

            {/* Hero */}
            <FAQHero />

            {/* Search */}
            <section className="relative -mt-6 z-10">
                <Container>
                    <FAQSearch
                        value={search}
                        onChange={setSearch}
                        resultCount={filteredFaqs.length}
                        totalCount={faqs.length}
                    />
                </Container>
            </section>

            {/* Popular Questions */}
            {showPopular && (
                <PopularQuestions faqs={popular} openIds={openIds} onToggle={toggleFAQ} />
            )}

            {/* Categories + FAQ List */}
            <section className="section" aria-labelledby="faq-browse-heading">
                <Container>
                    <Reveal>
                        <div className="mb-8 text-center">
                            <h2 id="faq-browse-heading" className="text-2xl font-bold text-foreground">
                                {activeCategory ? activeCategory : 'Browse All Questions'}
                            </h2>
                        </div>
                    </Reveal>

                    {!isSearching && (
                        <div className="mb-8">
                            <FAQCategories
                                categories={categories}
                                active={activeCategory}
                                onSelect={handleCategorySelect}
                            />
                        </div>
                    )}

                    {filteredFaqs.length === 0 ? (
                        <FAQEmptyState query={search} onClear={handleClearSearch} />
                    ) : (
                        <FAQListByCategory
                            faqs={filteredFaqs}
                            activeCategory={activeCategory}
                            openIds={openIds}
                            onToggle={toggleFAQ}
                        />
                    )}
                </Container>
            </section>


        </PublicLayout>
    );
}
