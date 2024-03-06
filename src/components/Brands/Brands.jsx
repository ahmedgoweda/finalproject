import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet';
import { Circles, ThreeCircles } from 'react-loader-spinner';

export default function Brands() {
  async function getAllBrands() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }
  let { data, isLoading, isError } = useQuery("getAllBrands", getAllBrands)
  console.log(data);
  return (
    <>
      <Helmet><title>Brands page</title></Helmet>

      {isLoading ? <Circles
        visible={isLoading}
        height="100"
        width="100"
        color="#4fa94d"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass="justify-content-center"
      >
        loading...
      </Circles> : <div className="container my-5 bg-main-light">
        <h1 className='text-center fw-bold  text-success mt-5 '>All Brands</h1>
        <div className="row g-5">
          {data?.data.data.map((ele, id) => <div key={id} className={`col-md-3 `}>
            <div className="categoty productt">
              <img src={ele.image} className='w-100' alt="{ele.image}" />
              <h4 className='text-center my-4 h6 fw-bold'> {ele.name} </h4>
            </div>
          </div>)}
        </div>
      </div>
      }


    </>
  )
}