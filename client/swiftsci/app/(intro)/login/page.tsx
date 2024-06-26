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
        <main className=" bg-primary h-screen text-secondary flex  justify-center p-32">
            <div className="flex flex-col gap-16 w-[35%] my-12">
                <h1 className="text-5xl font-bold text-center">Login</h1>
                {/* <input placeholder="Email" className="rounded-md p-3"></input>
                <input placeholder="Password" type="password" className="rounded-md p-3"></input> */}
                <div className="flex flex-col gap-8">
                    <form action={`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/login/google`}>
                        <button className="p-4 rounded-md bg-white flex gap-8 items-center justify-center w-full shadow-lg">
                            <FaGoogle size={20} onClick={oauth}  className=" hover:cursor-pointer   rounded-xl bg-white text-secondary"></FaGoogle> 
                            <h1 className="text-md">Sign in with Google</h1>
                        </button>
                    </form>
                    <form action={`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/login/google`}>
                        <button className="p-4 rounded-md bg-white flex gap-8 items-center justify-center w-full shadow-lg">
                            <FaFacebook size={20} onClick={oauth}  className=" hover:cursor-pointer   rounded-xl bg-white text-secondary"></FaFacebook> 
                            <h1 className="text-md">Sign in with Facebook</h1>
                        </button>
                    </form>

                </div>

                {/* <Link className="text-sm hover:underline text-complementary text-right -my-3" href={"/"}>Forgot Password</Link> */}
                
                {/* <button className="bg-complementary text-primary rounded-md p-4 hover:opacity-70 text-lg">Log in</button> */}
                {/* <Link className="text-sm text-center     -my-3" href={"/signup"}>Don not have an account? <span className="text-complementary hover:underline">Sign Up</span></Link>
                <div className="flex gap-8 justify-center items-center">
                    <FaGoogle onClick={oauth}  className="h-12 hover:cursor-pointer w-12 p-2 rounded-xl bg-white text-secondary"></FaGoogle>   
                    <FaFacebook className="h-12 w-12 p-2 rounded-xl bg-white text-secondary"></FaFacebook>
                    
                </div> */}

            </div>
        </main>
    )
}