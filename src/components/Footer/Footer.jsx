import React from 'react';
import './Footer.css';
export default function Footer() {
  return (
    <footer className=" p-5 bg-dark text-white">
      <div className='container' >
        <h2>Get the FreshCart App</h2>
        <p>we will send you a link ,open it on your phone to downlowed the app</p>
        <div className="row align-items-center">

          <div className="col-md-8">
            <input type="text" className='form-control' placeholder="Email.." />
          </div>
          <div className="col-md-4 ">
            <button className=' w-75 text-light  btn bg-main text-white'>Share App Link</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
