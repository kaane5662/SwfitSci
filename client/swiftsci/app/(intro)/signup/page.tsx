import Link from "next/link";

export default function SignUp(){
    return(
        <main className=" bg-primary h-screen text-secondary flex items-center justify-center p-32">
            <form className="flex flex-col gap-8 w-[35%]">
                <h1 className="text-5xl font-bold text-center">Create Account</h1>
                <input name="email" placeholder="Email" className="rounded-md p-3"></input>
                <input name="password" placeholder="Password" type="password" className="rounded-md p-3"></input>
                <input name="confirmpassword" placeholder="Confirm Password" type="password" className="rounded-md p-3"></input>
    
                {/* <Link className="text-sm hover:underline text-complementary text-right -my-3" href={"/"}>Forgot Password</Link> */}
                
                <button className="bg-complementary text-primary rounded-md p-4 hover:opacity-70 text-lg">Sign Up</button>
                <Link className="text-sm text-center     -my-3" href={"/login"}>Already Have An Account? <span className="text-complementary hover:underline">Log In</span></Link>
            </form>
        </main>
    )
}