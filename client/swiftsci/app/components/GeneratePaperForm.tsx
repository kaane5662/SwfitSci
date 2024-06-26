"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import { IoClose, IoCloseCircle } from "react-icons/io5";
import { ImSpinner2 } from "react-icons/im";



export default function GeneratePaperForm({setActive, Data}:any){

    const router = useRouter()
    // const [Results,setResults] = useState<string[]>([])
    // const [collections,setCollections] = useState([])
    
    const [paperType, setPaperType] = useState(Data?.type)
    const [generating, setGenerating] = useState(false)
    
    // const removeResult = (index:number)=>{
    //     setResults([...Results].filter((_,indexRemove)=> index != indexRemove))
    // }

    // const changeResult = (index:number, value:string)=>{
    //     setResults(Results => {
    //         const TempResults = [...Results];
    //         TempResults[index]= value;
    //         return TempResults;
    //       });
    // }

    const generateResult = (e:any)=>{
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        setGenerating(true)
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/papers/`,formData,{
            withCredentials:true,
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        }).then((response)=>{
            setGenerating(false)
            // setActive(false)
            window.location.reload()
            

        }).catch((error)=>{
            setGenerating(false)
            console.log(error.message)
        })
    }

    const updateInfo = (e:any)=>{
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        setGenerating(true)
        axios.put(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/papers/details/${Data?._id}`,formData,{
            withCredentials:true,
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        }).then((response)=>{
            setGenerating(false)
            setActive(false)
            window.location.reload()
            

        }).catch((error)=>{
            setGenerating(false)
            console.log(error.message)
        })
    }

    return(
        <div className=" bg-secondary bg-opacity-50   w-full h-screen z-50 fixed flex justify-center  text-secondary">
            <div className="relative w-[50%] self-center p-12 h-[600px] z-40 bg-white overflow-y-scroll rounded-md">

                <form onSubmit={Data ? updateInfo:generateResult} className=" flex flex-col gap-4 relative  ">
                    <IoClose onClick={()=>setActive(false)} className="text-sm absolute right-0 top-0 hover:cursor-pointer hover:opacity-50" size={40} />
                    <h1 className="text-4xl font-bold">{Data ? "Update Details":"Generate Research Paper"}</h1>
                    <p className="-mb-2">Study type</p>
                    <select defaultValue={Data?.type   } onChange={(e)=>setPaperType(e.target.value)} name="type" className="rounded-md p-2 text-md  border-[2px] border-gray-300 w-[50%]" >
                            <option  value="Observational Study">Observational Study</option>
                            <option value="Experiment">Experiment</option>
                            <option value="Custom">Custom</option>
                    </select>
                    <p className="-mb-2">Title</p>
                    <input defaultValue={Data?.title} name="title" placeholder="Boston Crime Dataset Analysis" className="rounded-md p-2 text-md  border-[2px] border-gray-300 w-full"></input>
                    <p className="-mb-2">Background info</p>
                    <textarea defaultValue={Data?.background} name="background" placeholder="For years Boston has been known as one of the biggest cities with highest crime rate. It ranks at over 640/1000 in crime rate globally..." className="rounded-md h-[200px] p-2 text-md  border-[2px] border-gray-300 w-full"></textarea>
                    <p className="-mb-2">Research question</p>
                    <textarea defaultValue={Data?.research_question} name="research_question" placeholder="What are the key factors influencing crime rates in different neighborhoods of Boston?" className="rounded-md h-[100px] p-2 text-md  border-[2px] border-gray-300 w-full"></textarea>
                    <p className="-mb-2">Data collection</p>
                    <textarea defaultValue={Data?.data_collection} name="data_collection" placeholder={`Data retrieved from the Boston Police Department's public crime data repository.`} className="rounded-md h-[200px] p-2 text-md  border-[2px] border-gray-300 w-full"></textarea>
                    {paperType == "Experiment" && (
                        <>
                        <p className="-mb-2">Participants</p>
                        <textarea defaultValue={Data?.participants} name="participants" placeholder={`Independent Variables: Neighborhood, time of day, type of crime;\n Dependent Variable: Number of reported crimes.`} className="rounded-md h-[200px] p-2 text-md  border-[2px] border-gray-300 w-full"></textarea>
                        <p className="-mb-2">Control Groups</p>
                        <textarea defaultValue={Data?.control_groups} name="control_groups" placeholder={`Independent Variables: Neighborhood, time of day, type of crime;\n Dependent Variable: Number of reported crimes.`} className="rounded-md h-[200px] p-2 text-md  border-[2px] border-gray-300 w-full"></textarea>
                        <p className="-mb-2">Sampling method</p>
                        <select defaultValue={Data?.sampling_method} name="sampling_method" className="rounded-md p-2 text-md  border-[2px] border-gray-300 w-[50%]" >
                            <option value="Single Blind">Simple Random Sample</option>
                            <option value="Systematic Sample">Systematic Sample</option>
                            <option value="Stratified Sample">Stratified Sample</option>
                            <option value="Cluster Sample">Cluster Sample</option>
                        </select>
                        <p className="-mb-2">Blindness</p>
                        <select defaultValue={Data?.blindness} name="blindness" className="rounded-md p-2 text-md  border-[2px] border-gray-300 w-[50%]" >
                            <option value="Single Blind">Single Blind</option>
                            <option value="Double Blind">Double Blind</option>
                            <option value="Triple Blind">Triple Blind</option>
                        </select>
                        
                        </>
                     
                    )}    
                    <p className="-mb-2">Variables</p>
                    <textarea defaultValue={Data?.variables} name="variables" placeholder={`Independent Variables: Neighborhood, time of day, type of crime;\n Dependent Variable: Number of reported crimes.`} className="rounded-md h-[200px] p-2 text-md  border-[2px] border-gray-300 w-full"></textarea>    
                    <p className="-mb-2">Findings</p>
                    <textarea defaultValue={Data?.findings} name="findings" placeholder={`Higher crime rates were observed in downtown areas during nighttime compared to residential neighborhoods during the day`} className="rounded-md h-[200px] p-2 text-md  border-[2px] border-gray-300 w-full"></textarea>
                    
                    
                    <button disabled={generating} className={`bg-complementary text-primary w-fit h-fit p-4 px-6 rounded-md hover:opacity-50 ${generating && "opacity-50"}`}>{generating ? <ImSpinner2 className="animate-spin" size={20}></ImSpinner2> : Data ? "Update" :"Generate"}</button>
                    
                </form>
            </div>

        </div>
    )
}