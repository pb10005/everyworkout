import ReactMarkdown from "react-markdown";

interface Props {
    content: string;
    className?: string;
}

export const MarkdownContent: React.FC<Props> = ({ content, className }) => {
    return (
        <div className={`prose prose-sm dark:prose-invert max-w-none ${className ?? ""}`}>
            <ReactMarkdown
                components={{
                    h1: ({ children }) => <h1 className="text-base font-bold mt-3 mb-1 dark:text-white">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-sm font-bold mt-2 mb-1 dark:text-white">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-sm font-semibold mt-2 mb-1 dark:text-white">{children}</h3>,
                    p: ({ children }) => <p className="text-sm leading-relaxed mb-2 dark:text-white">{children}</p>,
                    ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>,
                    li: ({ children }) => <li className="text-sm leading-relaxed dark:text-white">{children}</li>,
                    strong: ({ children }) => <strong className="font-semibold dark:text-white">{children}</strong>,
                    em: ({ children }) => <em className="italic dark:text-gray-200">{children}</em>,
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};
