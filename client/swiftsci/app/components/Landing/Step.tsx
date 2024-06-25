interface Step{
    step: string,
    title:string,
    desc:string,
    final:boolean
}

export default function Step({step,title,desc,final}:Step){
    return(
        <div className=" items-start text-left flex flex-col gap-8 text-secondary">
            <div className="flex gap-8 items-center">
                <h1 className="font-bold text-complementary text-6xl">{step}.</h1>
                {!final && (<div className="bg-complementary bg-opacity-10 h-1 w-[200px] "></div>)}
            </div>
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-lg text-opacity-50 text-secondary">{desc}</p>
        </div>
    )
}