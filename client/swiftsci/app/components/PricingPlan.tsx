"use client"
import { FaCheck } from "react-icons/fa"
import axios from "axios"
import { FaCircleCheck } from "react-icons/fa6"

export default function PricingPlan({name, desc, features, price}:any){

    const subscribe = ()=>{
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/subscribe/${name}`,{withCredentials:true}).then((response)=>{
            window.location.href = response.data.url
        }).catch((error)=>{
            console.log(error)
        })
    }

    return(
        <div className="flex flex-col gap-8 p-8 bg-white rounded-xl shadow-md w-[80%] ">
            <div className="flex flex-col gap-2 p-4 justify-center items-center text-center px-8">
                <h1 className="text-3xl font-bold">{name}</h1>
                <h1 className="text-3xl font-bold tracking-wider"><span className="self-center text-lg">$</span>{price}<span className="text-sm align-top text-opacity-50 text-secondary"> /month</span></h1>
                <h3 className="text-md">{desc}</h3>

            </div>
            <button onClick={subscribe} className="bg-gradient-to-tr hover:opacity-50 -opacity-50 from-secondary to-complementary text-primary  rounded-md p-4">{price == 0 ? "Get Started For Free":"Subscribe"}</button>
            <div className="flex flex-col gap-2">
                {features.map((feature,index)=>{
                    return(
                        <p key={index} className="text-sm text-secondary text-opacity-50 flex items-center gap-4"><FaCircleCheck></FaCircleCheck> {feature}</p>
                    )
                })}
            </div>
            
            
        </div>
    )
}