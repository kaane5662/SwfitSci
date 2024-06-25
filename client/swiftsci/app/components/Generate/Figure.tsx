import { Figure } from "@/app/types";

export default function Figure({name,data}:Figure){
    return(
        <div className="flex flex-col gap-4">
            <textarea wrap="whitespace" className="h-[200px] p-2 rounded-md w-[100%]" placeholder={`Dogs vs Cats \n Regression Model \n r=.5 \n r^2=.5 \n p=.021 `}></textarea>
        </div>
    )
}