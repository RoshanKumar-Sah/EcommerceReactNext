import '@/styles/globals.css'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import store from '../redux/store'
import { Provider, useDispatch } from 'react-redux'
import axios from 'axios';
import { useEffect } from 'react';
import { setReduxUser, stopLoading } from '@/redux/slice/userSlice';
import { setCartItems } from '@/redux/slice/cartSlice';
import Header from '@/components/Header';

function App({ Component, pageProps }) {
  const dispatch = useDispatch()
 
  useEffect(()=>{
    if(localStorage.getItem("access_token")){

      axios.get("https://ecommerce-sagartmg2.vercel.app/api/users/get-user", {
        headers:{
          Authorization: "Bearer "+localStorage.getItem("access_token") 
        }
      }).then(res=>{
        dispatch(setReduxUser(res.data))
        // console.log(res.data);
      }).catch(err =>{})
  
      let local_cart_items = JSON.parse(localStorage.getItem("cart_items"));
      // console.log(local_cart_items);
      if(local_cart_items){
        dispatch(setCartItems(local_cart_items))
      }
    }else{
      dispatch(stopLoading())
    }
 
    

  },[])
 

  return <>
  <Header />
  <Component {...pageProps} />
 
  </>
}

/* Higher Order Component

- A component which returns another component

*/


const WithReduxProvider = (App)=>{

  function Wrapper(props){
return<>
<Provider store={store}>
  <App {...props} />
  </Provider>
</>
  }
  return Wrapper
}

export default WithReduxProvider(App)


/*
export default function WithRedux({ Component, pageProps }) {
  return <>
    <Provider store={store}>
      <App Component={Component} pageProps={pageProps} />
    </Provider >
  </>
}

*/