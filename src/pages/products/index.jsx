
import axios from "axios";

import Products from "@/components/Product";

export default function AllProducts(props) {
    
    return <>
        

       <Products {...props} />

    </>
}


export async function getServerSideProps(ctx) {
    // console.log(ctx);
    let url = "https://ecommerce-sagartmg2.vercel.app/api/products?"
    let params = Object.entries(ctx.query)
    params.forEach(parameter => {
        url += `${parameter[0]}=${parameter[1]}&`
    })
    let res = await axios.get(url)
    let cat_res = await axios.get("https://ecommerce-sagartmg2.vercel.app/api/products/categories")

    return {
        props: {
            products: res.data.data[0].data,
            metadata: res.data.data[0].metadata[0],
            categories: cat_res.data
        }
    }

}