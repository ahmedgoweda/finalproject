import React from 'react';
import './LayOut.css';
import { Outlet } from 'react-router-dom';
import Navbar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
export default function Layout() {
  return (
    <>
      <Navbar />

      <Outlet/>
      <Footer/>
    </>
  );
}
