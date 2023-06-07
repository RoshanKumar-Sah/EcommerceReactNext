import Header from "@/components/Header";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Signup() {

  const router = useRouter()
  let [name, setName] = useState("")
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let [error, setErrors] = useState({})
  function handleSubmit(event) {
    event.preventDefault()

    let temp = {}
    let validation = true;

    if (!name) {
      temp.name = "required"
      validation = false

    }
    if (!email) {
      temp.email = "required"
      validation = false

    }
    if (!password) {
      temp.password = "required"
      validation = false

    }

    setErrors(temp)


    if (validation) {
      axios.post("https://ecommerce-sagartmg2.vercel.app/api/users/signup",
        {
          "name": name,
          "email": email,
          "role": event.target.role.value,
          "password": password
        }).then(res=>{
router.push("/login")
        })
        .catch(err => {
          console.log(err);
          
          let temp ={}
          if(err.response.data.errors && err.response.data.errors?.length > 0){
            err.response.data.errors.forEach(individualError => {
              temp[individualError.param] = individualError.msg
            });
            setErrors(temp);
          }
        })
    }


  }
  return <>
    
    <div className="container mt-20">

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="name" className="form-label">Your name</label>
          <input type="text" name="name" value={name} onChange={(event) => {
             setName(event.target.value)
             if(event.target.value){
              setErrors({...error, name:""})
             }else{
              setErrors({...error, name:"required"})
             }
              }} className="form-control" />
          {
            error.name && <small className="text-red-500">{error.name}</small>
          }
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="form-label">Your email</label>
          <input type="email" name="email" value={email} onChange={(event) => { 
            setEmail(event.target.value)
            if(event.target.value){
              setErrors({...error, email:""})
             }else{
              setErrors({...error, email:"required"})
             }
             }} className="form-control" placeholder="name@flowbite.com" />
          {
            error.email && <small className="text-red-500">{error.email}</small>
          }
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="form-label">Your password</label>
          <input type="password" name="password" value={password} onChange={(event) => {
             setPassword(event.target.value)
             if(event.target.value){
              setErrors({...error, password:""})
             }else{
              setErrors({...error, password:"required"})
             }
              }} className="form-control" />
          {
            error.password && <small className="text-red-500">{error.password}</small>
          }
        </div>
        <div className="mb-6">
          <label htmlFor="role" className="form-label">Role</label>
          <select name="role" className="form-control" defaultValue="seller">
            <option value="Select">Select</option>
            <option value="seller">Seller</option>
            <option value="buyer">Buyer</option>
          </select>
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        <p className="mt-6">Already a user ? <Link href={"/login"}>Login</Link></p>

      </form>

    </div>
  </>
}