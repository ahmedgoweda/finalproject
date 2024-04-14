import React, { useContext, useEffect, useState } from 'react';
import './Products.css';
import { Helmet } from 'react-helmet';
import axios from 'axios'
import { ThreeCircles } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { CartContext } from '../../context/cartContaxt';
export default function Products() {
  const [allProducts, setAllProducts] = useState([])
  const [isLoding, setIsLoding] = useState(true)
  let { addToCart, setNumOfCartItems,deleteProductFromWishList,addToWishList } = useContext(CartContext)


  async function getAllProducts() {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    console.log(data);
    setAllProducts(data.data)
    setIsLoding(false)
  }
  useEffect(() => {
    getAllProducts()
  }, [])


  async function addCart(id) {
    let res = await addToCart(id)
    if (res.data.status === "success") {
      toast.success("product add successfully" );
      setNumOfCartItems(res.data.numOfCartItems);
    } else {
      toast.error("product not add")
    }

  }
    <Toaster
  position="top-right"
  reverseOrder={false}
/>
  return (
    <>

      <Helmet><title>Products page</title></Helmet>
      <div className="container py-5">
        <ThreeCircles
          visible={isLoding}
          height="100"
          width="100"
          color="#4fa94d"
          ariaLabel="three-circles-loading"
          wrapperStyle={{}}
          wrapperClass="justify-content-center"
        >
          loading...
        </ThreeCircles>
        <div className="row">
          {allProducts.map((ele) =>
            <div className="col-md-2 g-3" key={ele._id}>
              <div className="product px-2 py-3">
                <Link to={`/details/${ele._id}`}>
                  <img src={ele.imageCover} className='w-100' alt="" />
                  <p className='text-main'>{ele.category.name}</p>
                  <h3 className='h6'>{ele.title.split(" ").slice(1, 3).join(0, 3)}</h3>
                  <div className="d-felex justify-content-between">
                    <p >{ele.price} EGP</p>
                    <p>
                      <i className='fa fa-star rating-color'></i>
                      {ele.ratingsAverage}
                    </p>
                  </div>
                </Link>

                <button onClick={() => addCart(ele.id)} className='btn bg-main text-white w-100'> Add to cart</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
