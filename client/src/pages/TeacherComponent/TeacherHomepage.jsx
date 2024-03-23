import React, { useState, useEffect } from 'react';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import TeacherHomenav from './TeacherHomenav';
import Axios from 'axios';
import logo from '../AdminComponent/logo.png';

import icon from '../icon1.png';
import icon2 from '../icon2.png';
import { BiLogOut } from "react-icons/bi";
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";





function TeacherHomepage() {

  const [data, setData] = useState('')
  const { TId } = useParams()
  const navigate = useNavigate();
  const [open, setopen] = useState(false)

  useEffect(() => {
    Axios.get(`https://backend-sandy-six.vercel.app/api/teacheruserdata/${TId}`)
      .then(result => {
        setData(result.data[0]);
        console.log(result.data[0])

      })
      .catch(error => {
        console.error(error);

      });
  }, [TId]);


  const handleLogout = () => {
    Axios.get(`https://backend-sandy-six.vercel.app/api/logout`)
      .then((result) => {
        if (result.data.status) {
          localStorage.removeItem("valid");
          navigate('/teacherlogin');
        }
      })
      .catch((error) => {
        console.error(error);

      });
  };


  return (
    <div>


<div className='menu' >


      <div className='Main_Head'>


        <div className='site-logo'>

          <img src={logo} className='logo-img'></img>
        </div>



        <div className='button-container'>



       


          <div className='menu-container'>

            <div className='menu-trigger' onClick={() => { setopen(!open) }}><img src={icon} />
            </div>




            <div className={`drop ${open ? 'active' : 'inactive'}`}>

              <div>
              <img src={icon2} /></div>


              <h3> <br /><span></span></h3>

              <ul>

Class
                <li> <label> ID :</label><span> {data.Class_ID}</span>  
                </li>

                <li> <label>  Class : </label><span>{data.Class_Name}</span></li>


                <li><label>Teacher :</label><span>{data.Name}</span></li>



              </ul>


            </div>

          </div>
          <button
            className='site-btn'
            onClick={() => {
              handleLogout();
            }}
          >
            <BiLogOut />
          </button>

        </div>

      
      </div>

     













      <div >


      <div className='Account-Name'>

<h3> {data.Class_ID} <br/><span>{data.Class_Name}</span></h3>
  </div>
          
      <div className='redo-undo-button'>
          <button onClick={() => navigate(-1)}><FaArrowCircleLeft/></button>
          <button onClick={() => navigate(1)}><FaArrowCircleRight/></button>
        </div>
          <TeacherHomenav />
        </div>


        <div className='outlet-box'>
          <Outlet />
        </div>


      </div>

    </div>

  );
}


export default TeacherHomepage