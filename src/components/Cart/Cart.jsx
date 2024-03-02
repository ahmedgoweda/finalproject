import React, { useContext, useEffect, useState } from 'react';

import './Cart.css';
import { Helmet } from 'react-helmet';
import { CartContext } from '../../context/cartContaxt';
import { ThreeCircles } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
export default function Cart() {
  const [isLoding, setIsLoding] = useState(true)
  const [cartDitals, setCartDeatals] = useState({})

  let { GetCart, deleteProductFromCart, updateProduct,numOfCartItems,setNumOfCartItems } = useContext(CartContext)

  async function getCartDitails() {
    let { data } = await GetCart()
    setIsLoding(false)
    console.log(data);
    setNumOfCartItems(data.numOfCartItems)
    setCartDeatals(data)
  }

  async function removeItme(id) {
    let { data } = await deleteProductFromCart(id)
    console.log(data);
    setNumOfCartItems(data.numOfCartItems)
    setCartDeatals(data)
  }
  async function updatcount(id, count) {
    let { data } = await updateProduct(id, count)
    console.log(data);
    setCartDeatals(data)
    setNumOfCartItems(data.numOfCartItems)
  }
  useEffect(() => {
    getCartDitails()
  }, [])
  return (
    <>
      <Helmet>
        <title>Cart page </title>
      </Helmet>
      {cartDitals.data ? <div className="container py-5">
        
        <div className="p-5 mx-auto bg-main-light">
          <h1> Cart Shop</h1>
          <div className="d-flex justify-content-between">
            <h3 className='h5' >Total Pirce :<span className='text-main'>{cartDitals.data.totalCartPrice} EPG</span></h3>
            <h3 className='h5' >Total Cart items :<span className='text-main'>{cartDitals.numOfCartItems}</span></h3>
          </div>
          {cartDitals.data.products.map((ele) => <div key={ele.product._id} className="row py-5 border-bottom">
            <div className="col-md-1" >
              <img src={ele.product.imageCover} className='w-100' alt={ele.product.imageCover} />
            </div>
            <div className="com-md-11">
              <div className="d-flex justify-content-between">
                <div className="left-said">
                  <h4 className='text-info'>{ele.product.title}</h4>
                  <p className='text-success fs-3'>{ele.price} EGP</p>
                </div>
                <div className="right-said">
                  <button className='btn btn-warning mx-2' onClick={() => updatcount(ele.product._id, ele.count - 1)}>-</button>
                  <span>{ele.count}</span>
                  <button className='btn btn-primary mx-2' onClick={() => updatcount(ele.product._id, ele.count + 1)}>+</button>
                </div>
              </div>
              <button onClick={() => removeItme(ele.product._id)} className='btn text-danger'> <i className='fa fa-trash-can'></i> Remove</button>
            </div>
          </div>)}
          <Link className='btn bg-main w-100 my-5 text-white' to= {"/checkout"} >Checkout</Link>
        </div>
      </div>



    


        : <ThreeCircles
          visible={isLoding}
          height="100"
          width="100"
          color="#4fa94d"
          ariaLabel="three-circles-loading"
          wrapperStyle={{}}
          wrapperClass="justify-content-center">
          loading...
        </ThreeCircles>}


    </>
  );
}
