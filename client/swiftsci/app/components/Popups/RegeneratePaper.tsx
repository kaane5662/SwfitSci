import axios from "axios"
import { useState } from "react"
import { AiOutlineLoading } from "react-icons/ai"

interface Regen{
    setActive: Function,
    id: string | string[]
}

export default function RegeneratePaper({setActive, id}:Regen){

    const [generating, setGenerating] = useState(false)

    const regeneratePaper = ()=>{
        setGenerating(true)
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/papers/regenerate/${id}`,{
            withCredentials: true,
        }).then((response)=>{
            setGenerating(false)
            window.location.reload()
        }).catch((error)=>{
            setGenerating(false)
            console.log(error)
        })
    }

    return(
        <div className=" fixed z-50 h-screen flex bg-secondary justify-center w-full bg-opacity-50">
            <div className="p-4 flex flex-col gap-8 h-fit my-40 bg-white rounded-md w-[30%] ">
                <h1 className="text-3xl text-center font-bold">Regenerate Paper</h1>
                <div className="flex flex-col gap-4">
                    <h1 className="text-md text-center font-bold">Are you sure you want to regenerate this paper?</h1>
                    <h1 className="text-sm text-secondary w-fit text-opacity-50 text-center">This paper will be rewritten using the current details in the form and your changes will be deleted.</h1>

                </div>
                <div className="grid grid-cols-2 place-items-center justify-center gap-6 w-full">
                    {generating ? (<h1 className=" animate-spin h-fit "><AiOutlineLoading  size={20} /> </h1>):(<button onClick={regeneratePaper} className="p-2  text-md rounded-md text-primary hover:opacity-50 bg-complementary w-full" >Yes</button>)}
                    
                    <button onClick={()=>setActive(false)} className="p-2  text-md rounded-md hover:opacity-50 bg-primary w-full">No</button>
                </div>  
            </div>
        </div>
    )
}