import Image from "next/image";
import Chair from "@/assets/chair1.png"
import ImageNotFound from "@/assets/imagenotfound.jpg"
import {AiOutlineShoppingCart} from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slice/cartSlice";


export default function Trending({product}){

    const dispatch = useDispatch()
    let {name, price, images} = product

    return<>


  



<div className="mt-6 relative border shadow hover:border-2 hover:border-primary group">
<div className="bg-[#F7F7F7]">
{/* <Image src={Chair} className="w-full" alt="" /> */}
{
    images.length != 0  ? <Image src={images[0]} width={200} height={200} className="w-full object-cover aspect-square" alt="" /> : <Image src={ImageNotFound} className="w-full object-cover aspect-square" alt="" />
}

<div className="hidden p-2 bg-primary-tint flex justify-center items-center h-10 w-10 rounded-full absolute top-[50%] left-2 group-hover:flex cursor-pointer" onClick={()=>{
    dispatch(addToCart(product))
}}>
<AiOutlineShoppingCart className="h-8 w-8" />
</div>
</div>
<div className="flex justify-between p-2">
  <p className="text-header">{name}</p>
  <p className="text-secondary">Rs. {price}</p>
</div>
</div>

 

    </>
}