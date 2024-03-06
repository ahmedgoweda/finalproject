import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function VerifyCode() {
  const [resetCode, setCode] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    console.log(e);
    setIsLoading(true);
    // return;
    // e.preventDefault();
    // navigate('/');
    try {
      // Send a request to your backend to handle the password reset
      const response = await fetch(
        'https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ resetCode }),
        }
      );
      setIsLoading(false);

      if (response.ok) {
        // alert('Password reset email sent!');
        setSuccess('Great,please update your password now');
        navigate('/update-password');
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
      <h2>Forgot Password</h2>

      {success ? <div className="alert alert-success">{success} </div> : null}
      <form>
        <div className="form-group mt-5">
          <label>Code:</label>
          <input
            className="form-control"
            onChange={(e) => {
              setCode(e.target.value);
            }}
            type="text"
            required
          />
        </div>
        <div className="d-flex ">
          <button
            onClick={(e) => handleSubmit(e.target.value)}
            type="button"
            className="d-block ms-auto btn bg-main text-white mt-3 "
          >
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

export default VerifyCode;
