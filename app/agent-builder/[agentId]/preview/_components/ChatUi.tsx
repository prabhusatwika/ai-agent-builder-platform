import { Button } from '@/components/ui/button'
import { Agent } from '@/types/AgentType'
import { Loader2Icon, RefreshCcwIcon, Send } from 'lucide-react'
import React, { useState } from 'react'

type Props={
    GenerateAgentToolConfig:() => void,
    loading:boolean,
    agentDetail:Agent,
    conversationId:string|null
}





function ChatUi({GenerateAgentToolConfig,loading,agentDetail,conversationId}:Props) {

  const [userInput, setUserInput]=useState<string>('');
  const [loadingMsg, setLoadingMsg]= useState(false);
  const [messages, setMessages]= useState<{role:string,content:string}[]>([]);
    const OnSendMsg = async () => {

  setLoadingMsg(true);

  setMessages((prev) => [
    ...prev,
    { role: "user", content: userInput }
  ]);

  const currentInput = userInput;
  setUserInput("");

  const res = await fetch("/api/agent-chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      agentName: agentDetail?.name,
      agents: agentDetail?.config?.agents || [],
      tools: agentDetail?.config?.tools || [],
      input: currentInput,
      conversationId: conversationId
    })
  });

  const data = await res.json();

  setMessages((prev) => [
    ...prev,
    { role: "assistant", content: data.output }
  ]);

  setLoadingMsg(false);
};


  return (
    <div>
        <div className='flex justify-between items-center border-b p-4'>
  <h2>{agentDetail?.name}</h2>

  <Button
    onClick={GenerateAgentToolConfig}
    disabled={loading}
  >
    <RefreshCcwIcon className={`${loading && "animate-spin"}`} /> Reboot Agent
  </Button>
</div>

        <div className='w-full h-[80vh] p-4 flex flex-col mx-auto'>

        {/* Message Section */}
        <div className='flex-1 overflow-y-auto p-4 space-y-3 flex flex-col'>

            {messages.map((msg,index)=>(
                
                
                    <div key={index} className={`p-2 rounded-lg 
                    max-w-[80%]
                        ${msg.role=='user'?
                        
                    'bg-blue-500 text-white self-end'
                    : 'bg-gray-300 text-black self-start'
                }
                `}>
                    <h2 className='text-sm'>{msg.content}</h2>
                </div>

            
            ))}

            

            

            {/* Loading state */}
            {loadingMsg &&<div className='flex justify-center items-center p-4'>
            <div className='animate-spin rounded-full h-6 w-6 border-2 border-zinc-300 border-t-zinc-800'></div>
            <span className='ml-2 text-zinc-800'>
                Thinking... Working on your request
            </span>
            </div>}

        </div>

        {/* Footer Input */}
        <div className='p-1 mt-3 border-t flex items-center gap-2'>
            <textarea
            value={userInput}
            onChange={(e)=>setUserInput(e.target.value)}
            placeholder='Type your message here...'
            className='flex-1 resize-none border rounded-lg px-3 py-2 focus:outline-none focus:ring-2'
            />
            <Button onClick={OnSendMsg} disabled={loadingMsg || !userInput.trim().length}>
                {loadingMsg?<Loader2Icon className='animate-spin'/>:
                <Send />}</Button>
        </div>

    </div>
</div>
  )
}

export default ChatUi