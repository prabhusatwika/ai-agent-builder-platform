"use client"

import React, { useEffect, useState } from 'react'
import Header from '../../_components/Header'
import { useConvex, useMutation } from 'convex/react'
import { useParams } from 'next/navigation'
import { Agent } from '@/types/AgentType'
import { api } from '@/convex/_generated/api'
import { ReactFlow } from '@xyflow/react'
import { nodeTypes } from '../page'
import axios from 'axios';
import "@xyflow/react/dist/style.css"
import { Button } from '@/components/ui/button'
import { RefreshCcwIcon } from 'lucide-react'
import ChatUi from './_components/ChatUi'

function PreviewAgent() {


    const convex = useConvex()
    const { agentId } = useParams()
    const [agentDetail, setAgentDetail] = React.useState<Agent>();
    const [flowConfig, setFlowConfig] = React.useState<any>(null);
    const [loading, setLoading]= useState(false);
    const updateAgentToolConfig = useMutation(api.agent.UpdateAgentToolConfigs);
    
    useEffect(() => {
        GetAgentDetail()
      }, [])
    
    
      
    
    
// 🧠 Store the agent detail fetched from Convex (nodes + edges)


// ⚙️ Convex client instance




// ⚙️ Store generated workflow config
const [config, setConfig] = useState<any>();

// 📦 Fetch agent details when component mounts
useEffect(() => {
    GetAgentDetail();
}, [])

// 📡 Convex query to fetch agent detail by ID
const GetAgentDetail = async () => {
    const result = await convex.query(api.agent.GetAgentById, {
        agentId: agentId as string
    });
    setAgentDetail(result);
}

// 🧩 Generate workflow once agent data is loaded
useEffect(() => {
    if (agentDetail) {
        GenerateWorkflow()
    }
}, [agentDetail])

// ⚙️ Generate workflow config (node/edge relationship)
const GenerateWorkflow = () => {
    // 🧩 Build Edge Map for quick source → target lookup
    const edgeMap = agentDetail?.edges?.reduce((acc: any, edge: any) => {
        if (!acc[edge.source]) acc[edge.source] = [];
        acc[edge.source].push(edge);
        return acc;
    }, {});

    // 🔄 Build flow array by mapping each node
    const flow = agentDetail?.nodes?.map((node: any) => {
        const connectedEdges = edgeMap[node.id] || [];
        let next: any = null;

        switch (node.type) {
            // 🧭 Conditional branching node with "if" and "else"
            case "IfElseNode": {
                const ifEdge = connectedEdges.find((e: any) => e.sourceHandle === "if");
                const elseEdge = connectedEdges.find((e: any) => e.sourceHandle === "else");

                next = {
                    if: ifEdge?.target || null,
                    else: elseEdge?.target || null,
                };
                break;
            }

            // 🧠 Agent or AI Node
            case "AgentNode": {
                if (connectedEdges.length === 1) {
                    next = connectedEdges[0].target;
                } else if (connectedEdges.length > 1) {
                    next = connectedEdges.map((e: any) => e.target);
                }
                break;
            }

            // 🔗 API Call Node
            case "ApiNode": {
                if (connectedEdges.length === 1) {
                    next = connectedEdges[0].target;
                }
                break;
            }

            // ✅ User Approval Node (manual checkpoint)
            case "UserApprovalNode": {
                if (connectedEdges.length === 1) {
                    next = connectedEdges[0].target;
                }
                break;
            }

            // 🚀 Start Node
            case "StartNode": {
                if (connectedEdges.length === 1) {
                    next = connectedEdges[0].target;
                }
                break;
            }

            // 🏁 End Node
            case "EndNode": {
                next = null; // No next node
                break;
            }

            // 🔧 Default handling for any unknown node type
            default: {
                if (connectedEdges.length === 1) {
                    next = connectedEdges[0].target;
                } else if (connectedEdges.length > 1) {
                    next = connectedEdges.map((e: any) => e.target);
                }
                break;
            }
        }

        // 🧱 Return a simplified node configuration
        return {
            id: node.id,
            type: node.type,
            label: node.data?.label || node.type,
            settings: node.data?.settings || {},
            next,
        };
    });

    // 🎯 Find the Start Node
    const startNode = agentDetail?.nodes?.find((n: any) => n.type === "StartNode");

    // 🧱 Final Config structure
    const config = {
        startNode: startNode?.id || null,
        flow,
    };

    setFlowConfig(config);

    console.log("✅ Generated Workflow Config:", config);
    setConfig(config);
}

    const GenerateAgentToolConfig = async () => {

    if (!flowConfig) {
        console.log("Flow config not ready");
        return;
    }

    try {
        setLoading(true);

        const result = await axios.post(
            "/api/generate-agent-tool-config",
            { jsonConfig: flowConfig }
        );

        console.log("RESULT:", result.data);

        await updateAgentToolConfig({
            id: agentDetail?._id as any,
            agentToolConfig: result.data.parsedJson
        });

    } catch (error: any) {
        console.log("API ERROR:", error.response?.data);
    }
    GetAgentDetail();
    setLoading(false);
};


  return (
    <div>
        <Header previewHeader={true}
        agentDetail={agentDetail} />
        <div className='grid grid-cols-20 gap-4 p-4 h-[90vh]'>
            <div className='col-span-13 border rounded-xl p-4 flex flex-col'>
                <h2>Preview</h2>
                <div className="flex-1">
                    <ReactFlow
                    nodes={agentDetail?.nodes || []}
                    edges={agentDetail?.edges || []}
                    fitView
                    nodeTypes={nodeTypes}
                    draggable={false}
                >   </ReactFlow>
                </div>
            </div>
            <div className='col-span-7 border rounded-xl flex flex-col'>
                {!agentDetail?.agentToolConfig ? <div className='flex items-center justify-center h-full'>
                    
                        <Button onClick={GenerateAgentToolConfig}
                        
                        disabled={loading}
                        ><RefreshCcwIcon className={`${loading && 'animate-spin'}`}/>Reboot Agent</Button>
                </div>:
                    <ChatUi GenerateAgentToolConfig={GenerateAgentToolConfig}
                    loading={loading}
                    agentDetail={agentDetail}/>
                }
                
            </div>
        </div>
    </div>
  )
}

export default PreviewAgent