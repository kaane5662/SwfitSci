"use client"
import Image from "next/image";
import React from "react";
import { AiFillExperiment } from "react-icons/ai";
import { FaClipboardList } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function PaperIcon({type,title,id}:any){
    const router = useRouter()
    return(
        <div onClick={()=>router.push(`/paper/${id}`)} className="flex flex-col gap-2 justify-center hover:cursor-pointer hover:bg-secondary hover:bg-opacity-15 p-4 rounded-md ">
            <div className=" bg-white flex flex-col gap-2 items-center rounded-xl shadow-md justify-center w-full p-8">
                {type == "experiment"? (
                    <AiFillExperiment className="h-24 w-24"></AiFillExperiment>  
                ):(  
                    <FaClipboardList className="h-24 w-24"></FaClipboardList>   
                )}
            </div>
            <h3 className="text-xl font-bold">{title}</h3>
            <h3 className="text-md text-complementary font-semibold">{type == "experiment"? "Experiment" : "Observation"}</h3>
        </div>
    )
}