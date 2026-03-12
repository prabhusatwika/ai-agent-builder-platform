"use client"

import React, { useEffect, useState } from 'react'
import Header from '../../_components/Header'
import { useConvex } from 'convex/react'
import { useParams } from 'next/navigation'
import { Agent } from '@/types/AgentType'
import { api } from '@/convex/_generated/api'
import { ReactFlow } from '@xyflow/react'
import { nodeTypes } from '../page'
import "@xyflow/react/dist/style.css"

function PreviewAgent() {


    const convex = useConvex()
    const { agentId } = useParams()
    const [agentDetail, setAgentDetail] = React.useState<Agent>()
    
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

    console.log("✅ Generated Workflow Config:", config);
    setConfig(config);
}

    


  return (
    <div>
        <Header previewHeader={true}
        agentDetail={agentDetail} />
        <div className='grid grid-cols-4 '>
            <div className='col-span-3 p-5 border rounded-2xl m-5'>
                <h2>Preview</h2>
                <div style={{ width: "100%", height: "90vh" }}>
                    <ReactFlow
                    nodes={agentDetail?.nodes || []}
                    edges={agentDetail?.edges || []}
                    fitView
                    nodeTypes={nodeTypes}
                    draggable={false}
                >   </ReactFlow>
                </div>
            </div>
            <div className='col-span-1 border rounded-2xl m-5 p-5'>
                Chat UI
            </div>
        </div>
    </div>
  )
}

export default PreviewAgent