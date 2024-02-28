import React, { useContext, useEffect } from 'react';
import './Cart.css';
import { Helmet } from 'react-helmet';
import { CartContext } from '../../context/cartContaxt';

export default function Cart() {
  let { GetCart } = useContext(CartContext)

  async function getCartDitails() {
    let { data } = await GetCart()
    console.log(data);
  }
  useEffect(() => {
    getCartDitails()
  }, [])
  return (
    <>
      <Helmet>
        <title>Cart page </title>
      </Helmet>
      <div className="container py-5">
        <div className="p-5 mx-auto bg-main-light">
          <h1> Cart Shop</h1>
          <div className="d-flex justify-content-between">
            <h3 className='h5' >Total Pirce :<span className='text-main'>23432 EPG</span></h3>
            <h3 className='h5' >Total Cart items :<span className='text-main'>2</span></h3>


          </div>

        </div>
      </div>


    </>
  );
}
