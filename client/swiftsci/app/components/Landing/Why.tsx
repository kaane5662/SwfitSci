import { FaRobot } from "react-icons/fa6";
import WhyBullet from "./WhyBullet";
import { MdTopic } from "react-icons/md";
import { FaBook } from "react-icons/fa";

export default function Why(){
    return(
        <main className="h-screen bg-primary flex items-center justify-center text-secondary">
            <div className=" grid grid-cols-2 gap-24 p-24">
                <div className="flex flex-col gap-4">
                    <h1 className="text-6xl font-bold text-secondary">Why Us?</h1>
                    <h3 className="text-lg text-secondary text-opacity-50">Unparalleled Training Data and Methodology</h3>
                </div>
                <div className="flex flex-col gap-8 ">
                    <WhyBullet icon={<FaRobot size={30}></FaRobot>} title="1,000+ Research Papers">Our AI model has been trained on an extensive dataset comprising over 10,000 research papers from leading AI conferences and journals. This comprehensive training ensures our AI understands and can generate content across a wide range of AI topics.</WhyBullet>
                    <WhyBullet icon={<MdTopic size={30}></MdTopic>} title="100+ AI Subfields">From machine learning to phsycology to environmental science, our AI covers more than 100 subfields of topics, ensuring depth and breadth in generated content.</WhyBullet>
                    <WhyBullet icon={<FaBook size={30}></FaBook>} title="Top-Tier Journals and Conferences">Our training data includes papers from prestigious sources such as Academic Onefile, Google Scholars, ensuring that the AI generates content that reflects current state-of-the-art research.</WhyBullet>
                   
                </div>
                {/* <div className="flex items-center   ">
                    <h1 className="font-bold ">Powered by</h1>
                    <img className=" object-scale-down w-14 h-14" src="https://upload.wikimedia.org/wikipedia/commons/1/13/ChatGPT-Logo.png"></img>

                </div> */}
            </div>
        </main>
    )
}