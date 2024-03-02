import React, { useContext, useEffect, useState } from 'react';
import './ProductDetails.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';
import { ThreeCircles } from 'react-loader-spinner';
import Slider from 'react-slick/lib/slider';
import { CartContext } from '../../context/cartContaxt';
import toast, { Toaster } from 'react-hot-toast';

export default function ProductDetails() {

  let { addToCart ,setNumOfCartItems} = useContext(CartContext)
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const params = useParams();
  const [details, setDetails] = useState(null);

  async function getProductDetail(id) {
    if (id) {
      console.log(id);
      return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      
    }


  }
  async function addCart(id) {
    let res = await addToCart(id)
    if (res.data.status == "success") {
      toast.success("product add successfully");
      setNumOfCartItems(res.data.numOfCartItems);
    } else {
      toast.error("product not add")
    }
  }


  console.log(params.id);
  const { data, isError, isLoading } = useQuery('details', () => getProductDetail(params.id))
  useEffect(() => {
    console.log(data);

    if (data) {
      setDetails(data.data.data)
    }
  }, [data])
  if (!details) {
    return null
  }
  return (
    <>
      <div className="container">
        <ThreeCircles
          visible={isLoading}
          height="100"
          width="100"
          color="#4fa94d"
          ariaLabel="three-circles-loading"
          wrapperStyle={{}}
          wrapperClass="justify-content-center">
          loading...
        </ThreeCircles>
        <div className="row align-items-center">
          <div className="col-md-4 mb-4">


            <Slider {...settings}>
              {details.images.map(imgSrc => {
                return <img src={imgSrc} className='w-75' alt="" />
              })}
            </Slider>
          </div>
          <div className="col-md-8">
            <h2>{details.title}</h2>
            <p>{details.description}</p>
            <p>{details.category.name}</p>
            <div className="d-flex justify-content-between">
              <h5>{details.price} EGP </h5>
              <h5><i className='fa fa-star rating-color' ></i>{details.ratingsAverage}</h5>
            </div>
            <button onClick={() => addCart(details.id)} className='btn bg-main text-white w-100'> Add to cart</button>
          </div>
        </div>
      </div>
    </>)
}
