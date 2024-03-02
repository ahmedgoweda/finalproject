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
import Checkout from './components/Checkout/Checkout';
import TokenContextProvider, { TokenContext } from './context/Token';
import CounterContextProvider from './context/Counter';
import React, { useContext, useEffect } from 'react';
import ProductDetails from './components/ProductDetails/ProductDetails';
import ProtectedRoutes from './components/protectedRoutes/protectedRoutes';
import AllOrders from './components/AllOrders/AllOrders';


function App() {
  let { setToken } = useContext(TokenContext)
  const routes = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'Home', element: <ProtectedRoutes> </ProtectedRoutes> },
        { path: 'products', element: <ProtectedRoutes><Products /> </ProtectedRoutes> },
        { path: 'cart', element: <ProtectedRoutes><Cart /> </ProtectedRoutes> },
        { path: 'categories', element: <ProtectedRoutes><Categories /></ProtectedRoutes> },
        { path: 'brands', element: <ProtectedRoutes><Brands /> </ProtectedRoutes> },
        { path: 'AllOrders', element: <ProtectedRoutes><AllOrders /> </ProtectedRoutes> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Regirster /> },
        { path: 'details/:id', element: <ProductDetails /> },
        { path: 'Checkout', element: <ProtectedRoutes><Checkout/> </ProtectedRoutes>},
        { path: '*', element: <NotFound /> },
      ],
    },
  ]);

  useEffect(() => {
    if (localStorage.getItem("userToken") != null) {
      setToken(localStorage.getItem("userToken"))
    }
  }, [])

  return <RouterProvider router={routes}></RouterProvider>

}

export default App;
