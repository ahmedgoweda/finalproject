import { useFormik } from 'formik';
import React, { useState } from 'react';
import './Regirster.css';
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
export default function Regirster() {

  let navigate = useNavigate()
  const [errorMasseg, setErrorMassag] = useState('')
  const [isLoading, setIsLoading] = useState(false)


  async function callRegister(reqBody) {
    setErrorMassag("")
    setIsLoading(true)
    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, reqBody)
      .catch(err => {
        setIsLoading(false)
        setErrorMassag(err.response.data.message)
      })
    console.log(data.message);


    if (data.message == "success") {
      navigate('/LogIn')
    }
  }

  const validationSchema = Yup.object({
    name: Yup.string().min(3, "name is too short").max(10, "name is too long").required("name is required"),
    email: Yup.string().email("email not valid").required("email is requierd"),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, "Invalid password").required("Password required"),
    rePassword: Yup.string().oneOf([Yup.ref('password')], "password and rePassword should match").required("password requierd"),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/, "invalid phone").required("phone required"),


  })

  const regasterForm = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    validationSchema,
    onSubmit: callRegister
  });

  return (
    <>
     <Helmet>
            <title>register page </title>
        </Helmet>

      <div className="w-50 mx-auto my-5">
        <h2>Regirster Now</h2>
        {errorMasseg ? <div className='alert alert-danger'>{errorMasseg} </div> : null}
        <form onSubmit={regasterForm.handleSubmit} className=''>
          <div className="form-group">
            <label htmlFor="fullName"
              className="mb-1">
              FullName
            </label>
            <input
              type="text"
              id="fullName"
              name="name"
              value={regasterForm.values.name}
              className="form-control"
              onChange={regasterForm.handleChange}
              onBlur={regasterForm.handleBlur}
            />
            {regasterForm.errors.name && regasterForm.touched.name ? <div className="alert alert-danger">{regasterForm.errors.name} </div> : null}
          </div>
          <div className="form-group">
            <label htmlFor="email" className="mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={regasterForm.values.email}
              className="form-control"
              onChange={regasterForm.handleChange}
              onBlur={regasterForm.handleBlur}
              autoComplete="username"
            />
            {regasterForm.errors.email && regasterForm.touched.email ? <div className="alert alert-danger" >{regasterForm.errors.email} </div> : null}
          </div>
          <div className="form-group">
            <label htmlFor="password" className="mb-1">
              password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={regasterForm.values.password}
              className="form-control"
              onChange={regasterForm.handleChange}
              onBlur={regasterForm.handleBlur}
              autoComplete="password"
            />
            {regasterForm.errors.password && regasterForm.touched.password ? <div className="alert alert-danger">{regasterForm.errors.password} </div> : null}
          </div>
          <div className="form-group">
            <label htmlFor="rePassword" className="mb-1">
              rePassword
            </label>
            <input
              type="password"
              id="rePassword"
              name="rePassword"
              value={regasterForm.values.rePassword}
              className="form-control"
              onChange={regasterForm.handleChange}
              onBlur={regasterForm.handleBlur}
              autoComplete="new-password"
            />
            {regasterForm.errors.rePassword && regasterForm.touched.rePassword ? <div className="alert alert-danger" >{regasterForm.errors.rePassword} </div> : null}
          </div>
          <div className="form-group">
            <label htmlFor="phone" className="mb-1">
              phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={regasterForm.values.phone}
              className="form-control"
              onChange={regasterForm.handleChange}
              onBlur={regasterForm.handleBlur}
            />
            {regasterForm.errors.phone && regasterForm.touched.phone ? <div className="alert alert-danger" >{regasterForm.errors.phone} </div> : null}
          </div>
          <button className="d-block ms-auto btn bg-main text-white mt-3" disabled={!(regasterForm.isValid && regasterForm.dirty)}>
            {isLoading ? <i className='fa fa-spinner fa-spin'></i>:'Regirster'}

     
          </button>
        </form>
      </div>
    </>
  );
}
