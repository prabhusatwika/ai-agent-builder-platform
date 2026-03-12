import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@radix-ui/react-label'
import { FileJson } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

function UserApproval({selectedNode,updateFormData}: any) {
    const [formData,setFormData]= useState({name: '',message:''})
    useEffect(() =>{
    if (selectedNode) {
        setFormData({
            name: "",
            message: "",
            ...selectedNode?.data?.settings
        })
    }
},[selectedNode])

    const handleChange=(key:string,value:any)=>{
        setFormData((prev) => ({
            ...prev,
            [key]: value        
        }))
    }

    const onSave=() => {
        console.log(formData);
        updateFormData(formData);
        toast.success('Settings updated!');
    }
  return (
    <div>
        <h2 className='font-bold'>User Approval</h2>
        <p className='text-gray-500 mt-1'>Pause for  human  to approve or reject a step</p>
        <div className='mt-3 space-y-1'>
                <Label>Name</Label>
                <Input placeholder='Name' 
                    value={formData?.name}
                    onChange={(event) => handleChange('name',event.target.value)} />
            </div>
            <div className='mt-3 space-y-1'>
                <Label>Message</Label>
                <Textarea placeholder='Describe the message to show to the user' 
                value={formData.message}
                onChange={(event) => handleChange('message',event.target.value)}/>
                <h2 className='text-sm p-1 flex gap-2 items-center'>Add Context<FileJson className='h-3 w-3'/></h2>
            </div>
        <Button className='w-full mt-5' onClick={() => {updateFormData(formData);toast.success('Updated!')}}>Save</Button>

    </div>
  )
}

export default UserApproval