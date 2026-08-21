import { useForm } from '@inertiajs/react';
import { useRef } from 'react';
import Button from '@/Components/UI/Button';
import Container from '@/Components/UI/Container';
import Field, { controlClasses } from '@/Components/UI/Field';
import Icon from '@/Components/UI/Icon';
import Reveal from '@/Components/UI/Reveal';
import SectionHeading from '@/Components/UI/SectionHeading';

export default function ContactForm({ content, prefill }) {
    const formRef = useRef(null);
    const form = useForm({
        name: '',
        phone: '',
        email: '',
        subject: prefill?.plan ? 'package' : (content.subjects?.[0]?.value ?? 'general'),
        message: prefill?.plan ? `I'm interested in the ${prefill.plan.name} package.` : '',
    });

    const submit = (event) => {
        event.preventDefault();

        form.post(route('contact.store'), {
            preserveScroll: true,
            onSuccess: () => form.reset(),
            onError: () => {
                formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            },
        });
    };

    const success = form.wasSuccessful;

    return (
        <section className="border-y border-border bg-surface" aria-labelledby="contact-form-heading">
            <Container className="py-8 sm:py-10 lg:py-12">
                <div className="grid items-start gap-12 text-center sm:text-left lg:grid-cols-12 lg:gap-16 lg:text-left">
                    <div className="lg:col-span-5">
                        <div className="lg:sticky lg:top-32">
                            <Reveal>
                                <SectionHeading
                                    align="left"
                                    id="contact-form-heading"
                                    eyebrow={content.eyebrow}
                                    title={content.title}
                                    description={content.description}
                                />
                            </Reveal>

                            <Reveal delay={100}>
                                <div className="mt-8 rounded-2xl border border-border bg-background p-6">
                                    <div className="flex items-center gap-3">
                                        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary-dark">
                                            <Icon name="headset" className="h-5 w-5" />
                                        </span>
                                        <p className="text-sm leading-relaxed text-muted">
                                            In a hurry? Our support hotline answers 24/7. Your
                                            message gets a reply within a few business hours.
                                        </p>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>

                    <div className="lg:col-span-7">
                        <Reveal delay={80}>
                            <form
                                ref={formRef}
                                onSubmit={submit}
                                noValidate
                                className="rounded-3xl border border-border bg-background p-6 shadow-card sm:p-8"
                            >
                                {success ? (
                                    <div
                                        role="status"
                                        className="mb-6 flex items-start gap-3 rounded-2xl border border-success/30 bg-success/10 p-4 text-sm leading-relaxed text-success"
                                    >
                                        <Icon name="check-circle" className="mt-0.5 h-5 w-5 shrink-0" />
                                        <span>
                                            Thanks — your message has been sent. Our team will get
                                            back to you shortly.
                                        </span>
                                    </div>
                                ) : null}

                                {prefill?.plan ? (
                                    <p className="mb-6 flex items-start gap-2 rounded-2xl border border-primary/25 bg-primary-soft px-4 py-3 text-sm leading-relaxed text-primary-dark">
                                        <Icon name="bolt" className="mt-0.5 h-4 w-4 shrink-0" />
                                        <span>
                                            You're asking about the{' '}
                                            <strong className="font-semibold">{prefill.plan.name}</strong>{' '}
                                            package — we've pre-filled the subject for you.
                                        </span>
                                    </p>
                                ) : null}

                                <div className="grid gap-5 sm:grid-cols-2">
                                    <Field
                                        label="Full name"
                                        htmlFor="name"
                                        required
                                        error={form.errors.name}
                                    >
                                        <input
                                            id="name"
                                            type="text"
                                            autoComplete="name"
                                            placeholder="Your full name"
                                            required
                                            aria-invalid={form.errors.name ? 'true' : undefined}
                                            aria-describedby={form.errors.name ? 'name-error' : undefined}
                                            value={form.data.name}
                                            onChange={(event) => form.setData('name', event.target.value)}
                                            className={controlClasses(!!form.errors.name)}
                                        />
                                    </Field>

                                    <Field
                                        label="Phone"
                                        htmlFor="phone"
                                        required
                                        error={form.errors.phone}
                                    >
                                        <input
                                            id="phone"
                                            type="tel"
                                            autoComplete="tel"
                                            placeholder="+880 1XXX-XXXXXX"
                                            required
                                            aria-invalid={form.errors.phone ? 'true' : undefined}
                                            aria-describedby={form.errors.phone ? 'phone-error' : undefined}
                                            value={form.data.phone}
                                            onChange={(event) => form.setData('phone', event.target.value)}
                                            className={controlClasses(!!form.errors.phone)}
                                        />
                                    </Field>

                                    <Field
                                        label="Email"
                                        htmlFor="email"
                                        required
                                        error={form.errors.email}
                                    >
                                        <input
                                            id="email"
                                            type="email"
                                            autoComplete="email"
                                            placeholder="you@example.com"
                                            required
                                            aria-invalid={form.errors.email ? 'true' : undefined}
                                            aria-describedby={form.errors.email ? 'email-error' : undefined}
                                            value={form.data.email}
                                            onChange={(event) => form.setData('email', event.target.value)}
                                            className={controlClasses(!!form.errors.email)}
                                        />
                                    </Field>

                                    <Field
                                        label="Subject"
                                        htmlFor="subject"
                                        required
                                        error={form.errors.subject}
                                    >
                                        <select
                                            id="subject"
                                            required
                                            aria-invalid={form.errors.subject ? 'true' : undefined}
                                            aria-describedby={form.errors.subject ? 'subject-error' : undefined}
                                            value={form.data.subject}
                                            onChange={(event) => form.setData('subject', event.target.value)}
                                            className={controlClasses(!!form.errors.subject)}
                                        >
                                            {(content.subjects ?? []).map((subject) => (
                                                <option key={subject.value} value={subject.value}>
                                                    {subject.label}
                                                </option>
                                            ))}
                                        </select>
                                    </Field>
                                </div>

                                <div className="mt-5">
                                    <Field
                                        label="Message"
                                        htmlFor="message"
                                        required
                                        error={form.errors.message}
                                    >
                                        <textarea
                                            id="message"
                                            rows={5}
                                            placeholder="Tell us what you need — packages, coverage, billing or anything else."
                                            required
                                            aria-invalid={form.errors.message ? 'true' : undefined}
                                            aria-describedby={form.errors.message ? 'message-error' : undefined}
                                            value={form.data.message}
                                            onChange={(event) => form.setData('message', event.target.value)}
                                            className={controlClasses(!!form.errors.message)}
                                        />
                                    </Field>
                                </div>

                                <div className="mt-7 flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
                                    <p className="text-xs text-muted">
                                        Fields marked <span className="font-semibold text-error">*</span>{' '}
                                        are required. We never share your details.
                                    </p>
                                    <Button
                                        type="submit"
                                        size="lg"
                                        disabled={form.processing}
                                        className="w-full sm:w-auto"
                                    >
                                        {form.processing ? (
                                            <>
                                                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                                {content.submitting}
                                            </>
                                        ) : (
                                            <>
                                                {content.submit}
                                                <Icon name="send" className="h-4 w-4" />
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </Reveal>
                    </div>
                </div>
            </Container>
        </section>
    );
}