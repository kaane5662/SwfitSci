import Link from "next/link";
import { FaClipboardList, FaMagic, FaRobot } from "react-icons/fa";
import Navbar from "../Navbar";
import Step from "./Step";

export default function Steps(){
    return(
        <main className="h-screen bg-primary flex items-center justify-center text-secondary">
            <div className="flex  flex-col gap-16 p-24">
                <h1 className="text-6xl font-bold text-secondary">How it Works</h1>
                <div className="grid grid-cols-4 gap-8 py-12 pb-4">
                    <Step step="1" title="Input your Topic" desc="Enter your research topic or keywords to get started" final={false}></Step>
                    <Step step="2" title="Tailor your data" desc="Fill in the form with your results, variables, research question, etc. You do not need to fill every question" final={false}></Step>
                    <Step step="3" title="Generate and Review" desc="Let our AI do the work. Review the generated content and make any necessary adjustments using the rich text editor." final={false}></Step>
                    <Step step="4" title="Download and Use" desc="Download your polished research paper and use it for your academic needs." final={false}></Step>
                   
                </div>
                {/* <div className="flex items-center   ">
                    <h1 className="font-bold ">Powered by</h1>
                    <img className=" object-scale-down w-14 h-14" src="https://upload.wikimedia.org/wikipedia/commons/1/13/ChatGPT-Logo.png"></img>

                </div> */}
            </div>
        </main>
    )
}