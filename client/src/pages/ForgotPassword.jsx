import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Modal from 'react-modal';

function ForgotPassword() {
  const initialFormValues = { phoneNumber: "" };
  const [formdata, setFormData] = useState(initialFormValues);

  const initialErrorValues = { phoneNumber: "" };
  const [errorData, setErrorData] = useState(initialErrorValues);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

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

    if (!formdata.phoneNumber) {
      newErrors.phoneNumber = "*Phone Number is required*";
    }

    setErrorData(newErrors);

    if (Object.keys(newErrors).length === 0) {
      Axios.post('http://localhost:3003/api/forgotpassword', {
        phoneNumber: formdata.phoneNumber,
      })
        .then((response) => {
          if (response.data.message === 'present') {
            openModal('OTP sent to your phone number.');
            // Redirect to OTP verification page
          } else {
            openModal('Invalid Phone Number');
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
          <h3>Forgot Password</h3>

          <div className='input-box'>
            <input
              type="text"
              name="phoneNumber"
              placeholder='Phone Number'
              value={formdata.phoneNumber}
              onChange={handleInput}
            />
            <p className='error'>{errorData.phoneNumber}</p>
          </div>

          <button>Send OTP</button>

          <div className='remember-forgot'>
            <Link to="/adminlogin" className='link'>Back to Login</Link>
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

export default ForgotPassword;
