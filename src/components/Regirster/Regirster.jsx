import { useFormik } from 'formik';
import React from 'react';
import './Regirster.css';
import * as Yup from 'yup'
import axios from 'axios';
export default function Regirster() {
async function callRegister(reqBody){
  console.log(reqBody)
let {data}= await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup'.reqBody)
  }

  const validationSchema = Yup.object({
    name: Yup.string().min(3, "name is too short").max(10, "name is too long").required("name is required"),
    email: Yup.string().email("email not valid").required("email is requierd"),
    password: Yup.string().matches(!/^[A-Z][a-z0-9]{8-3}$/, "invalid password").required("password requierd"),
    repassword: Yup.string().oneOf([Yup.ref("password")],"password and repassword should match").required("password requierd"),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/, "invalid phone").required("phone required"),


  })

  const regasterForm = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      repassword: '',
      phone: '',
    },
    validationSchema,
    onSubmit:callRegister
  });

  return (
    <>
      <div className="w-50 mx-auto my-5">
        <h2>Regirster Now</h2>
        <form onSubmit={regasterForm.handleSubmit} className=''>
          <div className="form-group">
            <label htmlFor="fullName" className="mb-1">
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
            {regasterForm.errors.name && regasterForm.touched.name? <div className="alert alert-danger">{regasterForm.errors.name} </div> : null}
          </div>
          <div className="form-group">
            <label htmlFor="Email" className="mb-1">
              Email
            </label>
            <input
              type="Email"
              id="email"
              name="email"
              value={regasterForm.values.email}
              className="form-control"
              onChange={regasterForm.handleChange}
              onBlur={regasterForm.handleBlur}
            />
            {regasterForm.errors.email && regasterForm.touched.email? <div className="alert alert-danger" >{regasterForm.errors.email} </div> : null}
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
            />
            {regasterForm.errors.password && regasterForm.touched.password? <div className="alert alert-danger">{regasterForm.errors.password} </div> : null}
          </div>
          <div className="form-group">
            <label htmlFor="repassword" className="mb-1">
              repassword
            </label>
            <input
              type="password"
              id="repassword"
              name="repassword"
              value={regasterForm.values.repassword}
              className="form-control"
              onChange={regasterForm.handleChange}
              onBlur={regasterForm.handleBlur}
            />
            {regasterForm.errors.repassword && regasterForm.touched.repassword? <div className="alert alert-danger" >{regasterForm.errors.repassword} </div> : null}
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
          <button className="d-block ms-auto btn bg-main text-white">
            Register
          </button>
        </form>
      </div>
    </>
  );
}
