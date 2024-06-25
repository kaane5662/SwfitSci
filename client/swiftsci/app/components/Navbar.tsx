import Image from "next/image";
import Link from "next/link";


export default function Navbar(){
    return(
        <nav className="navbar fixed w-full">
            <div className="pr-4 bg-primary flex w-full items-center justify-between text-secondary">
                {/* left */}
                
                <Link href="/"><Image height={100} width={100} alt="Logo" src={"/logo.png"} className="font-bold text-2xl"></Image></Link>
                   
                
                {/* center */}
                <div className="flex gap-8 items-center">
                    <h3 className=" hover:underline cursor-pointer duration-300" >Pricing</h3>
                    <h3 className="hover:underline cursor-pointer duration-300" >FAQ</h3>
                </div>
                {/* right */}
                <div className="flex gap-8 items-center">
                    <Link href={"/papers"} className=" hover:opacity-50 bg-complementary text-primary rounded-md p-3 px-6 " >Generate</Link>
                </div>
                
                
            </div>
        </nav>
    )
}