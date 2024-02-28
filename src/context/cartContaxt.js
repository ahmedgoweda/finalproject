import axios from 'axios'
import { createContext } from "react";


export let CartContext = createContext();
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

function GetCart() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,
        {
            headers
        })
        .then((res) => res).catch((err) => err)
}
export default function CartContextProvider(props) {
    return <CartContext.Provider value={{ addToCart, GetCart }}>
        {props.children}

    </CartContext.Provider>
}

