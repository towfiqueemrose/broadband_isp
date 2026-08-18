import { useState } from 'react';
import Button from '@/Components/UI/Button';
import Container from '@/Components/UI/Container';
import Icon from '@/Components/UI/Icon';
import Reveal from '@/Components/UI/Reveal';
import SectionHeading from '@/Components/UI/SectionHeading';
import { cn } from '@/Utils/cn';

function FaqItem({ faq, index, open, onToggle }) {
    const buttonId = `faq-button-${faq.id}`;
    const panelId = `faq-panel-${faq.id}`;

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
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
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

export default function FaqSection({ faqs }) {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section className="section bg-surface" aria-labelledby="faq-heading">
            <Container>
                <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                    <div className="lg:col-span-4">
                        <SectionHeading
                            align="left"
                            id="faq-heading"
                            eyebrow="FAQ"
                            title="Questions, answered"
                            description="A few things customers ask us most. Still curious? Our team is one call away."
                        />
                        <div className="mt-8">
                            <Button href={route('faq.index')} variant="outline">
                                View all FAQs
                                <Icon name="arrow-right" className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-3 lg:col-span-8">
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
                </div>
            </Container>
        </section>
    );
}
