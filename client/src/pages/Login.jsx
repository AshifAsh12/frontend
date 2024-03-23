import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import DotLoader from "react-spinners/RiseLoader";
import logo from './AdminComponent/logo.png';
import { FaLaptopCode } from "react-icons/fa";
import { BsGearWide } from "react-icons/bs";

function Login() {
  const initialFormValues = { iid: "", password: "" };
  const [formdata, setFormData] = useState(initialFormValues);
  const [loading, setLoading] = useState(false); // State to manage loading state

  const initialErrorValues = { iid: "", password: "" };
  const [errorData, setErrorData] = useState(initialErrorValues);

  const navigate = useNavigate();
  Axios.defaults.withCredentials = true;

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formdata, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true when the login button is clicked

    const newErrors = {};

    if (!formdata.iid) {
      newErrors.iid = "*Institute-ID is required*";
    }

    if (!formdata.password) {
      newErrors.password = "*Password is required*";
    } else if (formdata.password.length < 8) {
      newErrors.password = "*Password should contain at least 8 characters*";
    }

    setErrorData(newErrors);

    if (Object.keys(newErrors).length === 0) {
      Axios.post('https://backend-sandy-six.vercel.app/api/login', {
        Iid: formdata.iid,
        password: formdata.password,
      })
        .then((response) => {
          console.log(response.data.message)
          if (response.data.message === 'Success') {
            localStorage.setItem("valid", true);
            navigate(`/adminhomepage/${response.data.IId}`);
          } if (response.data.message === 'wrong password') {
            alert("Incorrect Password")
          }
          if (response.data.message === 'Fail') {
            alert("User Not Found")
          }
        })
        .catch(error => {
          console.error(error);
          alert("Server Not Found");
        })
        .finally(() => {
          setLoading(false); 
        });
    } else {
      setLoading(false); 
    }
  };

  return (
    <div className='wrapper'>
      <div className='style-icon'>
        <FaLaptopCode className='laptop'/>
        <BsGearWide className='wheel1'/>
        <BsGearWide className='wheel2' />
      </div>
      <img src={logo} className='login-img'></img>
      <div className='login-box'>
        <form onSubmit={handleSubmit}>
          <h3>Login As Admin</h3>
          <div className='input-box'>
            <input
              type="text"
              name="iid"
              placeholder='Institute-ID'
              value={formdata.iid}
              onChange={handleInput}
            />
          </div>
          <p className='error'>{errorData.iid}</p>
          <div className='input-box'>
            <input
              type="password"
              name="password"
              value={formdata.password}
              placeholder='Password'
              onChange={handleInput}
            />
          </div>
          <p className='error'>{errorData.password}</p>
          {loading ? ( 
            <div className='load'><DotLoader color="#ffff"/></div>
          ) : (
            <button type="submit">Login</button>
          )}
          <div className='register-link'>
            <Link to="/instituteregistration" className='link'>Sign Up</Link>
          </div>
          <div className='remember-forgot'>
            <Link to="/forgotpassword" className='link'>Forgot Password</Link>
            <Link to="/teacherlogin" className='link'>Teacher Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
