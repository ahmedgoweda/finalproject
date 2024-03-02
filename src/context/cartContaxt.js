import axios from 'axios'
import { createContext, useEffect, useState } from "react";


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

function deleteProductFromCart(id) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
            headers
        })
        .then((res) => res).catch((err) => err)
}
function updateProduct(id, count) {
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        count
    }, {
        headers
    })
        .then((res) => res).catch((err) => err)
}



export default function CartContextProvider(props) {
    const [CartId, setCartId] = useState(null);
    const [numOfCartItems, setNumOfCartItems] = useState(null);

function onlinePaymenit(shippingAddress) {

    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartId}?url=http://localhost:3000`, {
        shippingAddress
    }, {
        headers
    })
        .then((res) => res).catch((err) => err)
}


async function getinaitialCart(){
  let {data}= await GetCart();
  setNumOfCartItems(data?.numOfCartItems)
  setCartId(data?.data._id)
}

    useEffect(() => {
        getinaitialCart();
    }, [])

    return <CartContext.Provider
        value={{ addToCart, GetCart, deleteProductFromCart, updateProduct, onlinePaymenit, numOfCartItems,setNumOfCartItems }}>
        {props.children}

    </CartContext.Provider>
}

