
import ProtectedPage from "@/components/ProtectedPage"
import { useSelector } from "react-redux"


function Cart() {



   let cart_items = useSelector((redux_store) => { return JSON.stringify(redux_store.cart_items.value) })


   return <>

 <div>
         <p>{cart_items}</p>
      </div> 


      

   </>
}

export default ProtectedPage(Cart, "buyer")