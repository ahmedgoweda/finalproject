import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import { useQuery } from 'react-query';

export default function CategoriesSlider() {
    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 10,
        slidesToScroll: 1
    };


    const [categories, setCategories] = useState([])
     async function getCategories() {
       return  await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    }
    let {data} = useQuery('categories',getCategories)
    
    useEffect(()=>{
        
        if(data){
            console.log(data.data);
    
            setCategories(data.data.data)
        }
    },[data])

    return (
        <div className="container my-4">
            <div >
              <p className='h2 text-center text-info'>show popular Cateagorise</p>  
            </div>
            
            <Slider {...settings}>
                {
            categories?(

                categories.map(cat=><div className='items px-3' key={cat._id}>
                <img src={cat.image} className='w-100' height={'100'} alt="" />
                <h5 className='p-3 h6'>{cat.name.split(" ").slice(0, 1).join(0, 1)}</h5>
              
            
            </div>)):null
            }

            </Slider>
         
        </div>
    )
}
