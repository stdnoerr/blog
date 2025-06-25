// components/CodeBlockRenderer.tsx
'use client'

import type { ReactNode } from 'react'
import Pre from 'pliny/ui/Pre'
import Mermaid from './Mermaid'

const extractTextFromChildren = (children: ReactNode): string => {
  if (typeof children === 'string') return children
  if (Array.isArray(children)) return children.map(extractTextFromChildren).join('')
  if (
    children &&
    typeof children === 'object' &&
    'props' in children &&
    children.hasOwnProperty('props') &&
    (children as { props?: unknown }).props &&
    typeof (children as { props?: unknown }).props === 'object' &&
    'children' in (children as { props: { children?: unknown } }).props
  ) {
    return extractTextFromChildren(
      (children as { props: { children?: ReactNode } }).props.children
    )
  }
  return String(children || '')
}

const CodeBlockRenderer = ({ children, ...props }) => {
  if (children?.props?.className?.includes('language-mermaid')) {
    const rawText = extractTextFromChildren(children.props.children)
    return <Mermaid chart={rawText.trim()} />
  }
  return <Pre {...props}>{children}</Pre>
}

export default CodeBlockRenderer
