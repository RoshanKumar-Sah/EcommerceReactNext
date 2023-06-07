import Banner from "@/components/Banner";
import Featured from "@/components/Featured";
import Header from "@/components/Header";
import Trending from "@/components/Trending";
import axios from "axios";

import Image from "next/image";
import { useEffect, useState } from "react";





export default function Home({ user, products }) {

  // const [products, setProducts]= useState([])


  // useEffect(()=>{
  //   axios.get("https://ecommerce-sagartmg2.vercel.app/api/products")
  //   .then(res=>{
  //     // console.log(res.data.data[0].data)
  //     setProducts(res.data.data[0].data)
  //   })
  // },[])


  return <>
   
    <Banner />
    {/* <Featured /> */}
    <div className="mt-32 container">
      <h2 className="text-4xl font-semibold text-header text-center">Trending Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {
          products.map(product => {

            return <Trending product={product} key={product._id} />
          })
        }

      </div>
    </div>




  </>

}

export async function getServerSideProps() {
  let res = await axios.get("https://ecommerce-sagartmg2.vercel.app/api/products")
  return {
    props: {
      products: res.data.data[0].data
    }
  }
}
