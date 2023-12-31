import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import '../AdminComponent/Admin.css';
import { AiOutlineDashboard } from "react-icons/ai";
import { PiStudent } from "react-icons/pi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { SiGoogleclassroom } from "react-icons/si";
import { TbLogout2 } from "react-icons/tb";

function TeacherHomenav() {
  const { TId } = useParams();
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const [isMenuVisible, setMenuVisibility] = useState(false);

  useEffect(() => {
    Axios.get(`http://localhost:3003/api/teacheruserdata/${TId}`)
      .then(result => {
        setData(result.data[0]);
      })
      .catch(error => {
        console.error(error);
        alert("Server");
      });
  }, [TId]);

  const handleLogout = () => {
    Axios.get(`http://localhost:3003/api/logout`)
      .then((result) => {
        if (result.data.status) {
          localStorage.removeItem("valid");
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
      <div className={`nav ${isMenuVisible ? 'menu-visible' : ''}`}>
        <div className="mobile-toggle" onClick={() => setMenuVisibility(!isMenuVisible)}>
          <span>&#8226;&#8226;&#8226;</span>
        </div>
        {isMenuVisible && data ? (
          <div className="navheading">
            <p className="institutename">
              <SiGoogleclassroom />&nbsp;&nbsp;&nbsp;
              {data.Class_ID} <br />{data.Class_Name}
            </p>
          </div>
        ) : null}

        {isMenuVisible && (
          <div className="navbutton">
            <Link to={`/teacherhomepage/${TId}/`} className="navlink">
              <AiOutlineDashboard /> Dashboard
            </Link>
            <Link to={`/teacherhomepage/${TId}/teacherstudentdetails`} className="navlink">
              <PiStudent /> &nbsp;Student
            </Link>
            <Link to={`/teacherhomepage/${TId}/attendance`} className="navlink">
              <LiaChalkboardTeacherSolid />&nbsp;Attendance
            </Link>
            <p className="navlink" onClick={handleLogout}>
              <TbLogout2 /> &nbsp;Logout
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TeacherHomenav;
