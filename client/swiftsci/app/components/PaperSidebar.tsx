"use client"
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React,{ useEffect, useState } from "react";
import { User } from "../types";
import { FaArrowCircleLeft, FaDoorOpen, FaList } from "react-icons/fa";
import { FaArrowLeftLong, FaDoorClosed } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { GrPlan } from "react-icons/gr";
import { CiSquareChevLeft } from "react-icons/ci";
import { GiToken } from "react-icons/gi";
import { PiGearSix } from "react-icons/pi";
import { RiAiGenerate } from "react-icons/ri";
// import ObservationalForm from "./GeneratePaperForm";
import GeneratePaperForm from "./GeneratePaperForm";
import Papers from "./Papers";
import { AiOutlineLoading } from "react-icons/ai";

export default function PaperSidebar(){

    const [User,setUser] = useState<User>()
    const [formActive, setFormActive] = useState(false)


    const router = useRouter()
    const isAuth = ()=>{
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/auth/user`,{withCredentials:true}).then((response)=>{
            setUser(response.data)
        }).catch((error)=>{
            if(error.response.status == 403){
                router.push("/login")
            }
            console.log(error)
        })
    }

    const logout = ()=>{
        axios.delete(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/logout`,{withCredentials:true}).then((response)=>{
            router.push("/login")
        }).catch((error)=>{
            console.log(error)
        })
    }

    useEffect(()=>{
        isAuth()
    },[])

    return(
        <React.Fragment>
        {formActive && <GeneratePaperForm setActive={setFormActive}></GeneratePaperForm>}
        <nav className=" h-screen  bg-secondary w-[20%] flex justify-center overflow-hidden">
            {User? (<div className="w-fit gap-16 sticky  h-screen  flex flex-col text-primary   ">
                {/* left */}
                
                
                <div className="flex flex-col">
                    {/* <Image height={150} width={150} alt="Logo" src={"/logo.png"} className="font-bold text-2xl bg-ble text-white filter grayscale  brightness-200 contrast-200"></Image> */}
                </div>
                


                <div className="flex flex-col gap-6">
                    <button onClick={()=>setFormActive(true)}  className="flex gap-4 cursor-pointer items-center rounded-md hover:opacity-50 text-primary p-3 w-full from-complementary to-complementary via-complementary3 bg-gradient-to-tl " ><RiAiGenerate></RiAiGenerate> Generate</button>
                    <Link className="flex gap-4 items-center p-2 hover:bg-primary hover:text-secondary duration-300 rounded-md" href={"/subscriptions"}> <GrPlan/> Plan</Link>
                    <div className="">  
                        <h1 className="flex gap-4 items-center  rounded-md text-sm p-2 font-bold"> Papers</h1>
                        {Papers ? (<Papers></Papers>) : <h1 className=" animate-spin self-center"><AiOutlineLoading size={20}></AiOutlineLoading></h1>}

                    </div>

                    
                </div>

                
                
                {/* center */}
                {/* <div className="flex flex-col gap-8 ">
                    <h3 className=" hover:underline cursor-pointer duration-300" >{User?.email}</h3>
                    <h3 className="hover:underline cursor-pointer duration-300" >FAQ</h3>
                </div> */}
                {/* right */}
                
                <div className="flex flex-col gap-6">
                    <h3 className="font-bold">{User?.email.split("@")[0]}</h3>
                    <div className=" h-fit p-2 w-full  bg-gradient-to-tr from-   to-complementary  rounded-full">
                        <h1 className="text-sm tracking-widest justify-center text-primary text-center flex gap-4  items-center  "> <GiToken></GiToken>  {User?.tokens}/{User?.limit_tokens}</h1>

                    </div>
                    <Link className="flex gap-4 items-center hover:bg-primary hover:text-secondary duration-300 rounded-md p-2" href={"/settings"}> <PiGearSix/> Settings</Link>
                    <button onClick={logout} className="flex gap-4 items-center hover:bg-primary hover:text-secondary duration-300 rounded-md p-2"> <CiSquareChevLeft></CiSquareChevLeft> Logout </button>
                </div>

                
                
                
            </div>): <h1 className=" animate-spin self-center"><AiOutlineLoading size={20}></AiOutlineLoading></h1>}
        </nav>
        </React.Fragment>
    )
}