"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import { MarkdownContent } from "@/lib/content/markdownLoader";

interface MarkdownRendererProps {
  content: MarkdownContent;
  className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  className = "",
}) => {
  return (
    <div className={`markdown-content ${className}`}>
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 className="text-4xl font-bold text-primary mb-6">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-3xl font-semibold text-primary mb-4">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-2xl font-semibold text-primary mb-3">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-xl font-semibold text-primary mb-2">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="text-neutral-700 dark:text-neutral-300 mb-4 leading-relaxed">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="text-neutral-700 dark:text-neutral-300">
              {children}
            </li>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-primary">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-neutral-600 dark:text-neutral-400">
              {children}
            </em>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary pl-4 py-2 mb-4 bg-primary/5 rounded-r">
              {children}
            </blockquote>
          ),
          hr: () => (
            <hr className="border-neutral-300 dark:border-neutral-600 my-8" />
          ),
          code: ({ children, className }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded text-sm">
                  {children}
                </code>
              );
            }
            return (
              <pre className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-lg overflow-x-auto mb-4">
                <code className={className}>{children}</code>
              </pre>
            );
          },
        }}
      >
        {content.content}
      </ReactMarkdown>
    </div>
  );
};

interface MarkdownSectionProps {
  title?: string;
  content: MarkdownContent;
  className?: string;
}

export const MarkdownSection: React.FC<MarkdownSectionProps> = ({
  title,
  content,
  className = "",
}) => {
  return (
    <section className={`mb-8 ${className}`}>
      {title && (
        <h2 className="text-3xl font-bold text-primary mb-6">{title}</h2>
      )}
      <MarkdownRenderer content={content} />
    </section>
  );
};
