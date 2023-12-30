import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import Modal from 'react-modal';

function Login() {
  const initialFormValues = { iid: "", password: "" };
  const [formdata, setFormData] = useState(initialFormValues);

  const initialErrorValues = { iid: "", password: "" };
  const [errorData, setErrorData] = useState(initialErrorValues);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const navigate = useNavigate();
  Axios.defaults.withCredentials = true;

  const openModal = (content) => {
    setModalContent(content);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalContent('');
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formdata, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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
          if (response.data.message === 'Success') {
            localStorage.setItem("valid",true);
            navigate(`/adminhomepage/${response.data.IId}`);

          } else {
            openModal('Invalid Username or Password');
          }
        })
        .catch(() => {
          alert('Server Not Found');
        });
    }
  };

  return (
    <div className='wrapper'>
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
            <p className='error'>{errorData.iid}</p>
          </div>

          <div className='input-box'>
            <input
              type="password"
              name="password"
              value={formdata.password}
              placeholder='Password'
              onChange={handleInput}
            />
            <p className='error'>{errorData.password}</p>
          </div>

          <button>Login</button>

          <div className='register-link'>
            <Link to="/instituteregistration" className='link'>Create Account</Link>
          </div>

          <div className='remember-forgot'>
            <Link to="/forgotpassword" className='link'>Forgot Password</Link>
            <Link to="/teacherlogin" className='link'>Teacher Login</Link>
          </div>
        </form>
      </div>

      <div className='Model-Container'>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Error Modal"
          className='ModelBox'
        >
          <p>{modalContent}</p>
          <button className="Model-Button" onClick={closeModal}>Close</button>
        </Modal>
      </div>
    </div>
  );
}

export default Login;
