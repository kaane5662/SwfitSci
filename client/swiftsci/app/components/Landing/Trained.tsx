import Link from "next/link";


export default function Trained(){
    return(
        <main className="p-8 bg-secondary flex items-center justify-center">
            <div className="flex  flex-col gap-8 items-center text-center">
                <h1 className="text-xl font-bold  text-primary">Trained on over</h1>
                <h1 className="text-6xl font-bold  text-primary">500+</h1>
                <h1 className="text-xl text-opacity-50  text-primary">Academic Research Papers</h1>
                <div className="grid grid-cols-2 gap-8 self-center justify-center items-center  ">
                    <img className=" object-cover object-left w-full h-10 opacity-50" src="https://www.richlandlibrary.com/sites/default/files/styles/maximum/public/2021-03/Gale-Academic-Onefile.png.webp?itok=7CfrrvS9"></img>
                    <img className=" w-full h-5 opacity-50" src="https://upload.wikimedia.org/wikipedia/commons/2/28/Google_Scholar_logo.png"></img>
                </div>
                {/* <Link href="/papers" className="bg-complementary w-fit p-4 px-8 rounded-lg text-lg hover:opacity-50 self-center">Generate Now</Link> */}
            </div>
        </main>
    )
}