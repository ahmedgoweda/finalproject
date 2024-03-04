import React, { useContext, useState } from 'react';
import './LogIn.css';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { useFormik } from 'formik';
import { TokenContext } from '../../context/Token';
import ForgotPassword from '../forgotPasswrod/forgotPasswrod';
import { Helmet } from 'react-helmet';

export default function Login() {
  <Helmet>
    <title>Login page </title>
  </Helmet>

let [ForgotPassword]=useState('')
  let navigate = useNavigate();
  const [errorMasseg, setErrorMassag] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  let { setToken } = useContext(TokenContext)


  async function callLogin(reqBody) {
    setErrorMassag('');
    setIsLoading(true);
    let { data } = await axios
      .post('https://ecommerce.routemisr.com/api/v1/auth/signin', reqBody)
      .catch((err) => {
        setIsLoading(false);
        setErrorMassag(err.response.data.message);
      });


    if (data.message == 'success') {
      localStorage.setItem('userToken', data.token);
      setToken(data.token)
      navigate('/');
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string().email('email not valid').required('email is requierd'),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{5,10}$/, 'Invalid password')
      .required('Password required'),
  });

  const LoginForm = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: callLogin,
  });

  return (
    <>
      <div className="w-50 mx-auto my-5">
        <h2>Login Now</h2>
        {errorMasseg ? (
          <div className="alert alert-danger">{errorMasseg} </div>
        ) : null}
        <form onSubmit={LoginForm.handleSubmit} className="">
          <div className="form-group">
            <label htmlFor="email" className="mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={LoginForm.values.email}
              className="form-control"
              onChange={LoginForm.handleChange}
              onBlur={LoginForm.handleBlur}
              autoComplete="username"
            />
            {LoginForm.errors.email && LoginForm.touched.email ? (
              <div className="alert alert-danger">
                {LoginForm.errors.email}{' '}
              </div>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="password" className="mb-1">
              password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={LoginForm.values.password}
              className="form-control"
              onChange={LoginForm.handleChange}
              onBlur={LoginForm.handleBlur}
              autoComplete="password"
            />
            {LoginForm.errors.password && LoginForm.touched.password ? (
              <div className="alert alert-danger">
                {LoginForm.errors.password}{' '}
              </div>
            ) : null}
          </div>
          <div className='d-flex' >
            <button className="d-block ms-auto btn bg-main text-white mt-3 ">
              {isLoading ? <i className="fa fa-spinner fa-spin"></i> : 'login'}
            </button>

          </div>
          {/* <button type='Submit' onSubmit={ForgotPassword} className="d-block ms-auto btn bg-main text-white mt-3" ons>forgotPassword</button> */}
        </form>
      </div>
    </>
  );
}
