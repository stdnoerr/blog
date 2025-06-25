// components/Mermaid.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'

// Module-level initialization flag
let mermaidInitialized = false

const initializeMermaid = () => {
  if (!mermaidInitialized) {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'dark',
      securityLevel: 'loose',
      fontFamily:
        'ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif',
    })
    mermaidInitialized = true
  }
}

interface ErrorDisplayProps {
  error: Error | string
  code: string
}

const ErrorDisplay = ({ error, code }: ErrorDisplayProps) => (
  <div className="overflow-hidden rounded-lg border border-red-200">
    <div className="border-b border-red-200 bg-red-50 px-4 py-2">
      <span className="mr-2 inline-block text-red-500">⚠️</span>
      <span className="text-sm font-medium text-red-700">
        {typeof error === 'string' ? error : error.message || 'Failed to render diagram'}
      </span>
    </div>
    <div className="bg-gray-50 p-4">
      <pre className="language-mermaid overflow-x-auto text-sm">{code}</pre>
    </div>
  </div>
)

interface MermaidProps {
  chart: string
}

const Mermaid = ({ chart }: MermaidProps) => {
  const [svg, setSvg] = useState<string>('')
  const [error, setError] = useState<Error | string | null>(null)

  useEffect(() => {
    // Initialize mermaid once for the entire application
    initializeMermaid()

    if (typeof chart === 'string') {
      try {
        // Generate a unique ID for this diagram
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`

        mermaid.render(id, chart.trim()).then(
          ({ svg }) => {
            setError(null)
            setSvg(svg)
          },
          (error) => {
            console.error('Mermaid rendering failed:', error)
            setError(error)
            setSvg('')
          }
        )
      } catch (error) {
        console.error('Mermaid error:', error)
        setError(error instanceof Error ? error : 'Failed to render diagram')
        setSvg('')
      }
    }
  }, [chart])

  if (error) {
    return <ErrorDisplay error={error} code={chart} />
  }

  return <div className="mermaid-chart my-4" dangerouslySetInnerHTML={{ __html: svg }} />
}

export default Mermaid
