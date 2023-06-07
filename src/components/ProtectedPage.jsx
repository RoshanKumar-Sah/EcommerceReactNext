import { useRouter } from "next/router"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Bars } from  'react-loader-spinner'

export default function ProtectedPage(PageComponent, role) {


    function Wrapper() {
        const router = useRouter()

        let {isLoading, value: redux_user} = useSelector((redux_store) => {
            return redux_store.user
        })


        if(isLoading){
            return<><div className="flex justify-center items-center  h-screen"><Bars
            height="80"
            width="80"
            color="#7E33E0"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          /></div></>
        }else if (!redux_user) {

                router.push("/login")

            }else if(role && redux_user.role !== role){
                return<><p>Forbidden</p></>
            }else{ return <>
                <PageComponent/>
            </>}
    //      return <>
    //      <PageComponent/>
    //  </>
       
    }

    return Wrapper
}