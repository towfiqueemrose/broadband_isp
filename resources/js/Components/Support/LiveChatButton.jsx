import { useLiveChat } from '@/Components/Support/LiveChatContext';
import Icon from '@/Components/UI/Icon';
import { cn } from '@/Utils/cn';

export default function LiveChatButton() {
    const { open, openChat } = useLiveChat();

    if (open) {
        return null;
    }

    return (
        <button
            type="button"
            onClick={openChat}
            aria-label="Open live chat"
            aria-haspopup="dialog"
            className={cn(
                'group fixed bottom-4 right-4 z-40 inline-flex items-center gap-3 rounded-full py-3 pl-4 pr-5 shadow-lift',
                'bg-primary text-primary-foreground transition-all duration-200',
                'hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                'active:scale-[0.98] sm:bottom-6 sm:right-6',
            )}
        >
            <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/15">
                <Icon name="chat" className="h-4 w-4" />
                <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-success ring-2 ring-primary" />
            </span>
            <span className="hidden text-sm font-semibold sm:block">Live chat</span>
        </button>
    );
}