"use client"
import { useRouter } from "next/navigation"
import { useParams } from "next/navigation"
import TextareaAutosize from "react-textarea-autosize"
import PaperIcon from "@/app/components/PaperIcon"
import axios from "axios"
import { useEffect, useState, useRef, Ref } from "react"
import { Paper as PaperType } from "@/app/types"
import { FaDownload, FaExpand, FaFileDownload, FaRedo, FaSave, FaSignature, FaTrash } from "react-icons/fa"
import { IoCopy, IoSave } from "react-icons/io5"
import { IoIosSave, IoMdSchool } from "react-icons/io"
import { toast, ToastContainer } from "react-toastify"

import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
import { channel } from "diagnostics_channel"
import Feedback from "@/app/components/Feedback"
import { BiTrash } from "react-icons/bi"
import { MdFileDownload, MdOutlineEdit, MdOutlineSpeakerNotes } from "react-icons/md"
import DeletePaper from "@/app/components/Popups/DeletePaper"
import GeneratePaperForm from "@/app/components/GeneratePaperForm"
import "./paper.css"
import { FaPencil, FaWeightScale } from "react-icons/fa6"
import CustomGenerate from "@/app/components/CustomGenerate"
// import 'react-quill/dist/quill.bubble.css';
// import 'react-quill/dist/quill.core.css';


export default function Paper(){

    const router = useRouter()
    const {id} = useParams()
    const [Paper,setPaper] = useState<PaperType>()
    const [selectedText, setSelectedText] = useState('');
    const [customText, setCustomText] = useState('');
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
    const [showPopup, setShowPopup] = useState(false);
    const [deletePopUp, setDeletePopUp] = useState(false);
    const [editDetailsForm, setEditDetailsForm] = useState(false);
    // const editorRef = useRef()

    const config = {
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    }

    const editorRef = useRef<any>()
    

    // const [value, setValue] = useState('');
    const getPaper = ()=>{
        
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/papers/${id}`,{
            withCredentials:true,
        }).then((response)=>{
            setPaper(response.data)
            

        }).catch((error)=>{
            console.log(error.message)
        })
    }


    const editPaper = ()=>{
        // e.preventDefault()
        // console.log(value)
        toast("Saving paper",config)
        let changes = editorRef.current.getEditor().root.innerHTML
        console.log(editorRef.current.getEditor().getContents().ops)
        
        axios.put(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/papers/${id}`,{
          changes
        },{
            withCredentials: true,
        }).then((response)=>{
            toast.success("Paper saved successfully",config)
            // toast.success("Ticket edited successfully")
        }).catch((error)=>{
            console.log(error)
            toast.error("Paper saved successfully",config)
        })
    }

    const deletePaper = ()=>{
        // e.preventDefault()
        // console.log(value)

        // console.log(ref.current.getEditor().getContents())
        
        axios.delete(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/papers/${id}`,{
            withCredentials: true,
        }).then((response)=>{
            router.push("/papers")
            // toast.success("Ticket edited successfully")
        }).catch((error)=>{
            console.log(error)
        })
    }


    const downloadPaper = ()=>{
        // e.preventDefault()
        // console.log(value)

        // console.log(ref.current.getEditor().getContents())
        
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/papers/download/${id}`,{
        },{responseType: "blob",withCredentials:true}).then((response)=>{
            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'output.pdf');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            // router.push("/papers")
            // toast.success("Ticket edited successfully")
        }).catch((error)=>{
            console.log(error)
        })
    }

    const getFeedback = ()=>{
        // e.preventDefault()
        // console.log(value)

        // console.log(ref.current.getEditor().getContents())
        
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/papers/feedback/${id}`,{
            withCredentials: true,
        }).then((response)=>{
            console.log(response.data)
            // toast.success("Ticket edited successfully")
        }).catch((error)=>{
            console.log(error)
        })
    }

    const customStyles = {
      backgroundColor: 'white',
      border: 'none',
      
    };

    

    const modules = {
        toolbar: [
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          [{ 'size': ['small', false, 'large', 'huge'] }],  // Add text size options
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'script': 'sub'}, { 'script': 'super' }],
          [{ 'indent': '-1'}, { 'indent': '+1' }],
          [{ 'direction': 'rtl' }],
          
          [{ 'align': [] }],
          ['link', 'image'],
          ['clean']  // Remove formatting button
        ]
      };


    useEffect(()=>{
        getPaper()
    },[])


    return(
        <main onClick={()=>setShowPopup(false)} className=" h-screen overflow-y-scroll bg-primary text-secondary w-[100%] relative  ">
                <ToastContainer></ToastContainer>
                
                <div className=" self-center justify-center flex ">
                    {deletePopUp && <DeletePaper deletePaper={deletePaper} setActive={setDeletePopUp}></DeletePaper>}
                    {editDetailsForm && <GeneratePaperForm  Data={Paper} setActive={setEditDetailsForm}></GeneratePaperForm>}
                    {/* navbar */}
                    <div className="fixed bg-white w-[80%] z-20 top-0 border-b-2 border-secondary border-opacity-10   ">
                      <div className="  flex justify-between p-4 items-center">
                            <div className="flex flex-col gap-0">
                                <h1 className=" text-lg font-bold">{Paper?.title}</h1>
                                <p className="text-secondary text-sm text-opacity-50">{  Paper?.created_at || "Web Jan 1, 2024"}</p>
                            </div>
                          <div className="flex gap-8 items-center justify-center">
                            {/* <button></button> */}
                            <FaRedo className="hover:cursor-pointer" size={15} onClick={()=>setDeletePopUp(true)} >  Regenerate</FaRedo>
                            <FaTrash className="hover:cursor-pointer" size={15} onClick={()=>setDeletePopUp(true)} >  Delete</FaTrash>
                            <FaPencil className="hover:cursor-pointer" size={15} onClick={()=>setEditDetailsForm(true)}>  Edit Details</FaPencil>
                            <form className="flex items-center justify-center" action={downloadPaper}>
                                <button className="  "><FaDownload size={15}/>  </button>
                            </form>
                            <form className="flex items-center justify-center" action={editPaper}>
                                <button className="flex gap-2 bg-complementary text-primary hover:opacity-50 p-2 px-4 rounded-md text-sm items-center "><FaSave size={15}/> Save</button>
                            </form>
                          </div>
                      </div>
                    </div>

                    
                    {/* <div className="flex flex-col col-span-2">
                        <button className="bg-complementary">Generate Feedback</button>
                    </div> */}
                    <div className=" py-24 w-[70%] h-fit self-center">

                      <ReactQuill style={customStyles} ref={editorRef} modules={modules} preserveWhitespace theme="snow" value={Paper?.content} onBlur={editPaper} />
                      <CustomGenerate id={id} editorRef={editorRef}></CustomGenerate>
                      
                    </div>
                  
                    
                
                </div>

            {/* </form> */}

        </main>
    )
}