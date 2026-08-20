import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const LiveChatContext = createContext(null);

export function LiveChatProvider({ children }) {
    const [open, setOpen] = useState(false);

    const openChat = useCallback(() => setOpen(true), []);
    const closeChat = useCallback(() => setOpen(false), []);

    const value = useMemo(
        () => ({ open, openChat, closeChat }),
        [open, openChat, closeChat],
    );

    return <LiveChatContext.Provider value={value}>{children}</LiveChatContext.Provider>;
}

export function useLiveChat() {
    const context = useContext(LiveChatContext);

    if (!context) {
        throw new Error('useLiveChat must be used within a LiveChatProvider.');
    }

    return context;
}