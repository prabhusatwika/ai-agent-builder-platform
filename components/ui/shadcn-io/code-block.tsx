'use client'

import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"
import { useState } from "react"

export function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const copyCode = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative rounded-lg bg-black text-white p-4 text-sm">
      <pre className="overflow-x-auto">
        <code>{code}</code>
      </pre>

      <Button
        size="icon"
        variant="secondary"
        className="absolute right-2 top-2"
        onClick={copyCode}
      >
        <Copy className="h-4 w-4" />
      </Button>
    </div>
  )
}