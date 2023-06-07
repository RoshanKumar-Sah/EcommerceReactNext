import Image from "next/image";
import Chair from "@/assets/chair1.png"

export default function Featured(){
    return <>
    <div className="mt-32 container">
<h2 className="text-4xl font-semibold text-header text-center">Featured Products</h2>
<div className="mt-6 flex flex-wrap justify-center gap-4">
<div className="border shadow  basis-[270px] w-full sm:w-1/3 md:w-1/5">
  <div className="bg-[#F6F7FB]">
    <Image src ={Chair} alt=""  height={200} width={200} className="w-full" />
  </div>
  <div className="text-center">
    <p className="text-secondary text-xl">Chair</p>
    <p className="text-header">Code - Y523201</p>
    <p className="text-header">Rs. 500</p>
  </div>
  </div>

  <div className="border shadow basis-[270px] w-full sm:w-1/3 md:w-1/5">
  <div className="bg-[#F6F7FB]">
    <Image src ={Chair} alt=""  height={200} width={200} className="w-full" />
  </div>
  <div className="text-center">
    <p className="text-secondary text-xl">Chair</p>
    <p className="text-header">Code - Y523201</p>
    <p className="text-header">Rs. 500</p>
  </div>
  </div>

  <div className="border shadow basis-[270px] w-full sm:w-1/3 md:w-1/5">
  <div className="bg-[#F6F7FB]">
    <Image src ={Chair} alt=""  height={200} width={200} className="w-full" />
  </div>
  <div className="text-center">
    <p className="text-secondary text-xl">Chair</p>
    <p className="text-header">Code - Y523201</p>
    <p className="text-header">Rs. 500</p>
  </div>
  </div>

  <div className="border shadow basis-[270px] w-full sm:w-1/3 md:w-1/5">
  <div className="bg-[#F6F7FB]">
    <Image src ={Chair} alt=""  height={200} width={200} className="w-full" />
  </div>
  <div className="text-center">
    <p className="text-secondary text-xl">Chair</p>
    <p className="text-header">Code - Y523201</p>
    <p className="text-header">Rs. 500</p>
  </div>
  </div>


</div>
</div>
</>
}