import Link from "next/link";


export default function Stats(){
    return(
        <main className=" bg-complementary p-12 text-primary flex items-center justify-center">
            <div className="flex  flex-col gap-16 items-center text-center">
                <div className="flex flex-col gap-2">

                    <h1 className="text-6xl font-bold text-primary">Our Stats</h1>
                    <h3 className="text-xl text-opacity-50 text-primary">Allieviate the pain of writing research papers</h3>
                </div>
                
                <div className="grid grid-cols-3 gap-24">
                    <div className="flex flex-col gap-2 items-center">
                        <h1 className="text-4xl font-bold">1500 +</h1>
                        <h3 className="text-xl text-primary text-opacity-50">Generated Papers</h3>
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                        <h1 className="text-4xl font-bold">400 +</h1>
                        <h3 className="text-xl text-primary text-opacity-50">Monthly Active Users</h3>
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                        <h1 className="text-4xl font-bold">300 +</h1>
                        <h3 className="text-xl text-primary text-opacity-50">Papers Saved</h3>
                    </div>


                </div>

                
                {/* <h1 className="text-xl text-opacity-50 w-[60%]  text-primary">SwiftSci helps alleviate the pain of writing research papers by generating it for you based on your data</h1>

                <Link href="/papers" className="bg-complementary w-fit p-4 px-8 rounded-lg text-lg hover:opacity-50 self-center">Generate Now</Link> */}
            </div>
        </main>
    )
}