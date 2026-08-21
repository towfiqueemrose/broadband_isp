import { useState, useCallback } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ListNode, ListItemNode, INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND } from '@lexical/list';
import { LinkNode, AutoLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import {
    $getSelection,
    $isRangeSelection,
    FORMAT_TEXT_COMMAND,
    $createParagraphNode,
    $getRoot,
} from 'lexical';
import { $generateNodesFromDOM, $generateHtmlFromNodes } from '@lexical/html';
import { cn } from '@/Utils/cn';

const theme = {
    paragraph: 'mb-3 text-sm leading-relaxed text-gray-900',
    heading: {
        h1: 'text-2xl font-bold mb-4 mt-6 text-gray-900',
        h2: 'text-xl font-bold mb-3 mt-5 text-gray-900',
        h3: 'text-lg font-semibold mb-2 mt-4 text-gray-900',
    },
    list: {
        nested: { listitem: 'ml-6 text-sm text-gray-900 leading-relaxed' },
        ol: 'list-decimal ml-6 mb-3 space-y-1',
        ul: 'list-disc ml-6 mb-3 space-y-1',
        listitem: 'text-sm text-gray-900 leading-relaxed',
    },
    link: 'text-primary underline hover:text-primary-dark cursor-pointer',
    text: {
        bold: 'font-bold',
        italic: 'italic',
        underline: 'underline',
        strikethrough: 'line-through',
    },
    quote: 'border-l-4 border-primary/30 pl-4 italic text-gray-500 mb-3',
};

function sanitizeHtml(html) {
    if (!html) return '';
    const doc = new DOMParser().parseFromString(html, 'text/html');
    ['script', 'style', 'iframe', 'object', 'embed', 'form'].forEach((tag) => {
        doc.querySelectorAll(tag).forEach((el) => el.remove());
    });
    doc.querySelectorAll('*').forEach((el) => {
        Array.from(el.attributes).forEach((attr) => {
            if (attr.name.startsWith('on') || attr.value.includes('javascript:')) {
                el.removeAttribute(attr.name);
            }
        });
    });
    return doc.body.innerHTML;
}

function ToolbarButton({ onClick, active, children, title }) {
    return (
        <button
            type="button"
            onMouseDown={(e) => { e.preventDefault(); onClick(); }}
            title={title}
            className={cn(
                'inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium transition-colors',
                active ? 'bg-primary/10 text-primary' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700',
            )}
        >
            {children}
        </button>
    );
}

function Divider() {
    return <div className="mx-1 h-6 w-px bg-gray-200" />;
}

function Toolbar({ editor }) {
    const [formats, setFormats] = useState({});

    // Register listener for format state
    const registerListener = useCallback(() => {
        return editor.registerUpdateListener(({ editorState }) => {
            editorState.read(() => {
                const sel = $getSelection();
                if ($isRangeSelection(sel)) {
                    setFormats({
                        bold: sel.hasFormat('bold'),
                        italic: sel.hasFormat('italic'),
                        underline: sel.hasFormat('underline'),
                        strikethrough: sel.hasFormat('strikethrough'),
                    });
                }
            });
        });
    }, [editor]);

    // Store registration to avoid re-registering
    const [registered] = useState(() => registerListener());

    const format = (type) => editor.dispatchCommand(FORMAT_TEXT_COMMAND, type);
    const insertList = (type) => {
        if (type === 'ol') editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND);
        else editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND);
    };
    const insertLink = () => {
        const url = window.prompt('Enter URL:');
        if (url) editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
    };
    const setHeading = (tag) => {
        editor.update(() => {
            const sel = $getSelection();
            if ($isRangeSelection(sel)) {
                const nodes = sel.getNodes();
                nodes.forEach((node) => {
                    const parent = node.getParent();
                    if (parent) {
                        const p = $createParagraphNode();
                        p.setFormat(tag);
                        parent.insertBefore(p);
                        p.append(node);
                    }
                });
            }
        });
    };

    return (
        <div className="flex flex-wrap items-center gap-0.5 border-b border-gray-200 px-3 py-2">
            <ToolbarButton onClick={() => format('bold')} active={formats.bold} title="Bold">
                <span className="font-bold">B</span>
            </ToolbarButton>
            <ToolbarButton onClick={() => format('italic')} active={formats.italic} title="Italic">
                <span className="italic">I</span>
            </ToolbarButton>
            <ToolbarButton onClick={() => format('underline')} active={formats.underline} title="Underline">
                <span className="underline">U</span>
            </ToolbarButton>
            <ToolbarButton onClick={() => format('strikethrough')} active={formats.strikethrough} title="Strikethrough">
                <span className="line-through">S</span>
            </ToolbarButton>
            <Divider />
            <ToolbarButton onClick={() => setHeading('h1')} title="Heading 1">H1</ToolbarButton>
            <ToolbarButton onClick={() => setHeading('h2')} title="Heading 2">H2</ToolbarButton>
            <ToolbarButton onClick={() => setHeading('h3')} title="Heading 3">H3</ToolbarButton>
            <Divider />
            <ToolbarButton onClick={() => insertList('ul')} title="Bullet List">•</ToolbarButton>
            <ToolbarButton onClick={() => insertList('ol')} title="Numbered List">1.</ToolbarButton>
            <Divider />
            <ToolbarButton onClick={insertLink} title="Insert Link">🔗</ToolbarButton>
        </div>
    );
}

function InitPlugin({ html, editor }) {
    const [done, setDone] = useState(false);

    const [register] = useState(() => {
        return editor.registerUpdateListener(() => {
            if (!done && editor.getEditorState().isEmpty() && html) {
                editor.update(() => {
                    const sanitized = sanitizeHtml(html);
                    if (sanitized) {
                        const doc = new DOMParser().parseFromString(sanitized, 'text/html');
                        const nodes = $generateNodesFromDOM(editor, doc);
                        const root = $getRoot();
                        nodes.forEach((node) => root.append(node));
                    }
                });
                setDone(true);
            }
        });
    });

    return null;
}

export default function RichTextEditor({ value = '', onChange, placeholder = 'Start writing...', disabled = false }) {
    const handleChange = useCallback(
        (editorState, editor) => {
            editorState.read(() => {
                const html = $generateHtmlFromNodes(editor);
                onChange?.(html);
            });
        },
        [onChange],
    );

    const initialConfig = {
        namespace: 'RichTextEditor',
        theme,
        nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode, LinkNode, AutoLinkNode],
        onError: (error) => console.error('Lexical:', error),
    };

    return (
        <div className="rounded-xl border border-gray-300 bg-white overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
            <LexicalComposer initialConfig={initialConfig}>
                <EditorInner html={value} onChange={handleChange} placeholder={placeholder} disabled={disabled} />
            </LexicalComposer>
        </div>
    );
}

function EditorInner({ html, onChange, placeholder, disabled }) {
    const [editor] = useLexicalComposerContext();

    return (
        <>
            <Toolbar editor={editor} />
            <div className="relative min-h-[300px] max-h-[600px] overflow-y-auto">
                <RichTextPlugin
                    contentEditable={
                        <ContentEditable
                            className="p-4 outline-none min-h-[300px] text-sm leading-relaxed"
                            readOnly={disabled}
                        />
                    }
                    placeholder={
                        <div className="absolute top-4 left-4 text-sm text-gray-400 pointer-events-none">
                            {placeholder}
                        </div>
                    }
                />
            </div>
            <HistoryPlugin />
            <LinkPlugin />
            <ListPlugin />
            <OnChangePlugin onChange={onChange} />
            <InitPlugin html={html} editor={editor} />
        </>
    );
}
