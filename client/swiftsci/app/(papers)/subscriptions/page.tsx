import PricingPlan from "@/app/components/PricingPlan";

export default function Subscriptions(){
    return(
        <main className=" min-h-screen w-full bg-primary text-secondary">
            <div className="px-24 py-8 flex flex-col gap-8">
                <h1 className="font-bold text-4xl text-secondary text-center">Pricing Plans</h1>
                <div className="grid grid-cols-2 gap-8 self-center place-content-center place-items-center">
                    <PricingPlan name={"Free"} price={0} desc={"Perfect for individuals exploring our service"} features={["Access to basic templates", "Basic customization options","10000 generation tokens"]}></PricingPlan>
                    <PricingPlan name={"Pro"} price={8.99} desc={"Ideal for serious researchers and small teams"} features={["Access to basic templates", "Basic customization options","100000 generation tokens MONTHLY","Access to editor features"]}></PricingPlan>
                    {/* <PricingPlan name={"Free"} price={0} desc={"Perfect for individuals exploring our service"} features={["Access to basic templates", "Basic customization options","10000 generation tokens"]}></PricingPlan> */}
                </div>
            </div>
        </main>
    )
}