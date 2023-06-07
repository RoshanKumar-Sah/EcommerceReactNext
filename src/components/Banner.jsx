
import Image from "next/image";
import Lamp from "@/assets/hanging_lamp.png";
import Sofa from "@/assets/sofa.png"

export default function Banner(){
    return <>
        <div className="bg-primary-tint w-full h-full mt-5">
<div className="container flex flex-wrap">
<Image src={Lamp} className="w-96 h-96" />
<div className="flex-col gap-3 max-w-xl sm:mt-48">
<p className="text-secondary">Best Furniture For Your Castle....</p>
<h1 className="font-bold text-5xl">New Furniture Collection Trends in 2020</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing
in phasellus non in justo.
</p>
<button className="py-4 px-10 mt-7 text-white bg-secondary md:mb-10">Shop Now</button>
</div>
<Image src={Sofa} className="sm:h-96 sm:w-96 my-9 md:ml-5" />
</div>
</div>
    </>
}