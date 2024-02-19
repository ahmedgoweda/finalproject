import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
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
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
        setCategories(data.data)

    }
    useEffect(() => {
        getCategories()



    }, [])

    return (
        <div className="container my-4">
            <h2>shoo popular Cateagorise</h2>
            <Slider {...settings}>
                {categories.map(cat=>   <div className='items px-3'>
                <img src={cat.image} className='w-50' height={'100'} alt="" />
                <h5>{cat.name}</h5>
            </div>)}

            </Slider>
         
        </div>
    )
}
