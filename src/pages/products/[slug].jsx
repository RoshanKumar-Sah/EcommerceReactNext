import Header from "@/components/Header";
import axios from "axios";
import Link from "next/link";
import Slider from "react-slick";
import Image from "next/image";
import { useState } from "react";
import { PageNotFoundError } from "next/dist/shared/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/slice/cartSlice";

export default function SingleProduct({product}){

    let redux_user = useSelector((redux_store) => {
        return redux_store.user.value
    })
   const dispatch = useDispatch()
    let [displayState, setDisplay] = useState("description")

    let {name, images, price, description, reviews} = product
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
    return<>
    
    
    <div className=" bg-primary-tint mt-5">
            <div className="container">
                <h2 className="pt-24 text-4xl font-bold text-header">Product</h2>
                <p className="mt-2 pb-28"><Link href={"/"}>Home</Link> &gt; <Link href={"/products"} className="text-secondary">Products</Link></p>
            </div>
        </div>
        
        <div className="container mt-24 grid grid-cols-2 sm:grid-cols-5 gap-8">
<div>
<Slider {...settings} className="">
 {images.map((img, index) =>{
return<>
<div key={index} className="">
     <Image src= {images[index]} width={400} height={400} className="aspect-square object-fill" />
      </div>
</>
      })}

    </Slider>
    </div>
    <div className="sm:col-span-3 flex flex-col justify-center">
        <p className="capitalize">{name}</p>
        <p>Rs. {price}</p>
        <p className="max-w-lg line-clamp-2">{description}</p>
        {redux_user?.role != "seller" && <button className="bg-secondary p-2 mt-2 text-white w-fit" onClick={()=>{
dispatch(addToCart(product))
        }}>Add to Cart</button>}
        
    </div>



        </div>


        <div className="container mt-12">
        <div>
    <button className={`mr-4 ${displayState == "description" && "text-secondary"}`} onClick={()=>{
        setDisplay("description")
    }}>Description</button>
    <button className={`${displayState == "reviews" && "text-secondary"}`}  onClick={()=>{
        setDisplay("reviews")
    }}>Reviews</button>
</div>
<div>

{/* {
    displayState == "description" ? <p>{description}</p> : reviews.map(review=>{
return<>
    <p className="">{review.comment}</p>
</>
    })
} */}

{
    displayState == "description" && <p>{description}</p>
}

{
    displayState == "reviews" && reviews.map(review=>{
return<>
    <p className="">{review.comment}</p>
</>
    })
}
    
  
</div>
        </div>



    </>
}

export async function getServerSideProps(ctx){

    let product = null
    try{
        let res = await axios.get(`https://ecommerce-sagartmg2.vercel.app/api/products/${ctx.query.slug}`)
        product = res.data.data

    }catch(err){
return{
    notFound: true,
    props:{
        
    }
}
    }

    return{
        props:{
            product
        }
       }
}