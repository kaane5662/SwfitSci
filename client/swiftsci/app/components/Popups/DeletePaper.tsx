export default function DeletePaper({deletePaper, setActive}:any){
    return(
        <div className=" absolute flex z-50 h-screen bg-secondary justify-center w-full bg-opacity-50">
            <div className="p-4 flex flex-col gap-8 h-fit my-40 bg-white rounded-md ">
                <h1 className="text-3xl text-center font-bold">Delete Paper</h1>
                <h1 className="text-md">Are you sure you want to delete this paper? This action cannot be undone.</h1>
                <div className="flex gap-4 justify-center">
                    <button onClick={deletePaper} className="p-4 px-8 text-md rounded-md text-primary hover:opacity-50 bg-red-500">Yes</button>
                    <button onClick={()=>setActive(false)} className="p-4 px-8 text-md rounded-md hover:opacity-50 bg-primary">No</button>
                </div>
            </div>
        </div>
    )
}