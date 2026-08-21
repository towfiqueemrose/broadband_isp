import { cn } from '@/Utils/cn';

export default function LegalContent({ html }) {
    if (!html) {
        return (
            <div className="py-12 text-center">
                <p className="text-muted">This page is currently being updated.</p>
                <a href="/" className="mt-4 inline-flex items-center text-sm font-semibold text-primary hover:underline">
                    Return to Homepage
                </a>
            </div>
        );
    }

    return (
        <div
            className={cn(
                'legal-content',
                'max-w-3xl mx-auto',
                // Headings
                '[&_h1]:text-3xl [&_h1]:font-bold [&_h1]:tracking-tight [&_h1]:text-foreground [&_h1]:mb-6 [&_h1]:mt-10',
                '[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-foreground [&_h2]:mb-4 [&_h2]:mt-8 [&_h2]:pb-2 [&_h2]:border-b [&_h2]:border-border',
                '[&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mb-3 [&_h3]:mt-6',
                // Paragraphs
                '[&_p]:text-base [&_p]:leading-relaxed [&_p]:text-muted [&_p]:mb-4',
                // Lists
                '[&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-4 [&_ul]:space-y-2',
                '[&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-4 [&_ol]:space-y-2',
                '[&_li]:text-base [&_li]:leading-relaxed [&_li]:text-muted',
                '[&_li]:marker:text-primary',
                // Links
                '[&_a]:text-primary [&_a]:underline [&_a]:decoration-primary/30 [&_a]:underline-offset-2 [&_a]:hover:decoration-primary [&_a]:transition-colors',
                // Blockquotes
                '[&_blockquote]:border-l-4 [&_blockquote]:border-primary/30 [&_blockquote]:pl-4 [&_blockquote]:py-1 [&_blockquote]:my-4 [&_blockquote]:italic [&_blockquote]:text-muted',
                // Tables
                '[&_table]:w-full [&_table]:border-collapse [&_table]:my-6',
                '[&_th]:text-left [&_th]:px-4 [&_th]:py-2 [&_th]:bg-surface-2 [&_th]:font-semibold [&_th]:text-sm [&_th]:text-foreground',
                '[&_td]:px-4 [&_td]:py-2 [&_td]:text-sm [&_td]:text-muted [&_td]:border-t [&_td]:border-border',
                // Strong
                '[&_strong]:font-semibold [&_strong]:text-foreground',
                // Em
                '[&_em]:italic',
            )}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}
