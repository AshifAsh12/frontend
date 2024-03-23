import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import DotLoader from "react-spinners/RiseLoader";
import logo from '../AdminComponent/logo.png';
import { FaLaptopCode } from "react-icons/fa";
import { BsGearWide } from "react-icons/bs";

function TeacherLogin() {
    const lformvalue={iid:"",password:""};
    const [formdata,setformdata]=useState(lformvalue);

    const errorvalue={iid:"",password:""};
    const [errordata,seterrordata]=useState(errorvalue);
    const [loading, setLoading] = useState(false); // State to manage loading state

    const navigate=useNavigate();
    Axios.defaults.withCredentials=true;
    

    const Handleinput =(e) => {
      const {name,value}=e.target;

      setformdata({...formdata,[name]:value});

    }

    const HandleSubmit =(e) => {
      e.preventDefault();
      setLoading(true); // Set loading state to true when the login button is clicked

      const newerror={}

      if(!formdata.iid){
        newerror.iid="*Teacher-ID is required*";
      }
      if(!formdata.password)
      {
        newerror.password="*Password is required*"
      }
      else if(formdata.password.length<8)
      {
        newerror.password="*Password should contain 8 character *"
      }

      seterrordata(newerror);

      const holiday= localStorage.getItem("holiday")
      if(holiday==="true"){
        alert("Today is holiday")
        setLoading(false);
      }

      else{
       
    

      if (Object.keys(newerror).length === 0) {
        Axios.post('https://backend-sandy-six.vercel.app/api/Teacherlogin',{
          Iid: formdata.iid,
          password:formdata.password,
        })
        .then((response) => {
          if (response.data.message === 'Success') {
            localStorage.setItem("valid",true);
            navigate('/teacherhomepage/' + response.data.TId);
          } else {
            alert('Invalid Username or Password');
          }
        })
        .catch((error) => {
          alert('Server-Not-Found');
        })
        .finally(() => {
          setLoading(false); // Set loading state to false when the request is completed
        });
      } else {
        setLoading(false); // Set loading state to false if there are errors
      }
    }
    }

    return (
        <div className='wrapper'>

            <div className='style-icon'>
                <FaLaptopCode className='laptop'/>
                <BsGearWide className='wheel1'/>
                <BsGearWide className='wheel2' />
            </div>
            <img src={logo} className='login-img'></img>
            <div className='login-box'>
                <form onSubmit={HandleSubmit}>
                    <h3>
                        Login As Teacher
                    </h3>
                    <div className='input-box'>
                        <input
                            type="text"
                            name="iid"
                            placeholder='Teacher-ID'
                            value={formdata.iid}
                            onChange={Handleinput}></input>
                    </div>
                    <p className='error'>{errordata.iid}</p>
                    <div className='input-box'>
                        <input
                            type="password"
                            name="password"
                            value={formdata.password}
                            placeholder='Password'
                            onChange={Handleinput}></input>
                    </div>
                    <p className='error'>{errordata.password}</p>
                    {loading ? ( 
                        <div className='load'><DotLoader color="#ffff"/></div>
                    ) : (
                        <button type="submit">Login</button>
                    )}
                    <div className='register-link' >  </div>
                    <div className='remember-forgot'> 
                        <Link to="/" className='link'>Admin Login</Link> 
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TeacherLogin;
