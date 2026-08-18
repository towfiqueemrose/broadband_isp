import Footer from '@/Components/Footer';
import Header from '@/Components/Header';

export default function PublicLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground">
            <Header />
            <main id="main" className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
}
