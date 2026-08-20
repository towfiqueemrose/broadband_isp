import { lazy, Suspense } from 'react';
import LiveChatButton from '@/Components/Support/LiveChatButton';
import { LiveChatProvider, useLiveChat } from '@/Components/Support/LiveChatContext';

const LiveChatPanel = lazy(() => import('@/Components/Support/LiveChatPanel'));

function ChatHost() {
    const { open } = useLiveChat();

    return (
        <>
            <LiveChatButton />
            {open ? (
                <Suspense fallback={null}>
                    <LiveChatPanel />
                </Suspense>
            ) : null}
        </>
    );
}

export default function LiveChat({ children }) {
    return (
        <LiveChatProvider>
            {children}
            <ChatHost />
        </LiveChatProvider>
    );
}