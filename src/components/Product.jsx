import Header from "@/components/Header";
import Link from "next/link";
import { BsFillGridFill, BsListUl } from "react-icons/bs"
import { AiOutlineShoppingCart } from "react-icons/ai"
import Image from "next/image";
import Chair from "@/assets/chair1.png"
import axios from "axios";
import ImageNotFound from "@/assets/imagenotfound.jpg"
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/slice/cartSlice";
import { Fragment } from "react";
import SellerComponent from "./SellerComponet";

export default function Products({ products, metadata, categories }) {
    const dispatch = useDispatch()
    const router = useRouter()
    

    let redux_user = useSelector((redux_store) => {
        return redux_store.user.value
    })

    return <>


        <div className=" bg-primary-tint mt-5">
            <div className="container">
                <h2 className="pt-24 text-4xl font-bold text-header">Products</h2>
                <p className="mt-2 pb-28"><Link href={"/"}>Home</Link> &gt; <Link href={"/products"} className="text-secondary">Products</Link></p>
            </div>
        </div>
        
        {
            router.route == "/seller/product" && <SellerComponent> <div className="container mt-8">
        <Link href={"/seller/product/create"} className="bg-secondary p-2  text-white w-fit">Add Product</Link>
        
        </div>
        </SellerComponent>}
        

        

        <div className="container mt-28 sm:flex sm:justify-between items-center">
            <div>
                <h2 className="text-header font-bold text-base">Ecommerce Accessories &amp; Fashion Item</h2>
                <p className="text-xs text-sub-text">Total: {metadata?.total}</p>
            </div>
            <form className="">
                <label>Per Page: </label><select className="border mr-4" name="per_page" onChange={(event) => {
                    // console.log(router)
                    router.push(`${router.route}?per_page=${event.target.value}`)
                }}>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select>
                <label>Sort By: </label><select className="border mr-4" onChange={(event) => {
                    // console.log(router)
                    router.push(`${router.route}?sort=${event.target.value}`)
                }}>
                    <option value="nameasc">Name Aesc</option>
                    <option value="namedesc">Name Desc</option>
                    <option value="priceasc">Price Aesc</option>
                    <option value="pricedesc">Price Desc</option>
                </select>
                <p className="inline-block">View By: <BsFillGridFill className="inline-block h-4 w-4" /> <BsListUl className="inline-block h-4 w-4" /> </p>
            </form>

        </div>


        <div className="container mt-24">



            <div className="grid grid-cols-2 md:grid-cols-6 gap-7">

                <div className="hidden md:block select-none">
                    <p className="mb-2">Categories</p>
                    {categories.map((cat, index) => {
                        return <Fragment key={cat.index}>

                            <form>
                                <input type="checkbox" id={`${cat}-${index}`} name={cat} onChange={event => {
                                    router.push(`${router.route}?search_term=${event.target.value}`)

                                }} /> <label className="capitalize" htmlFor={`${cat}-${index}`}>{cat}</label>
                            </form>

                        </Fragment>
                    })}
                </div>

                {
                    products.map(product => {
                        let { images, name, price, description, _id } = product
                        return <Fragment key={_id}>
                            <div className="p-4 md:col-start-2">
                                {/* <Image src={Chair} className="w-200 h-200" alt="" /> */}
                                {
                                    images.length != 0 ? <Image src={images[0]} width={200} height={200} className=" object-cover aspect-square" alt="" /> : <Image src={ImageNotFound} width={200} height={200} className=" object-cover aspect-square" alt="" />
                                }
                            </div>
                            <div className="md:col-span-4  flex flex-col justify-center">
                                <Link href={`/products/${_id}`}> <p className="text-lg text-header font-bold capitalize">{name}</p></Link>
                                <p>Rs. {price}</p>
                                <p className="max-w-lg">{description}</p>
                                {redux_user?.role != "seller" && <p><AiOutlineShoppingCart onClick={() => { dispatch(addToCart(product)) }} /></p>
                                }

                                {
            router.route == "/seller/product" && <SellerComponent><div className="flex gap-4"> <div className="mt-8">
        <Link href={`/seller/product/edit/${_id}`} className="bg-secondary p-2  text-white w-fit">Edit</Link>
        </div>
        <div className="mt-8">
        <Link href={"#"} className="bg-secondary p-2  text-white w-fit">Delete</Link>
        </div>
        </div>
        </SellerComponent>}

                            </div>
                        </Fragment>
                    })
                }


            </div>
        </div>


    </>
}


