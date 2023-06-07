
import Products from "@/components/Product";
import ProtectedPage from "@/components/ProtectedPage";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function SellerProducts() {
  
    const [products, setProducts] = useState([])
    const [metadata, setMetaData] = useState({})
    const [categories, setCategories] = useState([])
    useEffect(() => {
     
       



        async function fetchProducts() {
            let url = "https://ecommerce-sagartmg2.vercel.app/api/products"
            await axios.get(url, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("access_token")
                }
            }).then(res => {
                // console.log(res.data.data[0].data);
                setProducts(res.data.data[0].data)
                setMetaData(res.data.data[0].metadata[0])
            }).catch(err=>{
                console.log(err);
            })

            await axios.get("https://ecommerce-sagartmg2.vercel.app/api/products/categories").then(cat_res => {
                setCategories(cat_res.data)

            })
        }
        fetchProducts()
    }, [])

    return <>


        <Products products={products} categories={categories} metadata={metadata} />

    </>
}


// export function getServerSideProps(ctx){
//     return{
//         redirect:{
//             destination:"/login",
//             permanent:false
//         }
//     }
// }

export default ProtectedPage(SellerProducts, "seller")