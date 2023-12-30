import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';

import { AiOutlineDashboard } from "react-icons/ai";
import { PiStudent } from "react-icons/pi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { SiGoogleclassroom } from "react-icons/si";
import { TbLogout2 } from "react-icons/tb";



function TeacherHomenav()  {


    const { TId } = useParams();
    const [data, setData] = useState({});
    const navigate = useNavigate()
    const [nulldata, setnullData] = useState(null);

  
  
    useEffect(() => {
      Axios.get(`https://backend-sandy-six.vercel.app/api/teacheruserdata/${TId}`)
        .then(result => {


            setData(result.data[0]);
           
          
  
        })
        .catch(error => {
          console.error(error);
          alert("Server");
        });
    }, [TId]);
  

    const handleLogout = () => {

      Axios.get(`https://backend-sandy-six.vercel.app/api/logout`)
        .then((result) => {
          if(result.data.status){
            localStorage.removeItem("valid")
            navigate('/teacherlogin');
          }
          
        })
        .catch((error) => {
          console.error(error);
          alert('Server Not Responding');
        });
      
  
      
    };
  
    return (
      <div>
  
        <div className="nav">
            {nulldata}
           
           
            {data ? (
  <div className='navheading'>
    <p className='institutename'>
      <SiGoogleclassroom />&nbsp;&nbsp;&nbsp;
      {data.Class_ID} <br />{data.Class_Name}
    </p>


    
    
  </div>
) : (
  <div className='navheading'>
  <p >       <SiGoogleclassroom />&nbsp;&nbsp;&nbsp;No data...</p>
  </div>
)}
  
          <div className='navbutton'>
  
            <Link to={`/teacherhomepage/${TId}/`} className="navlink">  &nbsp; &nbsp; &nbsp;
              &nbsp; &nbsp; &nbsp;<AiOutlineDashboard /> &nbsp;Dashboard</Link>
            <Link to={`/teacherhomepage/${TId}/teacherstudentdetails`} className="navlink">   &nbsp; &nbsp; &nbsp;
              &nbsp; &nbsp; &nbsp;<PiStudent />  &nbsp;Student </Link>
            <Link to={`/teacherhomepage/${TId}/attendance`} className="navlink">  &nbsp; &nbsp; &nbsp;
              &nbsp; &nbsp; &nbsp;<LiaChalkboardTeacherSolid />&nbsp;Attendance</Link>
           
              <a className="navlink" onClick={handleLogout}>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<TbLogout2 /> &nbsp;Logout
          </a>
  
          </div>
  
        </div>
  
      </div>
  
  
  
    )
  }

export default TeacherHomenav