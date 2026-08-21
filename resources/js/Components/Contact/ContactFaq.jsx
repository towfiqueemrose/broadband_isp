import { useState } from 'react';
import Button from '@/Components/UI/Button';
import Container from '@/Components/UI/Container';
import EmptyState from '@/Components/UI/EmptyState';
import Icon from '@/Components/UI/Icon';
import Reveal from '@/Components/UI/Reveal';
import SectionHeading from '@/Components/UI/SectionHeading';
import { cn } from '@/Utils/cn';

function FaqItem({ faq, index, open, onToggle }) {
    const buttonId = `contact-faq-button-${faq.id}`;
    const panelId = `contact-faq-panel-${faq.id}`;

    return (
        <div
            className={cn(
                'rounded-2xl border bg-surface transition-colors duration-200',
                open ? 'border-primary/30 shadow-card' : 'border-border',
            )}
        >
            <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => onToggle(index)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
                <span className="text-base font-semibold text-foreground">{faq.question}</span>
                <span
                    className={cn(
                        'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300',
                        open
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
                    open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                )}
            >
                <div className="min-h-0 overflow-hidden">
                    <p className="px-6 pb-6 text-sm leading-relaxed text-muted">{faq.answer}</p>
                </div>
            </div>
        </div>
    );
}

export default function ContactFaq({ faqs }) {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section className="bg-surface" aria-labelledby="contact-faq-heading">
            <Container className="py-8 sm:py-10 lg:py-12">
                <div className="grid items-start gap-12 text-center sm:text-left lg:grid-cols-12 lg:gap-16 lg:text-left">
                    <div className="lg:col-span-4">
                        <Reveal>
                            <SectionHeading
                                align="left"
                                id="contact-faq-heading"
                                eyebrow="Before you reach out"
                                title="Quick answers, no wait"
                                description="A few things customers ask us before contacting support. Still curious? We are one message away."
                            />
                        </Reveal>
                        <Reveal delay={100}>
                            <div className="mt-8">
                                <Button href={route('faq.index')} variant="outline">
                                    View all FAQs
                                    <Icon name="arrow-right" className="h-4 w-4" />
                                </Button>
                            </div>
                        </Reveal>
                    </div>

                    <div className="lg:col-span-8">
                        {faqs.length === 0 ? (
                            <EmptyState
                                icon="chat"
                                title="No FAQs yet"
                                description="We are preparing answers to common questions. Feel free to ask us directly instead."
                            />
                        ) : (
                            <div className="space-y-3">
                                {faqs.map((faq, index) => (
                                    <Reveal key={faq.id} delay={index * 60}>
                                        <FaqItem
                                            faq={faq}
                                            index={index}
                                            open={openIndex === index}
                                            onToggle={setOpenIndex}
                                        />
                                    </Reveal>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </section>
    );
}