import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Modal from 'react-modal';
import logo from './AdminComponent/logo.png';
import { FaLaptopCode } from "react-icons/fa";
import { BsGearWide } from "react-icons/bs";
import DotLoader from "react-spinners/RiseLoader";

function ForgotPassword() {
  const initialFormValues = { email: '' };
  const [formdata, setFormData] = useState(initialFormValues);
  const [errorData, setErrorData] = useState({ email: '' });
  const [loading, setLoading] = useState(false); // State to manage loading state

  const handleemailChange = (e) => {
    const value = e.target.value; // Extract value from event
    setFormData({ ...formdata, email: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true when the form is submitted

    const newErrors = {};

    if (!formdata.email) {
      newErrors.email = '*Email is required*';
    }

    setErrorData(newErrors);

    if (Object.keys(newErrors).length === 0) {
      Axios.post('https://backend-sandy-six.vercel.app/api/forgot-password', {
        email: formdata.email,
      })
        .then((response) => {
          setLoading(false); // Set loading state to false after receiving the response
          if (response.data.status === "success") {
            alert("Email has been sent");
          } else if (response.data.status === "Failed") {
            alert("User does not exist");
          }
        })
        .catch(() => {
          setLoading(false); // Set loading state to false in case of an error
          alert('Server Not Found');
        });
    } else {
      setLoading(false); // Set loading state to false if there are errors
    }
  };

  return (
    <div className='wrapper'>
      <div className='style-icon'>
        <FaLaptopCode className='laptop'/>
        <BsGearWide className='wheel1'/>
        <BsGearWide className='wheel2' />
      </div>
      <img src={logo} className='login-img' alt='Logo'></img>
      <div className='login-box'>
        <form onSubmit={handleSubmit}>
          <h3>Forgot Password</h3>
          <div className='input-box'>
            <input
              type='email'
              placeholder='Email'
              value={formdata.email}
              onChange={handleemailChange}
            />
          </div>
          <p className='error'>{errorData.email}</p>
          {loading ? (
            <div className='load'><DotLoader color="#ffff"/></div>
          ) : (
            <button>Send</button>
          )}
          <div className='remember-forgot'>
            <Link to='/' className='link'>
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
