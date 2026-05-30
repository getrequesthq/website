import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h1: ({ children }) => <h1 className="heading-hero">{children}</h1>,
    h2: ({ children }) => <h2 className="heading-xl">{children}</h2>,
    h3: ({ children }) => <h3 className="heading-lg">{children}</h3>,
    p: ({ children }) => <p className="prose-p">{children}</p>,
    pre: ({ children }) => <pre className="code-block">{children}</pre>,
    code: ({ children, className }) => <code className={className}>{children}</code>,
    a: ({ href, children }) => <a href={href} className="prose-link">{children}</a>,
    ul: ({ children }) => <ul className="prose-ul">{children}</ul>,
    ol: ({ children }) => <ol className="prose-ol">{children}</ol>,
    li: ({ children }) => <li className="prose-li">{children}</li>,
    blockquote: ({ children }) => <blockquote className="prose-blockquote">{children}</blockquote>,
    hr: () => <hr className="prose-hr" />,
  }
}
