"use client"

import React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

import { CodeBlock } from "@/components/ui/shadcn-io/code-block"

type Props = {
  openDialog: boolean
  setOpenDialog: (open: boolean) => void
  agentId: string
}

function PublishCodeDialog({ openDialog, setOpenDialog, agentId }: Props) {

  const sdkCode = `
import readline from "readline"

let conversationId = null

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

async function sendMessage(message) {

  const response = await fetch("http://localhost:3000/api/agent-sdk", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      agentId: "${agentId}",
      userId: "demo-user",
      input: message,
      conversationId: conversationId
    })
  })

  const data = await response.json()

  conversationId = data.conversationId

  console.log("\\nAgent:", data.output)
}

function askUser() {

  rl.question("\\nYou: ", async (message) => {

    await sendMessage(message)

    askUser()
  })
}

console.log("Start chatting with your agent 🚀")

askUser()
`

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="max-w-5xl w-full">

        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Publish Agent SDK
          </DialogTitle>

          <DialogDescription>
            Copy the code below, paste it into a file (example: <b>agent-test.js</b>) and run it using <b>node agent-test.js</b>.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 border rounded-lg max-h-[500px] overflow-auto">
          <CodeBlock code={sdkCode} />
        </div>

      </DialogContent>
    </Dialog>
  )
}

export default PublishCodeDialog