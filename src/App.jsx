import './App.css';
import { Router, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import Brands from './components/Brands/Brands';
import Categories from './components/Categories/Categories';
import Layout from './components/LayOut/LayOut';
import Regirster from './components/Regirster/Regirster';
import Login from './components/LogIn/LogIn';
import NotFound from './components/NotFound/NotFound';
import TokenContextProvider, { TokenContext } from './context/Token';
import CounterContextProvider from './context/Counter';
import React, { useContext, useEffect } from 'react';


function App() {

let {setToken}=useContext(TokenContext)


const routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'Products', element: <Products /> },
      { path: 'Cart', element: <Cart /> },
      { path: 'Categories', element: <Categories /> },
      { path: 'Brands', element: <Brands /> },
      { path: 'Login', element: <Login /> },
      { path: 'Register', element: <Regirster /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

useEffect(()=>{
  if (localStorage.getItem("userToken")!=null){
setToken(localStorage.getItem("userToken"))
  }
},
[])

  return <RouterProvider router={routes}></RouterProvider>
  
}

export default App;
