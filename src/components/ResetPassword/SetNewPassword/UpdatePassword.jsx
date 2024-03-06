import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { useFormik } from 'formik';

import { Helmet } from 'react-helmet';

export default function UpdatePassword() {
  <Helmet>
    <title>Update password </title>
  </Helmet>;

  // let [ForgotPassword] = useState('');
  let navigate = useNavigate();
  const [errorMasseg, setErrorMassag] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function callResetPassword(reqBody) {
    setErrorMassag('');
    setIsLoading(true);
    let data = await axios
      .put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', reqBody)
      .catch((err) => {
        setIsLoading(false);
        setErrorMassag(err.response.data.message);
      });
    console.log(data);
    setIsLoading(false);

    if (data.statusText == 'OK') {
      navigate('/login');
    }
  }
  const validationSchema = Yup.object({
    email: Yup.string().email('email not valid').required('email is requierd'),
    newPassword: Yup.string()
      .matches(/^[A-Z][a-z0-9]{5,10}$/, 'Invalid password')
      .required('Password required'),
  });

  const ResetPasswordForm = useFormik({
    initialValues: {
      email: '',
      newPassword: '',
    },
    validationSchema,
    onSubmit: callResetPassword,
  });

  return (
    <div className="w-50 mx-auto my-5">
      <h2>Reset Password</h2>
      {errorMasseg ? (
        <div className="alert alert-danger">{errorMasseg} </div>
      ) : null}
      <form onSubmit={ResetPasswordForm.handleSubmit} className="">
        <div className="form-group">
          <label htmlFor="email" className="mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={ResetPasswordForm.values.email}
            className="form-control"
            onChange={ResetPasswordForm.handleChange}
            onBlur={ResetPasswordForm.handleBlur}
            autoComplete="username"
          />
          {ResetPasswordForm.errors.email && ResetPasswordForm.touched.email ? (
            <div className="alert alert-danger">
              {ResetPasswordForm.errors.email}{' '}
            </div>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="newPassword" className="mb-1">
            newPassword
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={ResetPasswordForm.values.newPassword}
            className="form-control"
            onChange={ResetPasswordForm.handleChange}
            onBlur={ResetPasswordForm.handleBlur}
            autoComplete="newPassword"
          />
          {ResetPasswordForm.errors.newPassword &&
          ResetPasswordForm.touched.newPassword ? (
            <div className="alert alert-danger">
              {ResetPasswordForm.errors.newPassword}{' '}
            </div>
          ) : null}
        </div>
        <div className="d-flex ">
          <button className="d-block ms-auto btn bg-main text-white mt-3 ">
            {isLoading ? (
              <i className="fa fa-spinner fa-spin"></i>
            ) : (
              'Reset Password'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
