import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import Brands from './components/Brands/Brands';
import Categories from './components/Categories/Categories';
import Layout from './components/LayOut/LayOut';
import Regirster from './components/Regirster/Regirster';
import Login from './components/LogIn/LogIn';
import NotFound from './components/NotFound/NotFound';
import TokenContextProvider from './context/Token';
import CounterContextProvider from './context/Counter';
import React from 'react';

let routes = createBrowserRouter([
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

function App() {
  return (
    <CounterContextProvider>
      <TokenContextProvider>
        <RouterProvider router={routes}></RouterProvider>
      </TokenContextProvider>
    </CounterContextProvider>
  );
}

export default App;
