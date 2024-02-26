import axios from 'axios';
import { createContext } from "react";



export let CreateContext = createContext();
let headers = {
    token: localStorage.getItem("userToken")
}

function addToCart(id) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
        productId: id
    }, {
        headers
    }).then((res) => res).catch((err) => err)
}
export default function CartContextProvider(props) {

    return <CartContextProvider value={{addToCart}}>
        {props.children}
        </CartContextProvider>

}