import { useRouter } from "next/router";
import UpsertProduct from "../create";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Edit(){

const router = useRouter()

let [product, setProduct] = useState({})

useEffect(()=>{

    if(router.isReady){
        axios.get(`https://ecommerce-sagartmg2.vercel.app/api/products/${router.query.slug}`).then(res=>{

        setProduct(res.data.data)
            // console.log(res.data.data);
        })

    }
},[router.isReady])

    return<>
        <UpsertProduct product={product} />
    </>
}