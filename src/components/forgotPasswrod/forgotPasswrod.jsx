import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


async function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault();
    navigate('/');
    try {
      // Send a request to your backend to handle the password reset
      const {response} = await fetch('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {

        alert('Password reset email sent!');
      } else {
        const data = await response.json();
        alert(data.message || 'Something went wrong!');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
        {isLoading ? <i className='fa fa-spinner fa-spin'></i>:'Reset Password'}
      </form>
    </div>
  );
}

export default ForgotPassword;
