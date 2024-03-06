import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    console.log(e);

    try {

      const response = await fetch(
        'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        }
      );
      console.log(response);
      if (response.ok) {
        alert('Password reset email sent!');
        setSuccess('Reset code sent,please check your mail');
        navigate('/verifyCode');
      } else {
        const data = await response.json();
        alert(data.message || 'Something went wrong!');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="w-75 m-auto mt-5">
      <h2 className="mt-5">Forgot Password</h2>

      {success ? <div className="alert alert-success">{success} </div> : null}
      <form>
        <div className="form-group mt-5">
          <label>Email:</label>
          <input
            className="form-control"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            required
          />
        </div>
        <button
          className="d-block ms-auto btn bg-main text-white mt-3"
          onClick={(e) => handleSubmit(e.target.value)}
          type="button"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
