"use client"

import React, { useCallback, useContext, useEffect, useState } from "react"
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  BackgroundVariant,
  MiniMap,
  Controls,
  Panel,
  useOnSelectionChange,
  OnSelectionChangeParams,
  Node,
  Edge
} from "@xyflow/react"

import "@xyflow/react/dist/style.css"

import Header from "../_components/Header"
import AgentToolsPanel from "../_components/AgentToolsPanel"
import SettingPanel from "../_components/SettingPanel"

import StartNode from "../_customNodes/StartNode"
import AgentNode from "../_customNodes/AgentNode"
import EndNode from "../_customNodes/EndNode"
import IfElseNode from "../_customNodes/IfElseNode"
import WhileNode from "../_customNodes/WhileNode"
import UserApproval from "../_customNodes/UserApproval"
import ApiNode from "../_customNodes/ApiNode"

import { WorkflowContext } from "@/context/WorkflowContext"
import { useConvex, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useParams } from "next/navigation"
import { Agent } from "@/types/AgentType"

import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"
import { toast } from "sonner"


export const nodeTypes = {
  StartNode: StartNode,
  AgentNode: AgentNode,
  EndNode: EndNode,
  IfElseNode: IfElseNode,
  WhileNode: WhileNode,
  UserApproval: UserApproval,
  ApiNode: ApiNode
}
const startNode: Node = {
  id: "start-node",
  type: "StartNode",
  position: { x: 250, y: 50 },
  data: {
    label: "Start"
  }
};

function AgentBuilder() {

  const [nodes, setNodes] = useState<Node[]>([])
  const [edges, setEdges] = useState<Edge[]>([])

  const { agentId } = useParams()

  const {
    addedNodes,
    setAddedNodes,
    nodeEdges,
    setNodeEdges,
    setSelectedNode
  } = useContext(WorkflowContext)

  const convex = useConvex()
  const UpdateAgentDetail = useMutation(api.agent.UpdateAgentDetail)

  const [agentDetail, setAgentDetail] = useState<Agent>()




  /* ---------------- GET AGENT DATA ---------------- */

  useEffect(() => {
    GetAgentDetail()
  }, [])


  const GetAgentDetail = async () => {

    const result = await convex.query(api.agent.GetAgentById, {
      agentId: agentId as string
    })

    setAgentDetail(result)
  }




  /* ---------------- LOAD NODES + EDGES ---------------- */

  useEffect(() => {

  if (agentDetail) {

    const safeNodes = Array.isArray(agentDetail.nodes) ? agentDetail.nodes : [];
    const safeEdges = Array.isArray(agentDetail.edges) ? agentDetail.edges : [];

    if (safeNodes.length === 0) {
      setNodes([startNode]);
      setAddedNodes([startNode]);
    } else {
      setNodes(safeNodes);
      setAddedNodes(safeNodes);
    }

    setEdges(safeEdges);
    setNodeEdges(safeEdges);
  }

}, [agentDetail]);




  /* ---------------- SYNC CONTEXT ---------------- */

  useEffect(() => {

    if (Array.isArray(addedNodes)) {
      setNodes(addedNodes)
    }

  }, [addedNodes])


  useEffect(() => {

    if (Array.isArray(edges)) {
      setNodeEdges(edges)
    }

  }, [edges])




  /* ---------------- SAVE AGENT ---------------- */

  const SaveNodesAndEdges = async () => {

    const result = await UpdateAgentDetail({
      //@ts-ignore
      id: agentDetail?._id as string,
      edges: nodeEdges || [],
      nodes: addedNodes || []
    })

    console.log(result)

    toast.success("Saved!")
  }




  /* ---------------- NODE CHANGE ---------------- */

  const onNodesChange = useCallback((changes: any) => {

    setNodes((nodesSnapshot) => {

      const safeNodes = Array.isArray(nodesSnapshot) ? nodesSnapshot : []

      const updated = applyNodeChanges(changes, safeNodes)

      return updated
    })


    setAddedNodes((prev: any) => {

      const safePrev = Array.isArray(prev) ? prev : []

      return applyNodeChanges(changes, safePrev)
    })

  }, [])




  /* ---------------- EDGE CHANGE ---------------- */

  const onEdgesChange = useCallback((changes: any) => {

    setEdges((edgesSnapshot) => {

      const safeEdges = Array.isArray(edgesSnapshot) ? edgesSnapshot : []

      const updated = applyEdgeChanges(changes, safeEdges)

      return updated
    })

  }, [])




  /* ---------------- CONNECT EDGE ---------------- */

  const onConnect = useCallback((params: any) => {

    setEdges((edgesSnapshot) => {

      const safeEdges = Array.isArray(edgesSnapshot) ? edgesSnapshot : []

      return addEdge(params, safeEdges)
    })

  }, [])




  /* ---------------- NODE SELECT ---------------- */

  const onNodeSelect = useCallback(({ nodes }: OnSelectionChangeParams) => {

    setSelectedNode(nodes[0])

  }, [])


  useOnSelectionChange({
    onChange: onNodeSelect
  })




  /* ---------------- UI ---------------- */

  return (
    <div>

      <Header agentDetail={agentDetail} />

      <div style={{ width: "100vw", height: "90vh" }}>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          nodeTypes={nodeTypes}
        >

          <MiniMap />

          <Controls />

          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />


          <Panel position="top-left">
            <AgentToolsPanel />
          </Panel>


          <Panel position="top-right">
            <SettingPanel />
          </Panel>


          <Panel position="bottom-center">
            <Button onClick={SaveNodesAndEdges}>
              <Save /> Save
            </Button>
          </Panel>

        </ReactFlow>

      </div>
    </div>
  )
}

export default AgentBuilder