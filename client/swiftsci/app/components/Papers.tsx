"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import { Paper } from "../types"
import Link from "next/link"

export default function Papers(){
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
        <div className="flex flex-col w-fit overflow-y-scroll h-[150px] gap-2 ">
            {Papers?.map((paper, index)=>{
                        return(
                            <Link href={`/paper/${paper.id}`} key={index} className="p-3 hover:bg-primary hover:bg-opacity-20 rounded-xl">
                                <h1 className="text-sm">{paper.title.substring(0,18)+"..."}</h1>
                            </Link>
                            
                        )
            })}
            {/* <Link href={`/paper/`}  className="p-3 hover:bg-primary hover:bg-opacity-20 rounded-xl">
                                <h1 className="text-sm">{"THis is a Test"}</h1>
            </Link>
            <Link href={`/paper/`} className="p-3 hover:bg-primary hover:bg-opacity-20 rounded-xl">
                                <h1 className="text-sm">{"THis is a Test"}</h1>
            </Link>
            <Link href={`/paper/`}className="p-3 hover:bg-primary hover:bg-opacity-20 rounded-xl">
                                <h1 className="text-sm">{"THis is a Test"}</h1>
            </Link>
            <Link href={`/paper/`} className="p-3 hover:bg-primary hover:bg-opacity-20 rounded-xl">
                                <h1 className="text-sm">{"THis is a Test"}</h1>
            </Link> */}
        </div>
    )
}