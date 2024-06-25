import { AiOutlineLoading } from "react-icons/ai";

export default function Loading(){
    return(
        <main className="bg-primary text-secondary w-full flex justify-center items-center">
            <div className="p-32">
                <h1 className=" animate-spin self-center"><AiOutlineLoading size={40}></AiOutlineLoading></h1>

            </div>
        </main>
    )
}