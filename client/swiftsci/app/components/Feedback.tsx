import axios from "axios"
export default function Feedback(){

    const generateFeedback = ()=>{
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/papers/feedback`,{
            
          },{
              withCredentials: true,
          }).then((response)=>{
              // toast.success("Ticket edited successfully")
          }).catch((error)=>{
              console.log(error)
          })
    }

    return(
        <div className="col-span-2 p-4 flex flex-col gap-4">
            <button onClick={} className="bg-complementary text-primary text-sm p-2 rounded-xl">Generate Feedback</button>
        </div>
    )
}