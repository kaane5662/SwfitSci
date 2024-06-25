"use client"
import { useRouter } from "next/navigation"
import PaperIcon from "@/app/components/PaperIcon"
import axios from "axios"
import { useEffect, useState } from "react"
import { Paper, User } from "@/app/types"

export default function Papers(){
    const router = useRouter()

    const getPortal = ()=>{
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/billing-portal`,{withCredentials:true}).then((response)=>{
            window.location.href = response.data.url
        }).catch((error)=>{
            console.log(error)
        })
    }
    
    const [User,setUser] = useState<User>()
    const getUser = ()=>{
        
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/auth/user`,{
            withCredentials:true,
        }).then((response)=>{
            setUser(response.data)

        }).catch((error)=>{
            console.log(error.message)
        })
    }

    useEffect(()=>{
        getUser()
    },[])

    return(
        <main className=" min-h-screen bg-primary p-12  text-secondary w-full">
            <div className="flex flex-col gap-8 p-12 bg-white rounded-xl">
                <h1 className="font-bold text-4xl">Settings</h1>
                {/* profile settings */}
                <h1 className="text-2xl font-bold">Profile</h1>
                <div className="grid grid-cols-2 items-center gap-4 py-4">
                
                    <h3 className="text-md">User ID</h3>
                    <h3 className="text-sm text-secondary text-opacity-50">{User?._id}</h3>
                
                
                    <h3 className="text-md">Email</h3>
                    <h3 className="text-sm text-secondary text-opacity-50">{User?.email}</h3>
                
                
                    <h3 className="text-md">Password</h3>
                    <h3 className="text-sm text-secondary text-opacity-50">**********</h3>
                
                </div>
                {/* Subscription Settings */}
                <h1 className="text-2xl font-bold">Subscriptions</h1>
                <div className="grid grid-cols-2 items-center gap-4 py-4">
                    
                    <h3 className="text-md">Plan</h3>
                    <div className="flex gap-4 items-center">

                        <h3 className="text-sm text-secondary text-opacity-50"> {User?.limit_tokens == 100000?  "Pro" : "Free"} </h3>
                        <span/>
                        <button onClick={getPortal} className="w-fit bg-gradient-to-tr text-sm from-secondary to-complementary  rounded-full text-primary p-2 px-4 hover:opacity-50  ">Manage</button>

                    </div>
                    <h3 className="text-md">Stripe Customer Id</h3>
                    <h3 className="text-sm text-secondary text-opacity-50">{User?.stripe_customer_id}</h3>
                    
                    
                </div>
            </div>

        </main>
    )
}