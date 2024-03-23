import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';
import Modal from 'react-modal';
import logo from './AdminComponent/logo.png';
import { FaLaptopCode } from "react-icons/fa";
import { BsGearWide } from "react-icons/bs";
import { BiHash } from 'react-icons/bi';

function ResetPassword() {
    const [formData, setFormData] = useState({ password1: "", password2: "" })
    const [errorData, setErrorData] = useState({ password1: "", password2: "" })

    const {email,token}=useParams()

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');

    const navigate = useNavigate();
    


    const openModal = (content) => {
        setModalContent(content);
        setModalIsOpen(true);
      };
    
      const closeModal = () => {
        setModalIsOpen(false);
        setModalContent('');
      };

    const handleInputChange = (e) => {

        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });



    };


    const handleSubmit = (e) => {
        e.preventDefault();
    
        const newError = {};
    
    
        if (!formData.password1 || !formData.password2) {
            newError.password1 = '*Password cannot be empty*';
            newError.password2 = '*Password cannot be empty*';
          } else if (formData.password1.length < 8 || formData.password2.length < 8) {
            newError.password1 = '*Password should contain 8 characters*';
            newError.password2 = '*Password should contain 8 characters*';
          } else if (formData.password1 !== formData.password2) {
            newError.password1 = '*Passwords should match*';
            newError.password2 = '*Passwords should match*';
          }
    
        setErrorData(newError);
    
        if (Object.keys(newError).length === 0) {
          Axios.post(`http://localhost:3003/api/reset-password/${email}/${token}`, {
            password: formData.password1,
            
          })
            .then((response) => {

                console.log(response.data.status)
              if (response.data.status=== 'success') {
                alert("Password Changed")
                navigate('/');
    
              } else {
                openModal('Something went wrong');
              }
            })
            .catch(error => {
                console.error(error);
                alert("Error");
              });
        }
      };
    



    return (
        <div className='wrapper'>

            <div className='style-icon'>
                <FaLaptopCode className='laptop' />
                <BsGearWide className='wheel1' />
                <BsGearWide className='wheel2' />

            </div>


            <img src={logo} className='login-img'></img>

            <div className='login-box'>




                <form onSubmit={handleSubmit}>
                    <h3>
                        Reset-Password
                    </h3>


                    <div className="input-box">
                        <input
                            type="password"
                            name="password1"
                            placeholder="Create-Password"
                            value={formData.password1}
                            onChange={handleInputChange}
                        />
                        <br />

                    </div>
                    <p className="error">{errorData.password1}</p>
                    <div className="input-box">
                        <input
                            type="password"
                            name="password2"
                            placeholder="Re-Enter-Password"
                            value={formData.password2}
                            onChange={handleInputChange}
                        />
                        <br />

                    </div>
                    <p className="error">{errorData.password2}</p>



                    <button type="submit">Update</button>
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
          <button className="Model-Button" onClick={closeModal}>OK</button>
        </Modal>
      </div>

        </div>
    )
}

export default ResetPassword