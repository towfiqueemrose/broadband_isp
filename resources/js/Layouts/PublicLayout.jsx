import { usePage } from '@inertiajs/react';
import Footer from '@/Components/Footer';
import Header from '@/Components/Header';
import LiveChat from '@/Components/Support/LiveChat';

export default function PublicLayout({ children }) {
    const { settings } = usePage().props;

    return (
        <LiveChat>
            <div className="flex min-h-screen flex-col bg-background text-foreground">
                {settings?.background_image && (
                    <div
                        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: `url(/storage/${settings.background_image})`,
                            backgroundAttachment: 'fixed',
                        }}
                    >
                        <div className="absolute inset-0 bg-background/80" />
                    </div>
                )}
                <Header />
                <main id="main" className="flex-1">
                    {children}
                </main>
                <Footer />
            </div>
        </LiveChat>
    );
}