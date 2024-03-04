import React, { useContext } from 'react';
import './NavBar.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../Assets/images/freshcart-logo.svg';
import { TokenContext } from '../../context/Token';
import { CounterContext } from '../../context/Counter';
import Login from '../LogIn/LogIn';
import { CartContext } from '../../context/cartContaxt';


export default function Navbar() {
  let { counter } = useContext(CounterContext)
  let { token, setToken } = useContext(TokenContext)
  let { numOfCartItems } = useContext(CartContext)
  console.log(token);
  let navigate = useNavigate()

  function logOut() {
    localStorage.removeItem("userToken")
    setToken(null);
    navigate("/logIn")
  }
  return (
    <>
      <nav className="navbar bg-info text-muted fixed-top navbar-expand-lg ">
        <div className="container">
          <Link className="navbar-brand" to="/login">
            <img src={logo} alt="fresh cart logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {token ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/categories">
                  Categories
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/brands">
                  Brands
                </Link>
              </li>

            </ul> : null}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item d-flex align-items-center">
                <i className="fab mx-2 fa-facebook"></i>
                <i className="fab mx-2 fa-twitter"></i>
                <i className="fab mx-2 fa-instagram"></i>
                <i className="fab mx-2 fa-youtube"></i>
                <i className="fab mx-2 fa-tiktok"></i>
                <li className="nav-item position-relative ">
                  <Link className="nav-link" to="/Cart">
                    <i className=" mx-3 fa-solid fa-cart-flatbed fs-3"></i>
                    <span className='bg-main p-1 rounded position-absolute top-0 end-0 text-light'>{numOfCartItems}</span>
                  </Link>
                </li>
              </li>
              {token ? <li className="nav-item mx-2">
                <button className="nav-link" onClick={logOut}>Logout</button>
              </li>
                : <>

                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                </>}

            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
