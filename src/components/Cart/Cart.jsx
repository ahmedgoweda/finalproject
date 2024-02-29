import React, { useContext, useEffect, useState } from 'react';
import './Cart.css';
import { Helmet } from 'react-helmet';
import { CartContext } from '../../context/cartContaxt';
import { ThreeCircles } from 'react-loader-spinner';
export default function Cart() {
  const [isLoding, setIsLoding] = useState(true)
  const [cartDitals, setCartDeatals] = useState({})

  let { GetCart } = useContext(CartContext)

  async function getCartDitails() {
    let { data } = await GetCart()
    setIsLoding(false)
    console.log(data);
    setCartDeatals(data)
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
          {cartDitals.data.products.map((ele) => <div className="row py-5 border-bottom">
            <div className="col-md-1">
              <img src={ele.product.imageCover} className='w-100' alt={ele.product.imageCover} />
            </div>
            <div className="com-md-11">
              <div className="d-flex justify-content-between">
                <div className="left-said">
                  <h4 className='text-info'>{ele.product.title}</h4>
                  <p className='text-success fs-3'>{ele.price} EGP</p>
                </div>
                <div className="right-said">
                  <button className='btn btn-warning mx-2'>-</button>
                  <span>{ele.count}</span>
                  <button className='btn btn-primary mx-2'>+</button>
                </div>
              </div>
              <button className='btn text-danger'> <i className='fa fa-trash-can'></i> Remove</button>
            </div>
          </div>)}

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
