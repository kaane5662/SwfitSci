import Image from "next/image";
import Hero from "./components/Landing/Hero";
import Steps from "./components/Landing/Steps";
import Navbar from "./components/Navbar";
import Stats from "./components/Landing/Stats";
import Trained from "./components/Landing/Trained";
import Features from "./components/Landing/Features";
import Why from "./components/Landing/Why";

export default function Home() {
  return (
    <main className="bg-primary flex flex-col">
        <Navbar></Navbar>
        <Hero></Hero>
        <Steps></Steps>
        <Stats></Stats>
        <Features></Features>
        {/* <Trained></Trained> */}
        <Why></Why>
    </main>
  );
}
