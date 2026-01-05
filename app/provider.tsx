"use client"
import { UserDetailContext } from '@/context/UserDetailContext';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs'
import { useMutation } from 'convex/react';
import { se } from 'date-fns/locale';
import React, { useEffect, useState } from 'react'

function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const {user}=useUser();
    const createUser=useMutation(api.user.CreateNewUser);
    const [userDetail,setUserDetail]=useState<any>()
    useEffect(()=>{
        user && CreateAndGetUser();
    },[user])

    const CreateAndGetUser = async() => {
        if(user){
            const result=await createUser({
                name:user.fullName??'',
                email:user.primaryEmailAddress?.emailAddress??''
            });
            //Save to Context
            console.log(result);
            setUserDetail(result);
        }
    }

  return (
    <UserDetailContext.Provider value={{userDetail,setUserDetail}}>
    <div>{children}</div>
    </UserDetailContext.Provider>
  )
}

export default Provider