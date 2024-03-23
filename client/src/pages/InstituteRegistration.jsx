import React, { useState } from 'react';
import { useNavigate, Link} from 'react-router-dom';
import Axios from 'axios';
import './registration.css';
import logo from './AdminComponent/logo.png';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'; // import CSS
import { FaLaptopCode } from "react-icons/fa";
import { BsGearWide } from "react-icons/bs";


function InstituteRegistration() {
  
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    instituteid: '',
    institutename: '',
    instituteaddress: '',
    username: '',
    lastname: '',
    email: '',
    number: '',
    password1: '',
    password2: '',
  });

  const [errorData, setErrorData] = useState({
    instituteid: '',
    institutename: '',
    instituteaddress: '',
    username: '',
    lastname: '',
    email: '',
    number: '',
    password1: '',
    password2: '',
  });

  
const handlephoneinput =(e)=>{
  setFormData({ ...formData, number: e });
}
  const handleInputChange = (e) => {
   
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
   
      
   
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newError = {};

    if (step === 1) {
      if (!formData.instituteid) {
        newError.instituteid = '*Institute-Id is Required*';
      }
      if (!formData.institutename) {
        newError.institutename = '*Institute-Name is Required*';
      }
      if (!formData.instituteaddress) {
        newError.instituteaddress = '*Institute-Address is Required*';
      }
    } else if (step === 2) {
      if (!formData.username) {
        newError.username = '*Username is Required*';
      }
      if (!formData.lastname) {
        newError.lastname = '*Lastname is Required*';
      }
      if (!formData.email) {
        newError.email = '*Email is Required*';
      }
      if (!formData.number) {
        newError.number = '*Phone-Number is Required*';
      }
    } else if (step === 3) {
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
    }

    setErrorData(newError);

    if (Object.keys(newError).length === 0) {
     

if (step === 1) {
  console.log(formData.instituteid)
  Axios.get(`https://backend-sandy-six.vercel.app/api/checkInstitute?Iid=${formData.instituteid}`)
  .then(result => {
    console.log(result.data.data)
    if(result.data.data.length>0){
      alert("institute already exist")
    }
    else{
      setStep(step+1)
    }
  })
  .catch(error => {
    console.error(error);
    alert("Error");
  });


  
} else 
if (step === 2) {
  console.log(formData.instituteid)
  Axios.get(`https://backend-sandy-six.vercel.app/api/checkphonenumber?number=${formData.number}&email=${formData.email}`)
  .then(result => {
    console.log(result.data.data);
    if(result.data.data.length > 0){
      alert("Phone number or email already in use");
    } else {
      setStep(step + 1);
    }
  })
  .catch(error => {
    console.error(error);
    alert("Error");
  });



  
} else 
if (step === 3) {
  Axios.post(`https://backend-sandy-six.vercel.app/api/api/registration/`, {
    iid: formData.instituteid,
    iname: formData.institutename,
    iaddress: formData.instituteaddress,
    fname: formData.username,
    lname: formData.lastname,
    email: formData.email,
    pnumber: formData.number,
    password: formData.password1,
  })
    .then((response) => {
      
        navigate('/');  
      
    })
    .catch((error) => {
      alert("server not found")
    });
      }
    }
  };

  return (
    <div className="wrapper">

<div className='style-icon'>
<FaLaptopCode className='laptop'/>
<BsGearWide className='wheel1'/>
<BsGearWide className='wheel2' />

</div>

<img src={logo} className='login-img'></img>
      <div className="login-box">
        <form onSubmit={handleSubmit}>
        <h3>Sign up</h3>
          {step === 1 && (
            <>
              
              <div className="input-box">
                <input
                  type="text"
                  name="instituteid"
                  placeholder="Institute-Id"
                  value={formData.instituteid}
                  onChange={handleInputChange}
                />
                <br />
               
              </div>
              <p className="error">{errorData.instituteid}</p>
              <div className="input-box">
                <input
                  type="text"
                  name="institutename"
                  placeholder="Institute-Name"
                  value={formData.institutename}
                  onChange={handleInputChange}
                />
                <br />
               
              </div>
              <p className="error">{errorData.institutename}</p>
              <div className="input-box">
                <input
                  type="text"
                  name="instituteaddress"
                  placeholder="Institute-Address"
                  value={formData.instituteaddress}
                  onChange={handleInputChange}
                />
                <br />
               
              </div>
              <p className="error">{errorData.instituteaddress}</p>
            </>
          )}

          {step === 2 && (
            <>
              
              <div className="input-box">
                <input
                  type="text"
                  name="username"
                  placeholder="Firstname"
                  value={formData.username}
                  onChange={handleInputChange}
                />
                <br />
                
              </div>
              <p className="error">{errorData.username}</p>
              <div className="input-box">
                <input
                  type="text"
                  name="lastname"
                  placeholder="Lastname"
                  value={formData.lastname}
                  onChange={handleInputChange}
                />
                <br />
               
              </div>
              <p className="error">{errorData.lastname}</p>
              <div className="input-box">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <br />
               
              </div>
              <p className="error">{errorData.email}</p>
              <div className="input-box">
              
              <PhoneInput
              className='Phonenumber'
               name="number"
               placeholder='Phone Number'
               value={formData.number}
               onChange={handlephoneinput} // Passes only the value directly
                />

                <br />
               
              </div>
              <p className="error">{errorData.number}</p>
            </>
          )}

          {step === 3 && (
            <>
              
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
            </>
          )}

          <button type="submit">Next</button>

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

export default InstituteRegistration;
