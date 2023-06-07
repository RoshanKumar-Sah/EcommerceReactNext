import Header from "@/components/Header";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { setReduxUser } from "@/redux/slice/userSlice";

import { TailSpin } from 'react-loader-spinner';
import { useDispatch } from "react-redux";

export default function Login() {

  const dispatch = useDispatch()

  const router = useRouter()
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let [error, setErrors] = useState({})
  let [isSubmitting, setisSubmitting] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()


    let temp = {}
    let validation = true;


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
      setisSubmitting(true)

      axios.post("https://ecommerce-sagartmg2.vercel.app/api/users/login",
        {

          "email": email,
          "password": password
        }).then(res => {
          dispatch(setReduxUser(res.data.user))
          setisSubmitting(false)
          localStorage.setItem("access_token",res.data.access_token)
          router.push("/")
        })
        .catch(err => {
          console.log(err);
          setisSubmitting(false)

          let temp = {};
          temp.msg = err.response.data.msg
          setErrors(temp);

        })
    }


  }
  return <>
    
    <div className="container mt-20">

      <form onSubmit={handleSubmit}>

        {
          error.msg && <small className="text-red-500">{error.msg}</small>
        }
        <div className="mb-6">
          <label htmlFor="email" className="form-label">Your email</label>
          <input type="email" name="email" value={email} onChange={(event) => {
            setEmail(event.target.value)
            if (event.target.value) {
              setErrors({ ...error, email: "" })
            } else {
              setErrors({ ...error, email: "required" })
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
            if (event.target.value) {
              setErrors({ ...error, password: "" })
            } else {
              setErrors({ ...error, password: "required" })
            }
          }} className="form-control" />
          {
            error.password && <small className="text-red-500">{error.password}</small>
          }
        </div>
        <div className="">
          <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 text-white disabled:bg-blue-200 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit  {isSubmitting && <TailSpin
            height="20"
            width="20"
            color="#ffffff"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />}</button>
        </div><p className="mt-6">Not a user ? <Link href={"/signup"}>Signup</Link></p>
      </form>


    </div>
  </>
}