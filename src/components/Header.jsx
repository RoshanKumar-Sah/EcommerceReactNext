import Link from "next/link"
import { useRouter } from "next/router"
import { FiMail, FiPhone, FiShoppingCart, FiUser, FiSearch } from "react-icons/fi"
import { useSelector } from "react-redux";
import { logout, setReduxUser } from "@/redux/slice/userSlice";


import { useDispatch } from "react-redux";
import SellerComponent from "./SellerComponet";
import BuyerComponent from "./BuyerComponent";


export default function Header() {
  const dispatch = useDispatch()

  let redux_user = useSelector((redux_store) => {
    return redux_store.user.value
  })

  let cart_items = useSelector((redux_store) => {
    return redux_store.cart_items?.value
  })

  // console.log(redux_user);

  let logged_in = redux_user

  const router = useRouter()

  function handleSearch(event) {
    event.preventDefault()
    router.push("/products?search_term=" + event.target.search_term.value)
  }

  return <header>
    <nav className="bg-primary text-white box-border">
      <div className="container flex justify-between py-3 gap-2 items-center">
        <ul className="flex flex-col sm:flex-row sm:gap-12">
          <li><Link href="mailto: mhhasanul@gmail.com"><FiMail className="inline-block mr-3" />mhhasanul@gmail.com</Link></li>
          <li><Link href="tel: 1234567890"><FiPhone className="inline-block mr-3" />(12345)67890</Link></li>
        </ul>

        <ul className="flex flex-col items-start gap-2  sm:flex-row sm:gap-5">

          {
            logged_in ? <> <li>{redux_user.name}</li><li className="cursor-pointer" onClick={() => {
              // dispatch(setReduxUser(null))
              dispatch(logout())
            }}>Logout</li>

              {redux_user.role == "buyer" ? <li><Link href={"/cart"}>Cart<FiShoppingCart className="inline-block ml-3" /></Link><span>({cart_items?.length})</span></li> : <></>}

            </> : <li><Link href="/login">Login<FiUser className="inline-block ml-3" /></Link> </li>


          }
        </ul>
      </div>

    </nav>

    <nav className="mt-5">
      <div className="container flex flex-wrap  justify-between items-center gap-4">
        <Link href="/" className="text-3xl font-bold text-header">Hekto</Link>
        <ul className="flex gap-8 text-base">

          <li><Link href="/" className="text-secondary">Home</Link></li>
          <li><Link href="/products">Products</Link></li>
          <SellerComponent><li><Link href="/seller/product">Seller Products</Link></li></SellerComponent>
          <BuyerComponent><li><Link href="/cart">Cart</Link></li></BuyerComponent>
          

        </ul>
        <form className="flex mx-auto sm:mx-0" onSubmit={handleSearch}>
          <input name="search_term" className="border-2 h-10 px-2 outline-none" /><button className="flex items-center justify-center bg-secondary w-12 h-10"><FiSearch className="inline-block h-6 w-6 text-white" /></button>
        </form>
      </div>
    </nav>
  </header>
}