import { WorkflowContext } from '@/context/WorkflowContext'
import React, { useContext } from 'react'
import AgentSettings from '../_nodeSettings/AgentSettings'

function SettingPanel() {
    const {selectedNode, setAddedNodes}=useContext(WorkflowContext)
    const onUpdateNodeData=(formData:any)=>{
        const updateNode={
            ...selectedNode,
            data:{
                ...selectedNode.data,
                label:formData.name,
                settings:formData
            }
        }
        setAddedNodes((prevNode:any)=>
        prevNode.map((node:any) => node.id === selectedNode.id ? updateNode : node)
        )


    }

  return selectedNode && (
    <div className='p-5 bg-white rounded-2xl w-[350px] shadow'>
        {selectedNode?.type=='AgentNode' && <AgentSettings selectedNode={selectedNode}
        updateFormData={(value:any)=>onUpdateNodeData(value)}
        />}
    </div>
  )
}

export default SettingPanel