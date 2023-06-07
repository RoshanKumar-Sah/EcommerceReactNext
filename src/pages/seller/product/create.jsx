import axios from "axios"
import { useState } from "react"

export default function CreateProduct() {

    const [data, setData] = useState({
        name: "",
        price: 0,
        in_stock: 0,
        description: "",
        categories: [],
        brands: [],
        images: []

    })

let form_data = new FormData();
form_data.append("name", data.name)
form_data.append("price", data.price)
form_data.append("in_stock", data.in_stock)
form_data.append("description" ,data.description)

let temp =[...data.images]
temp.forEach(img=>{
    form_data.append("images[]" ,img)
})



    function handleSubmit(event) {
event.preventDefault()
axios.post("https://ecommerce-sagartmg2.vercel.app/api/products",form_data,{
    headers:{
        Authorization: "Bearer "+localStorage.getItem("access_token")
    }
})

    }


    function handleChange(event) {
        
        setData({ ...data, [event.target.name]:event.target.type == "file" ? event.target.files : event.target.value })
    }

    return <>
        <div className="container mt-10">
            <form onSubmit={handleSubmit}>


                <div className="mb-6">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" name="name" value={data.name} onChange={handleChange} className="form-control" />
                    {/* {
                        error.email && <small className="text-red-500">{error.email}</small>
                    } */}
                </div>
                <div className="mb-6">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input type="number" name="price" value={data.price} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-6">
                    <label htmlFor="in_stock" className="form-label">In Stock</label>
                    <input type="number" name="in_stock" value={data.in_stock} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-6">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea type="text" name="description" value={data.description} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-6">
                <button className="border p-1 mb-2" type="button">Add Category</button>
                    <label htmlFor="categories" className="form-label">Categories</label>
                    <input type="text" name="categories" value={data.categories} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-6">
                    <label htmlFor="brands" className="form-label">Brands</label>
                    <input type="text" name="brands" value={data.brands} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-6">
                    <label htmlFor="images" className="form-label">Images</label>
                    <input type="file" multiple name="images"  onChange={handleChange} className="form-control" />
                </div>
                <div className="">
                    <button type="submit" className="flex items-center gap-2 text-white disabled:bg-blue-200 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit
                    </button>
                </div>
            </form>
        </div>
    </>
}