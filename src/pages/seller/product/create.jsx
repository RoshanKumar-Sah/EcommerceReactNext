import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function UpsertProduct({ product }) {

    const router = useRouter()
    const [data, setData] = useState({
        name: "",
        price: 0,
        in_stock: 0,
        description: "",
        categories: [""],
        brands: [],
        images: []

    })

    // const [data, setData] = useState(product)


    useEffect(() => {
        setData(product)
    }, [product])




    function handleSubmit(event) {
        event.preventDefault()

        let form_data = new FormData();
        form_data.append("name", data.name)
        form_data.append("price", data.price)
        form_data.append("in_stock", data.in_stock)
        form_data.append("description", data.description)

        data.categories.forEach(cat => {
            form_data.append("categories[]", cat)
        })

        let temp = [...data.images]
        temp.forEach(img => {
            form_data.append("images[]", img)
        })

        let url = "https://ecommerce-sagartmg2.vercel.app/api/products"

        if(router.query.slug){
            url =` https://ecommerce-sagartmg2.vercel.app/api/products/${router.query.slug}`
            axios.put(url, form_data, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("access_token")
                }
            } ).then(res=>{
                router.push(`/products/${router.query.slug}`)
            })
            return;
        }

        axios.post(url, form_data, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("access_token")
            }
        })

    }





    function handleChange(event) {

        setData({ ...data, [event.target.name]: event.target.type == "file" ? [...data.images, ...event.target.files] : event.target.value })
    }

    function handleCategories(event, index) {
        let temp = [...data.categories]
        temp[index] = event.target.value
        setData({ ...data, categories: temp })
    }

    return <>
        <div className="container mt-10">
            <form onSubmit={handleSubmit}>


                <div className="mb-6">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" name="name" value={data?.name} onChange={handleChange} className="form-control" />
                    {/* {
                        error.email && <small className="text-red-500">{error.email}</small>
                    } */}
                </div>
                <div className="mb-6">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input type="number" name="price" value={data?.price} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-6">
                    <label htmlFor="in_stock" className="form-label">In Stock</label>
                    <input type="number" name="in_stock" value={data?.in_stock} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-6">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea type="text" name="description" value={data?.description} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-6">
                    <button className="border p-1 mb-2" type="button" onClick={() => {

                        let temp = []

                        if (data?.categories) {
                            temp = [...data.categories]
                        }

                        temp.push("")
                        setData({ ...data, categories: temp })
                    }}>Add Category</button>
                    <label htmlFor="categories" className="form-label">Categories</label>
                    {
                        data?.categories?.map((cat, index) => {
                            return <input type="text" name="categories" value={cat} onChange={(event) => { handleCategories(event, index) }} className="form-control mt-2" />
                        })
                    }
                </div>
                <div className="mb-6">
                    <label htmlFor="brands" className="form-label">Brands</label>
                    <input type="text" name="brands" value={data?.brands} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-6">
                    <label htmlFor="images" className="form-label">Images</label>
                    <input type="file" multiple name="images" onChange={handleChange} className="form-control" />
                </div>

                {
                    data?.images?.map((img, index) => {

                        let src = img
                        if (typeof (img) != "string") {
                            src = URL.createObjectURL(img)
                        }

                        return <div className="inline-block relative">

                        <img className="inline-block" src={src} height={150} width={150} />
                        <span onClick={()=>{
                            let temp =[...data.images]
                            temp = temp.filter((el,idx)=> idx != index)
                            setData({...data, images: temp})
                        }} className="absolute -top-5 right-0 bg-red-500 p-3 text-white rounded-full">X</span>
                        </div>

                    })
                }

                <div className="">
                    <button type="submit" className="flex items-center gap-2 text-white disabled:bg-blue-200 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit
                    </button>
                </div>
            </form>
        </div>
    </>
}