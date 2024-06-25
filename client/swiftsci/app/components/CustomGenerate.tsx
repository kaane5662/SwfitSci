import { useState, useEffect, useRef } from "react";
import { FaExpand, FaRedo, FaSave, FaSignature, FaTrash } from "react-icons/fa"
import { IoCopy, IoSave } from "react-icons/io5"
import { MdFileDownload, MdOutlineEdit, MdOutlineSpeakerNotes } from "react-icons/md"
import { FaPencil, FaWeightScale } from "react-icons/fa6"
import { IoMdSchool } from "react-icons/io";
import axios from "axios";
import { AiOutlineLoading } from "react-icons/ai";

export default function CustomGenerate({editorRef,id}:any){

    const [selectedText, setSelectedText] = useState('');
    const [customText, setCustomText] = useState('');
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
    const [showPopup, setShowPopup] = useState(false);
    const [generating, setGenerating] = useState(false);


    const insertText = () => {
        console.log("Clicked    ")
        const selection:any = window.getSelection();
        if (selection.rangeCount > 0) {
        selection.deleteFromDocument();
        selection.getRangeAt(0).insertNode(document.createTextNode(customText));
        selection.empty()
        }
        setShowPopup(false);
            
    };

    const generateCustom = (custom_prompt:string)=>{
        // e.preventDefault()
        // console.log(value)

        // console.log(ref.current.getEditor().getContents())
        setCustomText("")
        setGenerating(true)
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/papers/custom/${id}`,{
            text_input: selectedText,
            custom_prompt: custom_prompt
        },{
            withCredentials: true,
        }).then((response)=>{
            setGenerating(false)
            setCustomText(response.data)
        }).catch((error)=>{
            setGenerating(false)
            console.log(error)
        })
    }

    
    

    useEffect(() => {
        if (!editorRef.current) return;
    
        const quill = editorRef.current.getEditor();
    
        const handleMouseUp = (event) => {
          if (editorRef.current && editorRef.current.editor.root.contains(event.target)) {
            setCustomText("")
            const range = quill.getSelection();
            if (range && range.length > 0) {
              const selectedText = quill.getText(range.index, range.length);
              const bounds = quill.getBounds(range.index, range.length);
              const editorRect = editorRef.current.editor.root.getBoundingClientRect();
    
              setPopupPosition({
                top: bounds.bottom+window.scrollY + bounds.height+80,
                left: bounds.left,
              });
              setSelectedText(selectedText);
            //   setRange(range); // Save the range of the selection
              setShowPopup(true);
            } else {
              setShowPopup(false);
            }
          } else {
            setShowPopup(false);
          }
        };
    
        editorRef.current.editor.root.addEventListener('mouseup', handleMouseUp);
    
        return () => {
          if (editorRef.current && editorRef.current.editor.root) {
            editorRef.current.editor.root.removeEventListener('mouseup', handleMouseUp);
          }
        };
      }, [editorRef]);

    return(
        showPopup &&
        (<div style={{top: `${popupPosition.top}px`}} className=" absolute w-fit max-w-[80%]    ">
            <div className="bg-secondary text-primary p-4 rounded-xl flex flex-col gap-4 text-sm">

                <h2>Selected Text:</h2>
                <p>{selectedText}</p>
                <div className="flex gap-4">
                    <button onClick={()=> generateCustom("Clarify this sentence to ensure it conveys the intended meaning clearly.")} className="bg-primary bg-opacity-10 hover:opacity-50 flex gap-4 p-2 rounded-md items-center text-sm"><MdOutlineSpeakerNotes size={10}></MdOutlineSpeakerNotes> Clarify</button>
                    <button onClick={()=> generateCustom("Expand on this idea to provide more detail and context.")} className="bg-primary bg-opacity-10 hover:opacity-50 flex gap-4 p-2 rounded-md items-center text-sm"><FaExpand size={10}></FaExpand> Expand</button>
                    <button onClick={()=> generateCustom("Adjust the language to make it suitable for a scholarly audience.")} className="bg-primary bg-opacity-10 hover:opacity-50 flex gap-4 p-2 rounded-md items-center text-sm"><IoMdSchool size={10}></IoMdSchool> Academic</button>
                    <button onClick={()=> generateCustom("Rewrite this input to vary the sentence structure and improve engagement.")} className="bg-primary bg-opacity-10 hover:opacity-50 flex gap-4 p-2 rounded-md items-center text-sm"><FaSignature size={10}></FaSignature> Vary</button>
                    
                </div>
                {customText ? (
                        <div className="flex w-full gap-4">
                            <p className="w-[80%]">{customText}</p>
                            <button onClick={insertText} className=" bg-primary text-secondary p-3 px-6 rounded-md w-fit h-fit ">Insert</button>
                        </div>
                ): generating ? <h1 className=" animate-spin h-fit w-fit"><AiOutlineLoading  size={20} /> </h1>: null
                }

            </div>
        </div> )

    )

}