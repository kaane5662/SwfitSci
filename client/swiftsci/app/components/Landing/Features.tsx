import Link from "next/link";
import { FaClipboardList, FaMagic, FaRobot } from "react-icons/fa";
import Navbar from "../Navbar";
import { IoChatbubble, IoText } from "react-icons/io5";

export default function Features(){
    return(
        <main className="h-screen bg-primary flex items-center justify-center text-secondary">
            <div className="flex  flex-col gap-4 items-center text-center">
                <h1 className="text-6xl font-bold text-secondary">Features</h1>
                <div className="grid grid-cols-2 place-items-center gap-12 py-12 px-32 pb-4">
                    <div className="flex flex-col gap-4 items-center rounded-xl bg-complementary bg-opacity-10 p-8 border-2 border-secondary border-opacity-50 ">
                        <div className="flex gap-8 items-center">

                            <h1 className="border-2 w-fit flex place-self-center bg-complementary bg-opacity-20 border-opacity-50 p-4 rounded-lg">{<FaMagic size={20}></FaMagic>}</h1>
                            <h3 className="font-bold text-2xl">AI-Powered Efficiency</h3>
                        </div>
                        <h3 className=" text-secondary text-opacity-50 text-md">Leverage the power of AI to generate comprehensive and accurate research papers in a fraction of the time.</h3>
                    </div>
                    <div className="flex flex-col gap-4 items-center rounded-xl bg-complementary bg-opacity-10 p-8 border-2 border-secondary border-opacity-50 ">
                        <div className="flex gap-8 items-center">

                            <h1 className="border-2 w-fit flex place-self-center bg-complementary bg-opacity-20 border-opacity-50 p-4 rounded-lg">{<FaClipboardList size={20}></FaClipboardList>}</h1>
                            <h3 className="font-bold text-2xl">Customizable Outputs</h3>
                        </div>
                        <h3 className=" text-secondary text-opacity-50 text-md">Tailor the generated content to meet your specific needs with easy-to-use customization options.</h3>
                    </div>
                    <div className="flex flex-col gap-4 items-center rounded-xl bg-complementary bg-opacity-10 p-8 border-2 border-secondary border-opacity-50">
                        <div className="flex gap-8 items-center">

                            <h1 className="border-2 w-fit flex place-self-center bg-complementary bg-opacity-20 border-opacity-50 p-4 rounded-lg">{<IoChatbubble size={20}></IoChatbubble>}</h1>
                            <h3 className="font-bold text-2xl">Citation and Formatting Tools</h3>
                        </div>
                        <h3 className=" text-secondary text-opacity-50 text-md"> Automatically format citations and references in various academic styles such as APA, MLA, and Chicago.</h3>
                    </div>
                    <div className="flex flex-col gap-4 items-center rounded-xl bg-complementary bg-opacity-10 p-8 border-2 border-secondary border-opacity-50 ">
                        <div className="flex gap-8 items-center">

                            <h1 className="border-2 w-fit flex place-self-center bg-complementary bg-opacity-20 border-opacity-50 p-4 rounded-lg">{<IoText size={20}></IoText>}</h1>
                        <h3 className="font-bold text-2xl">Rich Text Editor</h3>
                        </div>
                        <h3 className=" text-secondary text-opacity-50 text-md"> Edit your generated content seamlessly with our integrated rich text editor, offering advanced formatting and styling options.</h3>
                    </div>

                </div>
                {/* <div className="flex items-center   ">
                    <h1 className="font-bold ">Powered by</h1>
                    <img className=" object-scale-down w-14 h-14" src="https://upload.wikimedia.org/wikipedia/commons/1/13/ChatGPT-Logo.png"></img>

                </div> */}
            </div>
        </main>
    )
}   