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

  let navigate = useNavigate()

  function logOut() {
    localStorage.removeItem("userToken")
    setToken(null);
    navigate("/logIn")
  }
  return (
    <>
      <nav className="navbar bg-info text-muted mt-1 fixed-top navbar-expand-lg container-fluid">
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
              <li className="nav-item position-relative ">
                <Link className="nav-link" to="/Cart">
                  <i className=" mx-3 fa-solid fa-cart-flatbed fs-3"></i>
                  <span className='bg-main p-1 rounded position-absolute top-0 end-0 text-light'>{numOfCartItems}</span>
                </Link>
              </li>
            </ul> : null}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 p-2">
              <li className="nav-item d-flex align-items-center">
                <i className="fab mx-2 fa-facebook iconcolor h3"></i>
                <i className="fab mx-2 fa-twitter bg-white rounded-circle text-info h3"></i>
                <i className="fab mx-2 fa-instagram h3 instacolor "></i>
                <i className="fab mx-2 fa-youtube h3 text-danger"></i>
                <i className="fab mx-2 fa-tiktok h3  text-black rounded-circle "></i>
              </li>
              {token ? <li className="nav-item mx-2">
                <button className="nav-link rounded-pill bg-main text-white px-3" onClick={logOut}>Logout</button>
              </li>
                : <>
                  <li className="nav-item">
                    <Link className="nav-link rounded-pill bg-main text-white px-3 " to="/login">
                      Login
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link rounded-pill bg-primary text-white mx-2" to="/register">
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
