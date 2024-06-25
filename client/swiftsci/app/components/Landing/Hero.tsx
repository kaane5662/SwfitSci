import Link from "next/link";

export default function Hero(){
    return(
        <main className="h-screen bg-primary flex items-center justify-center">
            <div className="flex  flex-col gap-8 items-center text-center">
                <h1 className=" text-md text-opacity-50 text-complementary font-bold">AI Research Paper Generator</h1>
                <h1 className="text-6xl font-bold w-[70%] text-secondary">Focus on data collection, not writing</h1>
                <h1 className="text-xl text-opacity-50 w-[60%]  text-secondary">SwiftSci helps alleviate the pain of writing research papers by generating it for you based on your data</h1>
                <Link href="/papers" className="bg-complementary w-fit p-4 px-8 rounded-lg text-lg hover:opacity-50 self-center">Generate Now</Link>
            </div>
        </main>
    )
}