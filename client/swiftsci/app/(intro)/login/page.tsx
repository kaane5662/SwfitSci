"use client"

import axios from "axios";
import Link from "next/link";
// import { ReactHTMLElement } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";

export default function Login(){
    
    const signIn = (e:FormDataEvent)=>{
        
    }

    const oauth = ()=>{
        console.log(process.env.NEXT_PUBLIC_SERVER_DOMAIN)
        window.location.href = `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/login/google`
        // axios.get(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/login/google`).then((response)=>{
        //     console.log(response)
        //     // window.location.href = response.data
        // }).catch((error)=>{
        //     console.log(error)
        // })
    }

    return(
        <main className=" bg-primary h-screen text-secondary flex items-center justify-center p-32">
            <form className="flex flex-col gap-8 w-[35%]">
                <h1 className="text-5xl font-bold text-center">Login</h1>
                <input placeholder="Email" className="rounded-md p-3"></input>
                <input placeholder="Password" type="password" className="rounded-md p-3"></input>
    
                <Link className="text-sm hover:underline text-complementary text-right -my-3" href={"/"}>Forgot Password</Link>
                
                <button className="bg-complementary text-primary rounded-md p-4 hover:opacity-70 text-lg">Log in</button>
                <Link className="text-sm text-center     -my-3" href={"/signup"}>Don't have an account? <span className="text-complementary hover:underline">Sign Up</span></Link>
                <div className="flex gap-8 justify-center items-center">
                    <FaGoogle onClick={oauth}  className="h-12 hover:cursor-pointer w-12 p-2 rounded-xl bg-white text-secondary"></FaGoogle>   
                    <FaFacebook className="h-12 w-12 p-2 rounded-xl bg-white text-secondary"></FaFacebook>

                </div>

            </form>
        </main>
    )
}