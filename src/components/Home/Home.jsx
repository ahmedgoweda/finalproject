import React from 'react';
import './Home.css';
import Cart from '../Cart/Cart';
import Products from '../Products/Products';
import Categories from '../Categories/Categories'
import MainSlider from '../MainSlider/MainSlider';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import { Helmet } from 'react-helmet';
import Footer from '../Footer/Footer';

export default function Home() {
    return <>

        <Helmet><title>Home page </title></Helmet>

        <MainSlider />
        <CategoriesSlider />
        <Products />
  
    </>

}
