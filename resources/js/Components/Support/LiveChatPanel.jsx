import { usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { useLiveChat } from '@/Components/Support/LiveChatContext';
import Button from '@/Components/UI/Button';
import Icon from '@/Components/UI/Icon';
import { cn } from '@/Utils/cn';

function AgentMessage({ text }) {
    return (
        <div className="flex items-end gap-2">
            <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-soft text-xs font-bold text-primary-dark">
                N
            </span>
            <div className="max-w-[80%] rounded-2xl rounded-bl-sm border border-border bg-surface px-3.5 py-2.5 text-sm leading-relaxed text-foreground shadow-card">
                {text}
            </div>
        </div>
    );
}

function UserMessage({ text }) {
    return (
        <div className="flex justify-end">
            <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-primary px-3.5 py-2.5 text-sm leading-relaxed text-primary-foreground shadow-card">
                {text}
            </div>
        </div>
    );
}

export default function LiveChatPanel() {
    const { brand } = usePage().props;
    const { closeChat } = useLiveChat();
    const panelRef = useRef(null);
    const [shown, setShown] = useState(false);
    const [draft, setDraft] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const frame = requestAnimationFrame(() => setShown(true));

        const onKeyDown = (event) => {
            if (event.key === 'Escape') {
                closeChat();
            }
        };

        document.addEventListener('keydown', onKeyDown);

        return () => {
            cancelAnimationFrame(frame);
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [closeChat]);

    const send = (event) => {
        event?.preventDefault();

        const text = draft.trim();

        if (!text) return undefined;

        setDraft('');
        setMessages((current) => [...current, { from: 'user', text }]);

        const timer = setTimeout(() => {
            setMessages((current) => [
                ...current,
                {
                    from: 'agent',
                    text: `Thanks for your message, ${brand.name}'s team usually replies in a few minutes. For urgent issues you can call us on ${brand.contact.hotline}.`,
                },
            ]);
        }, 1200);

        return () => clearTimeout(timer);
    };

    return (
        <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="live-chat-heading"
            className={cn(
                'fixed bottom-20 right-4 z-40 flex w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-3xl border border-border bg-background shadow-lift sm:bottom-24 sm:right-6',
                'transition-all duration-300 ease-out',
                shown ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
            )}
        >
            <div className="flex items-center justify-between gap-3 bg-ink px-5 py-4">
                <div className="flex items-center gap-3">
                    <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                        <Icon name="chat" className="h-4 w-4" />
                        <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-success ring-2 ring-ink" />
                    </span>
                    <div>
                        <h2 id="live-chat-heading" className="text-sm font-semibold text-white">
                            {brand.name} support
                        </h2>
                        <p className="mt-0.5 text-xs text-white/60">
                            <span className="font-medium text-success">Online now</span> · usually replies in minutes
                        </p>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={closeChat}
                    aria-label="Close live chat"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                >
                    <Icon name="x" className="h-4 w-4" />
                </button>
            </div>

            <div className="flex h-[22rem] flex-col justify-end gap-3 overflow-y-auto p-5">
                <AgentMessage text={`Hi there — welcome to ${brand.name}. Ask us anything about packages, coverage or your connection — a real person will pick this up.`} />
                {messages.map((message, index) =>
                    message.from === 'user' ? (
                        <UserMessage key={index} text={message.text} />
                    ) : (
                        <AgentMessage key={index} text={message.text} />
                    ),
                )}
            </div>

            <div className="border-t border-border bg-surface px-5 py-4">
                <form onSubmit={send} className="flex items-center gap-2">
                    <label htmlFor="chat-message" className="sr-only">
                        Your message
                    </label>
                    <input
                        id="chat-message"
                        type="text"
                        value={draft}
                        onChange={(event) => setDraft(event.target.value)}
                        placeholder="Type your message…"
                        autoComplete="off"
                        className="w-full rounded-full border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 focus:ring-offset-surface"
                    />
                    <button
                        type="submit"
                        disabled={!draft.trim()}
                        aria-label="Send message"
                        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary-dark disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                    >
                        <Icon name="send" className="h-4 w-4" />
                    </button>
                </form>
                <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
                    <a href={`tel:${brand.contact.hotline.replace(/[^+\d]/g, '')}`} className="inline-flex items-center gap-1 font-medium text-foreground hover:text-primary">
                        <Icon name="phone" className="h-3.5 w-3.5" /> Call
                    </a>
                    <a href={brand.contact.email ? `mailto:${brand.contact.email}` : undefined} className="inline-flex items-center gap-1 font-medium text-foreground hover:text-primary">
                        <Icon name="mail" className="h-3.5 w-3.5" /> Email
                    </a>
                    <Button href={route('contact.index')} variant="ghost" size="sm" className="px-2 py-1 text-xs">
                        Send a message
                        <Icon name="arrow-right" className="h-3.5 w-3.5" />
                    </Button>
                </p>
            </div>
        </div>
    );
}