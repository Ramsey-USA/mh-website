'use client'

import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Image from 'next/image'
import Link from 'next/link'

interface BlogContentProps {
  content: string
}

export function BlogContent({ content }: BlogContentProps) {
  return (
    <div className="prose prose-lg max-w-none">
      <ReactMarkdown
        components={{
          // Custom heading styles
          h1: ({ children }: any) => (
            <h1 className="text-4xl font-bold text-gray-900 mb-6 mt-8 first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }: any) => (
            <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-8 border-b border-gray-200 pb-2">
              {children}
            </h2>
          ),
          h3: ({ children }: any) => (
            <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">
              {children}
            </h3>
          ),
          h4: ({ children }: any) => (
            <h4 className="text-xl font-semibold text-gray-900 mb-2 mt-4">
              {children}
            </h4>
          ),
          
          // Custom paragraph styles
          p: ({ children }: any) => (
            <p className="text-gray-700 leading-relaxed mb-6">
              {children}
            </p>
          ),
          
          // Custom list styles
          ul: ({ children }: any) => (
            <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
              {children}
            </ul>
          ),
          ol: ({ children }: any) => (
            <ol className="list-decimal list-inside space-y-2 mb-6 text-gray-700">
              {children}
            </ol>
          ),
          li: ({ children }: any) => (
            <li className="ml-4">
              {children}
            </li>
          ),
          
          // Custom link styles
          a: ({ href, children }: any) => (
            <Link
              href={href || '#'}
              className="text-blue-600 hover:text-blue-700 underline decoration-blue-300 hover:decoration-blue-500 transition-colors"
            >
              {children}
            </Link>
          ),
          
          // Custom blockquote styles
          blockquote: ({ children }: any) => (
            <blockquote className="border-l-4 border-blue-500 pl-6 py-2 my-6 bg-blue-50 italic text-gray-700 rounded-r-lg">
              {children}
            </blockquote>
          ),
          
          // Custom code styles
          code: ({ className, children, ...props }: any) => {
            const inline = !props.node || props.node.position?.start.line === props.node.position?.end.line
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <div className="my-6">
                <SyntaxHighlighter
                  style={oneLight}
                  language={match[1]}
                  PreTag="div"
                  className="rounded-lg"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono">
                {children}
              </code>
            )
          },
          
          // Custom table styles
          table: ({ children }: any) => (
            <div className="overflow-x-auto my-6">
              <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }: any) => (
            <thead className="bg-gray-50">
              {children}
            </thead>
          ),
          th: ({ children }: any) => (
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">
              {children}
            </th>
          ),
          td: ({ children }: any) => (
            <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">
              {children}
            </td>
          ),
          
          // Custom image styles
          img: ({ src, alt }: any) => (
            <div className="my-8">
              <div className="relative aspect-video rounded-lg overflow-hidden shadow-md">
                <Image
                  src={typeof src === 'string' ? src : ''}
                  alt={alt || ''}
                  fill
                  className="object-cover"
                />
              </div>
              {alt && (
                <p className="text-sm text-gray-600 mt-2 text-center italic">
                  {alt}
                </p>
              )}
            </div>
          ),
          
          // Custom horizontal rule
          hr: () => (
            <hr className="my-8 border-t border-gray-300" />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}