"use client"
import { useRouter } from "next/navigation"
import PaperIcon from "@/app/components/PaperIcon"
import axios from "axios"
import { useEffect, useState } from "react"
import { Paper } from "@/app/types"

export default function Papers(){
    const router = useRouter()
    
    const [Papers,setPapers] = useState<Paper[]>()
    const getPapers = ()=>{
        
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/papers`,{
            withCredentials:true,
        }).then((response)=>{
            setPapers(response.data)

        }).catch((error)=>{
            console.log(error.message)
        })
    }

    useEffect(()=>{
        getPapers()
    },[])

    return(
        <main className=" h-screen bg-primary text-secondary w-full overflow-y-scroll">
            <div className="flex flex-col gap-8 p-24">
                <h1 className="font-bold text-4xl">Research Papers </h1>
                <div className="grid grid-cols-5 gap-8">
                    {Papers?.map((paper, index)=>{
                        return(
                            <PaperIcon id={paper.id} key={index} type={paper.type} title={paper.title.substring(0,25)+"..."}></PaperIcon>
                        )
                    })}
                    
                    
                </div>
            </div>

        </main>
    )
}