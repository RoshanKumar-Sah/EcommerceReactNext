import { SELLER } from "@/const/roles"
import { useSelector } from "react-redux"

export default function SellerComponent({children}){

    const redux_user = useSelector((redux_store)=>{
return redux_store.user.value
    })

    if(redux_user?.role == SELLER){
        return<>
        
        {children}
    </>
    }else{
        return null
    }
   
}